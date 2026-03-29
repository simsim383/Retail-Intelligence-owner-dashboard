import { useState, useEffect } from 'react'

const FORMSPREE_ID = 'mgonywry'

const ArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
)
const PlayIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
)
const XIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
)

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => {
      el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='opacity 0.65s ease, transform 0.65s ease'
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
}

// ── Phone shell component ────────────────────────────────────────────
function Phone({ children, label, badge, badgeColor = 'var(--green)' }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      {label && <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--dim)' }}>{label}</div>}
      <div style={{
        width:240, background:'#0A0F1A', borderRadius:28, overflow:'hidden',
        border:'2px solid #1C2A3E',
        boxShadow:'0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px #0D1422, inset 0 1px 0 rgba(255,255,255,0.04)',
        position:'relative',
      }}>
        {/* Notch */}
        <div style={{ height:8, background:'#06090F', display:'flex', justifyContent:'center', alignItems:'center', paddingTop:4 }}>
          <div style={{ width:40, height:3, borderRadius:99, background:'#1C2A3E' }} />
        </div>
        {/* Badge pill top-right */}
        {badge && (
          <div style={{ position:'absolute', top:14, right:10, fontSize:8, fontWeight:800, padding:'2px 7px', borderRadius:99, background: badgeColor==='var(--green)' ? 'rgba(16,185,129,0.15)':'rgba(37,99,235,0.15)', color:badgeColor, border:`1px solid ${badgeColor}40`, letterSpacing:'0.06em', textTransform:'uppercase' }}>
            ● {badge}
          </div>
        )}
        <div style={{ overflowY:'auto', maxHeight:520, scrollbarWidth:'none' }}>
          {children}
        </div>
        {/* Bottom bar */}
        <div style={{ height:16, background:'#06090F', display:'flex', justifyContent:'center', alignItems:'flex-end', paddingBottom:3 }}>
          <div style={{ width:60, height:2, borderRadius:99, background:'#1C2A3E' }} />
        </div>
      </div>
    </div>
  )
}

