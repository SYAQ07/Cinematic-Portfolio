import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from 'react';

import { createRoot } from 'react-dom/client';

import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  
} from 'framer-motion';

import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Play,
  X,
  Menu,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Download,
  Pause,
  Search,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import archive from './data/projects.json';

// -----------------------------------------------------------------------------
// 1. KONFIGURASI GLOBAL & KONTEKS ANIMASI
// -----------------------------------------------------------------------------

const MotionContext = createContext(true);
const EASE = [0.22, 1, 0.36, 1];

// -----------------------------------------------------------------------------
// 2. PETA CLASS SEMANTIK KE UTILITY TAILWIND
//    cx() menggabungkan nama class lama dengan utility Tailwind yang dipetakan.
// -----------------------------------------------------------------------------

const TAILWIND = {
  'media-image':
    'relative isolate block h-full w-full overflow-hidden bg-[#151212]',

  'image-fallback':
    'absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#171111] text-[11px] text-brand-muted',

  display:
    'font-display font-normal leading-[1.02]',

  accent:
    'text-brand-red',

  muted:
    'text-brand-muted',

  eyebrow:
    'text-[11px] font-semibold leading-[1.5] tracking-[.055em]',

  handwriting:
    'font-handwriting text-[clamp(36px,4.2vw,66px)] font-normal leading-[1.15]',

  'section-wrap':
    'mx-auto max-w-[1800px] border-b border-[#292323] px-[clamp(20px,3.8vw,68px)] py-[58px]',

  'reading-progress':
    'fixed inset-x-0 top-0 z-[150] h-[2px] origin-left bg-brand-red',

  'skip-link':
    'fixed left-[15px] top-[6px] z-[200] -translate-y-[150%] bg-brand-ink p-[14px] text-brand-bg focus:translate-y-0',

  'site-header':
    'sticky top-0 z-[70] flex h-[66px] items-center justify-between gap-5 border-b border-[#292323] bg-[#090909f5] px-[clamp(20px,3.8vw,68px)]',

  wordmark:
    'inline-flex min-h-[44px] items-center font-display text-2xl leading-none tracking-[-.4px]',

  'desktop-nav':
    'ml-[7%] flex items-center gap-8',

  'header-actions':
    'flex items-center gap-6',

  'motion-toggle':
    'flex min-h-[44px] items-center gap-[7px] text-[10px] text-brand-muted',

  'header-contact':
    'flex min-h-[44px] items-center gap-3 text-xs',

  'icon-button':
    'inline-flex h-11 w-11 items-center justify-center border border-[#292323] transition-colors duration-200 hover:bg-[#272020]',

  'menu-toggle':
    'hidden w-9 items-center justify-center',

  'mobile-menu':
    'absolute left-0 right-0 top-[55px] hidden flex-col border-b border-[#5d202a] bg-[#100c0c] px-5 pb-5 pt-[10px]',

  hero:
    'relative isolate mx-auto h-[clamp(720px,calc(100svh_-_66px),990px)] max-w-[1800px] overflow-hidden border-b border-[#292323]',

  'hero-top':
    'absolute left-[var(--gutter)] right-[var(--gutter)] top-[23px] z-[4] flex justify-between text-[10px] leading-[1.6]',

  availability:
    'flex h-5 items-center gap-[9px] text-[9px] text-brand-muted',

  'hero-title':
    'absolute left-[calc(var(--gutter)_-_5px)] top-[81px] z-[-1] w-[calc(100%_-_var(--gutter)*2)] whitespace-nowrap text-[clamp(155px,21.15vw,380px)] leading-none tracking-[-.024em] text-[#bd0c22]',

  'hero-portrait':
    'pointer-events-none absolute bottom-px left-[28%] z-[1] h-[91%] w-[49%] origin-bottom',

  'hero-intro':
    'absolute bottom-[115px] left-[var(--gutter)] z-[3] w-[28%]',

  'hero-role':
    'mb-[18px] text-[clamp(15px,1.6vw,25px)] font-extrabold leading-[1.23] tracking-[-.025em] text-brand-red',

  'hero-description':
    'mb-[21px] max-w-[245px] text-xs leading-[1.8] text-[#b9b5b2]',

  'primary-link':
    'inline-flex min-h-[46px] items-center justify-between gap-[30px] bg-brand-red px-[19px] py-[14px] text-xs text-white transition-colors hover:bg-[#bc1a2b]',

  'hero-location':
    'mt-[22px] flex items-center gap-2 text-[8px] text-brand-muted',

  'hero-side':
    'absolute bottom-[120px] right-[var(--gutter)] z-[3] w-[16%]',

  'hero-manifesto':
    'mb-[58px] flex items-center gap-[17px]',

  crosshair:
    'flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border border-[#87212b] text-[34px] text-brand-red',

  'hero-stats':
    'bg-gradient-to-r from-[#090909b8] to-[#090909e8] px-3',

  'hero-bottom':
    'absolute inset-x-[var(--gutter)] bottom-0 z-[5] flex h-[63px] items-center justify-between border-t border-[#292323] bg-gradient-to-t from-[#090909] to-[#09090988] text-[9px]',

  'reel-button':
    'flex min-h-[44px] items-center gap-[13px] text-[9px]',

  'play-circle':
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-red text-brand-ink transition-colors',

  'hero-scroll':
    'flex items-center gap-[18px] text-brand-muted',

  edition:
    'text-[9px] text-brand-muted',

  'section-heading':
    'mb-[22px] flex items-end justify-between gap-7',

  'text-link':
    'inline-flex min-h-[44px] items-center justify-between gap-8 whitespace-nowrap text-[10px] transition-colors hover:text-brand-red',

  'portfolio-toolbar':
    'mb-[25px] flex items-center justify-between gap-5 border-y border-[#292323]',

  filters:
    'flex min-w-0 gap-5 overflow-x-auto [scrollbar-width:none]',

  'filter-line':
    'absolute inset-x-0 bottom-0 h-[2px] bg-brand-red',

  'search-box':
    'flex max-w-[165px] items-center gap-[9px] text-brand-muted',

  'project-grid':
    'relative grid grid-cols-3 gap-x-[22px] gap-y-7',

  'project-card':
    'min-w-0',

  'project-open':
    'relative block aspect-[1.65] w-full overflow-hidden border border-[#292323] bg-[#131010]',

  'project-picture':
    'absolute inset-x-0 -inset-y-3 saturate-[.55] transition-[filter] duration-500',

  'project-type':
    'absolute left-[15px] top-[15px] z-[2] bg-[#090909b3] px-[7px] py-[5px] text-[8px] text-[#ddd]',

  'project-hover':
    'absolute left-1/2 top-1/2 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[#09090977] opacity-0 transition-all',

  'project-frame':
    'pointer-events-none absolute inset-[9px] border border-white/[.07]',

  'project-caption':
    'flex min-h-[78px] w-full items-center gap-[14px] border-b border-[#292323] text-left',

  'project-category':
    'mt-[5px] block text-[9px] uppercase text-brand-muted',

  'brand-heading':
    'flex items-center justify-between gap-5',

  'brand-full-grid':
    'grid grid-cols-4 gap-5',

  'brand-viewport':
    'overflow-x-auto',

  'brand-rail':
    'flex w-max',

  'brand-set':
    'flex shrink-0 items-center',

  portfolio:
    'mx-auto max-w-[1800px]',

  'empty-state':
    'mt-8 flex flex-col items-center justify-center gap-4 text-center',

  'load-more':
    'mt-[30px] flex items-center justify-center gap-5',

  'outline-button':
    'inline-flex min-h-11 items-center justify-center gap-3 border border-[#493438] px-[18px] py-3 text-xs transition-colors hover:border-brand-red',

  recognition:
    'grid grid-cols-[1fr_1.3fr] gap-[58px]',

  'recognition-intro':
    'min-w-0',

  'award-total':
    'my-7 flex w-[260px] items-center justify-between gap-4',

  'recognition-list':
    'min-w-0',

  'recognition-list-head':
    'flex items-center justify-between gap-5 pb-4 text-[9px] text-brand-muted',

  'recognition-row':
    'flex min-h-[89px] items-center gap-[22px] border-t border-[#493137] py-5',

  'award-index':
    'w-5 shrink-0 text-[10px] text-brand-red',

  'award-year':
    'shrink-0 text-[32px] leading-none text-brand-red',

  breakdown:
    'grid grid-cols-[.8fr_1.2fr] items-center gap-[6vw]',

  'breakdown-copy':
    'min-w-0',

  comparison:
    'min-w-0',

  'comparison-stage':
    'relative isolate aspect-video overflow-hidden bg-[#050505]',

  'comparison-final':
    'absolute inset-0',

  'comparison-divider':
    'pointer-events-none absolute inset-y-0 left-[var(--cut)] w-px bg-white',

  'comparison-caption':
    'mt-3 flex justify-between text-[9px] text-brand-muted',

  about:
    'mx-auto max-w-[1800px]',

  'about-lead':
    'mb-[50px] flex items-end justify-between gap-10',

  'studio-grid':
    'grid grid-cols-[1fr_1.1fr_.8fr] gap-10',

  'education-panel':
    'min-w-0',

  'panel-heading':
    'mb-6 border-b border-[#292323] pb-4 text-xs font-bold tracking-[.08em]',

  'education-row':
    'relative border-b border-[#292323] py-4 text-[11px]',

  'skill-tags':
    'flex flex-wrap gap-2',

  'software-row':
    'mt-5 flex items-center gap-4',

  'process-panel':
    'min-w-0',

  'process-list':
    'relative',

  'process-row':
    'relative grid grid-cols-[40px_12px_1fr] items-start gap-4 py-4',

  'process-num':
    'text-xl text-brand-red',

  'process-node':
    'mt-2 h-2 w-2 rounded-full bg-brand-red',

  'quote-panel':
    'relative flex min-w-0 flex-col justify-between border-t border-brand-red p-6',

  journey:
    'mx-auto max-w-[1800px]',

  'journey-grid':
    'grid grid-cols-[1.3fr_1fr] gap-[7vw]',

  'experience-row':
    'border-b border-[#292323]',

  'experience-date':
    'text-[9px] text-brand-muted',

  'experience-place':
    'text-[10px] text-brand-muted',

  'awards-panel':
    'min-w-0 border-l border-[#292323] pl-8',

  'award-list':
    'grid gap-2',

  contact:
    'mx-auto max-w-[1800px]',

  'contact-grid':
    'grid grid-cols-[1.1fr_1fr_.8fr] gap-10',

  'contact-intro':
    'min-w-0',

  'contact-links':
    'flex flex-col gap-3',

  'contact-reel':
    'min-w-0',

  'contact-cta':
    'inline-flex items-center gap-4',

  'round-arrow':
    'flex h-11 w-11 items-center justify-center rounded-full border border-brand-red',

  'project-brief':
    'mt-10 border-y border-[#292323]',

  'brief-message':
    'col-span-full',

  'solid-button':
    'inline-flex min-h-[46px] w-fit items-center justify-center gap-6 bg-brand-red px-5 py-[14px] text-xs text-white',

  'form-note':
    'text-[10px] text-brand-muted',

  'dialog-backdrop':
    'fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/90 p-7',

  'project-dialog':
    'max-h-[calc(100dvh_-_56px)] w-full max-w-[1040px] overflow-y-auto border border-[#463236] bg-[#101010]',

  'dialog-heading':
    'flex items-center justify-between border-b border-[#292323] px-5 py-3',

  'dialog-media':
    'relative aspect-video min-w-0 isolate bg-[#050505]',

  'media-loading':
    'absolute inset-0 z-[1] flex flex-col items-center justify-center gap-[14px] p-[25px] text-center text-xs text-brand-muted',

  'render-controls':
    'flex items-center justify-between gap-[10px] border-y border-[#292323] px-5 py-3',

  'shot-controls':
    'flex items-center gap-3',

  'dialog-description':
    'flex items-start justify-between gap-[30px] p-6',

  'embed-note':
    'px-6 pb-[22px] text-[10px] text-brand-muted',

  footer:
    'mx-auto flex max-w-[1800px] items-center justify-between gap-[18px] border-t border-[#292323] px-[clamp(20px,3.8vw,68px)] py-[23px]',

  active:
    'text-brand-ink',

  selected:
    'text-brand-ink',

  'additional-award':
    'max-[600px]:hidden',

  'awards-expanded':
    'max-[600px]:[&_.additional-award]:flex',

  'is-open':
    'border-brand-red',

  still:
    'max-h-[60dvh]',

  paused:
    'animate-none',
};

