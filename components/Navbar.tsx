'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProjectDrawer from './ProjectDrawer';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-brand-primary p-4 shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-txt-inverse text-xl font-bold tracking-tight">
            <Link href="/">
              Sistemas Embebidos
            </Link>
          </div>
          <ul className="flex space-x-6 text-txt-inverse font-medium items-center">
            <li className="hover:text-brand-secondary-light transition-colors">
              <Link href="/">Inicio</Link>
            </li>
            <li className="hover:text-brand-secondary-light transition-colors">
              <Link href="/fundamentos">Fundamentos</Link>
            </li>
            <li className="hover:text-brand-secondary-light transition-colors">
              <Link href="/tiempo-real">Tiempo Real</Link>
            </li>
            <li className="hover:text-brand-secondary-light transition-colors">
              <Link href="/aplicaciones">Aplicaciones</Link>
            </li>
            <li>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="bg-brand-secondary hover:bg-brand-secondary-light text-white px-4 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Proyectos</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <ProjectDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
