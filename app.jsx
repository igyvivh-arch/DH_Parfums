// ============ DH PARFUMS — SINGLE UNIFIED APP ============
const { useState, useEffect, useRef, useMemo } = React;

// ============ DATA TOKEN DEFINITIONS ============
const CATEGORIES = [
  { id: 'men', name: 'رجالي', en: 'Homme', count: 10, theme: 'cat-men' },
  { id: 'women', name: 'نسائي', en: 'Femme', count: 8, theme: 'cat-women' },
  { id: 'unisex', name: 'للجنسين', en: 'Mixte', count: 8, theme: 'cat-unisex' },
  { id: 'musk', name: 'مسك', en: 'Musc', count: 6, theme: 'cat-musk' },
  { id: 'oud', name: 'زيت العود', en: 'Huile d\'Oud', count: 5, theme: 'cat-oud' },
  { id: 'incense', name: 'بخور', en: 'Encens', count: 4, theme: 'cat-incense' },
  { id: 'oils', name: 'زيوت عطرية', en: 'Huiles Parfumées', count: 6, theme: 'cat-oils' },
  { id: 'gifts', name: 'هدايا', en: 'Coffrets Cadeaux', count: 3, theme: 'cat-gifts' }
];

const SIZES = [
  { ml: 3,   name: 'التجربة',    price: 800,   desc: 'حجم مثالي للتذوق الأول واختبار العطر قبل الاقتناء الكامل.' },
  { ml: 6,   name: 'المرافق',    price: 1400,  desc: 'يرافقك في السفر ويناسب حقيبة اليد بأناقة تامة.' },
  { ml: 12,  name: 'المفضّل',   price: 2500,  desc: 'الأكثر طلباً — يوازن بين السعر ومدة الاستخدام.' },
  { ml: 30,  name: 'الكلاسيكي', price: 5500,  desc: 'حجم يومي كامل يدوم لأشهر من الاستعمال المنتظم.' },
  { ml: 50,  name: 'الفاخر',    price: 8500,  desc: 'قنينة راقية بحجم عملي يليق برفوف المجموعة الخاصة.' },
  { ml: 100, name: 'الاستثنائي',price: 15000, desc: 'الحجم الأكبر لعشّاق العطر الأصلاء والمقتنين الجادّين.' }
];

const SEASONS = ['شتاء', 'ربيع', 'صيف', 'خريف', 'كل الفصول'];

