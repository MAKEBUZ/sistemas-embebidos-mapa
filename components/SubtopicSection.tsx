import Image from 'next/image';

interface SubtopicProps {
  title: string;
  definition: string;
  characteristics: string[];
  imageUrl?: string;
  imageAlt?: string;
}

export default function SubtopicSection({ title, definition, characteristics, imageUrl, imageAlt }: SubtopicProps) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 my-10 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Decorative gradient top bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
      
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-1 rounded-full bg-brand-accent"></div>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
            {title}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="space-y-8 flex flex-col justify-between">
            <div className="bg-surface-subtle p-6 rounded-xl border border-slate-100 shadow-inner">
              <h4 className="text-lg font-semibold text-brand-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Definición
              </h4>
              <p className="text-txt-muted leading-relaxed text-justify">
                {definition}
              </p>
            </div>
            
            <div className="flex-grow">
              <h4 className="text-lg font-semibold text-brand-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                Características Clave
              </h4>
              <ul className="grid grid-cols-1 gap-3">
                {characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-subtle transition-colors duration-200">
                    <span className="flex-shrink-0 mt-1 text-brand-secondary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-txt-main font-medium">{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative h-full min-h-[300px] w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt={imageAlt || title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="bg-surface-subtle w-full h-full flex items-center justify-center text-brand-primary text-center p-4">
                <div>
                  <p className="font-medium text-lg">Imagen Referencial</p>
                  <p className="text-sm opacity-75 mt-2">{imageAlt || title}</p>
                </div>
              </div>
            )}
            {/* Overlay gradient for image text readability if needed in future */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
