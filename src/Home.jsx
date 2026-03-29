import { useNavigate } from 'react-router-dom'

const ArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: '#0B1120',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(30,50,80,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,50,80,0.4) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.18,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 48, position: 'relative', zIndex: 1,
      }}>
        <img src="/favicon.png" alt="Retail Intelligence" style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#F1F5F9' }}>
            Retail <span style={{ color: '#3B82F6' }}>Intelligence</span>
          </div>
          <div style={{ fontSize: 12, color: '#475569' }}>Smart tools for independent retail</div>
        </div>
      </div>

      {/* Headline */}
      <div style={{ textAlign: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(13,148,136,0.12)', border: '1px solid rgba(13,148,136,0.3)',
          borderRadius: 99, padding: '6px 14px',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#0D9488', marginBottom: 24,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0D9488', display: 'inline-block', boxShadow: '0 0 8px #0D9488' }} />
          Built for independent retail owners
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          color: '#F1F5F9',
          marginBottom: 16,
          fontFamily: "'DM Serif Display', 'Georgia', serif",
        }}>
          Two products.<br />
          <span style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            One platform.
          </span>
        </h1>
        <p style={{ fontSize: 16, color: '#64748B', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Retail Intelligence gives independent store owners smart tools to understand their sales and manage their team — all under one roof.
        </p>
      </div>

      {/* Product cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        width: '100%',
        maxWidth: 680,
        margin: '40px auto 0',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Owner Intelligence */}
        <div
          onClick={() => navigate('/owner')}
          style={{
            background: 'rgba(37,99,235,0.06)',
            border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: 20,
            padding: 32,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(37,99,235,0.12)'
            e.currentTarget.style.borderColor = 'rgba(37,99,235,0.45)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(37,99,235,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(37,99,235,0.06)'
            e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
            <img src="/owner-logo.png" alt="Owner Intelligence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#3B82F6', marginBottom: 8,
            }}>Owner Intelligence</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F1F5F9', marginBottom: 10, lineHeight: 1.2 }}>
              Analyse your data<br />To grow your profit
            </div>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, margin: 0 }}>
              Upload your EPOS data and instantly see what's selling, what's not, your real margins, and AI-powered stock decisions.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {['Sales analytics', 'Profit insights', 'AI recommendations', 'Promotions'].map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99,
                background: 'rgba(37,99,235,0.1)', color: '#93C5FD',
                border: '1px solid rgba(37,99,235,0.2)',
              }}>{tag}</span>
            ))}
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #1D4ED8, #0891B2)',
            color: 'white', border: 'none', borderRadius: 12,
            padding: '12px 20px', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', marginTop: 4, alignSelf: 'flex-start',
          }}>
            Explore Owner Intelligence <ArrowRight />
          </div>
        </div>

        {/* Staff Intelligence */}
        <div
          onClick={() => navigate('/staff')}
          style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 20,
            padding: 32,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(245,158,11,0.12)'
            e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(245,158,11,0.12)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(245,158,11,0.06)'
            e.currentTarget.style.borderColor = 'rgba(245,158,11,0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
            <img src="/staff-logo.png" alt="Staff Intelligence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#F59E0B', marginBottom: 8,
            }}>Staff Intelligence</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F1F5F9', marginBottom: 10, lineHeight: 1.2 }}>
              Analyse your data<br />To manage your team
            </div>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, margin: 0 }}>
              Task tracking, shift management, time logs and payroll export — all in one app. No WhatsApp, no spreadsheets.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {['Task tracking', 'Shift management', 'Time logs', 'Payroll export'].map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99,
                background: 'rgba(245,158,11,0.1)', color: '#FCD34D',
                border: '1px solid rgba(245,158,11,0.2)',
              }}>{tag}</span>
            ))}
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #D97706, #F59E0B)',
            color: '#000', border: 'none', borderRadius: 12,
            padding: '12px 20px', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', marginTop: 4, alignSelf: 'flex-start',
          }}>
            Explore Staff Intelligence <ArrowRight />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 56, fontSize: 12, color: '#334155',
        display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <span>© 2026 Retail Intelligence</span>
        <a href="mailto:retail.intelligence@outlook.com" style={{ color: '#334155', textDecoration: 'none' }}>
          retail.intelligence@outlook.com
        </a>
        <span>Built in the UK</span>
      </div>

    </div>
  )
}
