import { useApp } from '../context/AppContext'
import type { TextAlign, TextPosition, FontWeight, AppAction } from '../types'

const WEIGHTS: { value: FontWeight; label: string }[] = [
  { value: 'normal', label: 'Regular' },
  { value: 'bold',   label: 'Bold' },
  { value: 'black',  label: 'Black' },
]

function WeightPicker({ value, action, dispatch }: {
  value: FontWeight
  action: 'SET_EYEBROW_WEIGHT' | 'SET_MAIN_WEIGHT' | 'SET_SUBTITLE_WEIGHT'
  dispatch: React.Dispatch<AppAction>
}) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {WEIGHTS.map(w => (
        <button
          key={w.value}
          onClick={() => dispatch({ type: action, payload: w.value })}
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            border: `1px solid ${value === w.value ? 'var(--brand-deep)' : 'var(--border)'}`,
            background: value === w.value ? 'var(--brand-deep)' : 'var(--surface)',
            color: value === w.value ? '#fff' : 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: w.value === 'bold' ? 700 : w.value === 'black' ? 900 : 400,
            cursor: 'pointer',
            transition: 'all var(--dur-fast) var(--ease-out)',
          }}
        >
          {w.label}
        </button>
      ))}
    </div>
  )
}

export default function TextEditor() {
  const { state, dispatch, nextStep } = useApp()

  function textareaStyle(): React.CSSProperties {
    return {
      width: '100%', resize: 'vertical',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px', fontSize: 14,
      fontFamily: 'var(--font-body)',
      color: 'var(--text-strong)',
      background: 'var(--surface)',
      outline: 'none', boxSizing: 'border-box',
      transition: 'border-color var(--dur-fast) var(--ease-out)',
    }
  }

  function chip(active: boolean): React.CSSProperties {
    return {
      padding: '6px 12px', borderRadius: 'var(--radius-pill)',
      border: `1px solid ${active ? 'var(--brand-deep)' : 'var(--border)'}`,
      background: active ? 'var(--brand-deep)' : 'var(--surface)',
      color: active ? '#fff' : 'var(--text-muted)',
      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
      cursor: 'pointer', transition: 'all var(--dur-fast) var(--ease-out)',
    }
  }

  function onFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
    e.target.style.borderColor = 'var(--brand-cyan)'
    e.target.style.boxShadow = 'var(--shadow-focus)'
  }
  function onBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    e.target.style.borderColor = 'var(--border)'
    e.target.style.boxShadow = 'none'
  }

  const divider = <div style={{ width: 1, height: 22, background: 'var(--border)', flexShrink: 0 }} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="at-eyebrow" style={{ margin: 0 }}>Eyebrow</p>
          <WeightPicker value={state.eyebrowWeight} action="SET_EYEBROW_WEIGHT" dispatch={dispatch} />
        </div>
        <textarea rows={1} value={state.eyebrow}
          onChange={e => dispatch({ type: 'SET_EYEBROW', payload: e.target.value })}
          placeholder="Ex: Moda Praia"
          style={textareaStyle()} onFocus={onFocus} onBlur={onBlur} />
      </div>

      {/* Main text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="at-eyebrow" style={{ margin: 0 }}>Texto principal</p>
          <WeightPicker value={state.mainWeight} action="SET_MAIN_WEIGHT" dispatch={dispatch} />
        </div>
        <textarea rows={3} value={state.selectedText}
          onChange={e => dispatch({ type: 'SELECT_TEXT', payload: e.target.value })}
          placeholder="Ex: O verão mora em você"
          style={textareaStyle()} onFocus={onFocus} onBlur={onBlur} />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{state.selectedText.length} caracteres</span>
      </div>

      {/* Subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="at-eyebrow" style={{ margin: 0 }}>Subtítulo</p>
          <WeightPicker value={state.subtitleWeight} action="SET_SUBTITLE_WEIGHT" dispatch={dispatch} />
        </div>
        <textarea rows={2} value={state.subtitle}
          onChange={e => dispatch({ type: 'SET_SUBTITLE', payload: e.target.value })}
          placeholder="Ex: entregando carisma e beleza"
          style={textareaStyle()} onFocus={onFocus} onBlur={onBlur} />
      </div>

      {/* Formatação global */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p className="at-eyebrow" style={{ margin: 0 }}>Formatação</p>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Case */}
          <button onClick={() => dispatch({ type: 'SET_TEXT_CASE', payload: 'upper' })}
            style={{ ...chip(state.textCase === 'upper'), letterSpacing: '0.05em' }}>AA</button>
          <button onClick={() => dispatch({ type: 'SET_TEXT_CASE', payload: 'normal' })}
            style={chip(state.textCase === 'normal')}>Aa</button>

          {divider}

          {/* Alignment */}
          {(['left', 'center', 'right'] as TextAlign[]).map(a => (
            <button key={a} onClick={() => dispatch({ type: 'SET_TEXT_ALIGN', payload: a })}
              style={{ ...chip(state.textAlign === a), fontSize: 14, minWidth: 36 }}>
              {a === 'left' ? '⫷' : a === 'center' ? '⊟' : '⫸'}
            </button>
          ))}
        </div>

        {/* Position */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['top', 'center', 'bottom'] as TextPosition[]).map(p => (
            <button key={p} onClick={() => dispatch({ type: 'SET_TEXT_POSITION', payload: p })}
              style={{ ...chip(state.textPosition === p), flex: 1 }}>
              {p === 'top' ? '▲ Topo' : p === 'center' ? '● Centro' : '▼ Baixo'}
            </button>
          ))}
        </div>
      </div>

      <button onClick={nextStep}
        style={{
          width: '100%', padding: '14px 24px',
          backgroundColor: 'var(--brand-deep)', color: '#fff',
          border: 'none', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}
      >
        Próximo: Imagens →
      </button>
    </div>
  )
}
