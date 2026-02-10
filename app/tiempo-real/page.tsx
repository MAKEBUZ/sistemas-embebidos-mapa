import SubtopicSection from "@/components/SubtopicSection";

export default function TiempoRealPage() {
  const subtopics = [
    {
      title: "Sistemas Operativos en Tiempo Real (RTOS)",
      definition: "Un sistema operativo de tiempo real (RTOS) es un sistema operativo que garantiza cierta capacidad para servir aplicaciones con restricciones de tiempo real. Procesa datos a medida que llegan, generalmente sin retrasos de búfer.",
      characteristics: [
        "Determinismo",
        "Multitarea preventiva",
        "Baja latencia de interrupción",
        "Gestión de prioridades"
      ],
      imageUrl: "https://ui-avatars.com/api/?name=RTOS&background=0d9488&color=fff&size=512&font-size=0.33"
    },
    {
      title: "Planificación (Scheduling)",
      definition: "La planificación de procesos en sistemas de tiempo real se encarga de decidir qué tarea debe ejecutarse en cada momento para cumplir con los plazos de entrega (deadlines).",
      characteristics: [
        "Rate Monotonic Scheduling (RMS)",
        "Earliest Deadline First (EDF)",
        "Planificación cíclica",
        "Manejo de inversión de prioridades"
      ],
      imageUrl: "https://ui-avatars.com/api/?name=SCH&background=4338ca&color=fff&size=512&font-size=0.33"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Programación en tiempo real</h1>
        <p className="text-xl text-txt-muted">Gestión de tareas y restricciones temporales</p>
        <div className="w-32 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="space-y-12">
        {subtopics.map((topic, index) => (
          <SubtopicSection
            key={index}
            title={topic.title}
            definition={topic.definition}
            characteristics={topic.characteristics}
            imageUrl={topic.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