const PRODUCTS = [
  {
    id: 'jpg-le-male-parfum',
    name: 'Jean Paul Gaultier — Le Male Le Parfum',
    en: 'JPG Le Male Le Parfum',
    category: 'men', type: 'Extrait de Parfum', season: 'شتاء',
    longevity: 14,
    badge: 'الأكثر شعبية', badgeType: 'gold',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '528915824_24571744972449942_4206900558855782630_n.jpg',
    desc: 'عطر شرقي خشبي ساحر يجمع بين الهيل المنعش واللافندر الناعم وقاعدة غنية بالفانيليا السوداء والأخشاب الثمينة.',
    color: { from: '#222225', to: '#0a0a0c' }
  },
  {
    id: 'clive-christian-matsukita',
    name: 'Clive Christian — Crown Collection Matsukita',
    en: 'Clive Christian Matsukita',
    category: 'unisex', type: 'Extrait de Parfum', season: 'خريف',
    longevity: 15,
    badge: 'إصدار ملكي', badgeType: 'gold',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '613076175_2100104430777431_5443489993270355889_n.jpg',
    desc: 'إصدار ملكي أحمر مستوحى من الأميرة اليابانية ماتسوكيتا. توليفة فاخرة من الشاي الأخضر والبرغموت والياسمين مع المسك والأخشاب المخملية.',
    color: { from: '#b5121b', to: '#3d0205' }
  },
  {
    id: 'jpg-ultra-male',
    name: 'Jean Paul Gaultier — Ultra Male',
    en: 'JPG Ultra Male',
    category: 'men', type: 'Eau de Parfum', season: 'شتاء',
    longevity: 12,
    badge: 'جذاب ومركز', badgeType: 'emerald',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '706035216_1306088464380434_621427838664622274_n.jpg',
    desc: 'مزيج فاكهي شرقي جذاب يجمع بين الكمثرى والنعناع والليمون مع القرفة والميرمية وقاعدة دافئة من الفانيليا السوداء والخشب.',
    color: { from: '#1a3258', to: '#081224' }
  },
  {
    id: 'clive-christian-out-of-blue',
    name: 'Clive Christian — Addictive Arts Out of the Blue',
    en: 'Clive Christian Out of the Blue',
    category: 'unisex', type: 'Extrait de Parfum', season: 'كل الفصول',
    longevity: 16,
    badge: 'مجموعة أديكتيف', badgeType: 'gold',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '756975064_4006974602929612_5555646241373756468_n.jpg',
    desc: 'إصدار استثنائي مخصص للذواقة من مجموعة Addictive Arts. ينبض بالنوتات الزهرية النادرة والعنبر البحري والروائح المخملية الآسرة.',
    color: { from: '#102a78', to: '#040d2b' }
  },
  {
    id: 'jpg-le-male-classic',
    name: 'Jean Paul Gaultier — Le Male',
    en: 'JPG Le Male Classic',
    category: 'men', type: 'Eau de Toilette', season: 'ربيع',
    longevity: 10,
    badge: 'الأيقوني', badgeType: 'default',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '757830893_1397789162274142_2513987254290840162_n.jpg',
    desc: 'العطر الأيقوني الخالد الذي غير ملامح عطور الرجال. توليفة منعشة من النعناع البارد واللافندر مع الفانيليا الدافئة وزهر البرتقال.',
    color: { from: '#1d6b63', to: '#082925' }
  },
  {
    id: 'clive-christian-1872',
    name: 'Clive Christian — 1872 Perfume',
    en: 'Clive Christian 1872',
    category: 'unisex', type: 'Extrait de Parfum', season: 'صيف',
    longevity: 14,
    badge: 'إصدار 1872', badgeType: 'emerald',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '756999695_2645436215859565_3234929197833090759_n.jpg',
    desc: 'تكريماً للعام الذي تأسست فيه دار Crown Perfumery. عطر حمضي كلاسيكي فاخر يفيض بالغالبانوم والليمون الصقلي والميرمية والأرز المعتق.',
    color: { from: '#0b522b', to: '#032110' }
  },
  {
    id: 'clive-christian-blonde-amber',
    name: 'Clive Christian — XXI Art Deco Blonde Amber',
    en: 'Clive Christian XXI Blonde Amber',
    category: 'unisex', type: 'Extrait de Parfum', season: 'كل الفصول',
    longevity: 16,
    badge: 'نخبة العطور', badgeType: 'gold',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '590173856_1271978294967404_5244491973262520227_n.jpg',
    desc: 'عطر نيش ملكي أسطوري من تشكيلة Noble Collection. يتألق بنفحات العنبر الأشقر الدافئ، الرم المعتق، والتبغ الفاخر مع لمسات الهيل والعسل.',
    color: { from: '#1c1b20', to: '#09080b' }
  },
  {
    id: 'jpg-le-male-elixir',
    name: 'Jean Paul Gaultier — Le Male Élixir',
    en: 'JPG Le Male Élixir',
    category: 'men', type: 'Extrait de Parfum', season: 'شتاء',
    longevity: 14,
    badge: 'إصدار فاخر', badgeType: 'gold',
    price_hint: '100ml — 50ml — 30ml — 12ml',
    sizes: [3, 6, 12, 30, 50, 100],
    image: '751071177_37281871038125847_1970206707993158782_n.jpg',
    desc: 'عطر أسطوري ينبض بالفخامة والدفء. يمزج بين النعناع واللافندر، متبوعاً بقلب من حبوب التونكا والعنبر الفاخر مع الفانيليا والعسل الذهبي الدافئ.',
    color: { from: '#c59b27', to: '#150f05' }
  },
  {
    id: 'p01', name: 'Nuit du Désert', en: 'Desert Night',
    category: 'men', type: 'Extrait de Parfum', season: 'شتاء',
    badge: 'جديد', badgeType: 'emerald',
    sizes: [3, 6, 12, 30, 50],
    desc: 'عطر شرقي عميق يفتح بلمسة زعفران دافئة ثم ينكشف عن قلب عود كمبودي أصلي مغلّف بالعنبر والصندل.',
    color: { from: '#5c2a15', to: '#0e0f10' }
  },
  {
    id: 'p02', name: 'Rose de Taïf', en: 'Taif Rose',
    category: 'women', type: 'Eau de Parfum', season: 'ربيع',
    longevity: 9, badge: 'الأكثر مبيعاً', badgeType: 'gold',
    sizes: [3, 6, 12, 30, 50, 100],
    desc: 'باقة من الورد الطائفي المقطوف فجراً، تتشابك مع ياسمين ندي وقاعدة من المسك الأبيض.',
    color: { from: '#7a2d3b', to: '#2a0f1a' }
  },
  {
    id: 'p03', name: "Horizon d'Ambre", en: 'Amber Horizon',
    category: 'unisex', type: 'Eau de Parfum', season: 'كل الفصول',
    longevity: 8, sizes: [6, 12, 30, 50, 100],
    desc: 'دفء العنبر يلتقي بنعومة الفانيليا في تركيبة متوازنة تناسب الرجل والمرأة على حد سواء.',
    color: { from: '#c9a15a', to: '#6b4a20' }
  },
  {
    id: 'p04', name: 'Musc Blanc', en: 'White Musk',
    category: 'musk', type: 'زيت عطري', season: 'كل الفصول',
    longevity: 10, badge: 'زيت مركّز', badgeType: 'default',
    sizes: [3, 6, 12, 30],
    desc: 'زيت مسك أبيض بتركيز عالٍ مستخلص بأسلوب تقليدي. نقاء يلامس البشرة ويترك أثراً هادئاً.',
    color: { from: '#e6dcc9', to: '#8a8779' }
  },
  {
    id: 'p05', name: 'Oud Royal', en: 'Royal Oud',
    category: 'oud', type: 'زيت عطري', season: 'شتاء',
    longevity: 14, badge: 'إصدار محدود', badgeType: 'emerald',
    sizes: [3, 6, 12],
    desc: 'دهن عود هندي معتّق بأيدي خبراء لأكثر من ثلاثة عقود. أعلى درجات الفخامة لعاشق العود الأصيل.',
    color: { from: '#3a1a08', to: '#0e0f10' }
  },
  {
    id: 'p06', name: 'Encens Maamoul', en: 'Maamoul Bakhoor',
    category: 'incense', type: 'بخور', season: 'شتاء',
    longevity: 6, sizes: [30, 50, 100],
    desc: 'بخور فاخر مصنوع يدوياً من رقائق العود المشبعة بدهن العود والعنبر. رائحة أصيلة تعطّر المكان.',
    color: { from: '#4a2a5c', to: '#1f0f2a' }
  }
];