// Helper className: pertahankan class semantik dan tambahkan utility Tailwind.
function cx(value = '') {
  const original = String(value).trim();

  const utilities = original
    .split(/\s+/)
    .flatMap((token) => (TAILWIND[token] ? [TAILWIND[token]] : []));

  return [...new Set([original, ...utilities])]
    .filter(Boolean)
    .join(' ');
}

// -----------------------------------------------------------------------------
// 3. DATA PORTFOLIO
// -----------------------------------------------------------------------------

const categories = ['Semua', '3D', 'Commercial', 'Visual', 'Websites'];
// -----------------------------------------------------------------------------
// DATA: BRAND LOGOS
// -----------------------------------------------------------------------------

const brandLogos = [
  {
    file: 'hk-transparent.png',
    name: 'HK',
  },

  // Tambahkan logo berikutnya di sini.
];

const featured = archive.slice(0, 3);

const experiences = [
  {
    date: '2026 · SEKARANG',
    title: 'Freelance Creative',
    place: 'Film & branded content',
    text: 'Mengembangkan konsep dan naskah film pendek, serta memproduksi konten sinematik untuk brand café, fashion, dan hijab. Dari storytelling sampai penyelesaian visual.',
  },
  {
    date: '2023 – 2025',
    title: 'VFX Artist',
    place: 'Film & commercial production',
    text: 'Compositing, CGI, matchmove, rotoscoping, dan breakdown editing. Terlibat dalam supervisi pengambilan gambar untuk kebutuhan post-production.',
  },
  {
    date: '2023 · 6 BULAN',
    title: 'VFX Internship',
    place: 'Dalang Digital Studio',
    text: 'Terlibat dalam produksi film dan iklan, mempelajari pipeline studio, serta berkolaborasi dalam workflow visual effects dan animasi.',
  },
  {
    date: '2022 – 2023',
    title: 'Freelance Editor',
    place: 'Video, photography & film',
    text: 'Menyunting video review hotel untuk YouTube, memotret pernikahan, dan berkolaborasi dalam film pendek sebagai editor dan aktor.',
  },
  {
    date: '2018 · SEKARANG',
    title: 'Content Creator',
    place: 'DuingZ Studio',
    text: 'Membuat konten gaming, coding, film pendek, dan eksperimen VFX. Tempat saya mencoba ide dan terus mengembangkan cara bercerita.',
  },
];