// ── App header ───────────────────────────────────────────────────────
function AppHeader({ name='Sarah', store='High Street, Leeds', weekly=true }) {
  return (
    <div style={{ padding:'10px 12px 8px', background:'#0A0F1A', borderBottom:'1px solid #1C2A3E' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
        <div style={{ width:22, height:22, borderRadius:6, background:'linear-gradient(135deg,#1D4ED8,#06B6D4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:'white' }}>R</div>
        <span style={{ fontWeight:800, fontSize:13, color:'#F0F4FF' }}>Retail Intelligence</span>
      </div>
      <div style={{ fontSize:9, color:'#4A637F' }}>Good afternoon, <span style={{ color:'#8BA3C7' }}>{name}</span></div>
      <div style={{ fontSize:9, color:'#4A637F' }}>{store}</div>
      <div style={{ display:'flex', gap:6, marginTop:8 }}>
        <div style={{ flex:1, background:weekly?'#111827':'transparent', border:'1px solid #1C2A3E', borderRadius:8, padding:'4px 8px', fontSize:9, fontWeight:600, color: weekly?'#F0F4FF':'#4A637F', textAlign:'center' }}>
          W/E 7 Mar (Latest)
        </div>
        <div style={{ flex:1, background:!weekly?'#111827':'transparent', border:'1px solid #1C2A3E', borderRadius:8, padding:'4px 8px', fontSize:9, fontWeight:600, color: !weekly?'#3B82F6':'#4A637F', textAlign:'center' }}>
          {weekly ? 'Monthly ▾' : 'February 2026'}
        </div>
      </div>
    </div>
  )
}

// ── KPI bar ──────────────────────────────────────────────────────────
function KPIBar({ rev, profit, margin, revSub, profitSub, dark=false }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:1, background:'#111827', padding:'10px 12px', borderBottom:'1px solid #1C2A3E' }}>
      {[
        { lbl:'REVENUE', val:rev, sub:revSub, c:'#60A5FA' },
        { lbl:'PROFIT',  val:profit, sub:profitSub, c: profitSub?.includes('−')?'#EF4444':'#10B981' },
        { lbl:'MARGIN',  val:margin, sub:null, c:'#F0F4FF' },
      ].map((k,i) => (
        <div key={i} style={{ textAlign: i===1?'center': i===2?'right':'left' }}>
          <div style={{ fontSize:7, fontWeight:700, color:'#4A637F', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:2 }}>{k.lbl}</div>
          <div style={{ fontSize:14, fontWeight:800, color:k.c, lineHeight:1 }}>{k.val}</div>
          {k.sub && <div style={{ fontSize:8, color: k.sub.includes('−')?'#EF4444':'#10B981', marginTop:1 }}>{k.sub}</div>}
        </div>
      ))}
    </div>
  )
}

// ── Section grid ─────────────────────────────────────────────────────
function SectionGrid({ sections }) {
  return (
    <div style={{ padding:'10px 10px', background:'#06090F' }}>
      <div style={{ fontSize:9, fontWeight:700, color:'#8BA3C7', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>
        {sections.isMonthly ? 'Monthly Sections' : 'Weekly Sections'}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
        {sections.items.map((s,i) => (
          <div key={i} style={{ background:'#0D1422', border:'1px solid #1C2A3E', borderRadius:10, padding:'10px 10px 8px', cursor:'pointer' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#243349'} onMouseLeave={e=>e.currentTarget.style.borderColor='#1C2A3E'}>
            <div style={{ fontSize:16, marginBottom:5 }}>{s.icon}</div>
            <div style={{ fontSize:10, fontWeight:700, color:'#F0F4FF', marginBottom:2 }}>{s.name}</div>
            <div style={{ fontSize:8, color:'#4A637F' }}>{s.desc}</div>
          </div>
        ))}
        {sections.single && (
          <div style={{ background:'#0D1422', border:'1px solid #1C2A3E', borderRadius:10, padding:'10px 10px 8px' }}>
            <div style={{ fontSize:16, marginBottom:5 }}>{sections.single.icon}</div>
            <div style={{ fontSize:10, fontWeight:700, color:'#F0F4FF', marginBottom:2 }}>{sections.single.name}</div>
            <div style={{ fontSize:8, color:'#4A637F' }}>{sections.single.desc}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const weeklyNav = [
  { icon:'📊', name:'Dashboard',   desc:'KPIs & weekly overview' },
  { icon:'🛒', name:'Purchases',   desc:'Stock purchases this week' },
  { icon:'📈', name:'Trending',    desc:'High margin + high velocity' },
  { icon:'⚠️', name:'Review',      desc:'Poor performers to reconsider' },
  { icon:'🏆', name:'Top Sellers', desc:'Top profit contributors' },
  { icon:'🚨', name:'Erosion',     desc:'Margin alerts & missing costs' },
  { icon:'🎯', name:'Promos',      desc:'Promotion decisions' },
  { icon:'⚙️', name:'Operations',  desc:'Daily trading & staffing' },
  { icon:'📦', name:'Categories',  desc:'Category performance' },
  { icon:'📅', name:'Coming Up',   desc:'Events & preparation' },
]

const monthlyNav = [
  { icon:'📊', name:'Dashboard',      desc:'Monthly KPIs & overview' },
  { icon:'📦', name:'Categories',     desc:'vs baseline performance' },
  { icon:'📋', name:'Baseline',       desc:'Velocity spikes & erosion' },
  { icon:'📈', name:'Trending',       desc:'Above-baseline products' },
  { icon:'⚠️', name:'Review',         desc:'Poor performers' },
  { icon:'🏆', name:'Top Sellers',    desc:'Top profit contributors' },
  { icon:'🗂️', name:'Shelf Density',  desc:'ELITE / OK / THIEF audit' },
  { icon:'🏷️', name:'Competitors',    desc:'vs Tesco & Asda pricing' },
  { icon:'🧹', name:'Clear Shelf',    desc:'Slow mover promotions' },
  { icon:'⚙️', name:'Operations',     desc:'Staffing & trading patterns' },
  { icon:'💰', name:'Financial',      desc:'Monthly P&L summary' },
  { icon:'📅', name:'Coming Up',      desc:'Events & forecast' },
]

// ── Competitor pricing screen ─────────────────────────────────────────
function CompetitorScreen() {
  const products = [
    { name:'Coca Cola Classic Pm279', us:'£2.79', tesco:'£2.55', asda:'£2.58', status:'RISK'     },
    { name:'Pepsi Max Pm219',         us:'£2.19', tesco:'£2.15', asda:'£2.14', status:'RISK'     },
    { name:'Red Bull Energy Pm265',   us:'£2.65', tesco:'£2.70', asda:'£2.84', status:'IN-LINE'  },
    { name:'Lucozade Energy Org…',    us:'£2.00', tesco:'£1.69', asda:'£1.74', status:'RISK'     },
    { name:'Fosters 10 packs',        us:'£12.00',tesco:'£10.00',asda:'£9.00', status:'RISK'     },
    { name:'Walkers Cheese & Onion…', us:'£1.35', tesco:'£1.20', asda:'£1.20', status:'IN-LINE'  },
    { name:'Cadbury Dairy Milk Pm195',us:'£1.95', tesco:'£1.85', asda:'£1.75', status:'RISK'     },
    { name:'Haribo Tangfastics Pm125',us:'£1.00', tesco:'£1.25', asda:'£1.10', status:'UPSIDE'   },
    { name:'Monster Energy Pm175',    us:'£1.50', tesco:'£2.00', asda:'£2.05', status:'UPSIDE'   },
    { name:'Embleton Hall Milk…',     us:'£1.65', tesco:'£1.65', asda:'£1.65', status:'IN-LINE'  },
    { name:'Paramount Original Sk Ttt',us:'£13.00',tesco:'£13.10',asda:'£13.10',status:'UPSIDE' },
  ]
  const statusColor = s => s==='RISK'?'#EF4444': s==='UPSIDE'?'#10B981':'#F59E0B'
  return (
    <div style={{ background:'#06090F', padding:'10px 12px 0' }}>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
        <span style={{ fontSize:14 }}>🏷️</span>
        <span style={{ fontSize:11, fontWeight:700, color:'#F0F4FF' }}>Competitor Pricing — vs Tesco & Asda</span>
      </div>
      <div style={{ fontSize:8, color:'#4A637F', marginBottom:8 }}>15-product fixed basket. Tap any product for analysis.</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4, marginBottom:10 }}>
        {[{n:3,lbl:'UPSIDE',bg:'rgba(16,185,129,0.15)',c:'#10B981'},{n:4,lbl:'IN-LINE',bg:'rgba(245,158,11,0.1)',c:'#F59E0B'},{n:7,lbl:'RISK',bg:'rgba(239,68,68,0.15)',c:'#EF4444'}].map((b,i)=>(
          <div key={i} style={{ background:b.bg, border:`1px solid ${b.c}30`, borderRadius:6, textAlign:'center', padding:'6px 0' }}>
            <div style={{ fontSize:14, fontWeight:800, color:b.c }}>{b.n}</div>
            <div style={{ fontSize:7, fontWeight:700, color:b.c, letterSpacing:'0.06em' }}>{b.lbl}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', fontSize:7, fontWeight:700, color:'#4A637F', textTransform:'uppercase', letterSpacing:'0.05em', paddingBottom:4, borderBottom:'1px solid #1C2A3E', marginBottom:2 }}>
        <span>PRODUCT</span><span style={{textAlign:'center'}}>US</span><span style={{textAlign:'center'}}>TESCO</span><span style={{textAlign:'right'}}>STATUS</span>
      </div>
      {products.map((r,i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', alignItems:'center', padding:'5px 0', borderBottom:'1px solid rgba(28,42,62,0.4)', fontSize:8 }}>
          <span style={{ color:'#8BA3C7', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:4 }}>{r.name}</span>
          <span style={{ color:'#F0F4FF', fontWeight:600, textAlign:'center' }}>{r.us}</span>
          <span style={{ color:'#4A637F', textAlign:'center' }}>{r.tesco}</span>
          <span style={{ color:statusColor(r.status), fontWeight:700, fontSize:7, textAlign:'right' }}>{r.status}</span>
        </div>
      ))}
    </div>
  )
}

// ── Operations screen ─────────────────────────────────────────────────
function OperationsScreen() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const heights = [42, 72, 68, 70, 71, 74, 95]
  const colors  = ['#3B82F6','#3B82F6','#3B82F6','#3B82F6','#3B82F6','#3B82F6','#10B981']
  return (
    <div style={{ background:'#06090F', padding:'10px 12px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
        <span style={{ fontSize:14 }}>⚙️</span>
        <span style={{ fontSize:11, fontWeight:700, color:'#F0F4FF' }}>Operations</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:10 }}>
        {[{lbl:'TRANSACTIONS',val:'1,250',c:'#60A5FA'},{lbl:'AVG SPEND',val:'£7.90',c:'#10B981'},{lbl:'BUSIEST',val:'Saturday',c:'#F0F4FF'}].map((k,i)=>(
          <div key={i}>
            <div style={{ fontSize:7, fontWeight:700, color:'#4A637F', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{k.lbl}</div>
            <div style={{ fontSize:i===2?10:13, fontWeight:800, color:k.c }}>{k.val}</div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:80, marginBottom:4 }}>
        {days.map((d,i) => (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
            <div style={{ width:'100%', background:colors[i], borderRadius:'3px 3px 0 0', height:`${heights[i]}%`, opacity: i===0?0.6:1 }} />
            <div style={{ fontSize:7, color:'#4A637F' }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize:7, color:'#4A637F', marginBottom:8 }}>■ Quiet ■ Normal ■ Peak</div>
      <div style={{ fontSize:8, fontWeight:700, color:'#4A637F', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Peak Hours & Staffing</div>
      {[
        { time:'11:00–14:00', label:'Lunch rush',               tills:'2 tills' },
        { time:'16:00–18:00', label:'After-school + after-work', tills:'2 tills' },
        { time:'07:00–09:00', label:'Morning essentials',        tills:'1 till'  },
        { time:'19:00–22:00', label:'Ramadan iftar window',      tills:'1 till'  },
      ].map((r,i)=>(
        <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr 0.6fr', alignItems:'center', padding:'4px 0', borderBottom:'1px solid rgba(28,42,62,0.4)', fontSize:8 }}>
          <span style={{ color:'#8BA3C7', fontWeight:600 }}>{r.time}</span>
          <span style={{ color:'#4A637F' }}>{r.label}</span>
          <span style={{ color:'#3B82F6', fontWeight:700, textAlign:'right' }}>{r.tills}</span>
        </div>
      ))}
      <div style={{ marginTop:8, background:'#0D1422', border:'1px solid #1C2A3E', borderRadius:8, padding:'8px 10px', fontSize:8 }}>
        <div style={{ color:'#60A5FA', fontWeight:700, fontSize:7, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>Key Metrics</div>
        <div style={{ color:'#8BA3C7', lineHeight:1.6 }}>
          <div>🏠 Suggested day off: Sunday (quietest — £869, 77 transactions)</div>
          <div>🔲 Two tills needed: 11am–2pm and 4pm–6pm</div>
          <div style={{ color:'#4A637F' }}>Basket note: Saturday highest avg spend at £9.82 — post-payday buying in bulk</div>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard screen ──────────────────────────────────────────────────
function DashboardScreen() {
  return (
    <div style={{ background:'#06090F', padding:'10px 12px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
        <span style={{ fontSize:14 }}>📊</span>
        <span style={{ fontSize:11, fontWeight:700, color:'#F0F4FF' }}>Dashboard</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:10 }}>
        {[{lbl:'REVENUE',val:'£9,871',sub:'▲ +3.5% vs bench',sc:'#10B981'},{lbl:'GROSS PROFIT',val:'£1,295',sub:'▼ -1.5% WoW',sc:'#EF4444',center:true},{lbl:'AVG MARGIN',val:'18.4%',right:true}].map((k,i)=>(
          <div key={i} style={{ textAlign:k.center?'center':k.right?'right':'left' }}>
            <div style={{ fontSize:7, color:'#4A637F', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{k.lbl}</div>
            <div style={{ fontSize:13, fontWeight:800, color:'#60A5FA' }}>{k.val}</div>
            {k.sub && <div style={{ fontSize:7, color:k.sc }}>{k.sub}</div>}
          </div>
        ))}
      </div>
      <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:8, padding:'8px 10px', marginBottom:10 }}>
        <div style={{ fontSize:7, color:'#F59E0B', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>Hidden Profit</div>
        <div style={{ fontSize:18, fontWeight:800, color:'#F59E0B' }}>£707</div>
        <div style={{ fontSize:8, color:'#F59E0B', opacity:0.7 }}>▼ 308 items with missing costs</div>
      </div>
      {/* Mini chart */}
      <div style={{ background:'#0D1422', border:'1px solid #1C2A3E', borderRadius:8, padding:'8px', marginBottom:10 }}>
        <div style={{ display:'flex', gap:4, marginBottom:6 }}>
          {['1W','1M','3M','1Y'].map((t,i)=>(
            <div key={i} style={{ fontSize:8, fontWeight:700, padding:'2px 7px', borderRadius:99, background:i===0?'#2563EB':'transparent', color:i===0?'white':'#4A637F' }}>{t}</div>
          ))}
        </div>
        <svg viewBox="0 0 200 60" style={{ width:'100%', height:50 }}>
          <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/></linearGradient></defs>
          <path d="M0,50 C20,48 40,30 60,28 S90,35 110,30 S150,15 200,5" stroke="#3B82F6" strokeWidth="2" fill="none"/>
          <path d="M0,50 C20,48 40,30 60,28 S90,35 110,30 S150,15 200,5 L200,60 L0,60 Z" fill="url(#cg)"/>
        </svg>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:7, color:'#4A637F' }}>
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><span key={d}>{d}</span>)}
        </div>
      </div>
      {/* AI Summary */}
      <div style={{ background:'rgba(37,99,235,0.06)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:8, padding:'8px 10px' }}>
        <div style={{ fontSize:8, fontWeight:700, color:'#60A5FA', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>✦ AI Summary</div>
        {[
          { n:1, text:'Revenue £9,871 — strongest week since November, up +11.3% WoW. Post-payday Saturday (£1,846) and Ramadan-related Household surge (+21% WoW) drove the week.', c:'#60A5FA' },
          { n:2, text:'Elux Nic Salts Mr Blue is selling 98 units/week completely untracked — a single £1.30 cost entry recovers £120+/week in visible profit.', c:'#F59E0B' },
          { n:3, text:'Tobacco surged to £2,003 (+34% WoW). Alternative Smoking £589 (+66% WoW) but mostly untracked.', c:'#10B981' },
          { n:4, text:'Milk prices raised — well done. Both 2L lines now at correct 30%+ margin. £14/week erosion flagged for 4 weeks has been fixed.', c:'#10B981' },
        ].map((ins,i)=>(
          <div key={i} style={{ display:'flex', gap:6, marginBottom:5 }}>
            <div style={{ width:14, height:14, borderRadius:'50%', background:`${ins.c}20`, border:`1px solid ${ins.c}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:7, fontWeight:800, color:ins.c, flexShrink:0, marginTop:1 }}>{ins.n}</div>
            <div style={{ fontSize:8, color:'#8BA3C7', lineHeight:1.55 }}>{ins.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────
function Navbar({ scrolled, menuOpen, setMenuOpen }) {
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const links = [
    { label: 'The App',     id: 'app-preview' },
    { label: 'Features',    id: 'features'    },
    { label: 'Why It Works',id: 'why'         },
    { label: 'Pricing',     id: 'pricing'     },
    { label: 'Contact',     id: 'contact'     },
  ]
  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/favicon.png" alt="Retail Intelligence" style={{ width:36, height:36, borderRadius:8, objectFit:'cover' }} />
            <span className="logo-text">Retail <span>Intelligence</span></span>
          </div>
          <ul className="nav-links">{links.map(l => (<li key={l.id}><a onClick={() => scrollTo(l.id)}>{l.label}</a></li>))}</ul>
          <div className="nav-cta">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>Sign up →</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (<a key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</a>))}
        <button className="btn-primary-lg" onClick={() => { scrollTo('contact'); setMenuOpen(false) }} style={{ width:'100%', justifyContent:'center', marginTop:16 }}>
          Sign Up <ArrowRight />
        </button>
      </div>
    </>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="hero">
      <div className="hero-grid" />
      <div className="container">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge fu d1"><span className="live-dot" />Built for independent convenience stores</div>
            <h1 className="hero-title fu d2">Your store's data.<br /><span className="gradient-text">Working for you.</span></h1>
            <p className="hero-body fu d3">
              Retail Intelligence gives you a second pair of eyes on your business — every single week.
              Decisions based on actual sales data, not instinct. Without being in the shop 24/7.
            </p>
            <div className="hero-pills fu d4">
              <span className="hero-pill">✓ Make better buying decisions</span>
              <span className="hero-pill">✓ Daily health check</span>
              <span className="hero-pill">✓ Forecast with confidence</span>
            </div>
            <div className="hero-btns fu d5">
              <button className="btn-primary-lg" onClick={() => scrollTo('contact')}>Request a Demo <ArrowRight /></button>
              <button className="btn-secondary-lg" onClick={() => scrollTo('app-preview')}><PlayIcon /> See the App</button>
            </div>
          </div>

          {/* Hero dashboard mockup */}
          <div style={{ position:'relative', width:'100%', maxWidth:780 }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:300, height:200, background:'radial-gradient(ellipse,rgba(37,99,235,0.18),transparent 70%)', pointerEvents:'none' }} />
            <div className="dash-wrap">
              <div className="dash-bar">
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div className="dash-dots">
                    <span style={{ background:'#FF5F57' }} /><span style={{ background:'#FEBC2E' }} /><span style={{ background:'#28C840' }} />
                  </div>
                  <span className="dash-title">retail-intelligence.app — W/E 07 Mar 2026</span>
                </div>
                <div className="dash-live"><span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block' }} /> Live</div>
              </div>
              <div className="kpi-row">
                {[{val:'£9,871',lbl:'Revenue',color:'var(--blue-glo)'},{val:'£1,295',lbl:'Profit',color:'var(--green)'},{val:'18.4%',lbl:'Margin',color:'var(--cyan)'},{val:'+11.3%',lbl:'vs Last Wk',color:'var(--amber)'}].map((k,i) => (
                  <div className="kpi" key={i}><div className="kpi-val" style={{ color:k.color }}>{k.val}</div><div className="kpi-lbl">{k.lbl}</div></div>
                ))}
              </div>
              <div className="dash-body">
                <div className="dash-panel">
                  <div className="dp-head">Top Sellers <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:99, background:'rgba(37,99,235,0.15)', color:'var(--blue-glo)' }}>This Week</span></div>
                  {[{name:'Tobacco & Vaping',val:'+34% ↑',up:true},{name:'Alt. Smoking',val:'+66% ↑',up:true},{name:'Alcohol',val:'£2,003',up:null},{name:'Soft Drinks',val:'£862',up:null}].map((r,i) => (
                    <div className="dp-row" key={i}>
                      <span style={{ color:'var(--text)', fontWeight:600 }}>{r.name}</span>
                      <span className={r.up===true?'trend-up':''} style={r.up===null?{color:'var(--muted)',fontWeight:600}:{}}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <div className="dash-panel">
                  <div className="dp-head">Alerts <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:99, background:'rgba(239,68,68,0.15)', color:'var(--red)' }}>Action Needed</span></div>
                  {[{name:'Galaxy Ripple',val:'⚠ 5 sales vs full box',dn:true},{name:'Chocomel',val:'Negative margin',dn:true},{name:'Twix White',val:'Sales doubled — restock',dn:false},{name:'Milk 2L Semi',val:'Margin fixed ✓',dn:false}].map((r,i) => (
                    <div className="dp-row" key={i}>
                      <span style={{ color:'var(--text)', fontWeight:600 }}>{r.name}</span>
                      <span className={r.dn?'trend-dn':'trend-up'}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding:'0 14px 14px' }}>
                <div style={{ background:'rgba(37,99,235,0.07)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:10, padding:'10px 14px', fontSize:11, color:'var(--muted)', lineHeight:1.6 }}>
                  <span style={{ color:'var(--blue-glo)', fontWeight:700 }}>✦ AI Insight — </span>
                  Paramount cigarettes up <strong style={{ color:'var(--text)' }}>+100% WoW</strong>. A new regular customer. Reorder now or you'll lose them.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Ticker ────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    { dot:'var(--red)',      jsx:<>Galaxy Ripple: full box stacked, only <strong style={{color:'var(--text)'}}>5 sales recorded</strong> — where has the rest gone?</> },
    { dot:'var(--green)',    jsx:<>Milk raised from £1.65 to £1.75 — that's <strong style={{color:'var(--text)'}}>£728 extra profit per year</strong> from one product</> },
    { dot:'var(--amber)',    jsx:<>San Miguel: instinct buy of 20 cases will take <strong style={{color:'var(--text)'}}>10 weeks to clear</strong> — cash tied up</> },
    { dot:'var(--blue-glo)',jsx:<>Chocomel flagged as <strong style={{color:'var(--text)'}}>negative margin</strong> — stopped the client losing money before they reordered</> },
    { dot:'var(--cyan)',     jsx:<>Twix White sales doubled — client didn't know, <strong style={{color:'var(--text)'}}>lost a customer</strong> when it ran out</> },
    { dot:'var(--red)',      jsx:<>Galaxy Ripple: full box stacked, only <strong style={{color:'var(--text)'}}>5 sales recorded</strong> — where has the rest gone?</> },
    { dot:'var(--green)',    jsx:<>Milk raised from £1.65 to £1.75 — that's <strong style={{color:'var(--text)'}}>£728 extra profit per year</strong> from one product</> },
    { dot:'var(--amber)',    jsx:<>San Miguel: instinct buy of 20 cases will take <strong style={{color:'var(--text)'}}>10 weeks to clear</strong> — cash tied up</> },
    { dot:'var(--blue-glo)',jsx:<>Chocomel flagged as <strong style={{color:'var(--text)'}}>negative margin</strong> — stopped the client losing money before they reordered</> },
    { dot:'var(--cyan)',     jsx:<>Twix White sales doubled — client didn't know, <strong style={{color:'var(--text)'}}>lost a customer</strong> when it ran out</> },
  ]
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span className="ticker-item" key={i}><span className="ticker-dot" style={{ background:item.dot }} />{item.jsx}</span>
        ))}
      </div>
    </div>
  )
}

// ── Stats ─────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div className="stats-strip">
      <div className="container">
        <div className="stats-grid">
          {[
            { num:'£728',   color:'var(--green)',    lbl:'Extra profit from one price change' },
            { num:'£300+',  color:'var(--amber)',    lbl:'Tied up in one instinct buy'        },
            { num:'1 min',  color:'var(--cyan)',     lbl:'Daily upload time'                 },
            { num:'1 day', color:'var(--blue-glo)', lbl:'To start making better decisions'  },
          ].map((s, i) => (
            <div key={i} className="reveal">
              <div className="stat-num" style={{ color:s.color }}>{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── App Preview ───────────────────────────────────────────────────────
function AppPreview() {
  return (
    <section id="app-preview" className="section" style={{ background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">Inside the App</span>
          <h2>Daily insight.<br /><span className="gradient-text">Monthly intelligence.</span></h2>
          <p>A mobile-first dashboard with view of your daily, weekly and monthly data to help you view, manage and plan your business.</p>
        </div>

        {/* Row 1 — Weekly + Monthly nav grids */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:40, marginBottom:60 }}>
          <div className="reveal">
            <Phone label="Weekly View" badge="LIVE">
              <AppHeader />
              <KPIBar rev="£9,871" profit="£1,295" margin="18.4%" revSub="▲ 9.3% vs bench" profitSub="▼ -1.5% WoW" />
              <SectionGrid sections={{ items: weeklyNav.slice(0,10), single: { icon:'✅', name:'Actions', desc:'Scorecard & to-do list' } }} />
            </Phone>
          </div>
          <div className="reveal">
            <Phone label="Monthly View — Pro" badge="MONTHLY" badgeColor="var(--blue-glo)">
              <AppHeader weekly={false} />
              <KPIBar rev="£36,118" profit="£5,107" margin="19.1%" revSub="▲ +0.1% vs 2025" profitSub="▲ +14.9% vs 2025" />
              <SectionGrid sections={{ items: monthlyNav.slice(0,12), isMonthly:true, single: { icon:'✅', name:'Actions', desc:'Monthly action plan' } }} />
            </Phone>
          </div>
        </div>

        {/* Row 2 — Competitor pricing + Operations */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:40 }}>
          <div className="reveal">
            <Phone label="Competitor Pricing — Pro" badge="MONTHLY" badgeColor="var(--blue-glo)">
              <AppHeader weekly={false} />
              <KPIBar rev="£36,118" profit="£5,107" margin="19.1%" revSub="▲ +0.1% vs 2025" profitSub="▲ +14.9% vs 2025" />
              <CompetitorScreen />
            </Phone>
          </div>
          <div className="reveal">
            <Phone label="Operations & Staffing" badge="LIVE">
              <AppHeader />
              <KPIBar rev="£9,871" profit="£1,295" margin="18.4%" revSub="▲ 9.3% vs bench" profitSub="▼ -1.5% WoW" />
              <OperationsScreen />
            </Phone>
          </div>
        </div>

        {/* Caption row */}
        <div style={{ marginTop:40, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
          {[
            { icon:'📱', title:'Mobile-first',          desc:'Designed for store owners on the move — check your numbers from anywhere, any time, on any device.' },
            { icon:'📅', title:'Daily + Weekly + Monthly', desc:' EPOS analysis and deep-dives into your data', pro:true },
            { icon:'🏷️', title:'Competitor Pricing · Pro',desc:'Your prices vs Tesco & Asda across a fixed 15-product basket every month — know your position.', pro:true },
            { icon:'⚙️', title:'Operations & Staffing',  desc:'Find your average basket spend, busiest day and quietest day all from your own data.' },
          ].map((c,i)=>(
            <div className="card reveal" key={i} style={{ textAlign:'center', position:'relative' }}>
              {c.pro && <div style={{ position:'absolute', top:-10, right:12, fontSize:9, fontWeight:800, padding:'2px 9px', borderRadius:99, background:'rgba(37,99,235,0.15)', color:'var(--blue-glo)', border:'1px solid rgba(37,99,235,0.3)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Pro</div>}
              <div style={{ fontSize:28, marginBottom:10 }}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Why It Works ──────────────────────────────────────────────────────
function WhyItWorks() {
  const pillars = [
    {
      icon:'🧠', color:'rgba(37,99,235,0.12)', accent:'var(--blue-glo)', badge:'badge-blue',
      label:'1 — Decision Making', title:'Buy based on data,\nnot instinct.',
      body:'How much should you order? When should you promote? Which staff hours make sense? These decisions happen every day — and most store owners are making them on gut feel alone.',
      points:['Know exactly how much to order based on real weekly sales','Plan staff hours and rotas around busy and quiet days','Identify which promotions are actually working','Stop tying up cash in stock that takes 10 weeks to clear'],
      storyText:"A client instinct-bought 20 cases of San Miguel. When we showed them it would take 10 weeks to clear and the money was tied up for the foreseeable future, they reconsidered the order immediately.",
      storyTag:'💰 Monetary',
    },
    {
      icon:'🏥', color:'rgba(16,185,129,0.12)', accent:'var(--green)', badge:'badge-green',
      label:'2 — Weekly Health Check', title:"Know what's going well\nand what isn't.",
      body:"Every week you get a clear view of what's growing, declining, and whether you have a potential theft or stock discrepancy problem. The data you need — without being in the shop 24/7.",
      points:['Top and bottom performers by category, every week','Spot slow-moving lines eating into shelf space and cash','Flag discrepancies between stock stacked and sales recorded','Track trends week on week before problems compound'],
      storyText:"A client saw their low margin products each week and could now pin point which specific products to increase their price on immediately",
      storyTag:'🔍 Stock Control',
    },
    {
      icon:'👁️', color:'rgba(6,182,212,0.12)', accent:'var(--cyan)', badge:'badge-cyan',
      label:'3 — Control', title:"A second pair of eyes.\n24 hours a day.",
      body:"You can't be in the shop all the time. Retail Intelligence gives you the data and insight you need to stay in control — whether you're on site or not. Deal with the past to profit in the future.",
      points:['Full visibility without being in the shop 24/7','Ability to forecast based on patterns, not hope','Catch pricing errors before you lose money on them','Staff-to-customer trends surface before you miss them'],
      storyText:"A customer started buying Paramount cigarettes and sales doubled. Staff didn't flag it. The client didn't reorder. They nearly lost the customer. With Retail Intelligence, that trend surfaces automatically.",
      storyTag:'👥 Staff & Customer',
    },
  ]
  return (
    <section id="why" className="section" style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">Why Buy Retail Intelligence</span>
          <h2>Three reasons every<br />independent owner needs this.</h2>
          <p>These aren't features. They're the three fundamental things every store needs — and most don't have.</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
          {pillars.map((p, i) => (
            <div key={i} className="reveal pillar-card" style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
              <div style={{ padding:36, borderRight:'1px solid var(--border)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:p.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{p.icon}</div>
                  <span className={`badge ${p.badge}`}>{p.label}</span>
                </div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.3rem,2.2vw,1.8rem)', color:'var(--text)', lineHeight:1.2, marginBottom:14, whiteSpace:'pre-line' }}>{p.title}</h3>
                <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.75, marginBottom:20 }}>{p.body}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                  {p.points.map((pt, j) => (
                    <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:13, color:'var(--muted)' }}>
                      <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, background:p.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:p.accent, marginTop:1 }}>✓</div>
                      {pt}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding:36, background:'var(--bg2)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:p.accent, marginBottom:16 }}>💬 Real Example</div>
                <blockquote style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(0.95rem,1.6vw,1.15rem)', color:'var(--text)', lineHeight:1.65, fontStyle:'italic', marginBottom:20, borderLeft:`3px solid ${p.accent}`, paddingLeft:20 }}>
                  "{p.storyText}"
                </blockquote>
                <span style={{ fontSize:12, fontWeight:700, padding:'5px 14px', borderRadius:99, background:p.color, color:p.accent, display:'inline-flex', alignSelf:'flex-start' }}>{p.storyTag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Problem ───────────────────────────────────────────────────────────
function Problem() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="section" style={{ background:'var(--bg)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-red">Sound Familiar?</span>
          <h2>If you could get one insight<br />each week — what would it be?</h2>
          <p>That's the question we ask every store owner. Here's what they tell us they're struggling with.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16, marginBottom:28 }}>
          {[
            { icon:'📦', title:"I'm ordering on instinct",    desc:"You buy what feels right. Sometimes you're overstocked for 10 weeks. Sometimes you run out and lose a customer. There's a better way." },
            { icon:'💸', title:"I'm losing margin silently",  desc:"A supplier raises their price. Your sell price doesn't change. You're losing money on every unit and won't notice for weeks." },
            { icon:'👀', title:"Staff aren't flagging things", desc:"Sales double on a product. Something goes missing. A new regular appears. Nobody tells you. You find out too late — if at all." },
            { icon:'🔢', title:"I barely use my data",        desc:"Your EPOS records everything. But nobody's turning it into insight. It sits in a spreadsheet that nobody reads. Every week." },
          ].map((p, i) => (
            <div className="card reveal" key={i}>
              <div className="card-icon" style={{ background:'rgba(239,68,68,0.1)' }}>{p.icon}</div>
              <h3>{p.title}</h3><p>{p.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background:'rgba(37,99,235,0.06)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:14, padding:'24px 28px', textAlign:'center' }}>
          <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.1rem,2vw,1.4rem)', color:'var(--text)', lineHeight:1.6, marginBottom:14, fontStyle:'italic' }}>
            "How well do you use data in your business — on a scale of 1 to 10?"
          </p>
          <p style={{ fontSize:14, color:'var(--muted)', marginBottom:20 }}>Most store owners say 2 or 3. Retail Intelligence takes you to 8 — without needing to be a data analyst.</p>
          <button className="btn-primary-lg" onClick={() => scrollTo('contact')} style={{ fontSize:14, padding:'12px 24px' }}>
            Change That — Request a Demo <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────
function CheckList({ checks, accent }) {
  return (
    <div className="feature-checks">
      {checks.map((c, i) => (
        <div className="feature-check" key={i}>
          <div className="check-dot" style={accent?{background:`${accent}20`,borderColor:`${accent}40`,color:accent}:{}}> ✓</div>
          {c}
        </div>
      ))}
    </div>
  )
}

function AiBox({ label, text }) {
  return (
    <div className="ai-box" style={{ margin:'12px 16px 14px' }}>
      <div className="ai-label">✦ {label}</div>
      <div className="ai-text" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

function ScreenShell({ title, badge, badgeClass='badge-blue', children }) {
  return (
    <div className="screen">
      <div className="screen-bar">
        <div className="dash-dots"><span style={{background:'#FF5F57'}}/><span style={{background:'#FEBC2E'}}/><span style={{background:'#28C840'}}/></div>
        <span className="screen-bar-title">{title}</span>
        <span className={`badge ${badgeClass}`} style={{fontSize:10,padding:'3px 10px'}}>{badge}</span>
      </div>
      {children}
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="section" style={{ background:'var(--surface)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">Features</span>
          <h2>Every view you need.<br /><span className="gradient-text">In one dashboard.</span></h2>
          <p>Ten weekly views and twelve monthly views — all built around your actual EPOS data.</p>
        </div>

        {/* 1 — Top Sellers */}
        <div className="feature-row reveal">
          <div>
            <div className="feature-label">Top Sellers</div>
            <h2 className="feature-title">Know what's selling.<br />Know what's not.</h2>
            <p className="feature-body">Best and worst performers ranked every week. See which categories are growing, which lines are freeing up space and cash, and where your real volume comes from.</p>
            <CheckList checks={['Best sellers ranked by revenue, profit, and units','Worst performers flagged — free up space and cash','Category and department breakdowns with WoW','Ask about specific lines rather than the whole shop', ,'Increase shelf spacing on your top sellers']} />
          </div>
          <ScreenShell title="Top Sellers — W/E 07 Mar" badge="Best Sellers">
            {[
              {cat:'🚬 Tobacco & Vaping',sub:'214 units · £2,003 rev',tag:'+34% WoW',tagCls:'tag-green',hi:true},
              {cat:'🍺 Alcohol',sub:'189 units · £1,892 rev',tag:'Stable',tagCls:'tag-blue'},
              {cat:'🥤 Soft Drinks',sub:'312 units · £862 rev',tag:'+12%',tagCls:'tag-green'},
              {cat:'🍞 Grocery',sub:'178 units · £741 rev',tag:'−4%',tagCls:'tag-amber'},
              {cat:'🧴 Household',sub:'94 units · £412 rev',tag:'+21%',tagCls:'tag-green'},
            ].map((r,i) => (
              <div className="row" key={i} style={r.hi?{background:'rgba(37,99,235,0.05)'}:{}}>
                <div><div style={{fontSize:12,fontWeight:700,color:'var(--text)'}}>{r.cat}</div><div style={{fontSize:10,color:'var(--dim)'}}>{r.sub}</div></div>
                <span className={`tag ${r.tagCls}`}>{r.tag}</span>
              </div>
            ))}
            <AiBox label="AI Insight" text="Household up <strong>+21% WoW</strong> — Ramadan demand. Stock dates, Vimto and bottled water before next weekend." />
          </ScreenShell>
        </div>

        {/* 2 — Trending */}
        <div className="feature-row flip reveal">
          <div>
            <div className="feature-label">Trending</div>
            <h2 className="feature-title">Catch the wave<br />before it breaks.</h2>
            <p className="feature-body">Twix White doubled in sales — the client didn't notice, ran out, and lost a customer. Paramount cigarettes were quietly building a new regular. These things surface automatically.</p>
            <CheckList checks={['Products with ≥40% WoW growth flagged automatically','Minimum thresholds filter out one-off noise','Rolling 3-month average gives real context','Never run out of a line that\'s suddenly flying']} />
          </div>
          <ScreenShell title="Trending — Significant WoW Growth" badge="This Week">
            {[
              {name:'Paramount Cigarettes',cat:'Tobacco — new regular customer',val:'+100%',sub:'Reorder immediately'},
              {name:'Twix White',cat:'Confectionery — nearly missed this',val:'+85%',sub:'Ran out last time'},
              {name:'QC Cream Sherry',cat:'Alcohol',val:'+67%',sub:'10 → 6 units'},
              {name:'Vimto Cordial 725ml',cat:'Soft Drinks — Ramadan',val:'+55%',sub:'11 → 7 units'},
            ].map((r,i) => (
              <div className="row" key={i}>
                <div><div style={{fontSize:12,fontWeight:700,color:'var(--text)'}}>{r.name}</div><div style={{fontSize:10,color:'var(--dim)'}}>{r.cat}</div></div>
                <div style={{textAlign:'right'}}><div style={{fontSize:13,fontWeight:800,color:'var(--green)'}}>{r.val}</div><div style={{fontSize:10,color:'var(--dim)'}}>{r.sub}</div></div>
              </div>
            ))}
            <AiBox label="AI Insight" text="Paramount up <strong>+100%</strong> — new regular customer. Reorder before next delivery or you risk losing the repeat business." />
          </ScreenShell>
        </div>

        {/* 3 — Margin Erosion */}
        <div className="feature-row reveal">
          <div>
            <div className="feature-label">Margin Erosion</div>
            <h2 className="feature-title">£728 a year.<br />From one product.</h2>
            <p className="feature-body">Milk raised from £1.65 to £1.75 generated an extra £14 per week — £728 per year from a single change. Retail Intelligence shows you exactly where to look and what to change, every week.</p>
            <CheckList checks={['Sell price vs invoice cost checked every week','Specific price increase suggestions per product','Flags supplier price rises — Jack\'s lettuce example','Negative margin alerts catch staff pricing errors']} />
          </div>
          <ScreenShell title="Margin Erosion — Action Required" badge="3 Alerts" badgeClass="badge-red">
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'8px 16px',fontSize:10,fontWeight:700,color:'var(--dim)',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'1px solid var(--border)'}}>
              <span>Product</span><span>Sell</span><span>Target</span><span>Margin</span>
            </div>
            {[
              {name:"Jack's Lettuce",cat:'Supplier ↑ price',sell:'£0.89',tgt:'£0.95',margin:'6.1%',mc:'tag-red'},
              {name:'Chocomel 250ml',cat:'Staff error — wrong price',sell:'£1.49',tgt:'£1.82',margin:'−11.2%',mc:'tag-red'},
              {name:'Hula Hoops BBQ',cat:'Under-priced',sell:'£0.99',tgt:'£1.03',margin:'14.1%',mc:'tag-amber'},
              {name:'Milk 2L Semi',cat:'After raise — well done',sell:'£1.75',tgt:'£1.61',margin:'32.4% ✓',mc:'tag-green'},
            ].map((r,i) => (
              <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',alignItems:'center',padding:'10px 16px',borderBottom:i<3?'1px solid rgba(28,42,62,0.5)':'none',fontSize:12}}>
                <div><div style={{fontWeight:600,color:'var(--text)'}}>{r.name}</div><div style={{fontSize:10,color:'var(--dim)'}}>{r.cat}</div></div>
                <span style={{color:'var(--text)'}}>{r.sell}</span>
                <span style={{color:'var(--amber)'}}>{r.tgt}</span>
                <span className={`tag ${r.mc}`}>{r.margin}</span>
              </div>
            ))}
            <AiBox label="AI Insight" text="Chocomel wrong-priced — caught before any more stock was ordered. Milk raise to £1.75 now generating <strong>£14/wk extra profit</strong>." />
          </ScreenShell>
        </div>


        {/* 5 — AI Summary */}
        <div className="feature-row reveal">
          <div>
            <div className="feature-label" style={{ color:'var(--amber)' }}>AI Weekly Summary · Pro</div>
            <h2 className="feature-title">A smart brief, every<br /><span className="amber-text">Monday morning.</span></h2>
            <p className="feature-body">Five sharp AI-generated insights every week. Not generic — based on your specific numbers. What happened, what it means, and what to do next.</p>
            <CheckList checks={['5 prioritised insights every single week','Specific numbers, not vague observations','Calendar events and upcoming trading opportunities','Supplier switch recommendations with real £ savings']} accent="var(--amber)" />
          </div>
          <ScreenShell title="AI Weekly Summary — W/E 07 Mar" badge="Pro" badgeClass="badge-amber">
            <div style={{ padding:14, display:'flex', flexDirection:'column', gap:10 }}>
              {[
                {accent:'var(--blue-glo)',bg:'rgba(37,99,235,0.06)',border:'rgba(37,99,235,0.18)',label:'1 · Revenue',text:'Revenue £9,871 — strongest week since November, up <strong style="color:var(--text)">+11.3% WoW</strong>. Post-payday Saturday drove £1,846.'},
                {accent:'var(--amber)',bg:'rgba(245,158,11,0.06)',border:'rgba(245,158,11,0.18)',label:'2 · Highest-Impact Action',text:'Elux Nic Salts selling <strong style="color:var(--text)">98 units/week untracked</strong>. One cost entry recovers <strong style="color:var(--green)">£120+/week</strong> in visible profit.'},
                {accent:'var(--green)',bg:'rgba(16,185,129,0.05)',border:'rgba(16,185,129,0.18)',label:'3 · Supplier Switch',text:'Switch Hula Hoops to Parfetts (£0.79 vs £0.99). Saves <strong style="color:var(--text)">£213/year</strong> with zero customer impact.'},
                {accent:'var(--red)',bg:'rgba(239,68,68,0.05)',border:'rgba(239,68,68,0.18)',label:'4 · Coming Up',text:"Mother's Day in 8 days · Eid in 13 days · Payday <strong style='color:var(--text)'>28 March</strong>. Three revenue events in 3 weeks."},
              ].map((ins,i)=>(
                <div key={i} style={{background:ins.bg,border:`1px solid ${ins.border}`,borderRadius:10,padding:12,fontSize:12,color:'var(--muted)',lineHeight:1.65}}>
                  <div style={{color:ins.accent,fontWeight:700,fontSize:11,marginBottom:4}}>{ins.label}</div>
                  <span dangerouslySetInnerHTML={{__html:ins.text}} />
                </div>
              ))}
            </div>
          </ScreenShell>
        </div>

        {/* 6 — Competitor Pricing (Pro monthly) */}
        <div className="feature-row flip reveal">
          <div>
            <div className="feature-label" style={{ color:'var(--blue-glo)' }}>Competitor Pricing · Pro Monthly</div>
            <h2 className="feature-title">Know exactly where<br />you stand vs Tesco &amp; Asda.</h2>
            <p className="feature-body">A fixed 15-product basket checked against Tesco and Asda prices every month. Know instantly which lines are at risk, which are in-line, and where you actually have an advantage.</p>
            <CheckList checks={['15-product basket vs Tesco & Asda every month','RISK / IN-LINE / UPSIDE status per product','Monthly P&L summary alongside pricing data']} accent="var(--blue-glo)" />
          </div>
          <ScreenShell title="Competitor Pricing — February 2026" badge="Pro Monthly" badgeClass="badge-blue">
            <div style={{padding:'8px 16px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:10}}>
                {[{n:3,lbl:'UPSIDE',bg:'rgba(16,185,129,0.12)',c:'var(--green)'},{n:4,lbl:'IN-LINE',bg:'rgba(245,158,11,0.08)',c:'var(--amber)'},{n:7,lbl:'RISK',bg:'rgba(239,68,68,0.12)',c:'var(--red)'}].map((b,i)=>(
                  <div key={i} style={{background:b.bg,borderRadius:8,textAlign:'center',padding:'10px 0'}}>
                    <div style={{fontSize:20,fontWeight:800,color:b.c}}>{b.n}</div>
                    <div style={{fontSize:9,fontWeight:700,color:b.c,letterSpacing:'0.06em'}}>{b.lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',fontSize:10,fontWeight:700,color:'var(--dim)',textTransform:'uppercase',letterSpacing:'0.05em',paddingBottom:6,borderBottom:'1px solid var(--border)'}}>
                <span>Product</span><span>Us</span><span>Tesco</span><span style={{textAlign:'right'}}>Status</span>
              </div>
              {[
                {name:'Coca Cola Pm279',us:'£2.79',tesco:'£2.55',s:'RISK'},
                {name:'Red Bull Pm265',us:'£2.65',tesco:'£2.70',s:'IN-LINE'},
                {name:'Fosters 10pk',us:'£12.00',tesco:'£10.00',s:'RISK'},
                {name:'Haribo Tangfastics',us:'£1.00',tesco:'£1.25',s:'UPSIDE'},
                {name:'Monster Pm175',us:'£1.50',tesco:'£2.00',s:'UPSIDE'},
              ].map((r,i)=>{
                const c = r.s==='RISK'?'var(--red)':r.s==='UPSIDE'?'var(--green)':'var(--amber)'
                return (
                  <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(28,42,62,0.5)',fontSize:12}}>
                    <span style={{color:'var(--text)',fontWeight:600}}>{r.name}</span>
                    <span style={{color:'var(--text)'}}>{r.us}</span>
                    <span style={{color:'var(--dim)'}}>{r.tesco}</span>
                    <span style={{color:c,fontWeight:700,fontSize:11,textAlign:'right'}}>{r.s}</span>
                  </div>
                )
              })}
            </div>
          </ScreenShell>
        </div>

      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────
function Pricing() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const basicFeatures = [
    {on:true,txt:'1 store'},{on:true,txt:'Best Sellers dashboard'},
    {on:true,txt:'Top & bottom performers by category'},{on:true,txt:'Review — browse all products & margins'},
    {on:true,txt:'Product search'},{on:true,txt:'Week-on-week comparisons'},
    {on:true,txt:'Weekly EPOS file upload'},{on:false,txt:'Trending products view'},
    {on:false,txt:'Margin erosion & price alerts'},{on:false,txt:'Stock discrepancy & theft flags'},
    {on:false,txt:'AI weekly summary'},{on:false,txt:'Coming Up — events & calendar'},
    {on:false,txt:'Monthly deep-dive reports'},{on:false,txt:'Competitor pricing (vs Tesco & Asda)'},
  ]
  const proFeatures = [
    'Everything in Basic','Trending products — weekly spike alerts',
    'Margin erosion — automatic price alerts','Stock discrepancy & theft detection',
    'AI weekly summary — 5 key insights','Coming Up — events & calendar planning',
    'AI product action suggestions','3-month rolling averages per product',
    '— Monthly Reports —',
    'Monthly deep-dive dashboard','Competitor pricing vs Tesco & Asda',
    'Shelf density audit (ELITE / OK / THIEF)','Monthly financial P&L summary',
    'Baseline & velocity analysis','Supplier switch recommendations',
    'Priority support',
  ]
  return (
    <section id="pricing" className="section" style={{ background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-blue">Pricing</span>
          <h2>Simple pricing.<br /><span className="gradient-text">No surprises.</span></h2>
          <p>Pay monthly. Cancel anytime. No setup fees. No contracts. No hidden costs.</p>
        </div>
        <div className="pricing-grid">
          <div className="plan reveal">
            <div className="plan-name">Basic</div>
            <div className="plan-price"><span className="big">£29</span></div>
            <div className="plan-period">per month · billed monthly</div>
            <div className="plan-divider" />
            <div style={{fontSize:12,fontWeight:700,color:'var(--dim)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>What's included</div>
            {basicFeatures.map((f,i) => (
              <div className={`plan-feature${f.on?'':' off'}`} key={i}>
                <div className={`icon ${f.on?'icon-on':'icon-off'}`}>{f.on?'✓':'✕'}</div>{f.txt}
              </div>
            ))}
            <button className="plan-btn plan-btn-ghost" onClick={() => scrollTo('contact')}>Get Started →</button>
          </div>
          <div className="plan featured reveal">
            <div className="plan-tag">Most Popular</div>
            <div className="plan-name" style={{color:'var(--blue-glo)'}}>Pro</div>
            <div className="plan-price"><span className="big">£65</span></div>
            <div className="plan-period">per month · billed monthly</div>
            <div className="plan-divider" />
            <div style={{fontSize:12,fontWeight:700,color:'var(--blue-glo)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Everything in Basic, plus:</div>
            {proFeatures.map((f,i) => {
              if (f === '— Monthly Reports —') return (
                <div key={i} style={{ fontSize:11, fontWeight:700, color:'var(--blue-glo)', textTransform:'uppercase', letterSpacing:'0.08em', margin:'14px 0 8px', paddingTop:14, borderTop:'1px solid var(--border)' }}>
                  📅 Monthly Reports (Pro)
                </div>
              )
              return (
                <div className="plan-feature" key={i}>
                  <div className="icon icon-on">✓</div>
                  {i===0?<strong style={{color:'var(--text)'}}>{f}</strong>:f}
                </div>
              )
            })}
            <button className="plan-btn plan-btn-main" onClick={() => scrollTo('contact')}>Get Started →</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────
function FinalCTA() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="section" style={{ background:'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(37,99,235,0.08) 0%,var(--bg) 65%)' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:16 }}>⭐⭐⭐⭐⭐</div>
        <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(2rem,4vw,3rem)', color:'var(--text)', lineHeight:1.1, marginBottom:18 }}>
          We deal with the past.<br /><span className="gradient-text">So you can profit in the future.</span>
        </h2>
        <p style={{ fontSize:16, color:'var(--muted)', maxWidth:460, margin:'0 auto 36px', lineHeight:1.7 }}>
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
          <button className="btn-primary-lg" onClick={() => scrollTo('contact')}>Request a Demo <ArrowRight /></button>
          <button className="btn-secondary-lg" onClick={() => scrollTo('pricing')}>View Pricing</button>
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name:'', email:'', business:'', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError('Please fill in your name and email.'); return }
    setError(''); setSending(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:'POST', headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body:JSON.stringify({ name:form.name, email:form.email, business:form.business, message:form.message }),
      })
      if (res.ok) { setSent(true) } else { setError('Something went wrong. Please try again.') }
    } catch { setError('Network error. Please check your connection.') }
    finally { setSending(false) }
  }
  return (
    <section id="contact" className="section" style={{ background:'var(--surface)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <span className="badge badge-teal">Get In Touch</span>
          <h2>Let's talk about<br />your store.</h2>
          <p>Ask questions or sign up. We reply within 24 hours.</p>
        </div>
        {sent ? (
          <div style={{ maxWidth:560, margin:'0 auto', textAlign:'center', background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:20, padding:'60px 40px' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
            <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:'var(--text)', marginBottom:10 }}>Message received!</h3>
            <p style={{ color:'var(--muted)' }}>We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <div className="contact-wrap">
            {[{key:'name',label:'Your Name',type:'text',ph:'Jane Smith'},{key:'email',label:'Email Address',type:'email',ph:'jane@mystore.co.uk'},{key:'business',label:'Business Name',type:'text',ph:'Londis Horden'}].map(f => (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}
            <div className="field">
              <label>Message</label>
              <textarea rows={4} placeholder="Tell us about your store and what you're looking for…" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
            </div>
            {error && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', fontSize:13, color:'var(--red)', marginBottom:16 }}>⚠️ {error}</div>}
            <button className="btn-primary-lg" onClick={handleSubmit} disabled={sending} style={{ width:'100%', justifyContent:'center', borderRadius:12, fontSize:15, padding:15, opacity:sending?0.7:1 }}>
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
          <div className="nav-logo" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
            <img src="/favicon.png" alt="Retail Intelligence" style={{ width:36, height:36, borderRadius:8, objectFit:'cover' }} />
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Retail <span style={{ color:'var(--blue-glo)' }}>Intelligence</span></div>
              <div style={{ fontSize:11, color:'var(--dim)' }}>Smart stock analytics for independent stores</div>
            </div>
          </div>
          <a href="mailto:retail.intelligence@outlook.com">retail.intelligence@outlook.com</a>
          <div style={{ fontSize:12, color:'var(--dim)' }}>© 2026 Retail Intelligence · Built in the UK</div>
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
      <AppPreview />
      <WhyItWorks />
      <Problem />
      <Features />
      <Pricing />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  )
}