// ============ ICONS ============
const Icon = ({ d, size, style, viewBox = "0 0 24 24" }) => (
  <svg className={"icon" + (size === 'lg' ? ' icon-lg' : size === 'sm' ? ' icon-sm' : '')} viewBox={viewBox} style={style}>
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);

const I = {
  search: <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" />,
  menu: <Icon d="M4 6h16M4 12h16M4 18h16" />,
  close: <Icon d="M18 6L6 18M6 6l12 12" />,
  sun: <Icon d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>} />,
  moon: <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  heart: <Icon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  share: <Icon d={<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></>} />,
  arrow: <Icon d="M15 18l-6-6 6-6" />,
  arrowUp: <Icon d="M12 19V5M5 12l7-7 7 7" />,
  phone: <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
  whatsapp: <Icon d={<path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.06L0 24l6.16-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12a11.87 11.87 0 0 0-3.48-8.52zM12 21.82a9.8 9.8 0 0 1-5-1.36l-.36-.22-3.66.96.98-3.56-.24-.38A9.86 9.86 0 1 1 21.82 12 9.86 9.86 0 0 1 12 21.82zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15s-.76.96-.94 1.16c-.17.2-.34.22-.63.07a8.1 8.1 0 0 1-2.38-1.47 8.94 8.94 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56a1.08 1.08 0 0 0-.78.37 3.28 3.28 0 0 0-1.02 2.44c0 1.44 1.05 2.83 1.2 3.03.15.2 2.07 3.15 5.02 4.42.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.75-.72 2-1.4.24-.7.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" fill="currentColor" stroke="none" />} />,
  mail: <Icon d={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></>} />,
  pin: <Icon d={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>} />,
  clock: <Icon d={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>} />,
  check: <Icon d="M20 6L9 17l-5-5" />,
  copy: <Icon d={<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>} />,
  sparkle: <Icon d="M12 2l2.09 6.26L20 10l-6 4 2 6-6-4-6 4 2-6-6-4 5.91-1.74L12 2z" />,
  shield: <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  droplet: <Icon d="M12 2s-6 8-6 12a6 6 0 0 0 12 0c0-4-6-12-6-12z" />
};

