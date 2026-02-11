'use client';

import { ReactFlow, Controls, Background, useNodesState, useEdgesState, Node, Edge, Position, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import data from './texto.json';
import { useCallback } from 'react';

// Constants for layout
const NODE_WIDTH = 250;
const X_SPACING = 400;
const Y_SPACING = 200;

// Helper to render summary content
const renderSummary = (topic: any) => (
  <div className="text-left p-1 group">
    <div className="font-bold text-sm mb-1">{topic.title}</div>
    <div className="text-xs text-gray-500 line-clamp-2">{topic.definition}</div>
    <div className="text-[10px] text-brand-secondary mt-2 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      Click para ver detalles
    </div>
  </div>
);

// Helper to render full content
const renderFull = (topic: any) => (
   <div className="text-left p-3">
    {topic.imageUrl && (
      <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={topic.imageUrl} 
          alt={topic.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    <div className="font-bold text-lg text-brand-primary mb-2 border-b border-gray-100 pb-2">{topic.title}</div>
    <div className="text-sm text-gray-700 mb-4">{topic.definition}</div>
    
    <div className="mb-3">
      <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider block mb-2">Características</span>
      <ul className="list-disc pl-4 space-y-1">
        {topic.characteristics.map((char: string, i: number) => (
          <li key={i} className="text-xs text-gray-600">{char}</li>
        ))}
      </ul>
    </div>

    {topic.example && (
      <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 -mx-3 -mb-3 p-3 rounded-b-lg">
         <div className="text-xs text-gray-600">
          <span className="font-bold text-brand-accent">💡 Ejemplo: </span>
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
  position: { x: 0, y: 0 }, // Will be centered later
  data: { label: data.title },
  type: 'input',
  sourcePosition: Position.Bottom,
  style: { 
    background: '#4338ca', 
    color: 'white', 
    border: 'none', 
    fontWeight: 'bold', 
    width: 200,
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  },
});

let currentX = 0;

data.moments.forEach((moment, mIndex) => {
  const momentId = `moment-${mIndex}`;
  const momentX = currentX;
  const momentY = Y_SPACING;

  // Moment Node
  initialNodes.push({
    id: momentId,
    position: { x: momentX, y: momentY },
    data: { label: moment.title },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: { 
      background: '#0d9488', 
      color: 'white', 
      border: 'none', 
      fontWeight: '600',
      width: 250,
      borderRadius: '8px'
    },
  });

  // Edge from Root to Moment
  initialEdges.push({
    id: `e-${rootId}-${momentId}`,
    source: rootId,
    target: momentId,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#94a3b8', strokeWidth: 2 },
  });

  moment.topics.forEach((topic, tIndex) => {
    const topicId = `topic-${mIndex}-${tIndex}`;
    const topicY = momentY + Y_SPACING + (tIndex * 150); // Vertical list for topics
    
    // Topic Node
    initialNodes.push({
      id: topicId,
      position: { x: momentX, y: topicY },
      data: { 
        label: renderSummary(topic),
        topicData: topic, // Store raw data for expansion
        expanded: false
      },
      targetPosition: Position.Top,
      style: { 
        width: 250,
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      },
    });

    // Edge from Moment to Topic
    initialEdges.push({
      id: `e-${momentId}-${topicId}`,
      source: momentId,
      target: topicId,
      type: 'default',
      style: { stroke: '#cbd5e1' },
    });
  });

  currentX += X_SPACING;
});

// Center root node
const totalWidth = currentX - X_SPACING;
initialNodes[0].position.x = (totalWidth / 2) + 25; // Adjusting for visual center

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
              boxShadow: isExpanded ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' : 'none',
              borderColor: isExpanded ? '#4338ca' : '#e2e8f0'
            }
          };
        }
        
        // Optional: Collapse others when one is clicked? 
        // For now, let's keep others as they are, or collapse them to focus on one.
        // Let's implement "Accordion" style: collapse all others.
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
              boxShadow: 'none',
              borderColor: '#e2e8f0'
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
              boxShadow: 'none',
              borderColor: '#e2e8f0'
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
