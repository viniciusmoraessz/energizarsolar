'use client';

import Image from 'next/image';
import Script from 'next/script';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, MessageCircle, ShieldCheck, Sun, X, Zap, Building2, House, Wrench, ClipboardCheck, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const whatsapp = '555496509618';
const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Quero saber mais sobre energia solar com a energizar.solar.')}`;
const nav = [{ label: 'Início', href: '#inicio' }, { label: 'Sobre', href: '#sobre' }, { label: 'Soluções', href: '#solucoes' }, { label: 'Obras', href: '#obras' }, { label: 'FAQ', href: '#faq' }];
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
function Brand({ light = false }: { light?: boolean }) { return <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="energizar.solar, ir para o início"><Image src="/energizar-solar-logo.png" alt="" width={48} height={48} priority /><span><strong>energizar.solar</strong><small>ENERGIA SOLAR</small></span></a>; }
function ButtonLink({ href, children, ghost = false }: { href: string; children: React.ReactNode; ghost?: boolean }) { return <a className={`button ${ghost ? 'button-ghost' : ''}`} href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></a>; }
function NativeInteractions() {
  return <Script id="energizar-native-interactions" strategy="afterInteractive">{`
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
      const message = 'Olá! Fiz uma simulação rápida no site da energizar.solar. Minha conta de luz fica em torno de ' + format(bill) + ' por mês e apareceu uma economia estimada de ' + format(economy) + ' por mês. Quero uma análise para o meu imóvel.';
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
  const simulationMessage = `Olá! Fiz uma simulação rápida no site da energizar.solar. Minha conta de luz fica em torno de ${formatCurrency(bill)} por mês e apareceu uma economia estimada de ${formatCurrency(economy)} por mês. Quero uma análise para o meu imóvel.`;
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
      <section id="inicio" className="hero"><Image className="hero-photo" src="/solar-sky-hero.png" alt="Céu claro sobre telhado com painéis solares; imagem ilustrativa" fill priority sizes="100vw" /><div className="hero-shade"/><div className="container hero-content"><Reveal><div className="hero-badge"><span>ENERGIA SOLAR</span> em Sarandi e região</div><h1>Invista na sua energia.<br/><em>Economize todos os dias.</em></h1><p>Projeto, instalação e acompanhamento para quem quer produzir energia sem transformar a obra em dor de cabeça.</p><div className="hero-actions"><ButtonLink href="#simular">Simular minha economia</ButtonLink><a className="text-link" href={waLink} target="_blank" rel="noopener noreferrer">Falar com um consultor <ArrowRight size={17}/></a></div></Reveal></div><div className="hero-bottom-note"><span>DESCUBRA O POTENCIAL DO SEU TELHADO</span><span>↓</span></div></section>
      <section className="proof-strip"><div className="container proof-grid"><div><Sun/><span><strong>Energia que se renova</strong><small>Uma escolha inteligente para o futuro.</small></span></div><div><ShieldCheck/><span><strong>Projeto sob medida</strong><small>Dimensionado para o seu consumo.</small></span></div><div><MapPin/><span><strong>Perto de você</strong><small>Atendimento em Sarandi e região.</small></span></div></div></section>
      <section id="sobre" className="section about"><div className="container about-grid"><Reveal className="about-visual"><div className="visual-frame"><Image src="/solar-hero.png" alt="Painéis solares em telhado residencial; imagem ilustrativa" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className="visual-stamp"><span>01</span><p>Do primeiro contato<br/>à energia gerada.</p></div></Reveal><Reveal className="about-copy"><span className="eyebrow">SOBRE A ENERGIZAR.SOLAR</span><h2>Energia solar com clareza em cada etapa.</h2><p>Investir em energia solar começa com uma boa conversa. Entendemos o seu consumo, desenhamos uma solução adequada e acompanhamos a jornada até a instalação.</p><p>Atuamos com sistemas fotovoltaicos para residências e empresas em Sarandi e região, unindo projeto, equipamentos e execução em uma experiência simples para você.</p><a className="inline-link" href="#processo">Conheça nosso processo <ArrowUpRight size={18}/></a></Reveal></div></section>
      <section id="solucoes" className="section solutions"><div className="container"><Reveal className="section-heading"><span className="eyebrow">SOLUÇÕES ENERGIZAR.SOLAR</span><div className="heading-row"><h2>O sol trabalha<br/>do seu lado.</h2><p>Para cada espaço e perfil de consumo, um caminho para produzir sua própria energia.</p></div></Reveal><div className="solution-grid"><Reveal className="solution-card featured glass-card"><span className="card-index">01 / RESIDENCIAL</span><House size={42} strokeWidth={1.5}/><div><h3>Sua casa, sua energia.</h3><p>Mais previsibilidade para a rotina da família com um sistema pensado para o seu telhado e consumo.</p><a href="#simular">Simular para minha casa <ArrowUpRight size={17}/></a></div></Reveal><Reveal className="solution-card glass-card"><span className="card-index">02 / EMPRESARIAL</span><Building2 size={42} strokeWidth={1.5}/><div><h3>Mais eficiência para o negócio.</h3><p>Transforme uma despesa recorrente em uma decisão estratégica para a sua empresa.</p><a href="#simular">Simular para empresa <ArrowUpRight size={17}/></a></div></Reveal><Reveal className="solution-card glass-card"><span className="card-index">03 / SUPORTE</span><Wrench size={42} strokeWidth={1.5}/><div><h3>Cuidado que continua.</h3><p>Vistoria e assistência técnica para manter seu sistema trabalhando como deveria.</p><a href={waLink} target="_blank" rel="noopener noreferrer">Pedir orientação <ArrowUpRight size={17}/></a></div></Reveal></div></div></section>
      <section id="processo" className="section process"><div className="container"><Reveal className="process-intro"><span className="eyebrow">COMO FUNCIONA</span><h2>Da primeira conta de luz<br/>à sua própria geração.</h2><p>Você entende cada passo. Nós ajudamos a tirar o projeto do papel.</p></Reveal><div className="steps">{[{n:'01',icon:ClipboardCheck,title:'Simulação',text:'Conte seu consumo e receba uma análise inicial para o seu perfil.'},{n:'02',icon:Zap,title:'Projeto',text:'Definimos a solução e os equipamentos adequados ao seu espaço.'},{n:'03',icon:Wrench,title:'Instalação',text:'A equipe executa a instalação com atenção a cada detalhe.'},{n:'04',icon:Sun,title:'Sua energia',text:'Após as etapas necessárias com a distribuidora, seu sistema começa a gerar.'}].map(s => <Reveal key={s.n} className="step"><div className="step-top"><span>{s.n}</span><s.icon size={25} strokeWidth={1.5}/></div><h3>{s.title}</h3><p>{s.text}</p></Reveal>)}</div></div></section>
      <section id="obras" className="section projects"><div className="container projects-grid"><Reveal><span className="eyebrow">PROJETOS REALIZADOS</span><h2>Projetos de verdade.<br/><em>Resultados para a vida.</em></h2><p>Instalações residenciais e empresariais pedem leitura do espaço, escolha correta dos equipamentos e uma execução cuidadosa. Cada telhado tem uma história e uma solução própria.</p><ButtonLink href="#simular" ghost>Quero avaliar meu projeto</ButtonLink></Reveal><Reveal className="projects-visual glass-media"><Image src="/solar-hero.png" alt="Sistema fotovoltaico residencial; imagem ilustrativa" fill sizes="(max-width: 800px) 100vw, 50vw"/><span>ENERGIA FEITA PARA O SEU ESPAÇO <ArrowUpRight size={18}/></span></Reveal></div></section>
      <section id="faq" className="section faq"><div className="container faq-grid"><Reveal><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Respostas claras para decidir com confiança.</h2><p>Se ainda tiver alguma dúvida, nossa equipe pode orientar você.</p><a className="inline-link" href={waLink} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowUpRight size={18}/></a></Reveal><div className="faq-list">{[{q:'Quanto custa instalar energia solar?',a:'O valor depende do seu consumo, do espaço disponível e dos equipamentos indicados. Uma simulação personalizada é a melhor forma de conhecer o investimento para o seu caso.'},{q:'Em quanto tempo começo a gerar energia?',a:'O prazo varia conforme o projeto, a instalação e as etapas de aprovação junto à distribuidora. A equipe informa uma previsão durante o atendimento.'},{q:'O sistema funciona em dias nublados?',a:'Sim. Os painéis também geram energia com luz difusa, embora a produção seja menor que em dias de sol forte. À noite, sistemas conectados à rede utilizam a energia da distribuidora e os créditos disponíveis.'},{q:'Preciso fazer manutenção?',a:'Os sistemas exigem acompanhamento e cuidados periódicos. A frequência depende das condições do local e das orientações dos fabricantes.'},{q:'É possível financiar o projeto?',a:'Existem linhas de crédito para energia solar. As opções e condições dependem da análise da instituição financeira e do projeto.'}].map((item,i)=><details key={item.q} open={i===0}><summary>{item.q}<ChevronDown size={20}/></summary><p>{item.a}</p></details>)}</div></div></section>
      <section id="simular" className="section cta-section"><div className="container cta-grid"><Reveal className="cta-copy"><span className="eyebrow">SIMULAÇÃO RÁPIDA</span><h2>Tenha uma noção antes da conversa.</h2><p>A conta abaixo usa uma referência simples: até 82% de redução sobre o valor mensal escolhido. A análise real considera consumo, área disponível, sombreamento e padrão de ligação.</p><div className="cta-assurance"><Check size={18}/> Sem formulário <span/> <Check size={18}/> Mensagem pronta no WhatsApp</div></Reveal><Reveal className="savings-panel glass-card"><div className="panel-top"><span><Sun size={22}/></span><div><h3>Quanto vem na sua conta?</h3><p>Escolha o valor mais próximo.</p></div></div><div className="bill-options" role="radiogroup" aria-label="Valor médio da conta de luz">{billOptions.map(option => <label key={option.value} className={bill === option.value ? 'active' : ''}><input type="radio" name="bill" value={option.value} defaultChecked={bill === option.value} /><span>{option.label}</span></label>)}</div><div className="savings-result"><small>Estimativa com base em {Math.round(economyRate * 100)}% de economia</small><strong data-savings-amount>{formatCurrency(economy)}</strong><span data-savings-text>Para uma conta de {formatCurrency(bill)}, isso dá cerca de {formatCurrency(yearly)} em 12 meses.</span></div><p className="calc-note">É uma prévia para começar a conversa. O número final sai depois da avaliação do imóvel.</p><a className="action-card compact" data-savings-link href={simulationWaLink} target="_blank" rel="noopener noreferrer"><span className="action-icon"><MessageCircle size={23}/></span><span><strong>Enviar minha estimativa</strong><small data-savings-hint>WhatsApp já abre com {formatCurrency(bill)} e {formatCurrency(economy)}</small></span><ArrowUpRight size={19}/></a></Reveal></div></section>
    </main>
    <footer className="footer"><div className="container footer-main"><div><Brand light/><p>O futuro da sua energia começa com uma escolha bem feita.</p></div><div><h4>Explore</h4>{nav.map(item=><a key={item.href} href={item.href}>{item.label}</a>)}<a href="#simular">Simular economia</a></div><div><h4>Entre em contato</h4><a href={waLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/> (54) 9650-9618</a><p><MapPin size={16}/> Av. 7 de Setembro, 1115<br/>Centro, Sarandi - RS</p><a href="#simular"><Sun size={16}/> Simulação rápida</a><a href="#processo"><ClipboardCheck size={16}/> Como funciona</a><a href="#faq"><Wrench size={16}/> Dúvidas frequentes</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} energizar.solar. Todos os direitos reservados.</span></div></footer>
    <a className="floating-wa" href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Falar com a energizar.solar pelo WhatsApp"><MessageCircle size={25}/></a>
    <NativeInteractions />
  </>;
}