// ============ BOTTLE PLACEHOLDER SVG ============
const Bottle = ({ from = '#0f5c3b', to = '#0e0f10', label = null, style = {} }) => {
  const id = React.useId();
  return (
    <svg viewBox="0 0 120 180" className="bottle-svg" style={style}>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="46" y="8" width="28" height="14" rx="2" fill="#0e0f10" />
      <rect x="52" y="22" width="16" height="10" fill="#0e0f10" />
      <path d="M 30 40 Q 30 32 40 32 L 80 32 Q 90 32 90 40 L 90 160 Q 90 172 78 172 L 42 172 Q 30 172 30 160 Z"
            fill={`url(#bg-${id})`} stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      <rect x="42" y="95" width="36" height="42" rx="2" fill="rgba(246,242,234,0.92)" />
      <text x="60" y="115" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="11" fontWeight="700" fill="#0e0f10">DH</text>
      <line x1="48" y1="120" x2="72" y2="120" stroke="#0f5c3b" strokeWidth="0.5" />
      <text x="60" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="4" letterSpacing="1.2" fill="#6b6a66">{label || 'PARFUMS'}</text>
    </svg>
  );
};

const LogoMark = ({ size = 40 }) => (
  <div className="nav-brand-logo" style={{ width: size, height: size }}>
    <img src="assets/logo.png" alt="DH Parfums" />
  </div>
);

// ============ NAVBAR ============
const NAV_ITEMS = [
  { id: '',           label: 'الرئيسية' },
  { id: 'products',   label: 'كل العطور' },
  { id: 'categories', label: 'الفئات' },
  { id: 'sizes',      label: 'الأحجام' },
  { id: 'favorites',  label: 'المفضلة' },
  { id: 'about',      label: 'من نحن' },
  { id: 'contact',    label: 'تواصل' },
];

const Navbar = ({ route, theme, toggleTheme, favCount }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef(null);
  const currentTop = route.split('/')[0];

  useEffect(() => { if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50); }, [searchOpen]);

  const submitSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      location.hash = `#/products?q=${encodeURIComponent(query.trim())}`;
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#/" onClick={() => setDrawerOpen(false)}>
            <LogoMark />
            <div className="nav-brand-text">
              <span className="nav-brand-name">DH</span>
              <span className="nav-brand-sub">PARFUMS</span>
            </div>
          </a>

          <nav className="nav-links">
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={item.id ? `#/${item.id}` : '#/'}
                 className={"nav-link" + (currentTop === item.id ? " active" : "")}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <form className="search-wrap" onSubmit={submitSearch}>
              <input
                ref={inputRef}
                className={"search-input" + (searchOpen ? " open" : "")}
                placeholder="ابحث عن عطر…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onBlur={() => { if (!query) setTimeout(() => setSearchOpen(false), 150); }}
              />
              <button type="button" className="btn-icon search-btn" onClick={() => searchOpen ? submitSearch() : setSearchOpen(true)} aria-label="بحث">
                {I.search}
              </button>
            </form>

            <button className="btn-icon" onClick={toggleTheme} aria-label="تبديل الوضع">
              {theme === 'dark' ? I.sun : I.moon}
            </button>

            <a href="#/favorites" className="btn-icon" aria-label="المفضلة" style={{ position: 'relative' }}>
              {I.heart}
              {favCount > 0 && (
                <span style={{
                  position: 'absolute', top: 4, insetInlineEnd: 4,
                  minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999,
                  background: 'var(--danger)', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'grid', placeItems: 'center'
                }}>{favCount}</span>
              )}
            </a>

            <button className="btn-icon menu-btn" onClick={() => setDrawerOpen(true)} aria-label="القائمة">
              {I.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={"drawer" + (drawerOpen ? " open" : "")} onClick={() => setDrawerOpen(false)}>
        <aside className="drawer-panel" onClick={e => e.stopPropagation()}>
          <div className="drawer-head">
            <div className="nav-brand">
              <LogoMark />
              <div className="nav-brand-text">
                <span className="nav-brand-name">DH</span>
                <span className="nav-brand-sub">PARFUMS</span>
              </div>
            </div>
            <button className="btn-icon" onClick={() => setDrawerOpen(false)} aria-label="إغلاق">{I.close}</button>
          </div>
          {NAV_ITEMS.map(item => (
            <a key={item.id} href={item.id ? `#/${item.id}` : '#/'}
               onClick={() => setDrawerOpen(false)}
               className={"drawer-link" + (currentTop === item.id ? " active" : "")}>
              {item.label}
              {I.arrow}
            </a>
          ))}
        </aside>
      </div>
    </>
  );
};

