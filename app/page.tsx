'use client';

import Image from 'next/image';
import Script from 'next/script';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, MessageCircle, ShieldCheck, Sun, X, Zap, Wrench, ClipboardCheck, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const whatsapp = '5587981330025';
const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Quero saber mais sobre energia solar com a SUNAENERGIA.')}`;
const mapLink = 'https://www.google.com/maps/search/?api=1&query=Rua%20Joaquim%20T%C3%A1vora%2C%2093%2C%20Heli%C3%B3polis%2C%20Garanhuns%20-%20PE';
const nav = [{ label: 'Início', href: '#inicio' }, { label: 'Obras', href: '#obras' }, { label: 'Como funciona', href: '#processo' }, { label: 'FAQ', href: '#faq' }];
const billOptions = [
  { label: 'R$ 300', value: 300 },
  { label: 'R$ 500', value: 500 },
  { label: 'R$ 800', value: 800 },
  { label: 'R$ 1.200', value: 1200 },
];
const economyRate = 0.82;
const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .6, ease: 'easeOut' }}>{children}</motion.div>;
}
function Brand({ light = false }: { light?: boolean }) { return <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="SUNAENERGIA, ir para o início"><Image src="/sunaenergia-logo.png" alt="Logo SUNA Energia Solar" width={260} height={88} priority /></a>; }
function ButtonLink({ href, children, ghost = false }: { href: string; children: React.ReactNode; ghost?: boolean }) { return <a className={`button ${ghost ? 'button-ghost' : ''}`} href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></a>; }
function NativeInteractions() {
  return <Script id="sunaenergia-native-interactions" strategy="afterInteractive">{`
(() => {
  const format = (value) => 'R$ ' + Number(value).toLocaleString('pt-BR');
  const rate = ${economyRate};
  const whatsapp = '${whatsapp}';
  const updateSavings = (value) => {
    const bill = Number(value || 500);
    const economy = Math.round(bill * rate);
    const yearly = economy * 12;
    document.querySelectorAll('.bill-options label').forEach((label) => {
      const input = label.querySelector('input');
      label.classList.toggle('active', Number(input.value) === bill);
      input.checked = Number(input.value) === bill;
    });
    const amount = document.querySelector('[data-savings-amount]');
    const text = document.querySelector('[data-savings-text]');
    const link = document.querySelector('[data-savings-link]');
    const hint = document.querySelector('[data-savings-hint]');
    if (amount) amount.textContent = format(economy);
    if (text) text.textContent = 'Para uma conta de ' + format(bill) + ', isso dá cerca de ' + format(yearly) + ' em 12 meses.';
    if (hint) hint.textContent = 'WhatsApp já abre com ' + format(bill) + ' e ' + format(economy);
    if (link) {
      const message = 'Olá! Fiz uma simulação rápida no site da SUNAENERGIA. Minha conta de luz fica em torno de ' + format(bill) + ' por mês e apareceu uma economia estimada de ' + format(economy) + ' por mês. Quero uma análise para o meu imóvel.';
      link.href = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);
    }
  };

  document.querySelectorAll('.bill-options input').forEach((input) => {
    input.addEventListener('change', () => updateSavings(input.value));
    input.addEventListener('click', () => updateSavings(input.value));
  });
  updateSavings(document.querySelector('.bill-options input:checked')?.value);

  const header = document.querySelector('.site-header');
  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const down = currentScroll > lastScroll + 8;
    const up = currentScroll < lastScroll - 8;
    if (currentScroll < 90 || up) header?.classList.remove('header-hidden');
    if (down && currentScroll > 140) header?.classList.add('header-hidden');
    lastScroll = currentScroll;
  }, { passive: true });
})();
`}</Script>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const bill = 500;
  const economy = Math.round(bill * economyRate);
  const yearly = economy * 12;
  const simulationMessage = `Olá! Fiz uma simulação rápida no site da SUNAENERGIA. Minha conta de luz fica em torno de ${formatCurrency(bill)} por mês e apareceu uma economia estimada de ${formatCurrency(economy)} por mês. Quero uma análise para o meu imóvel.`;
  const simulationWaLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(simulationMessage)}`;

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScroll + 8;
      const scrollingUp = currentScroll < lastScroll - 8;
      if (currentScroll < 90 || scrollingUp || menuOpen) setHeaderHidden(false);
      if (scrollingDown && currentScroll > 140 && !menuOpen) setHeaderHidden(true);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return <>
    <header className={headerHidden ? 'site-header header-hidden' : 'site-header'}><div className="container header-inner"><Brand /><nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">{nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<a className="mobile-nav-cta" href="#simular" onClick={() => setMenuOpen(false)}>Simular economia <ArrowRight size={16}/></a></nav><a className="header-cta" href="#simular">Simular economia <ArrowUpRight size={17}/></a><button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <main>
      <section id="inicio" className="hero"><Image className="hero-photo" src="/solar-sky-hero.png" alt="Céu claro sobre telhado com painéis solares; imagem ilustrativa" fill priority sizes="100vw" /><div className="hero-shade"/><div className="container hero-content"><div className="hero-intro"><div className="hero-badge"><span>ENERGIA SOLAR</span> em Garanhuns e região</div><h1>Invista uma vez.<br/><em>Economize para sempre.</em></h1><p>Uma solução solar bem planejada começa entendendo o seu consumo e o potencial do seu imóvel.</p><div className="hero-local"><MapPin size={16}/><span>Rua Joaquim Távora, nº 93 · Heliópolis, Garanhuns - PE</span></div><div className="hero-actions"><ButtonLink href="#simular">Enviar minha conta e simular</ButtonLink></div></div></div><div className="hero-bottom-note"><span>DESCUBRA O POTENCIAL DO SEU TELHADO</span><span>↓</span></div></section>
      <section className="proof-strip"><div className="container proof-grid"><div><Sun/><span><strong>Energia que se renova</strong><small>Uma escolha inteligente para o futuro.</small></span></div><div><ShieldCheck/><span><strong>Projeto sob medida</strong><small>Dimensionado para o seu consumo.</small></span></div><div><MapPin/><span><strong>Atendimento local</strong><small>Garanhuns e região.</small></span></div></div></section>
      <section id="obras" className="section projects"><div className="container"><Reveal className="projects-heading"><span className="eyebrow">NOSSO PORTFÓLIO</span><div><h2>Energia pensada<br/><em>para cada espaço.</em></h2><p>Residências e empresas pedem soluções que respeitem o consumo, o telhado e a rotina de quem vai usar a energia todos os dias.</p></div></Reveal><div className="projects-gallery"><Reveal className="project-card project-card-main"><Image src="/solar-hero.png" alt="Sistema fotovoltaico em telhado residencial; imagem ilustrativa" fill sizes="(max-width: 760px) 100vw, 58vw"/><div className="project-caption"><span>RESIDENCIAL</span><strong>Energia para a rotina da casa</strong><small>Imagem ilustrativa</small></div></Reveal><Reveal className="project-card"><Image src="/solar-sky-hero.png" alt="Painéis solares instalados em telhado; imagem ilustrativa" fill sizes="(max-width: 760px) 100vw, 30vw"/><div className="project-caption"><span>PROJETO SOLAR</span><strong>Planejamento que se adapta ao espaço</strong><small>Imagem ilustrativa</small></div></Reveal><Reveal className="project-card project-card-contact"><div><span className="eyebrow">SEU PROJETO</span><h3>O próximo espaço pode ser o seu.</h3><p>Conte um pouco sobre a sua conta de luz e receba uma orientação inicial.</p><ButtonLink href="#simular" ghost>Quero uma simulação</ButtonLink></div></Reveal></div><p className="projects-note">As imagens desta galeria são ilustrativas. Envie fotos das instalações da SUNAENERGIA para exibirmos os projetos reais aqui.</p></div></section>
      <section id="processo" className="section process"><div className="container"><Reveal className="process-intro"><span className="eyebrow">COMO FUNCIONA</span><h2>Da primeira conta de luz<br/>à sua própria geração.</h2><p>Quatro passos claros para transformar o potencial do seu telhado em energia.</p></Reveal><div className="steps">{[{n:'01',icon:ClipboardCheck,title:'Simulação',text:'Conte seu consumo e receba uma análise inicial.'},{n:'02',icon:Zap,title:'Projeto',text:'Definimos a solução para o seu espaço.'},{n:'03',icon:Wrench,title:'Instalação',text:'A equipe executa cada etapa com cuidado.'},{n:'04',icon:Sun,title:'Sua energia',text:'Depois das etapas necessárias, seu sistema começa a gerar.'}].map(s => <Reveal key={s.n} className="step"><div className="step-top"><span>{s.n}</span><s.icon size={25} strokeWidth={1.5}/></div><h3>{s.title}</h3><p>{s.text}</p></Reveal>)}</div></div></section>
      <section id="faq" className="section faq"><div className="container faq-grid"><Reveal><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Respostas claras para decidir com confiança.</h2><p>Se ainda tiver alguma dúvida, nossa equipe pode orientar você.</p><a className="inline-link" href={waLink} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowUpRight size={18}/></a></Reveal><div className="faq-list">{[{q:'Quanto custa instalar energia solar?',a:'O valor depende do seu consumo, do espaço disponível e dos equipamentos indicados. Uma simulação personalizada é a melhor forma de conhecer o investimento para o seu caso.'},{q:'Em quanto tempo começo a gerar energia?',a:'O prazo varia conforme o projeto, a instalação e as etapas de aprovação junto à distribuidora. A equipe informa uma previsão durante o atendimento.'},{q:'O sistema funciona em dias nublados?',a:'Sim. Os painéis também geram energia com luz difusa, embora a produção seja menor que em dias de sol forte. À noite, sistemas conectados à rede utilizam a energia da distribuidora e os créditos disponíveis.'},{q:'Preciso fazer manutenção?',a:'Os sistemas exigem acompanhamento e cuidados periódicos. A frequência depende das condições do local e das orientações dos fabricantes.'},{q:'É possível financiar o projeto?',a:'Existem linhas de crédito para energia solar. As opções e condições dependem da análise da instituição financeira e do projeto.'}].map((item,i)=><details key={item.q} open={i===0}><summary>{item.q}<ChevronDown size={20}/></summary><p>{item.a}</p></details>)}</div></div></section>
      <section id="simular" className="section cta-section"><div className="container cta-grid"><Reveal className="cta-copy"><span className="eyebrow">SIMULAÇÃO RÁPIDA</span><h2>Tenha uma noção antes da conversa.</h2><p>A conta abaixo usa uma referência simples: até 82% de redução sobre o valor mensal escolhido. A análise real considera consumo, área disponível, sombreamento e padrão de ligação.</p><div className="cta-assurance"><Check size={18}/> Sem formulário <span/> <Check size={18}/> Mensagem pronta no WhatsApp</div></Reveal><Reveal className="savings-panel glass-card"><div className="panel-top"><span><Sun size={22}/></span><div><h3>Quanto vem na sua conta?</h3><p>Escolha o valor mais próximo.</p></div></div><div className="bill-options" role="radiogroup" aria-label="Valor médio da conta de luz">{billOptions.map(option => <label key={option.value} className={bill === option.value ? 'active' : ''}><input type="radio" name="bill" value={option.value} defaultChecked={bill === option.value} /><span>{option.label}</span></label>)}</div><div className="savings-result"><small>Estimativa com base em {Math.round(economyRate * 100)}% de economia</small><strong data-savings-amount>{formatCurrency(economy)}</strong><span data-savings-text>Para uma conta de {formatCurrency(bill)}, isso dá cerca de {formatCurrency(yearly)} em 12 meses.</span></div><p className="calc-note">É uma prévia para começar a conversa. O número final sai depois da avaliação do imóvel.</p><a className="action-card compact" data-savings-link href={simulationWaLink} target="_blank" rel="noopener noreferrer"><span className="action-icon"><Image className="whatsapp-action-icon" src="/whatsapp-icon.png" alt="" width={25} height={25}/></span><span><strong>Enviar minha estimativa</strong><small data-savings-hint>WhatsApp já abre com {formatCurrency(bill)} e {formatCurrency(economy)}</small></span><ArrowUpRight size={19}/></a></Reveal></div></section>
    </main>
    <footer className="footer footer-simple"><div className="container footer-main"><Brand light/><div className="footer-contact"><a href={waLink} target="_blank" rel="noopener noreferrer"><Image className="whatsapp-footer-icon" src="/whatsapp-icon.png" alt="" width={16} height={16}/> (87) 98133-0025</a><a href={mapLink} target="_blank" rel="noopener noreferrer"><MapPin size={16}/> Rua Joaquim Távora, nº 93 · Heliópolis, Garanhuns - PE <ArrowUpRight size={14}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SUNAENERGIA · Energia solar em Garanhuns, Heliópolis e região.</span></div></footer>
    <Script id="sunaenergia-local-business" type="application/ld+json" strategy="afterInteractive">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'SUNAENERGIA', description: 'Projetos de energia solar para residências e empresas em Garanhuns, Heliópolis e região.', telephone: '+55 87 98133-0025', address: { '@type': 'PostalAddress', streetAddress: 'Rua Joaquim Távora, nº 93 - Heliópolis', addressLocality: 'Garanhuns', addressRegion: 'PE', addressCountry: 'BR' }, areaServed: 'Garanhuns e região', hasMap: mapLink })}</Script>
    <a className="floating-wa" href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Falar com a SUNAENERGIA pelo WhatsApp"><Image src="/whatsapp-icon.png" alt="" width={30} height={30} /></a>
    <NativeInteractions />
  </>;
}
