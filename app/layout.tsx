import type { Metadata } from 'next';
import './globals.css';
import './whatsapp.css';
import './suna-refinement.css';
export const metadata: Metadata = { title: 'Energia Solar em Garanhuns | SUNAENERGIA', description: 'SUNAENERGIA: projetos de energia solar para residências e empresas em Garanhuns, Heliópolis e região. Peça uma simulação pelo WhatsApp.', keywords: ['energia solar em Garanhuns', 'energia solar Heliópolis', 'energia solar Garanhuns PE', 'painel solar Garanhuns', 'SUNAENERGIA'], robots: { index: true, follow: true }, openGraph: { title: 'Energia Solar em Garanhuns | SUNAENERGIA', description: 'Projetos de energia solar para casas e empresas em Garanhuns, Heliópolis e região.', type: 'website', locale: 'pt_BR' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
