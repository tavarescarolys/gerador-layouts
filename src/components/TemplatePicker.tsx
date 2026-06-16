import { useApp } from '../context/AppContext'
import type { TemplateId, Format } from '../types'

const TEMPLATES: { id: TemplateId; label: string; desc: string }[] = [
  { id: 'A', label: 'Full Image', desc: 'Foto de fundo, texto sobreposto' },
  { id: 'B', label: 'Split', desc: 'Foto + bloco de cor com texto' },
  { id: 'C', label: 'Tipográfico', desc: 'Fundo ciano, tipografia em destaque' },
]

const FORMAT_OPTS: { id: Format; label: string; dims: string }[] = [
  { id: 'feed', label: 'Feed', dims: '1080 × 1350' },
  { id: 'story', label: 'Story', dims: '1080 × 1920' },
]

export default function TemplatePicker() {
  const { state, dispatch, nextStep } = useApp()

  return (
    <div className="flex flex-col gap-5">
      {/* Format toggle */}
      <div>
        <p className="at-eyebrow mb-3">Formato</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {FORMAT_OPTS.map(f => (
            <button
              key={f.id}
              onClick={() => dispatch({ type: 'SET_FORMAT', payload: f.id })}
              style={{
                flex: 1,
                padding: '10px 16px',
                border: `2px solid ${state.format === f.id ? 'var(--brand-deep)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
                background: state.format === f.id ? 'var(--gray-100)' : 'var(--surface)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: state.format === f.id ? 'var(--brand-deep)' : 'var(--text-strong)' }}>
                {f.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{f.dims}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Template cards */}
      <div>
        <p className="at-eyebrow mb-3">Template</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TEMPLATES.map(t => {
            const isSelected = state.templateId === t.id
            return (
              <button
                key={t.id}
                onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  border: `2px solid ${isSelected ? 'var(--brand-deep)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--gray-100)' : 'var(--surface)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }}
              >
                {/* Mini preview */}
                <div style={{
                  width: 36,
                  height: 45,
                  borderRadius: 4,
                  flexShrink: 0,
                  background: t.id === 'C' ? 'var(--brand-cyan)' : 'var(--brand-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                }}>
                  {t.id}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: isSelected ? 'var(--brand-deep)' : 'var(--text-strong)' }}>
                    Template {t.id} — {t.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{t.desc}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <button
        onClick={nextStep}
        style={{
          width: '100%',
          padding: '14px 24px',
          backgroundColor: 'var(--brand-deep)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          marginTop: 4,
        }}
      >
        Ver preview completo →
      </button>
    </div>
  )
}
