import type { Metadata } from 'next';
import './globals.css';
import './whatsapp.css';
export const metadata: Metadata = { title: 'energizar.solar | Energia solar em Sarandi - RS', description: 'Energia solar para residências e empresas em Sarandi e região. Peça uma simulação personalizada com a energizar.solar.', robots: { index: true, follow: true }, openGraph: { title: 'energizar.solar', description: 'Sua energia pode render mais. Conheça soluções solares para sua casa ou empresa.', type: 'website', locale: 'pt_BR' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
