import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-brand-primary p-4 shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-txt-inverse text-xl font-bold tracking-tight">
          <Link href="/">
            Sistemas Embebidos
          </Link>
        </div>
        <ul className="flex space-x-6 text-txt-inverse font-medium">
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
        </ul>
      </div>
    </nav>
  );
}