const certificates = [
  {
    title: 'Juara 1 Movie Event',
    year: '2025',
    image: './Asset/img/SERTIFIKAT/shortmovie.jpeg',
  },
  {
    title: 'Lulusan Terbaik 2',
    year: '2024',
    image: './Asset/img/SERTIFIKAT/juara2.jpg',
  },
  {
    title: 'Dalang Digital Studio',
    year: '2023',
    image: './Asset/img/SERTIFIKAT/dalang.jpg',
  },
  {
    title: 'Videolabs E-Course',
    year: '2024',
    image: './Asset/img/SERTIFIKAT/videolabs.jpg',
  },
];

const awards = [
  { year: '2025', title: '1st Place', event: 'Indramayu Film Festival' },
  { year: '2024', title: 'Best Competency Exam', event: 'Animation Program' },
  { year: '2023', title: 'Best Short Film', event: 'Golkar Party' },
  { year: '2022', title: '1st Place, Short Film', event: 'Hero Theme' },
  { year: '2021', title: '1st Place, Short Film', event: 'Hero Theme' },
  { year: '2020', title: 'Best Creative Video', event: 'Creative Video Competition' },
];

// -----------------------------------------------------------------------------
// 4. KOMPONEN BERSAMA
// -----------------------------------------------------------------------------

// Reveal: animasi elemen ketika masuk ke area viewport.
function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as];

  return (
    <Component
      className={cx(className)}
      initial={enabled ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        duration: enabled ? 0.75 : 0,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </Component>
  );
}

// MediaImage: menampilkan gambar dan fallback jika gambar gagal dimuat.
function MediaImage({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}) {
  const [state, setState] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;

    // Gambar yang sudah tersimpan di cache bisa selesai dimuat lebih awal.
    setState(
      img?.complete
        ? img.naturalWidth
          ? 'loaded'
          : 'error'
        : 'loading',
    );
  }, [src]);

  return (
    <span className={cx(`media-image ${state} ${className}`)}>
      {state === 'error' && (
        <span className={cx('image-fallback')}>
          <span className={cx('display')}>R.</span>
          <span>Pratinjau tidak tersedia</span>
        </span>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        width="960"
        height="600"
        onLoad={() => setState('loaded')}
        onError={(event) => {
          if (event.currentTarget.src.includes('maxresdefault.jpg')) {
            event.currentTarget.src = event.currentTarget.src.replace(
              'maxresdefault.jpg',
              'hqdefault.jpg',
            );
          } else {
            setState('error');
          }
        }}
        {...props}
      />
    </span>
  );
}

// Magnetic: memberikan efek tombol bergerak mengikuti pointer.
function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });

  return (
    <motion.a
      className={cx(className)}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== 'mouse') return;

        const rect = event.currentTarget.getBoundingClientRect();

        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// -----------------------------------------------------------------------------
// 5. HEADER & NAVIGASI
// -----------------------------------------------------------------------------

