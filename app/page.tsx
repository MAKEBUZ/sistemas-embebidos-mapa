import Image from "next/image";

export default function Home() {
  const teamMembers = [
    { name: "Diego Ocampo", idUcc: 845250, role: "Estudiante", image: "https://ui-avatars.com/api/?name=I+1&background=0d9488&color=fff" },
    { name: "Dylan Rodriguez", idUcc: 849045 ,role: "Estudiante", image: "https://ui-avatars.com/api/?name=I+2&background=4338ca&color=fff" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-secondary uppercase tracking-wide">Materia</h2>
        <h1 className="text-5xl font-extrabold text-brand-primary">Sistemas Embebidos</h1>
        <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
        <h3 className="text-3xl font-semibold text-txt-muted mt-4">Actividad: Diseño de Estructura Web</h3>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-brand-primary mb-8">Integrantes del Equipo</h2>
        <div className="flex flex-row items-center justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="center flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center border-t-4 border-brand-secondary hover:-translate-y-1">
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-surface-subtle">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-txt-main">{member.name}</h3>
              <p className="text-txt-muted font-medium">ID: {member.idUcc}</p>
              <p className="text-brand-primary font-medium">{member.role}</p>

            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
