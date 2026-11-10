import type { Metadata } from 'next';
import './globals.css';
import './whatsapp.css';
import './suna-refinement.css';
export const metadata: Metadata = { title: 'SUNAENERGIA | Energia solar em Garanhuns - PE', description: 'Energia solar para residências e empresas em Garanhuns e região. Peça uma simulação personalizada com a SUNAENERGIA.', robots: { index: true, follow: true }, openGraph: { title: 'SUNAENERGIA', description: 'Sua energia pode render mais. Conheça soluções solares para sua casa ou empresa.', type: 'website', locale: 'pt_BR' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
