// OwnerApp.jsx
import { useNavigate } from 'react-router-dom'
import OwnerPage from './OwnerPage.jsx'

export default function OwnerApp() {
  const navigate = useNavigate()
  return (
    <>
      {/* Back bar — fixed at very top, 36px tall */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: 'rgba(11,17,32,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(37,99,235,0.15)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 36,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 0',
            fontFamily: 'inherit',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F1F5F9'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          ← All Products
        </button>
        <span style={{ color: '#1E293B', fontSize: 13 }}>|</span>
        <span style={{ fontSize: 12, color: '#3B82F6', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          📊 Owner Intelligence
        </span>
      </div>

      {/* Push the owner's fixed navbar down by 36px so it sits below the back bar */}
      {/* scroll-margin-top ensures section scroll targets account for both bars */}
      <style>{`
        #navbar { top: 36px !important; }
        .mobile-menu { top: 104px !important; }
        section[id], div[id] { scroll-margin-top: 104px; }
      `}</style>

      <OwnerPage />
    </>
  )
}