// ============ FOOTER ============
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <div className="footer-logo"><img src="assets/logo.png" alt="DH Parfums" /></div>
            <div>
              <div className="footer-brand-name">DH Parfums</div>
              <div className="footer-tag">FRAGRANCE HOUSE</div>
            </div>
          </div>
          <p className="footer-desc">
            دار عطور تجمع بين الفخامة الشرقية والتوقيع الفرنسي بمواد أصلية عالية الجودة.
          </p>
        </div>

        <div>
          <h4 className="footer-h">تسوّق</h4>
          <ul className="footer-list">
            <li><a href="#/products">كل العطور</a></li>
            <li><a href="#/categories">الفئات</a></li>
            <li><a href="#/sizes">الأحجام</a></li>
            <li><a href="#/favorites">المفضلة</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-h">الدار</h4>
          <ul className="footer-list">
            <li><a href="#/about">من نحن</a></li>
            <li><a href="#/contact">تواصل معنا</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-h">تواصل</h4>
          <ul className="footer-list">
            <li><a href="tel:+966500000000">‎+966 50 000 0000</a></li>
            <li><a href="https://wa.me/966500000000">واتساب المباشر</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 DH PARFUMS · جميع الحقوق محفوظة</span>
      </div>
    </div>
  </footer>
);

// ============ FAB Stack ============
const FabStack = () => (
  <div className="fab-stack">
    <a className="fab fab-wa fab-pulse" href="https://wa.me/966500000000" target="_blank" rel="noopener" aria-label="واتساب">
      {I.whatsapp}
    </a>
    <a className="fab fab-tel" href="tel:+966500000000" aria-label="اتصل بنا">
      {I.phone}
    </a>
  </div>
);

// ============ ShareMenu ============
const ShareMenu = ({ product, onClose, showToast }) => {
  const url = `${location.origin}${location.pathname}#/product/${product.id}`;
  const text = `${product.name} — DH Parfums`;
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener('click', onDoc), 0);
    return () => document.removeEventListener('click', onDoc);
  }, [onClose]);

  const copy = () => {
    navigator.clipboard?.writeText(url);
    showToast('تم نسخ الرابط');
    onClose();
  };

  return (
    <div className="share-menu" ref={ref} onClick={e => e.stopPropagation()}>
      <a className="share-item" href={`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`} target="_blank" rel="noopener">
        {I.whatsapp} مشاركة عبر واتساب
      </a>
      <button className="share-item" onClick={copy}>
        {I.copy} نسخ الرابط
      </button>
    </div>
  );
};

