import { useState, useEffect } from 'react'

// ── Replace with your Formspree form ID ─────────────────────────────
// 1. Sign up at https://formspree.io
// 2. Create a form → copy the ID (e.g. "xyzabcde" from the endpoint URL)
// 3. Paste it here:
const FORMSPREE_ID = 'mgonywry'
// ─────────────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
const PlayIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
  </svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
const XIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Scroll-reveal hook ───────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease'
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
}

// ── Navbar ───────────────────────────────────────────────────────────
function Navbar({ scrolled, menuOpen, setMenuOpen }) {
  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }
  const links = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ]
  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-mark">📊</div>
            <span className="logo-text">Retail <span>Intelligence</span></span>
          </div>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.id}><a onClick={() => scrollTo(l.id)}>{l.label}</a></li>
            ))}
          </ul>
          <div className="nav-cta">
            <button className="btn-ghost" onClick={() => scrollTo('contact')}>Log In</button>
            <button className="btn-primary" onClick={() => scrollTo('contact')}>Get Early Access →</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</a>
        ))}
        <button className="btn-primary-lg" onClick={() => { scrollTo('contact'); setMenuOpen(false) }}
          style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
          Get Early Access <ArrowRight />
        </button>
      </div>
    </>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="hero">
      <div className="hero-grid" />
      <div className="container">
        <div className="hero-inner">

          {/* Centred text block */}
          <div className="hero-left">
            <div className="hero-badge fu d1">
              <span className="live-dot" />
              Built for independent convenience stores
            </div>
            <h1 className="hero-title fu d2">
              Stop <em>guessing.</em><br />
              Start <span className="gradient-text">knowing</span><br />
              your store.
            </h1>
            <p className="hero-body fu d3">
              Retail Intelligence turns your weekly EPOS data into clear,
              actionable insights — top sellers, margin erosion, trending
              products, and AI-powered recommendations. Every Monday morning.
            </p>
            <div className="hero-pills fu d4">
              <span className="hero-pill">✓ Best selling products</span>
              <span className="hero-pill">✓ Margin erosion alerts</span>
              <span className="hero-pill">✓ Trending lines</span>
              <span className="hero-pill">✓ AI weekly summary</span>
            </div>
            <div className="hero-btns fu d5">
              <button className="btn-primary-lg" onClick={() => scrollTo('contact')}>
                Request a Demo <ArrowRight />
              </button>
              <button className="btn-secondary-lg" onClick={() => scrollTo('features')}>
                <PlayIcon /> See Features
              </button>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="float-anim fu d5" style={{ position: 'relative', width: '100%', maxWidth: 780 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 200, background: 'radial-gradient(ellipse,rgba(37,99,235,0.18),transparent 70%)', pointerEvents: 'none' }} />
            <div className="dash-wrap">
              <div className="dash-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="dash-dots">
                    <span style={{ background: '#FF5F57' }} />
                    <span style={{ background: '#FEBC2E' }} />
                    <span style={{ background: '#28C840' }} />
                  </div>
                  <span className="dash-title">londis-intelligence.app — W/E 07 Mar 2026</span>
                </div>
                <div className="dash-live">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} /> Live
                </div>
              </div>
              <div className="kpi-row">
                {[
                  { val: '£9,871', lbl: 'Revenue',   color: 'var(--blue-glo)' },
                  { val: '£1,295', lbl: 'Profit',    color: 'var(--green)'    },
                  { val: '13.1%',  lbl: 'Margin',    color: 'var(--cyan)'     },
                  { val: '+11.3%', lbl: 'vs Last Wk',color: 'var(--amber)'    },
                ].map((k, i) => (
                  <div className="kpi" key={i}>
                    <div className="kpi-val" style={{ color: k.color }}>{k.val}</div>
                    <div className="kpi-lbl">{k.lbl}</div>
                  </div>
                ))}
              </div>
              <div className="dash-body">
                <div className="dash-panel">
                  <div className="dp-head">
                    Top Sellers
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(37,99,235,0.15)', color: 'var(--blue-glo)' }}>This Week</span>
                  </div>
                  {[
                    { name: 'Tobacco', val: '+34% ↑', up: true },
                    { name: 'Alt. Smoking', val: '+66% ↑', up: true },
                    { name: 'Alcohol', val: '£2,003', up: null },
                    { name: 'Soft Drinks', val: '£862', up: null },
                  ].map((r, i) => (
                    <div className="dp-row" key={i}>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{r.name}</span>
                      <span className={r.up === true ? 'trend-up' : r.up === false ? 'trend-dn' : ''} style={r.up === null ? { color: 'var(--muted)', fontWeight: 600 } : {}}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <div className="dash-panel">
                  <div className="dp-head">
                    Margin Alerts
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(239,68,68,0.15)', color: 'var(--red)' }}>3 Issues</span>
                  </div>
                  {[
                    { name: 'Madri Lager',    val: '−3.4% ↓', dn: true  },
                    { name: 'Lemsip Max',     val: '−1.1% ↓', dn: true  },
                    { name: 'Milk 2L Semi',   val: 'Fixed ✓',  dn: false },
                    { name: 'Hula Hoops',     val: 'Under-priced', dn: true },
                  ].map((r, i) => (
                    <div className="dp-row" key={i}>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{r.name}</span>
                      <span className={r.dn ? 'trend-dn' : 'trend-up'}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '0 14px 14px' }}>
                <div style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--blue-glo)', fontWeight: 700 }}>✦ AI Insight — </span>
                  Elux Nic Salts selling <strong style={{ color: 'var(--text)' }}>98 units/wk</strong> untracked. One cost entry recovers <strong style={{ color: 'var(--green)' }}>£120+/wk</strong> in visible profit.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Ticker ───────────────────────────────────────────────────────────
const tickerItems = [
  { dot: 'var(--green)',    text: <>Alt. Smoking up <strong style={{color:'var(--text)'}}>+66% WoW</strong> — restock before weekend</> },
  { dot: 'var(--amber)',    text: <><strong style={{color:'var(--text)'}}>Mother's Day in 8 days</strong> — cards only £5.97 this week</> },
  { dot: 'var(--red)',      text: <>Madri Lager showing <strong style={{color:'var(--text)'}}>negative margin</strong> — likely cost entry error</> },
  { dot: 'var(--blue-glo)', text: <>Hula Hoops: switch to Parfetts saves <strong style={{color:'var(--text)'}}>£213/year</strong> with zero customer impact</> },
  { dot: 'var(--cyan)',     text: <>Next payday <strong style={{color:'var(--text)'}}>28 March</strong> — load Fosters, Red Bull, QC Cream by Wed 25th</> },
]
function Ticker() {
  const doubled = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span className="ticker-item" key={i}>
            <span className="ticker-dot" style={{ background: item.dot }} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Stats ────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div className="stats-strip">
      <div className="container">
        <div className="stats-grid">
          {[
            { num: '£9,871', color: 'var(--blue-glo)', lbl: 'Weekly revenue tracked' },
            { num: '+11.3%', color: 'var(--green)',    lbl: 'WoW growth identified'  },
            { num: '£120+',  color: 'var(--amber)',    lbl: 'Profit recovered per insight' },
            { num: '5 min',  color: 'var(--cyan)',     lbl: 'Weekly upload time'      },
          ].map((s, i) => (
            <div key={i} className="reveal">
              <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Problem ──────────────────────────────────────────────────────────
function Problem() {
  const problems = [
    { icon: '📋', title: 'No weekly review',       desc: 'You know what sold. You don\'t know what to do about it. No context. No comparison. No action.' },
    { icon: '💸', title: 'Invisible margin erosion', desc: 'Prices creep below cost. Supplier rates change. You find out weeks later — after losing hundreds of pounds.' },
    { icon: '📦', title: 'Missed trending lines',  desc: 'A product doubles in sales. You don\'t notice. You under-order. You miss the moment. It passes.' },
    { icon: '🤷', title: 'No forward planning',   desc: 'Payday Fridays, seasonal events, Ramadan — all predictable. But without data, you\'re always reacting.' },
  ]
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-red">The Problem</span>
          <h2>Most store owners are<br /><em className="serif" style={{ fontStyle: 'italic' }}>flying blind.</em></h2>
          <p>Your EPOS system collects data every single day — but unless someone turns it into insight, it's just noise sitting in a spreadsheet.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 28 }}>
          {problems.map((p, i) => (
            <div className="card reveal" key={i}>
              <div className="card-icon" style={{ background: 'rgba(239,68,68,0.1)' }}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: '18px 22px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)' }}>This costs independent stores an estimated</span>
          <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: 'var(--text)' }}>£5,000–£15,000 per year</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>in unrecovered margin, missed opportunities, and inefficient ordering.</span>
        </div>
      </div>
    </section>
  )
}

// ── How It Works ─────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', badge: 'badge-blue',  color: 'rgba(37,99,235,0.15)',  label: 'Upload',   title: 'Export from your EPOS',       desc: 'Download your weekly sales report from Shopmate or any EPOS system. One Excel file.' },
    { n: '02', badge: 'badge-cyan',  color: 'rgba(6,182,212,0.15)',  label: 'Process',  title: 'We analyse everything',        desc: 'Your data is automatically processed — sales, margins, trends, comparisons, anomalies.' },
    { n: '03', badge: 'badge-green', color: 'rgba(16,185,129,0.15)', label: 'Insights', title: 'Your dashboard updates',       desc: 'Trending products, top sellers, erosion alerts, and an AI summary — all ready instantly.' },
    { n: '04', badge: 'badge-amber', color: 'rgba(245,158,11,0.15)', label: 'Action',   title: 'Make smarter decisions',      desc: 'Order the right stock. Fix pricing. Plan for events. Act with confidence — every single week.' },
  ]
  return (
    <section id="how-it-works" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">How It Works</span>
          <h2>Simple. Consistent.<br />Done in minutes.</h2>
          <p>No complex integrations. No IT setup. Upload your EPOS file once a week and your dashboard updates automatically.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
          {steps.map((s, i) => (
            <div className="card reveal" key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, color: s.color, marginBottom: 10 }}>{s.n}</div>
              <span className={`badge ${s.badge}`} style={{ marginBottom: 14, display: 'inline-flex' }}>{s.label}</span>
              <h3 style={{ marginBottom: 8 }}>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features ─────────────────────────────────────────────────────────
function CheckList({ checks, accent }) {
  return (
    <div className="feature-checks">
      {checks.map((c, i) => (
        <div className="feature-check" key={i}>
          <div className="check-dot" style={accent ? { background: `${accent}20`, borderColor: `${accent}40`, color: accent } : {}}>✓</div>
          {c}
        </div>
      ))}
    </div>
  )
}

function AiBox({ label, text }) {
  return (
    <div className="ai-box" style={{ margin: '12px 16px 14px' }}>
      <div className="ai-label">✦ {label}</div>
      <div className="ai-text" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

function Features() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="features" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">Features</span>
          <h2>Every view you need.<br /><span className="gradient-text">In one dashboard.</span></h2>
        </div>

        {/* 1 — Top Sellers */}
        <div className="feature-row reveal">
          <div>
            <div className="feature-label">Top Sellers</div>
            <h2 className="feature-title">Know exactly what's<br />selling — and what isn't.</h2>
            <p className="feature-body">Your best sellers ranked by revenue and profit every week. Spot which categories are growing, which products are being left on the shelf, and where your real volume is coming from.</p>
            <CheckList checks={['Ranked by revenue, profit, and units', 'Category breakdowns with WoW comparison', 'Department-level view so nothing gets lost', 'Filter and search any product instantly']} />
          </div>
          <div className="screen">
            <div className="screen-bar">
              <div className="dash-dots"><span style={{background:'#FF5F57'}}/><span style={{background:'#FEBC2E'}}/><span style={{background:'#28C840'}}/></div>
              <span className="screen-bar-title">Top Sellers — W/E 07 Mar</span>
              <span className="badge badge-blue" style={{fontSize:10,padding:'3px 10px'}}>Best Sellers</span>
            </div>
            {[
              { cat: '🚬 Tobacco & Vaping',  sub: '214 units · £2,003 rev', tag: '+34% WoW',  tagCls: 'tag-green', hi: true },
              { cat: '🍺 Alcohol',           sub: '189 units · £1,892 rev', tag: 'Stable',    tagCls: 'tag-blue'  },
              { cat: '🥤 Soft Drinks',       sub: '312 units · £862 rev',   tag: '+12%',      tagCls: 'tag-green' },
              { cat: '🍞 Grocery',           sub: '178 units · £741 rev',   tag: '−4%',       tagCls: 'tag-amber' },
              { cat: '🧴 Household',         sub: '94 units · £412 rev',    tag: '+21%',      tagCls: 'tag-green' },
            ].map((r, i) => (
              <div className="row" key={i} style={r.hi ? {background:'rgba(37,99,235,0.05)'} : {}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:'var(--text)'}}>{r.cat}</div>
                  <div style={{fontSize:10,color:'var(--dim)'}}>{r.sub}</div>
                </div>
                <span className={`tag ${r.tagCls}`}>{r.tag}</span>
              </div>
            ))}
            <AiBox label="AI Insight" text="Household up <strong>+21% WoW</strong> — likely Ramadan demand. Stock dates, Vimto and bottled water before next weekend." />
          </div>
        </div>

        {/* 2 — Trending */}
        <div className="feature-row flip reveal">
          <div>
            <div className="feature-label">Trending</div>
            <h2 className="feature-title">Catch the wave<br />before it breaks.</h2>
            <p className="feature-body">Products with sudden WoW spikes surface automatically. When a line doubles in sales, you'll know before you run out — not after.</p>
            <CheckList checks={['Products with ≥40% WoW growth flagged', 'Minimum thresholds filter out noise', 'Rolling 3-month average for context', 'Restock suggestions tied to trend data']} />
          </div>
          <div className="screen">
            <div className="screen-bar">
              <div className="dash-dots"><span style={{background:'#FF5F57'}}/><span style={{background:'#FEBC2E'}}/><span style={{background:'#28C840'}}/></div>
              <span className="screen-bar-title">Trending — Significant WoW Growth</span>
            </div>
            <div style={{padding:'12px 16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:10,fontWeight:700,color:'var(--dim)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>
                <span>Product</span><span>Trend</span>
              </div>
            </div>
            {[
              { name: 'Chesterfield Blue 20s',  cat: 'Tobacco',            val: '+143%', sub: '7 → 3 units'  },
              { name: 'Elux Nic Salt Mr Blue',  cat: 'Alternative Smoking', val: '+98 units', sub: 'untracked ⚠'  },
              { name: 'QC Cream Sherry',        cat: 'Alcohol',            val: '+67%',  sub: '10 → 6 units' },
              { name: 'Vimto Cordial 725ml',    cat: 'Soft Drinks',        val: '+55%',  sub: '11 → 7 units' },
            ].map((r, i) => (
              <div className="row" key={i}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:'var(--text)'}}>{r.name}</div>
                  <div style={{fontSize:10,color:'var(--dim)'}}>{r.cat}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:13,fontWeight:800,color:'var(--green)'}}>{r.val}</div>
                  <div style={{fontSize:10,color:'var(--dim)'}}>{r.sub}</div>
                </div>
              </div>
            ))}
            <AiBox label="AI Insight" text="Vimto trending ahead of Ramadan. <strong>Order 2× normal volume</strong> before the weekend — last year this line sold out by day 3." />
          </div>
        </div>

        {/* 3 — Margin Erosion */}
        <div className="feature-row reveal">
          <div>
            <div className="feature-label">Margin Erosion</div>
            <h2 className="feature-title">Stop leaking profit<br />without knowing it.</h2>
            <p className="feature-body">Every week, Retail Intelligence checks your sell prices against invoice costs. Products falling below your target margin are flagged automatically — before the losses stack up.</p>
            <CheckList checks={['Automatic target price calculation (cost + 30%)', 'True margin % shown per product', 'Suggested corrected price shown instantly', 'Negative margin alerts (likely cost errors)']} />
          </div>
          <div className="screen">
            <div className="screen-bar">
              <div className="dash-dots"><span style={{background:'#FF5F57'}}/><span style={{background:'#FEBC2E'}}/><span style={{background:'#28C840'}}/></div>
              <span className="screen-bar-title">Margin Erosion — Action Required</span>
              <span className="badge badge-red" style={{fontSize:10,padding:'3px 10px'}}>3 Alerts</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'8px 16px',fontSize:10,fontWeight:700,color:'var(--dim)',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'1px solid var(--border)'}}>
              <span>Product</span><span>Sell</span><span>Target</span><span>Margin</span>
            </div>
            {[
              { name: 'Madri Lager 4×440ml',   cat: 'Alcohol',     sell: '£5.49', tgt: '£5.72', margin: '−3.4%', mc: 'tag-red'   },
              { name: 'Lemsip Max Capsules',    cat: 'Healthcare',  sell: '£3.49', tgt: '£3.54', margin: '−1.1%', mc: 'tag-red'   },
              { name: 'Hula Hoops Big BBQ',     cat: 'Crisps',      sell: '£0.99', tgt: '£1.03', margin: '14.1%', mc: 'tag-amber' },
              { name: 'Milk 2L Semi-Skimmed',   cat: 'Chiller',     sell: '£1.78', tgt: '£1.61', margin: '32.4% ✓', mc: 'tag-green' },
            ].map((r, i) => (
              <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',alignItems:'center',padding:'10px 16px',borderBottom:i<3?'1px solid rgba(28,42,62,0.5)':'none',fontSize:12}}>
                <div>
                  <div style={{fontWeight:600,color:'var(--text)'}}>{r.name}</div>
                  <div style={{fontSize:10,color:'var(--dim)'}}>{r.cat}</div>
                </div>
                <span style={{color:'var(--text)'}}>{r.sell}</span>
                <span style={{color:'var(--amber)'}}>{r.tgt}</span>
                <span className={`tag ${r.mc}`}>{r.margin}</span>
              </div>
            ))}
            <AiBox label="AI Insight" text="Milk margin fixed — <strong>well done.</strong> The £14/wk erosion flagged for 4 weeks is now resolved. Madri and Lemsip likely cost entry errors — check before de-listing." />
          </div>
        </div>

        {/* 4 — Review & Search */}
        <div className="feature-row flip reveal">
          <div>
            <div className="feature-label">Review &amp; Search</div>
            <h2 className="feature-title">Every product.<br />Instant answers.</h2>
            <p className="feature-body">Search any product by name, scan any category, or filter by department. See full sales history, margin trends, and a suggested action — for every single SKU in your store.</p>
            <CheckList checks={['Instant full-text search across all products', 'Revenue, profit, margin and units per product', 'WoW and 3-month rolling averages', 'Suggested actions per product (Pro only)']} />
          </div>
          <div className="screen">
            <div className="screen-bar">
              <div className="dash-dots"><span style={{background:'#FF5F57'}}/><span style={{background:'#FEBC2E'}}/><span style={{background:'#28C840'}}/></div>
              <span className="screen-bar-title">Product Search</span>
            </div>
            <div style={{padding:'12px 16px'}}>
              <div style={{background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:10,padding:'10px 14px',display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                <span style={{color:'var(--dim)'}}>🔍</span>
                <span style={{fontSize:12,color:'var(--muted)'}}>red bull</span>
                <span style={{width:1,height:14,background:'var(--blue-glo)',animation:'blink 1s step-end infinite',display:'inline-block'}}/>
              </div>
              <div style={{fontSize:10,fontWeight:700,color:'var(--dim)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>3 results</div>
            </div>
            {[
              { name: 'Red Bull 250ml Original', sub: 'Soft Drinks', rev: '£71.40', detail: '34 units · 23.1% margin', c: 'var(--green)' },
              { name: 'Red Bull 4×250ml',        sub: 'Soft Drinks', rev: '£39.92', detail: '7 packs · 19.4% margin',  c: 'var(--green)' },
              { name: 'Red Bull Sugar Free',     sub: 'Soft Drinks', rev: '£21.00', detail: '10 units · 14.2% margin', c: 'var(--amber)' },
            ].map((r, i) => (
              <div className="row" key={i}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:'var(--text)'}}>{r.name}</div>
                  <div style={{fontSize:10,color:'var(--dim)'}}>{r.sub}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:13,fontWeight:800,color:r.c}}>{r.rev}</div>
                  <div style={{fontSize:10,color:'var(--dim)'}}>{r.detail}</div>
                </div>
              </div>
            ))}
            <AiBox label="Review Suggestion" text="Red Bull Original is your <strong>highest-volume energy drink</strong>. Stock 40+ units ahead of next payday Friday. Sugar Free margin below threshold — consider price review." />
          </div>
        </div>

        {/* 5 — AI Summary */}
        <div className="feature-row reveal">
          <div>
            <div className="feature-label" style={{ color: 'var(--amber)' }}>AI Weekly Summary · Pro</div>
            <h2 className="feature-title">A smart brief, every<br /><span className="amber-text">Monday morning.</span></h2>
            <p className="feature-body">Five sharp AI-generated insights delivered every week. Not generic — based on your specific numbers. What happened, what it means, and what to do next.</p>
            <CheckList
              checks={['5 prioritised insights per week', 'Specific numbers, not generic observations', 'Calendar events and trading opportunities', 'Supplier switch and pricing recommendations']}
              accent="var(--amber)"
            />
          </div>
          <div className="screen" style={{ borderColor: 'rgba(245,158,11,0.25)' }}>
            <div className="screen-bar" style={{ borderColor: 'rgba(245,158,11,0.15)' }}>
              <div className="dash-dots"><span style={{background:'#FF5F57'}}/><span style={{background:'#FEBC2E'}}/><span style={{background:'#28C840'}}/></div>
              <span className="screen-bar-title">AI Weekly Summary — W/E 07 Mar 2026</span>
              <span className="badge badge-amber" style={{fontSize:10,padding:'3px 10px'}}>Pro</span>
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { accent: 'var(--blue-glo)',  label: '1 · Revenue',           bg: 'rgba(37,99,235,0.06)',   border: 'rgba(37,99,235,0.18)',   text: 'Revenue £9,871 — strongest week since November, up <strong style="color:var(--text)">+11.3% WoW</strong>. Post-payday Saturday drove £1,846 and Ramadan-related Household surge.' },
                { accent: 'var(--amber)',     label: '2 · Highest-Impact Action', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.18)', text: 'Elux Nic Salts selling <strong style="color:var(--text)">98 units/week</strong> completely untracked. One cost entry recovers <strong style="color:var(--green)">£120+/week</strong> in visible profit.' },
                { accent: 'var(--green)',     label: '3 · Pricing Win',        bg: 'rgba(16,185,129,0.05)',  border: 'rgba(16,185,129,0.18)',  text: 'Milk prices raised — well done. Both 2L lines now at correct <strong style="color:var(--text)">30%+ margin</strong>. The £14/wk erosion flagged for 4 weeks is fixed.' },
                { accent: 'var(--red)',       label: '4 · Coming Up',          bg: 'rgba(239,68,68,0.05)',   border: 'rgba(239,68,68,0.18)',   text: 'Mother\'s Day in 8 days. Eid al-Fitr in 13 days. Next payday <strong style="color:var(--text)">28 March</strong>. Three revenue events in 3 weeks — stock decisions this weekend matter.' },
              ].map((ins, i) => (
                <div key={i} style={{ background: ins.bg, border: `1px solid ${ins.border}`, borderRadius: 10, padding: 12, fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>
                  <div style={{ color: ins.accent, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>{ins.label}</div>
                  <span dangerouslySetInnerHTML={{ __html: ins.text }} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── Pricing ──────────────────────────────────────────────────────────
function Pricing() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const basicFeatures = [
    { on: true,  txt: '1 store' },
    { on: true,  txt: 'Best Sellers dashboard' },
    { on: true,  txt: 'Top Sellers by category & department' },
    { on: true,  txt: 'Review — browse all products & margins' },
    { on: true,  txt: 'Product search' },
    { on: true,  txt: 'WoW sales comparisons' },
    { on: true,  txt: 'Weekly EPOS file upload' },
    { on: false, txt: 'Trending products view' },
    { on: false, txt: 'Margin erosion alerts' },
    { on: false, txt: 'AI weekly summary' },
    { on: false, txt: 'Coming Up (events & calendar)' },
    { on: false, txt: 'AI product action suggestions' },
  ]
  const proFeatures = [
    'Everything in Basic',
    'Trending products — weekly spike alerts',
    'Margin Erosion — auto price alerts',
    'AI weekly summary — 5 key insights',
    'Coming Up — events & calendar planning',
    'AI product action suggestions',
    '3-month rolling averages per product',
    'Priority support',
  ]
  return (
    <section id="pricing" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">Pricing</span>
          <h2>Simple pricing.<br /><span className="gradient-text">No surprises.</span></h2>
          <p>Pay monthly. Cancel anytime. No setup fees. No contracts. No hidden costs.</p>
        </div>
        <div className="pricing-grid">
          {/* Basic */}
          <div className="plan reveal">
            <div className="plan-name">Basic</div>
            <div className="plan-price"><span className="big">£29</span></div>
            <div className="plan-period">per month · billed monthly</div>
            <div className="plan-divider" />
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>What's included</div>
            {basicFeatures.map((f, i) => (
              <div className={`plan-feature${f.on ? '' : ' off'}`} key={i}>
                <div className={`icon ${f.on ? 'icon-on' : 'icon-off'}`}>{f.on ? '✓' : '✕'}</div>
                {f.txt}
              </div>
            ))}
            <button className="plan-btn plan-btn-ghost" onClick={() => scrollTo('contact')}>Get Started →</button>
          </div>
          {/* Pro */}
          <div className="plan featured reveal">
            <div className="plan-tag">Most Popular</div>
            <div className="plan-name" style={{ color: 'var(--blue-glo)' }}>Pro</div>
            <div className="plan-price"><span className="big">£65</span></div>
            <div className="plan-period">per month · billed monthly</div>
            <div className="plan-divider" />
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-glo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Everything in Basic, plus:</div>
            {proFeatures.map((f, i) => (
              <div className="plan-feature" key={i}>
                <div className="icon icon-on">✓</div>
                {i === 0 ? <strong style={{ color: 'var(--text)' }}>{f}</strong> : f}
              </div>
            ))}
            <button className="plan-btn plan-btn-main" onClick={() => scrollTo('contact')}>Get Started →</button>
          </div>
        </div>
        <div className="reassure">
          {['No setup fees', 'Cancel anytime', 'No contracts', 'Works with any EPOS'].map(t => (
            <div className="reassure-item" key={t}><span style={{ color: 'var(--green)' }}>✓</span> {t}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────
function FinalCTA() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="section" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(37,99,235,0.08) 0%,var(--bg) 65%)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: 18 }}>
          Ready to run your store<br /><span className="gradient-text">with confidence?</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Stop guessing, start knowing. Upload once. Get insights every week. Make better decisions every day.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          <button className="btn-primary-lg" onClick={() => scrollTo('contact')}>
            Request a Demo <ArrowRight />
          </button>
          <button className="btn-secondary-lg" onClick={() => scrollTo('pricing')}>View Pricing</button>
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError('Please fill in your name and email.'); return }
    setError(''); setSending(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, business: form.business, message: form.message }),
      })
      if (res.ok) { setSent(true) }
      else { setError('Something went wrong. Please try again.') }
    } catch { setError('Network error. Please check your connection.') }
    finally { setSending(false) }
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-teal">Get In Touch</span>
          <h2>Let's talk about<br />your store.</h2>
          <p>Request a demo, ask questions, or get early access. We reply within 24 hours.</p>
        </div>
        {sent ? (
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '60px 40px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: 'var(--text)', marginBottom: 10 }}>Message received!</h3>
            <p style={{ color: 'var(--muted)' }}>We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <div className="contact-wrap">
            {[
              { key: 'name',     label: 'Your Name',     type: 'text',  ph: 'Jane Smith'           },
              { key: 'email',    label: 'Email Address', type: 'email', ph: 'jane@mystore.co.uk'   },
              { key: 'business', label: 'Business Name', type: 'text',  ph: 'Londis Horden'         },
            ].map(f => (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}
            <div className="field">
              <label>Message</label>
              <textarea rows={4} placeholder="Tell us about your store and what you're looking for…"
                value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
            </div>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: 'var(--red)', marginBottom: 16 }}>
                ⚠️ {error}
              </div>
            )}
            <button className="btn-primary-lg" onClick={handleSubmit} disabled={sending}
              style={{ width: '100%', justifyContent: 'center', borderRadius: 12, fontSize: 15, padding: 15, opacity: sending ? 0.7 : 1 }}>
              {sending ? 'Sending…' : <><span>Send Message</span><ArrowRight /></>}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-mark">📊</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Retail <span style={{ color: 'var(--blue-glo)' }}>Intelligence</span></div>
              <div style={{ fontSize: 11, color: 'var(--dim)' }}>Smart stock analytics for independent stores</div>
            </div>
          </div>
          <a href="mailto:hello@retail-intelligence.co.uk">hello@retail-intelligence.co.uk</a>
          <div style={{ fontSize: 12, color: 'var(--dim)' }}>© 2026 Retail Intelligence · Built in the UK</div>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useScrollReveal()

  return (
    <>
      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Ticker />
      <Stats />
      <Problem />
      <HowItWorks />
      <Features />
      <Pricing />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  )
}
