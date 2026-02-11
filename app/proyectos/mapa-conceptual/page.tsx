'use client';

import { ReactFlow, Controls, Background, useNodesState, useEdgesState, Node, Edge, Position, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import data from './texto.json';
import { useCallback } from 'react';

// Constants for layout
const MOMENT_SPACING = 1200;
const TOPIC_RADIUS = 350;

// Helper to render summary content
const renderSummary = (topic: any) => (
  <div className="text-left p-1 group h-full flex flex-col justify-center">
    <div className="font-bold text-sm mb-1 text-gray-800">{topic.title}</div>
    <div className="text-xs text-gray-500 line-clamp-2">{topic.definition}</div>
    <div className="text-[10px] text-indigo-500 mt-2 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      Click para ver detalles
    </div>
  </div>
);

// Helper to render full content
const renderFull = (topic: any) => (
   <div className="text-left p-3">
    {topic.imageUrl && (
      <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={topic.imageUrl} 
          alt={topic.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
    )}
    <div className="font-bold text-lg text-indigo-700 mb-2 border-b border-indigo-100 pb-2">{topic.title}</div>
    <div className="text-sm text-gray-700 mb-4 leading-relaxed">{topic.definition}</div>
    
    <div className="mb-3 bg-indigo-50 p-3 rounded-lg">
      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Características</span>
      <ul className="space-y-1">
        {topic.characteristics.map((char: string, i: number) => (
          <li key={i} className="text-xs text-gray-700 flex items-start">
            <span className="mr-2 text-indigo-400">•</span>
            {char}
          </li>
        ))}
      </ul>
    </div>

    {topic.example && (
      <div className="mt-4 pt-3 border-t border-gray-100">
         <div className="text-xs text-gray-600 italic bg-amber-50 p-2 rounded border border-amber-100">
          <span className="font-bold text-amber-600 not-italic">💡 Ejemplo: </span>
          {topic.example.replace('Ejemplo: ', '')}
         </div>
      </div>
    )}
  </div>
);

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

// Create Root Node
const rootId = 'root';
initialNodes.push({
  id: rootId,
  position: { x: 0, y: -400 }, // Moved up
  data: { label: data.title },
  type: 'input',
  sourcePosition: Position.Bottom,
  style: { 
    background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', 
    color: 'white', 
    border: '2px solid #312e81', 
    fontWeight: '800', 
    fontSize: '18px',
    width: 280,
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
});

data.moments.forEach((moment, mIndex) => {
  const momentId = `moment-${mIndex}`;
  
  // Calculate Moment Position (Horizontal distribution)
  // Center is 0. Left is -Spacing. Right is +Spacing.
  // If 3 moments: -Spacing, 0, +Spacing.
  const momentX = (mIndex - 1) * MOMENT_SPACING;
  const momentY = 0;

  // Moment Node
  initialNodes.push({
    id: momentId,
    position: { x: momentX, y: momentY },
    data: { label: moment.title },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: { 
      background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)', 
      color: 'white', 
      border: '2px solid #134e4a', 
      fontWeight: '700',
      width: 280,
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      zIndex: 10
    },
  });

  // Edge from Root to Moment
  initialEdges.push({
    id: `e-${rootId}-${momentId}`,
    source: rootId,
    target: momentId,
    type: 'bezier', // Curved lines
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 3, opacity: 0.6 },
  });

  // Calculate Topics Layout (Semi-circle / Fan below the Moment)
  const totalTopics = moment.topics.length;
  // Spread topics from angle 0 (right) to 180 (left) - actually downwards: 30 to 150 degrees?
  // Let's go 20 degrees to 160 degrees for full bottom spread.
  const startAngle = 10;
  const endAngle = 170;
  const angleStep = (endAngle - startAngle) / (totalTopics - 1);

  moment.topics.forEach((topic, tIndex) => {
    const topicId = `topic-${mIndex}-${tIndex}`;
    
    // Calculate position based on angle
    const angleRad = (startAngle + (tIndex * angleStep)) * (Math.PI / 180);
    const offsetX = Math.cos(angleRad) * TOPIC_RADIUS; // cos(0) = 1 (Right)
    const offsetY = Math.sin(angleRad) * TOPIC_RADIUS; // sin(90) = 1 (Down)
    
    // Since we want them "below", we map 0-180 to bottom half. 
    // cos goes 1 -> 0 -> -1 (Right -> Center -> Left)
    // sin goes 0 -> 1 -> 0 (Top -> Bottom -> Top)
    // We want Left -> Right or Right -> Left?
    // Let's map so tIndex 0 is Left, Last is Right.
    // 170 deg (Left) to 10 deg (Right).
    const currentAngle = 170 - (tIndex * angleStep); 
    const currentRad = currentAngle * (Math.PI / 180);

    const tX = momentX + (Math.cos(currentRad) * TOPIC_RADIUS);
    const tY = momentY + (Math.sin(currentRad) * TOPIC_RADIUS);
    
    // Topic Node
    initialNodes.push({
      id: topicId,
      position: { x: tX, y: tY },
      data: { 
        label: renderSummary(topic),
        topicData: topic, // Store raw data for expansion
        expanded: false
      },
      targetPosition: Position.Top, // Actually connects from center usually
      style: { 
        width: 250,
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #cbd5e1',
        borderRadius: '16px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)'
      },
    });

    // Edge from Moment to Topic
    initialEdges.push({
      id: `e-${momentId}-${topicId}`,
      source: momentId,
      target: topicId,
      type: 'bezier',
      style: { stroke: '#cbd5e1', strokeWidth: 1.5 },
    });
  });
});

export default function MapaConceptualPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    // Only handle topic nodes (those with topicData)
    if (!node.data.topicData) return;

    setNodes((nds) => 
      nds.map((n) => {
        // If it's the clicked node, toggle expansion
        if (n.id === node.id) {
          const isExpanded = !n.data.expanded;
          return {
            ...n,
            data: {
              ...n.data,
              expanded: isExpanded,
              label: isExpanded ? renderFull(n.data.topicData) : renderSummary(n.data.topicData)
            },
            style: {
              ...n.style,
              width: isExpanded ? 400 : 250,
              zIndex: isExpanded ? 1000 : 0,
              boxShadow: isExpanded ? '0 25px 50px -12px rgb(0 0 0 / 0.25)' : '0 2px 4px rgb(0 0 0 / 0.05)',
              borderColor: isExpanded ? '#4f46e5' : '#cbd5e1',
              background: isExpanded ? '#ffffff' : 'rgba(255, 255, 255, 0.95)'
            }
          };
        }
        
        // Collapse others when one is clicked (Accordion style)
        if (n.data.topicData && n.data.expanded) {
          return {
            ...n,
            data: {
              ...n.data,
              expanded: false,
              label: renderSummary(n.data.topicData)
            },
            style: {
              ...n.style,
              width: 250,
              zIndex: 0,
              boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)',
              borderColor: '#cbd5e1',
              background: 'rgba(255, 255, 255, 0.95)'
            }
          };
        }

        return n;
      })
    );
  }, [setNodes]);

  const onPaneClick = useCallback(() => {
    // Collapse all nodes when clicking on background
    setNodes((nds) => 
      nds.map((n) => {
        if (n.data.topicData && n.data.expanded) {
           return {
            ...n,
            data: {
              ...n.data,
              expanded: false,
              label: renderSummary(n.data.topicData)
            },
            style: {
              ...n.style,
              width: 250,
              zIndex: 0,
              boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)',
              borderColor: '#cbd5e1',
              background: 'rgba(255, 255, 255, 0.95)'
            }
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  return (
    <div className="h-[80vh] w-full border border-gray-200 rounded-lg shadow-inner bg-slate-50">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#cbd5e1" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