// ============ PRODUCT CARD ============
const ProductCard = ({ product, isFav, toggleFav, showToast }) => {
  const [shareOpen, setShareOpen] = useState(false);
  const cat = CATEGORIES.find(c => c.id === product.category);

  const onCardClick = () => { location.hash = `#/product/${product.id}`; };
  const onFav = (e) => { e.stopPropagation(); toggleFav(product.id); };
  const onShare = (e) => { e.stopPropagation(); setShareOpen(v => !v); };

  return (
    <div className="card" onClick={onCardClick}>
      <div className="card-media">
        <div className="card-media-bg" style={{ background: `linear-gradient(160deg, ${product.color.from}, ${product.color.to})` }}>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Bottle from={product.color.from} to={product.color.to} label={product.en?.toUpperCase()} />
          )}
        </div>
        <button className={"card-fav" + (isFav ? " active" : "")} onClick={onFav} aria-label="المفضلة">
          {I.heart}
        </button>
        {product.badge && (
          <span className={"card-badge" + (product.badgeType === 'gold' ? ' gold' : product.badgeType === 'emerald' ? ' emerald' : '')}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="card-body">
        <div className="card-cat">{cat?.name} · {product.type}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-desc" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.desc}
        </div>
        <div className="card-foot" style={{ justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', display: 'flex', gap: 8 }}>
            <button className="btn-icon" onClick={onShare} aria-label="مشاركة" style={{ width: 32, height: 32 }}>{I.share}</button>
            {shareOpen && <ShareMenu product={product} onClose={() => setShareOpen(false)} showToast={showToast} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ SECTION HEAD ============
const SectionHead = ({ eyebrow, title, desc, link, linkText }) => (
  <div className="section-head fade-in">
    {eyebrow && <div className="eyebrow eyebrow-gold">{eyebrow}</div>}
    <div className="section-head-row">
      <div style={{ flex: 1, minWidth: 240 }}>
        <h2 className="section-title">{title}</h2>
        {desc && <p className="section-desc" style={{ marginTop: 10 }}>{desc}</p>}
      </div>
      {link && <a href={link} className="section-link">{linkText || 'عرض الكل'} {I.arrow}</a>}
    </div>
  </div>
);

// ============ TOAST ============
const Toast = ({ message, show }) => (
  <div className={"toast" + (show ? " show" : "")}>
    {I.check} {message}
  </div>
);

// ============ PAGES ============

// HOME PAGE
const HomePage = ({ favs, toggleFav, showToast }) => {
  const latest = PRODUCTS.slice(0, 4);
  const featured = PRODUCTS.slice(4, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy fade-in">
              <div className="eyebrow eyebrow-gold">DAR DH · دار العطور</div>
              <h1 className="hero-title">
                توقيعك العطري <em>يبدأ هنا</em>
              </h1>
              <p className="hero-sub">
                تشكيلة استثنائية من أفخر العطور العالمية والنيش، مستخلصة من مواد نادرة ومصممة للتعبير عن ذوقك.
              </p>
              <div className="hero-ctas">
                <a href="#/products" className="btn btn-primary">استكشف المجموعة {I.arrow}</a>
                <a href="#/categories" className="btn btn-ghost">تصفح الفئات</a>
              </div>
            </div>

            <div className="hero-visual fade-in" style={{ animationDelay: '.15s' }}>
              <div className="hero-orn"></div>
              <div className="hero-bottle">
                <div className="hero-bottle-inner">
                  <span className="hero-bottle-tag">إصدار الموسم</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
                    <h3 className="hero-bottle-title">
                      Nuit du Désert
                      <small>DESERT NIGHT — 2026</small>
                    </h3>
                    <a href="#/product/p01" className="btn btn-gold">اكتشف العطر {I.arrow}</a>
                  </div>
                </div>
              </div>
              <div className="hero-orn-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="جديدنا"
            title="أحدث ما وصل"
            desc="آخر التركيبات التي انضمت إلى المجموعة المختارة بعناية."
            link="#/products"
          />
          <div className="grid grid-4">
            {latest.map(p => (
              <ProductCard key={p.id} product={p} isFav={favs.includes(p.id)} toggleFav={toggleFav} showToast={showToast} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="مختارات الدار"
            title="العطور الموقّعة"
            desc="أشهر عطور النيش العالمية المعتمدة لدينا."
            link="#/products"
          />
          <div className="grid grid-4">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} isFav={favs.includes(p.id)} toggleFav={toggleFav} showToast={showToast} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// PRODUCTS LIST PAGE
const ProductsPage = ({ favs, toggleFav, showToast, params }) => {
  const [cat, setCat] = useState(params.cat || 'all');
  const [query, setQuery] = useState(params.q || '');

  useEffect(() => { setCat(params.cat || 'all'); }, [params.cat]);
  useEffect(() => { setQuery(params.q || ''); }, [params.q]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.en.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cat, query]);

  return (
    <div style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
      <div className="container">
        <SectionHead
          eyebrow="المجموعة الكاملة"
          title={query ? `نتائج البحث عن: ${query}` : 'كل العطور'}
          desc="استخدم الفلاتر لتصفية العطور حسب الفئة أو التوقيع العطري."
        />

        <div className="filter-bar">
          <button className={"chip" + (cat === 'all' ? " active" : "")} onClick={() => setCat('all')}>الكل</button>
          {CATEGORIES.map(c => (
            <button key={c.id} className={"chip" + (cat === c.id ? " active" : "")} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-4" style={{ marginTop: 20 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} isFav={favs.includes(p.id)} toggleFav={toggleFav} showToast={showToast} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon">{I.search}</div>
            <h3>لا توجد نتائج</h3>
            <p>جرّب تغيير الفلاتر أو البحث بكلمة أخرى.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// PRODUCT DETAIL PAGE
const ProductDetailPage = ({ id, favs, toggleFav, showToast }) => {
  const product = PRODUCTS.find(p => p.id === id);
  const [shareOpen, setShareOpen] = useState(false);

  if (!product) {
    return (
      <div style={{ paddingTop: 'calc(var(--nav-h) + 60px)' }}>
        <div className="container empty">
          <h3>لم نجد هذا العطر</h3>
          <a href="#/products" className="btn btn-primary">تصفح كل العطور</a>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find(c => c.id === product.category);
  const isFav = favs.includes(product.id);

  return (
    <div className="pd-wrap">
      <div className="container">
        <div className="pd-grid">
          <div className="pd-gallery">
            <div className="pd-main-img" style={{ background: `linear-gradient(160deg, ${product.color.from}, ${product.color.to})` }}>
              {product.badge && (
                <span className={"card-badge" + (product.badgeType === 'gold' ? ' gold' : product.badgeType === 'emerald' ? ' emerald' : '')}
                      style={{ position: 'absolute', top: 16, insetInlineEnd: 16 }}>
                  {product.badge}
                </span>
              )}
              {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Bottle from={product.color.from} to={product.color.to} label={product.en?.toUpperCase()} style={{ width: '55%', height: '82%' }} />
              )}
            </div>
          </div>

          <div className="pd-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {cat && <span className="eyebrow eyebrow-gold">{cat.name}</span>}
              <span className="eyebrow" style={{ color: 'var(--muted)' }}>{product.en}</span>
            </div>

            <div className="pd-title-row">
              <h1 className="pd-name">{product.name}</h1>
              <button className="btn-icon" style={{ background: 'var(--ivory-2)' }} onClick={() => toggleFav(product.id)} aria-label="المفضلة">
                <span style={{ color: isFav ? 'var(--danger)' : 'var(--ink)' }}>{I.heart}</span>
              </button>
            </div>

            <p className="pd-desc">{product.desc}</p>

            <div className="pd-meta-grid">
              <div className="pd-meta">
                <span className="pd-meta-label">النوع</span>
                <span className="pd-meta-value">{product.type}</span>
              </div>
              <div className="pd-meta">
                <span className="pd-meta-label">الثبات</span>
                <span className="pd-meta-value">{product.longevity} ساعة</span>
              </div>
            </div>

            <div className="pd-ctas">
              <a className="btn btn-emerald"
                 href={`https://wa.me/966500000000?text=${encodeURIComponent(`مرحباً، أرغب بالاستفسار عن ${product.name}`)}`}
                 target="_blank" rel="noopener">
                {I.whatsapp} استفسر عبر واتساب
              </a>
              <a className="btn btn-primary" href="tel:+966500000000">
                {I.phone} اتصل للطلب
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CATEGORIES PAGE
const CategoriesPage = () => (
  <div style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
    <div className="container">
      <SectionHead eyebrow="Categories" title="تصفّح حسب الفئة" desc="عوالم عطرية تقودك مباشرة إلى ما تحب." />
      <div className="cats-grid">
        {CATEGORIES.map((c, i) => (
          <a key={c.id} href={`#/products?cat=${c.id}`} className={`cat-card ${c.theme}`}>
            <span className="cat-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-count">{c.en}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

// SIZES PAGE
const SizesPage = () => (
  <div style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
    <div className="container">
      <SectionHead eyebrow="Bottle Sizes" title="الأحجام المتوفرة" desc="من الأحجام الصغيرة وحتى القنينة الكاملة." />
      <div className="sizes-grid">
        {SIZES.map(s => (
          <div key={s.ml} className="size-card">
            <div className="size-num">{s.ml} <span className="size-unit">ML</span></div>
            <h3 className="size-title">{s.name}</h3>
            <p className="size-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// FAVORITES PAGE
const FavoritesPage = ({ favs, toggleFav, showToast }) => {
  const items = PRODUCTS.filter(p => favs.includes(p.id));
  return (
    <div style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
      <div className="container">
        <SectionHead eyebrow="مجموعتك" title="عطورك المفضلة" desc={items.length ? `لديك ${items.length} عطر محفوظ.` : "قائمة المفضلة فارغة."} />
        {items.length > 0 ? (
          <div className="grid grid-4">
            {items.map(p => (
              <ProductCard key={p.id} product={p} isFav={true} toggleFav={toggleFav} showToast={showToast} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon">{I.heart}</div>
            <h3>لا توجد عطور مفضلة</h3>
            <a href="#/products" className="btn btn-primary">ابدأ التصفح {I.arrow}</a>
          </div>
        )}
      </div>
    </div>
  );
};

// ABOUT PAGE
const AboutPage = () => (
  <div style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
    <div className="container">
      <SectionHead eyebrow="DAR DH" title="دار عطور صُنعت بشغف" desc="نجمع بين الأصالة الشرقية والانتعاش العصري." />
    </div>
  </div>
);

// CONTACT PAGE
const ContactPage = ({ showToast }) => (
  <div style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
    <div className="container">
      <SectionHead eyebrow="Contact" title="تواصل معنا" desc="تواصل عبر واتساب للرد السريع أو الاتصال المباشر." />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
        <a href="https://wa.me/966500000000" className="btn btn-emerald">{I.whatsapp} واتساب المباشر</a>
        <a href="tel:+966500000000" className="btn btn-primary">{I.phone} اتصال تلفوني</a>
      </div>
    </div>
  </div>
);

// ============ ROUTER & MAIN APP ============
const parseHash = () => {
  const h = location.hash.replace(/^#\/?/, '') || '';
  const [path, queryStr] = h.split('?');
  const params = {};
  if (queryStr) {
    queryStr.split('&').forEach(p => {
      const [k, v] = p.split('=');
      if (k) params[k] = decodeURIComponent(v || '');
    });
  }
  return { route: path, params };
};

const App = () => {
  const [routeState, setRouteState] = useState(parseHash());
  const [theme, setTheme] = useState(() => localStorage.getItem('dh_theme') || 'light');
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dh_favs') || '[]'); } catch { return []; }
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const onHash = () => {
      setRouteState(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dh_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dh_favs', JSON.stringify(favs));
  }, [favs]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2400);
  };

  const toggleFav = (id) => {
    setFavs(f => {
      if (f.includes(id)) {
        showToast('تم الحذف من المفضلة');
        return f.filter(x => x !== id);
      }
      showToast('تمت الإضافة إلى المفضلة');
      return [...f, id];
    });
  };

  const { route, params } = routeState;
  const [top, sub] = route.split('/');

  let page;
  if (top === '' || top === undefined) {
    page = <HomePage favs={favs} toggleFav={toggleFav} showToast={showToast} />;
  } else if (top === 'products') {
    page = <ProductsPage favs={favs} toggleFav={toggleFav} showToast={showToast} params={params} />;
  } else if (top === 'product' && sub) {
    page = <ProductDetailPage id={sub} favs={favs} toggleFav={toggleFav} showToast={showToast} />;
  } else if (top === 'categories') {
    page = <CategoriesPage />;
  } else if (top === 'sizes') {
    page = <SizesPage />;
  } else if (top === 'favorites') {
    page = <FavoritesPage favs={favs} toggleFav={toggleFav} showToast={showToast} />;
  } else if (top === 'about') {
    page = <AboutPage />;
  } else if (top === 'contact') {
    page = <ContactPage showToast={showToast} />;
  } else {
    page = <HomePage favs={favs} toggleFav={toggleFav} showToast={showToast} />;
  }

  return (
    <div data-screen-label={top || 'home'}>
      <Navbar route={route} theme={theme} toggleTheme={toggleTheme} favCount={favs.length} />
      <main>{page}</main>
      <Footer />
      <FabStack />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
};

// MOUNT APP
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