function Header({ enabled, onToggle }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // Menentukan section yang sedang terlihat untuk navigasi aktif.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -65% 0px' },
    );

    document
      .querySelectorAll('main > section[id]')
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Tombol Escape menutup menu mobile.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navigation = [
    ['portfolio', 'Karya'],
    ['about', 'Tentang'],
    ['contact', 'Kontak'],
  ];

  const mobileNavigation = [
    ['home', 'Beranda'],
    ...navigation,
  ];

  return (
    <header className={cx('site-header')}>
      <a className={cx('wordmark')} href="#home" aria-label="Renando, beranda">
        IRSYAD<span>®</span>
      </a>

      <nav className={cx('desktop-nav')} aria-label="Navigasi utama">
        {navigation.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={cx(active === id ? 'active' : '')}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className={cx('header-actions')}>
        <button
          className={cx('motion-toggle')}
          onClick={onToggle}
          aria-label={enabled ? 'Jeda animasi' : 'Aktifkan animasi'}
          aria-pressed={!enabled}
        >
          {enabled ? <Pause size={13} /> : <Play size={13} />}
          <span>Motion {enabled ? 'on' : 'off'}</span>
        </button>

        <a className={cx('header-contact')} href="#contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>

        <button
          className={cx('menu-toggle icon-button')}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className={cx('mobile-menu')}
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {mobileNavigation.map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// -----------------------------------------------------------------------------
// 6. SECTION: HERO / BERANDA
// -----------------------------------------------------------------------------

function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <section
      id="home"
      className={cx('hero')}
      ref={ref}
    >
      <div className={cx('hero-top')}>
        <span>
          EDITOR / VFX ARTIST
          <br />
          <span className={cx('muted')}>VISUAL STORYTELLER</span>
        </span>

        <span className={cx('availability')}>
          <i />
          AVAILABLE FOR COLLABORATION
        </span>
      </div>

      <motion.div
        className={cx('hero-title display')}
        aria-hidden="true"
        style={enabled ? { y: titleY } : {}}
        initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        PORTFOLIO
      </motion.div>
{/* HERO PORTRAIT — SLIDE UP ANIMATION */}
<motion.div
  className={cx('hero-portrait')}
  style={enabled ? { y: portraitY, scale: portraitScale } : {}}
>
  <motion.div
    className="hero-portrait-image"
    initial={enabled ? { y: '100%' } : false}
    animate={{ y: 0 }}
    transition={{
      duration: 1.2,
      delay: 0.2,
      ease: EASE,
    }}
  >
    <img
      className="hero-portrait-base"
      src="./Asset/img/renando-portrait.png"
      alt="Foto contoh dari template portfolio"
      width="1024"
      height="1536"
      fetchPriority="high"
    />
  </motion.div>
</motion.div>

      <motion.div
        className={cx('hero-intro')}
        style={enabled ? { y: copyY } : {}}
        initial={enabled ? { opacity: 0, x: -35 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      >
        <p className={cx('handwriting')}>Hello, I’m</p>

        <h1 className={cx('display')}>
          IRSYAD<span>.</span>
        </h1>

       <p className={cx('hero-role')}>
  CREATIVE
  <br />
  EXPLORER
</p>

        <p className={cx('hero-description')}>
          Merangkai cerita. Menciptakan realita.
          <br />
          Saya mengubah ide menjadi visual yang terasa, dari frame pertama
          hingga terakhir.
        </p>

        <Magnetic href="#portfolio" className={cx('primary-link')}>
          Lihat karya saya <ArrowDown size={17} />
        </Magnetic>

        <span className={cx('hero-location')}>
          <MapPin size={12} />
          BONTANG, INDONESIA
        </span>
      </motion.div>

      <motion.div
        className={cx('hero-side')}
        initial={enabled ? { opacity: 0, x: 30 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.55, ease: EASE }}
      >
        <div className={cx('hero-manifesto')}>
          <span className={cx('crosshair')} aria-hidden="true">
            ✳
          </span>
          <p>
            Every frame.
            <br />
            A different feeling.
          </p>
        </div>

              {/* CREATIVE HIGHLIGHTS */}
        <div className={cx('hero-stats')}>
          <div>
            <span className={cx('display')}>WEB</span>
            <p>WEB DEVELOPMENT</p>
          </div>

          <div>
            <span className={cx('display')}>UX</span>
            <p>UI/UX & DESIGN</p>
          </div>

          <div>
            <span className={cx('display')}>3D</span>
            <p>3D EXPLORATION</p>
          </div>
        </div>
      </motion.div> {/* penutup hero-side */}

    </section>
  );
}      

// -----------------------------------------------------------------------------
// 7. KOMPONEN KARTU KARYA
// -----------------------------------------------------------------------------

function ProjectCard({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const video = ['youtube', 'drive'].includes(project.type);

  return (
    <motion.article
      ref={ref}
      className={cx('project-card')}
      layout
      initial={enabled ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{
        duration: enabled ? 0.6 : 0,
        delay: (index % 3) * 0.06,
        ease: EASE,
      }}
      exit={{ opacity: 0, scale: 0.96 }}
    >
      <button
        className={cx('project-open')}
        onClick={() => onOpen(project)}
        aria-label={`Lihat ${project.title}`}
      >
        <motion.div
          className={cx('project-picture')}
          style={enabled ? { y } : {}}
        >
          <MediaImage src={project.image} alt={project.title} />
        </motion.div>

        <span className={cx('project-type')}>
          {project.type === 'render'
            ? '3D BREAKDOWN'
            : video
              ? 'FILM / VIDEO'
              : project.type === 'website'
                ? 'WEBSITE'
                : 'STILL / IMAGE'}
        </span>

        <span className={cx('project-hover')}>
          {video ? (
            <Play fill="currentColor" size={18} />
          ) : (
            <ArrowUpRight size={22} />
          )}
        </span>

        <span className={cx('project-frame')} aria-hidden="true" />
      </button>

      <button
        className={cx('project-caption')}
        onClick={() => onOpen(project)}
      >
        <span className={cx('project-number display')}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <span>
          <h3>{project.title}</h3>
          <span className={cx('project-category')}>
            {project.category}
            {project.year ? ` / ${project.year}` : ''}
          </span>
        </span>

        <ArrowUpRight size={20} />
      </button>
    </motion.article>
  );
}

// -----------------------------------------------------------------------------
// 8. SECTION: BRAND STRIP / LOGO KOLABORATOR
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// SECTION: BRAND / HK LOGO
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// SECTION: BRAND / LOGO SHOWCASE
// -----------------------------------------------------------------------------

function BrandStrip() {
  return (
    <Reveal className={cx('brand-section')}>

      {/* HEADING */}
      <div className={cx('brand-heading')}>
        <p>
          BEEN PART OF
          <br />
          <strong>THE BIGGER PICTURE.</strong>
        </p>
      </div>

      {/* LOGO COLLECTION */}
      <div className="flex flex-wrap items-center justify-center gap-8 py-8">

        {brandLogos.map((brand) => (
          <div
            key={brand.file}
            className="flex h-[120px] w-[200px] items-center justify-center"
          >
            <img
              src={`./Asset/svg/brand/${brand.file}`}
              alt={brand.name}
              title={brand.name}
              width="180"
              height="100"
              loading="lazy"
              draggable="false"
              className="h-[100px] w-[180px] object-contain"
              style={{
                filter: 'none',
                opacity: 1,
              }}
            />
          </div>
        ))}

      </div>
    </Reveal>
  );
}
// -----------------------------------------------------------------------------
// 9. SECTION: PORTFOLIO / KARYA
// -----------------------------------------------------------------------------

function Portfolio({ onProject }) {
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);

  // Filter karya berdasarkan kategori dan kata pencarian.
  const results = archive.filter(
    (project) =>
      (category === 'Semua' || project.category === category) &&
      `${project.title} ${project.category} ${project.role}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  const projects =
    expanded || category !== 'Semua' || query
      ? results.slice(0, limit)
      : featured;

  return (
    <section id="portfolio" className={cx('portfolio section-wrap')}>
      <Reveal className={cx('section-heading')}>
        <div>
          <span className={cx('eyebrow')}>01 / SELECTED WORK</span>
          <h2>
            KARYA YANG BICARA
            <span className={cx('accent')}>.</span>
          </h2>
        </div>

        <button
          className={cx('text-link')}
          onClick={() => {
            if (expanded) {
              setExpanded(false);
              setCategory('Semua');
              setQuery('');
            } else {
              setExpanded(true);
              setLimit(9);
            }
          }}
        >
          {expanded ? 'KARYA PILIHAN' : 'SEMUA KARYA'}
          <ArrowRight size={21} />
        </button>
      </Reveal>

      <Reveal className={cx('portfolio-toolbar')}>
        <div className={cx('filters')} role="group" aria-label="Kategori karya">
          {categories.map((item) => (
            <button
              key={item}
              className={cx(category === item ? 'selected' : '')}
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setExpanded(true);
                setLimit(9);
              }}
            >
              {item}

              {item === category && (
                <motion.span
                  className={cx('filter-line')}
                  layoutId="filter-line"
                />
              )}
            </button>
          ))}
        </div>

        <label className={cx('search-box')}>
          <Search size={15} />
          <span>Cari</span>

          <input
            aria-label="Cari karya"
            type="search"
            placeholder="Judul atau kategori…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setExpanded(true);
              setLimit(9);
            }}
          />
        </label>
      </Reveal>

      <motion.div className={cx('project-grid')} layout>
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.category + project.title + project.media}
              project={project}
              index={index}
              onOpen={onProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {projects.length === 0 && (
        <div className={cx('empty-state')}>
          <p>Tidak ada karya untuk “{query}”.</p>

          <button
            className={cx('text-link')}
            onClick={() => {
              setQuery('');
              setCategory('Semua');
            }}
          >
            Reset pencarian <X size={15} />
          </button>
        </div>
      )}

      {expanded && results.length > limit && (
        <div className={cx('load-more')}>
          <button
            className={cx('outline-button')}
            onClick={() => setLimit((value) => value + 9)}
          >
            Tampilkan karya lainnya <Plus size={16} />
          </button>

          <span>
            {projects.length} dari {results.length} karya
          </span>
        </div>
      )}

      <BrandStrip />
    </section>
  );
}

// -----------------------------------------------------------------------------
// 10. DATA ALUR PROSES KREATIF
// -----------------------------------------------------------------------------

const processSteps = [
  [
    '01',
    'THE IDEA',
    'Mendengar cerita Anda. Menentukan pesan, arah visual, dan rasa yang ingin dibawa.',
  ],
  [
    '02',
    'THE PLAN',
    'Mengembangkan konsep, referensi, dan alur kerja yang sesuai dengan kebutuhan produksi.',
  ],
  [
    '03',
    'THE CRAFT',
    'Editing, compositing, dan visual effects. Membentuk setiap detail menjadi satu cerita.',
  ],
  [
    '04',
    'THE POLISH',
    'Menyatukan warna, ritme, dan suara. Memastikan setiap frame bekerja sebagaimana mestinya.',
  ],
  [
    '05',
    'THE FINAL FRAME',
    'Review bersama, sentuhan terakhir, lalu hasil yang siap menemui penontonnya.',
  ],
];

// -----------------------------------------------------------------------------
// 11. SECTION: AWARDS / PENGHARGAAN
// -----------------------------------------------------------------------------

function Awards({ onProject }) {
  const [expanded, setExpanded] = useState(false);

  const laurelPath =
    'M48 94C8 68 9 30 35 5M22 61C8 60 3 49 3 44c12 0 19 6 19 17zm-5-19C5 35 6 23 8 19c11 5 13 14 9 23zm7-20C15 12 20 3 24 0c7 8 6 16 0 22zM31 79C17 79 8 70 7 64c13-2 22 4 24 15zm-3-18c-5-10-2-19 7-25 5 11 1 20-7 25zm10 24c-6-11-4-20 5-27 6 9 5 20-5 27z';

  return (
    <section
      id="awards"
      className={cx(
        `recognition section-wrap ${expanded ? 'awards-expanded' : ''}`,
      )}
    >
      <Reveal className={cx('recognition-intro')}>
        <span className={cx('eyebrow')}>RECOGNITION & AWARDS</span>

        <h2 className={cx('display')}>
          THE WORK.
          <br />
          <span className={cx('accent')}>THE RECOGNITION.</span>
        </h2>

        <div className={cx('award-total')}>
          <svg viewBox="0 0 60 100" aria-hidden="true">
            <path d={laurelPath} fill="currentColor" />
          </svg>

          <span className={cx('display')}>
            10<span>+</span>
          </span>

          <svg viewBox="0 0 60 100" aria-hidden="true">
            <g transform="translate(60 0) scale(-1 1)">
              <path d={laurelPath} fill="currentColor" />
            </g>
          </svg>

          <span className={cx('award-total-label')}>AWARDS WON</span>
        </div>

        <p>
          Cerita yang dibuat dengan sepenuh hati.
          <br />
          Penghargaan yang jadi alasan untuk terus berkarya.
        </p>

        <button
          className={cx('text-link award-proof')}
          onClick={() =>
            onProject({
              ...certificates[0],
              type: 'image',
              media: certificates[0].image,
              category: 'Award',
              description: 'Juara 1 Movie Event, 2025.',
            })
          }
        >
          LIHAT SERTIFIKAT <ArrowUpRight size={18} />
        </button>
      </Reveal>

      <div className={cx('recognition-list')}>
        <div className={cx('recognition-list-head')}>
          <span>SELECTED RECOGNITION</span>
          <span>2020 – 2025</span>
        </div>

        <ol id="recognition-list">
          {awards.map((award, index) => (
            <Reveal
              as="li"
              className={cx(
                `recognition-row ${index > 2 ? 'additional-award' : ''}`,
              )}
              key={award.year}
              delay={index * 0.045}
            >
              <span className={cx('award-index')}>
                0{index + 1}
              </span>

              <div>
                <h3>{award.title}</h3>
                <p>{award.event}</p>
              </div>

              <span className={cx('award-year display')}>
                {award.year}
              </span>
            </Reveal>
          ))}
        </ol>

        <button
          className={cx('award-expand')}
          aria-expanded={expanded}
          aria-controls="recognition-list"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Ringkas penghargaan' : 'Lihat penghargaan lainnya'}
          {expanded ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 12. SECTION: BREAKDOWN 3D
// -----------------------------------------------------------------------------

function Breakdown() {
  const scene = featured.find((project) => project.type === 'render');
  const ref = useRef(null);
  const enabled = useContext(MotionContext);

  const [manual, setManual] = useState(false);
  const [cut, setCut] = useState(65);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!manual && enabled) {
      setCut(Math.round(90 - value * 80));
    }
  });

  const titleX = useTransform(scrollYProgress, [0, 1], [30, -30]);

  if (!scene) return null;

  const resize = (url) =>
    url.replace('/upload/', '/upload/c_scale,w_1200,q_auto,f_auto/');

  return (
    <section
      className={cx('breakdown section-wrap')}
      ref={ref}
      aria-labelledby="breakdown-title"
    >
      <Reveal className={cx('breakdown-copy')}>
        <span className={cx('eyebrow')}>A LOOK UNDER THE SURFACE</span>

        <motion.h2
          id="breakdown-title"
          className={cx('display')}
          style={enabled ? { x: titleX } : {}}
        >
          FROM RAW.
          <br />
          <span className={cx('accent')}>TO REAL.</span>
        </motion.h2>

        <p>
          Satu scene. Berlapis proses.
          <br />
          Lihat bagaimana sebuah 3D environment berubah dari bentuk dasar
          menjadi dunia yang hidup.
        </p>

        <span className={cx('breakdown-credit')}>
          CYBERPUNK ENVIRONMENT / 2025
          <br />
          3D ARTIST · LIGHTING · RENDERING
        </span>
      </Reveal>

      <Reveal className={cx('comparison')}>
        <div
          className={cx('comparison-stage')}
          style={{
            '--cut': `${enabled || manual ? cut : 50}%`,
          }}
        >
          <MediaImage
            src={resize(scene.renders[0].solid)}
            alt="Cyberpunk environment sebelum material dan pencahayaan"
          />

          <div className={cx('comparison-final')}>
            <MediaImage
              src={resize(scene.renders[0].final)}
              alt="Cyberpunk environment hasil render akhir"
            />
          </div>

          <span className={cx('comparison-label raw-label')}>
            SOLID VIEW
          </span>

          <span className={cx('comparison-label final-label')}>
            FINAL RENDER
          </span>

          <div className={cx('comparison-divider')}>
            <span>
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
            </span>
          </div>

          <input
            aria-label="Perbandingan sebelum dan sesudah render"
            aria-valuetext={`${cut}% solid, ${100 - cut}% final render`}
            type="range"
            min="0"
            max="100"
            value={cut}
            onChange={(event) => {
              setManual(true);
              setCut(Number(event.target.value));
            }}
          />
        </div>

        <div className={cx('comparison-caption')}>
          <span>GESER UNTUK MELIHAT PROSESNYA</span>
          <span>DRAG / SCROLL</span>
        </div>
      </Reveal>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 13. SECTION: ABOUT / TENTANG
// -----------------------------------------------------------------------------

function About() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 75%'],
  });

  return (
    <section
      id="about"
      className={cx('about section-wrap')}
      ref={ref}
    >
      <Reveal className={cx('about-lead')}>
        <div>
          <span className={cx('eyebrow')}>02 / BEHIND THE FRAMES</span>

          <h2 className={cx('display')}>
            BUKAN SEKADAR VISUAL.
            <br />
            TAPI CARA <span className={cx('accent')}>BERCERITA.</span>
          </h2>
        </div>

        <p>
          Saya Irsyad, visual artist dari Bontang. Saya bekerja di antara
          film, VFX, CGI, dan post-production, menggabungkan sisi kreatif
          dan teknis untuk membangun cerita yang punya rasa.
        </p>
      </Reveal>

      <div className={cx('studio-grid')}>
        {/* EDUCATION & SKILLS */}
        <Reveal className={cx('education-panel')}>
          <h3 className={cx('panel-heading')}>EDUCATION & SKILLS</h3>

          <p className={cx('eyebrow accent')}>PENDIDIKAN</p>

          <div className={cx('education-row')}>
            <strong>PP Hubbul Khoir</strong>
            <span>Animasi</span>
            <p>Animation, visual effects, CGI & digital media.</p>
          </div>

          <div className={cx('education-row')}>
            <strong>Dalang Digital Studio</strong>
            <span>2023</span>
            <p>6-month VFX & post-production internship.</p>
          </div>

          <div className={cx('education-row')}>
            <strong>Courses & Workshops</strong>
            <p>Videolabs · RifqiArt · Mindplace</p>
          </div>

          <p className={cx('eyebrow accent skills-heading')}>
            CREATIVE TOOLKIT
          </p>

          <div className={cx('skill-tags')}>
            {[
              'VFX & CGI',
              'Compositing',
              '3D Environment',
              'Video Editing',
              'Color Grading',
              'Storytelling',
              'Photography',
              'Web Development',
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>

          <div className={cx('software-row')}>
            {[
              ['pr', 'Premiere Pro'],
              ['ae', 'After Effects'],
              ['bl', 'Blender'],
              ['ps', 'Photoshop'],
              ['lr', 'Lightroom'],
              ['cc', 'CapCut'],
            ].map(([file, name]) => (
              <img
                key={file}
                src={`./Asset/svg/${file}.svg`}
                alt={name}
                title={name}
                loading="lazy"
                width="28"
                height="28"
              />
            ))}
          </div>
        </Reveal>

        {/* CREATIVE PROCESS */}
        <div className={cx('process-panel')}>
          <Reveal>
            <h3 className={cx('panel-heading')}>
              FROM IDEA TO FINAL FRAME
            </h3>
          </Reveal>

          <div className={cx('process-list')}>
            <div className={cx('process-track')}>
              <motion.div
                style={{
                  scaleY: enabled ? scrollYProgress : 1,
                }}
              />
            </div>

            {processSteps.map(([num, title, text], index) => (
              <Reveal
                key={num}
                className={cx('process-row')}
                delay={index * 0.035}
              >
                <span className={cx('process-num display')}>
                  {num}
                </span>

                <span className={cx('process-node')} />

                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* QUOTE */}
        <Reveal className={cx('quote-panel')}>
          <span className={cx('quote-mark display')}>“</span>

          <blockquote>
            Dari konsep
            <br />
            dan storytelling,
            <br />
            <em>
              sampai visual
              <br />
              yang sinematik.
            </em>
          </blockquote>

          <span className={cx('handwriting')}>Irsyad.</span>

          <div className={cx('quote-bottom')}>
            LET’S MAKE
            <br />
            THE NEXT FRAME COUNT.
            <span className={cx('quote-symbol')} aria-hidden="true">
              ✳
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 14. SECTION: JOURNEY / PERJALANAN
// -----------------------------------------------------------------------------

function Journey({ onProject }) {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="experience"
      className={cx('journey section-wrap')}
    >
      <Reveal className={cx('section-heading')}>
        <div>
          <span className={cx('eyebrow')}>03 / THE JOURNEY</span>

          <h2>
            TERUS BERGERAK. TERUS BERKARYA
            <span className={cx('accent')}>.</span>
          </h2>
        </div>

        <a
          className={cx('text-link')}
          href="./Asset/cv/Renando_Editor_VFX.pdf.pdf"
          download
        >
          RESUME <Download size={16} />
        </a>
      </Reveal>

      <div className={cx('journey-grid')}>
        {/* EXPERIENCE LIST */}
        <div className={cx('experience-list')}>
          {experiences.map((job, index) => (
            <Reveal
              className={cx(
                `experience-row ${open === index ? 'is-open' : ''}`,
              )}
              key={job.title}
            >
              <button
                aria-expanded={open === index}
                aria-controls={`job-${index}`}
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >
                <span className={cx('experience-date')}>
                  {job.date}
                </span>

                <span>
                  <h3>{job.title}</h3>
                  <span className={cx('experience-place')}>
                    {job.place}
                  </span>
                </span>

                {open === index ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </button>

              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    id={`job-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: EASE,
                    }}
                  >
                    <p>{job.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>

        {/* MILESTONES & CERTIFICATES */}
        <Reveal className={cx('awards-panel')}>
          <p className={cx('eyebrow')}>A FEW MILESTONES</p>

          <h3 className={cx('display')}>
            LITTLE WINS.
            <br />
            <span className={cx('accent')}>BIG MEANING.</span>
          </h3>

          <div className={cx('award-list')}>
            {certificates.map((cert, index) => (
              <button
                key={cert.title}
                onClick={() =>
                  onProject({
                    ...cert,
                    type: 'image',
                    media: cert.image,
                    category: 'Certificate',
                    description:
                      'Sertifikat dan penghargaan dari arsip Renando.',
                  })
                }
              >
                <span>{String(index + 1).padStart(2, '0')}</span>

                <span>
                  {cert.title}
                  <small>{cert.year}</small>
                </span>

                <ArrowUpRight size={19} />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 15. SECTION: CONTACT / KONTAK
// -----------------------------------------------------------------------------

function Contact({ onProject }) {
  const [sent, setSent] = useState(false);

  const send = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const text = `Halo Irsyad, saya ${data.get('name')}.

Jenis proyek: ${data.get('type')}
${data.get('message')}`;

    window.open(
      `https://wa.me/6287786923444?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );

    setSent(true);
  };

  return (
    <section
      id="contact"
      className={cx('contact section-wrap')}
    >
      <div className={cx('contact-grid')}>
        {/* CONTACT INTRO */}
        <Reveal className={cx('contact-intro')}>
          <span className={cx('eyebrow')}>04 / YOUR NEXT STORY</span>

          <h2 className={cx('display')}>
            LET’S WORK
            <br />
            TOGETHER<span className={cx('accent')}>.</span>
          </h2>

          <p>
            Punya cerita yang ingin diwujudkan?
            <br />
            Mari buat sesuatu yang layak ditonton.
          </p>

          <Magnetic
            href="https://wa.me/6287786923444"
            target="_blank"
            rel="noopener noreferrer"
            className={cx('contact-cta')}
          >
            <span className={cx('round-arrow')}>
              <ArrowUpRight size={21} />
            </span>
            MULAI PERCAKAPAN
          </Magnetic>
        </Reveal>

        {/* CONTACT LINKS */}
        <Reveal className={cx('contact-links')} delay={0.1}>
          <a href="mailto:IrsyadSyafiq2012@gmail.com">
            <Mail />
            <span>
              <small>EMAIL</small>
              IrsyadSyafiq2012@Gmail.com
            </span>
            <ArrowUpRight size={16} />
          </a>

          <a
            href="https://www.instagram.com/Punumbra_RAK/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
            <span>
              <small>INSTAGRAM</small>
              @Punumbra_RAK
            </span>
            <ArrowUpRight size={16} />
          </a>

          <a href="tel:+62 822-5460-9803">
            <Phone />
            <span>
              <small>PHONE / WHATSAPP</small>
              +62 822-5460-9803
            </span>
            <ArrowUpRight size={16} />
          </a>

          <div>
            <MapPin />
            <span>
              <small>BASED IN</small>
              Bontang, Indonesia
            </span>
          </div>
        </Reveal>

       
      </div>

      {/* PROJECT BRIEF FORM */}
      <Reveal>
        <details className={cx('project-brief')}>
          <summary>
            Ceritakan proyek Anda <Plus size={19} />
          </summary>

          <form onSubmit={send}>
            <label>
              Nama Anda
              <input
                name="name"
                required
                placeholder="Nama atau brand"
                autoComplete="name"
                maxLength="100"
              />
            </label>

            <label>
              Jenis proyek
              <select name="type">
                <option>Film & Video Editing</option>
                <option>VFX & CGI</option>
                <option>3D & Compositing</option>
                <option>Commercial Content</option>
                <option>Photography</option>
                <option>Website</option>
                <option>Kolaborasi lainnya</option>
              </select>
            </label>

            <label className={cx('brief-message')}>
              Tentang proyek
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Ceritakan ide, kebutuhan, dan perkiraan waktunya…"
                maxLength="3000"
              />
            </label>

            <button className={cx('solid-button')} type="submit">
              Lanjut ke WhatsApp <ArrowUpRight size={18} />
            </button>

            <p className={cx('form-note')} role="status">
              {sent
                ? 'Draft pesan siap di WhatsApp. Tekan Kirim di sana untuk memulai percakapan.'
                : 'Brief akan dibuka sebagai draft pesan di WhatsApp.'}
            </p>
          </form>
        </details>
      </Reveal>
    </section>
  );
}

// -----------------------------------------------------------------------------
// 16. KOMPONEN MODAL DETAIL PROYEK
// -----------------------------------------------------------------------------

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);

  const [renderMode, setRenderMode] = useState('final');
  const [shot, setShot] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [retried, setRetried] = useState(0);

  const enabled = useContext(MotionContext);

  const activeShot =
    project.type === 'render'
      ? project.renders[shot]
      : null;

  const embedType = activeShot?.video
    ? 'youtube'
    : activeShot?.drive
      ? 'drive'
      : project.type;

  const embedMedia =
    activeShot?.video ||
    activeShot?.drive?.match(/\/d\/([^/]+)/)?.[1] ||
    project.media;

  const isVideo = ['youtube', 'drive'].includes(embedType);

  const availableModes = [
    ['layout', 'Layout'],
    ['solid', 'Solid'],
    ['material', 'Material'],
    ['lighting', 'Lighting'],
    ['final', 'Final render'],
  ].filter(
    ([mode]) =>
      activeShot?.[mode] &&
      !(mode === 'solid' && activeShot.hideSolidMode),
  );

  const effectiveMode = activeShot?.[renderMode]
    ? renderMode
    : availableModes[0]?.[0];

  const rendered =
    activeShot?.[effectiveMode] ||
    activeShot?.image ||
    project.image;

  const sourceUrl =
    embedType === 'youtube'
      ? `https://www.youtube.com/watch?v=${embedMedia}`
      : embedType === 'drive'
        ? `https://drive.google.com/file/d/${embedMedia}/view`
        : project.type === 'render'
          ? rendered
          : project.media || project.image;

  const changeShot = (next) => {
    setMediaLoaded(false);
    setMediaFailed(false);
    setShot(next);
  };

  // Mengatur fokus keyboard dan mencegah halaman di belakang modal ikut scroll.
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    ref.current?.focus();

    const listener = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        const nodes = [
          ...ref.current.querySelectorAll(
            'button, a[href], input, select, textarea, iframe',
          ),
        ].filter(
          (node) => !node.disabled && node.getClientRects().length,
        );

        const first = nodes[0];
        const last = nodes.at(-1);

        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', listener);

    return () => {
      document.body.style.overflow = old;
      window.removeEventListener('keydown', listener);
      previous?.focus();
    };
  }, [onClose]);

  // Menampilkan pesan jika video terlalu lama dimuat.
  useEffect(() => {
    if (!isVideo) return;

    const timer = setTimeout(() => {
      if (!mediaLoaded) {
        setMediaFailed(true);
      }
    }, 14000);

    return () => clearTimeout(timer);
  }, [mediaLoaded, retried, isVideo, embedMedia]);

  return (
    <motion.div
      className={cx('dialog-backdrop')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={ref}
        className={cx('project-dialog')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex="-1"
        initial={enabled ? { y: 45, scale: 0.97 } : false}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className={cx('dialog-heading')}>
          <span className={cx('eyebrow')}>
            {project.category}
            {project.year && ` / ${project.year}`}
          </span>

          <button
            onClick={onClose}
            className={cx('icon-button')}
            aria-label="Tutup karya"
          >
            <X />
          </button>
        </div>

        {/* MEDIA PREVIEW */}
        <div className={cx(`dialog-media ${!isVideo ? 'still' : ''}`)}>
          {isVideo ? (
            <>
              {!mediaLoaded && (
                <div className={cx('media-loading')} role="status">
                  {mediaFailed ? (
                    <>
                      <p>
                        Preview belum bisa dimuat. Buka sumber aslinya
                        untuk menonton.
                      </p>

                      <button
                        className={cx('outline-button')}
                        onClick={() => {
                          setMediaFailed(false);
                          setMediaLoaded(false);
                          setRetried((value) => value + 1);
                        }}
                      >
                        Coba lagi
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className={cx(
                          enabled ? 'loading-ring' : 'loading-ring paused',
                        )}
                      />
                      <p>Memuat film…</p>
                    </>
                  )}
                </div>
              )}

              <iframe
                key={`${embedMedia}-${retried}`}
                src={
                  embedType === 'youtube'
                    ? `https://www.youtube-nocookie.com/embed/${embedMedia}?autoplay=1&rel=0`
                    : `https://drive.google.com/file/d/${embedMedia}/preview`
                }
                title={project.title}
                width="1280"
                height="720"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => {
                  setMediaLoaded(true);
                  setMediaFailed(false);
                }}
                onError={() => setMediaFailed(true)}
              />
            </>
          ) : (
            <MediaImage
              src={rendered}
              alt={project.title}
              priority
            />
          )}
        </div>

        {/* RENDER MODE & SHOT SELECTOR */}
        {project.type === 'render' &&
          (availableModes.length > 0 || project.renders.length > 1) && (
            <div className={cx('render-controls')}>
              <div role="group" aria-label="Tahap render">
                {availableModes.map(([mode, label]) => (
                  <button
                    key={mode}
                    className={cx(
                      effectiveMode === mode ? 'selected' : '',
                    )}
                    onClick={() => setRenderMode(mode)}
                    aria-pressed={effectiveMode === mode}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {project.renders.length > 1 && (
                <div className={cx('shot-controls')}>
                  <button
                    className={cx('icon-button')}
                    aria-label="Shot sebelumnya"
                    onClick={() =>
                      changeShot(
                        (shot - 1 + project.renders.length) %
                          project.renders.length,
                      )
                    }
                  >
                    <ChevronLeft />
                  </button>

                  <span>
                    SHOT {shot + 1} / {project.renders.length}
                  </span>

                  <button
                    className={cx('icon-button')}
                    aria-label="Shot selanjutnya"
                    onClick={() =>
                      changeShot((shot + 1) % project.renders.length)
                    }
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}

        {/* PROJECT INFORMATION */}
        <div className={cx('dialog-description')}>
          <div>
            <h2 id="dialog-title">{project.title}</h2>

            {project.role && (
              <span className={cx('accent')}>
                {project.role}
              </span>
            )}

            <p>{project.description}</p>
          </div>

          {sourceUrl && (
            <a
              className={cx('outline-button')}
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.type === 'website'
                ? 'Kunjungi website'
                : 'Buka sumber asli'}
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        {isVideo && (
          <p className={cx('embed-note')}>
            Jika video dibatasi oleh pemiliknya, gunakan “Buka sumber asli”.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 17. KOMPONEN ROOT: MENYUSUN SELURUH SECTION HALAMAN
// -----------------------------------------------------------------------------

function App() {
  const reduced = useReducedMotion();

  const [motionOn, setMotionOn] = useState(() => {
    try {
      return localStorage.getItem('renando-motion') !== 'off';
    } catch {
      return true;
    }
  });

  const enabled = motionOn && !reduced;

  const [project, setProject] = useState(null);

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  // Mengaktifkan atau menonaktifkan animasi secara global.
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off';
  }, [enabled]);

  const toggle = () => {
    setMotionOn(!motionOn);

    try {
      localStorage.setItem(
        'renando-motion',
        motionOn ? 'off' : 'on',
      );
    } catch {}
  };

  const close = React.useCallback(() => {
    setProject(null);
  }, []);

  return (
    <MotionContext.Provider value={enabled}>
      <MotionConfig
        reducedMotion={enabled ? 'user' : 'always'}
        transition={{ ease: EASE }}
      >
        <a className={cx('skip-link')} href="#portfolio">
          Lewati ke karya
        </a>

        <motion.div
          className={cx('reading-progress')}
          style={{
            scaleX: enabled ? progress : scrollYProgress,
          }}
        />

        <Header enabled={enabled} onToggle={toggle} />

        {/* SEMUA SECTION UTAMA */}
        <main>
          <Hero onProject={setProject} />
          <Portfolio onProject={setProject} />
          {/* Aktifkan lagi setelah ada penghargaan untuk ditampilkan. */}
          <Breakdown />
          <About />
          {/* Aktifkan lagi saat bagian perjalanan kerja siap ditampilkan. */}
          <Contact onProject={setProject} />
        </main>

        {/* FOOTER */}
        <footer className={cx('footer')}>
          <a className={cx('wordmark')} href="#home">
            IRSYAD<span>®</span>
          </a>

          <span>
            © {new Date().getFullYear()} IRSYAD. EVERY FRAME HAS A PURPOSE.
          </span>

          <div>
            <a
              href="https://www.youtube.com/@DuingZStudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube DuingZ Studio"
            >
              <Youtube size={17} />
            </a>

            <a
              href="https://www.instagram.com/dododididaw/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram dododididaw"
            >
              <Instagram size={17} />
            </a>

            <a href="#home" aria-label="Kembali ke atas">
              <ArrowUpRight size={18} />
            </a>
          </div>
        </footer>

        {/* MODAL DETAIL KARYA */}
        <AnimatePresence>
          {project && (
            <ProjectDialog
              key={project.title}
              project={project}
              onClose={close}
            />
          )}
        </AnimatePresence>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// 18. MOUNT REACT KE ELEMENT #root DI index.html
// -----------------------------------------------------------------------------

createRoot(document.getElementById('root')).render(<App />);
