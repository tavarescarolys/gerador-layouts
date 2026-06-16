import { useRef } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import TextEditor from './components/BriefingForm'
import ImageBank from './components/ImageBank'
import TemplatePicker from './components/TemplatePicker'
import ExportButton from './components/ExportButton'
import Settings from './components/Settings'
import TemplateA from './templates/TemplateA'
import TemplateB from './templates/TemplateB'
import TemplateC from './templates/TemplateC'
import type { TemplateProps } from './types'

const STEPS = ['Texto', 'Imagens', 'Template', 'Exportar']

const CANVAS_SCALE = 0.32
const DIMS = {
  feed:  { w: Math.round(1080 * CANVAS_SCALE), h: Math.round(1350 * CANVAS_SCALE) },
  story: { w: Math.round(1080 * CANVAS_SCALE), h: Math.round(1920 * CANVAS_SCALE) },
}

function TemplateRenderer({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement | null> }) {
  const { state } = useApp()
  const props: TemplateProps = {
    eyebrow: state.eyebrow,
    eyebrowWeight: state.eyebrowWeight,
    text: state.selectedText,
    mainWeight: state.mainWeight,
    subtitle: state.subtitle,
    subtitleWeight: state.subtitleWeight,
    textAlign: state.textAlign,
    textCase: state.textCase,
    textPosition: state.textPosition,
    imageX: state.imageX,
    imageY: state.imageY,
    imageZoom: state.imageZoom,
    image: state.selectedImage,
    format: state.format,
    brandMark: state.brandMark,
  }

  const { w, h } = DIMS[state.format]

  return (
    <div
      style={{
        width: w,
        height: h,
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        borderRadius: 12,
        boxShadow: '0 20px 60px rgba(0,33,61,0.25)',
      }}
    >
      <div
        ref={canvasRef as React.RefObject<HTMLDivElement>}
        style={{
          width: 1080,
          height: state.format === 'feed' ? 1350 : 1920,
          transform: `scale(${CANVAS_SCALE})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {state.templateId === 'A' && <TemplateA {...props} />}
        {state.templateId === 'B' && <TemplateB {...props} />}
        {state.templateId === 'C' && <TemplateC {...props} />}
      </div>
    </div>
  )
}

function Shell() {
  const { state, dispatch, goToStep } = useApp()
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div data-dark={state.darkMode ? '' : undefined} style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* ── Left panel ───────────────────────────────────────── */}
      <div
        style={{
          width: 400,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: 'var(--brand-deep)',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <img src="/logo-horizontal-white.png" alt="Atlântida" style={{ height: 32, width: 'auto' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              title={state.darkMode ? 'Modo claro' : 'Modo escuro'}
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 'var(--radius-sm)', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15 }}
            >
              {state.darkMode ? '☀' : '🌙'}
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
              title="Configurações"
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 'var(--radius-sm)', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15 }}
            >
              ⚙
            </button>
          </div>
        </div>

        {/* Step nav */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          {STEPS.map((label, i) => {
            const stepNum = (i + 1) as 1 | 2 | 3 | 4
            const isActive = state.step === stepNum
            const isDone = state.step > stepNum
            const canGo = true

            return (
              <button
                key={stepNum}
                onClick={() => canGo && goToStep(stepNum)}
                style={{
                  flex: 1,
                  padding: '10px 4px 9px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  borderBottom: `2px solid ${isActive ? 'var(--brand-cyan)' : 'transparent'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'border-color var(--dur-fast) var(--ease-out)',
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: isActive ? 'var(--brand-deep)' : isDone ? 'var(--brand-cyan)' : 'var(--gray-100)',
                    color: isActive || isDone ? '#fff' : 'var(--text-muted)',
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background var(--dur-fast) var(--ease-out)',
                  }}
                >
                  {isDone ? '✓' : stepNum}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-label)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--brand-deep)' : isDone ? 'var(--brand-cyan)' : 'var(--text-muted)',
                    fontWeight: 300,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Step content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {state.step === 1 && <TextEditor />}
          {state.step === 2 && <ImageBank />}
          {state.step === 3 && <TemplatePicker />}
          {state.step === 4 && <ExportButton canvasEl={canvasRef.current} />}
        </div>
      </div>

      {/* ── Right panel — canvas preview ─────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          background: state.darkMode ? '#0a1520' : 'var(--sand-100)',
          padding: 40,
          overflow: 'auto',
        }}
      >
        {/* Format / brand mark / template quick switches */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {(['feed', 'story'] as const).map(f => (
            <button
              key={f}
              onClick={() => dispatch({ type: 'SET_FORMAT', payload: f })}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                border: `1px solid ${state.format === f ? 'var(--brand-deep)' : 'var(--border)'}`,
                background: state.format === f ? 'var(--brand-deep)' : 'var(--surface)',
                color: state.format === f ? '#fff' : 'var(--text-muted)',
                fontFamily: 'var(--font-label)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 300,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}
            >
              {f === 'feed' ? 'Feed' : 'Story'}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
          {(['logo', 'handle'] as const).map(b => (
            <button
              key={b}
              onClick={() => dispatch({ type: 'SET_BRAND_MARK', payload: b })}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                border: `1px solid ${state.brandMark === b ? 'var(--brand-deep)' : 'var(--border)'}`,
                background: state.brandMark === b ? 'var(--brand-deep)' : 'var(--surface)',
                color: state.brandMark === b ? '#fff' : 'var(--text-muted)',
                fontFamily: 'var(--font-label)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 300,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
                whiteSpace: 'nowrap',
              }}
            >
              {b === 'logo' ? 'Logo' : '@handle'}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
          {(['A', 'B', 'C'] as const).map(t => (
            <button
              key={t}
              onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t })}
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${state.templateId === t ? 'var(--brand-deep)' : 'var(--border)'}`,
                background: state.templateId === t ? 'var(--brand-deep)' : 'var(--surface)',
                color: state.templateId === t ? '#fff' : 'var(--text-muted)',
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <TemplateRenderer canvasRef={canvasRef} />

        <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 300 }}>
          {state.format === 'feed' ? '1080 × 1350 px' : '1080 × 1920 px'} — {state.templateId === 'A' ? 'Full Image' : state.templateId === 'B' ? 'Split' : 'Tipográfico'}
        </p>
      </div>

      {state.showSettings && <Settings />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
