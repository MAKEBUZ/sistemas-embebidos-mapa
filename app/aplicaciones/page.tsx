import SubtopicSection from "@/components/SubtopicSection";

export default function AplicacionesPage() {
  const subtopics = [
    {
      title: "Internet de las Cosas (IoT)",
      definition: "Interconexión digital de objetos cotidianos con internet. Permite que los objetos sean detectados o controlados remotamente a través de una infraestructura de red existente.",
      characteristics: [
        "Conectividad",
        "Sensores de bajo consumo",
        "Procesamiento en el borde (Edge Computing)",
        "Seguridad y privacidad"
      ],
      imageUrl: "https://ui-avatars.com/api/?name=IoT&background=4338ca&color=fff&size=512&font-size=0.33"
    },
    {
      title: "Sistemas Automotrices",
      definition: "Aplicación de sistemas embebidos en vehículos para controlar y monitorear funciones como el motor, frenos (ABS), infoentretenimiento y sistemas de asistencia al conductor.",
      characteristics: [
        "Bus CAN (Controller Area Network)",
        "Alta fiabilidad y seguridad (Safety critical)",
        "Tiempo real estricto",
        "Diagnóstico a bordo (OBD)"
      ],
      imageUrl: "https://ui-avatars.com/api/?name=Auto&background=0d9488&color=fff&size=512&font-size=0.33"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Aplicaciones y Proyectos Integrados</h1>
        <p className="text-xl text-txt-muted">Implementaciones prácticas en la industria</p>
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
