import SubtopicSection from "@/components/SubtopicSection";

export default function FundamentosPage() {
  const subtopics = [
    {
      title: "Microcontroladores",
      definition: "Un microcontrolador es un circuito integrado programable, capaz de ejecutar las órdenes grabadas en su memoria. Está compuesto de varios bloques funcionales que cumplen una tarea específica.",
      characteristics: [
        "Unidad Central de Procesamiento (CPU)",
        "Memoria RAM y ROM",
        "Periféricos de entrada/salida",
        "Bajo consumo de energía"
      ],
      imageUrl: "https://ui-avatars.com/api/?name=MC&background=4338ca&color=fff&size=512&font-size=0.33"
    },
    {
      title: "Arquitectura de Computadoras",
      definition: "Se refiere al diseño conceptual y la estructura operativa fundamental de un sistema informático. Es el modelo y la descripción funcional de los requerimientos y las implementaciones de diseño para varias partes de una computadora.",
      characteristics: [
        "Arquitectura Von Neumann vs Harvard",
        "Juego de instrucciones (ISA)",
        "Organización de la memoria",
        "Bus de datos y control"
      ],
      imageUrl: "https://ui-avatars.com/api/?name=AC&background=0d9488&color=fff&size=512&font-size=0.33"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Fundamentos de Sistemas Embebidos</h1>
        <p className="text-xl text-txt-muted">Conceptos básicos y estructura fundamental</p>
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
