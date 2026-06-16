import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Settings() {
  const { state, dispatch } = useApp()
  const [cloudName, setCloudName] = useState(state.cloudinaryConfig.cloudName)
  const [uploadPreset, setUploadPreset] = useState(state.cloudinaryConfig.uploadPreset)

  function save() {
    dispatch({ type: 'SET_CLOUDINARY', payload: { cloudName, uploadPreset } })
    dispatch({ type: 'TOGGLE_SETTINGS' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,39,64,0.55)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
    >
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: 36,
          width: '100%',
          maxWidth: 440,
          boxShadow: 'var(--shadow-xl)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 22, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '0 0 8px' }}>
          Configurações
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
          Opcional: conecte o Cloudinary para salvar imagens entre sessões.
        </p>

        <section>
          <p className="at-eyebrow" style={{ marginBottom: 10 }}>Cloudinary — Banco de Imagens</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
            Sem configuração, as imagens ficam apenas nesta sessão do navegador.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Cloud Name" value={cloudName} onChange={setCloudName} placeholder="meu-cloud" />
            <Field label="Upload Preset (unsigned)" value={uploadPreset} onChange={setUploadPreset} placeholder="atlantida_preset" />
          </div>
        </section>

        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
            style={{
              flex: 1, padding: '12px 20px',
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer', color: 'var(--text-muted)',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={save}
            style={{
              flex: 2, padding: '12px 20px',
              background: 'var(--brand-deep)', border: 'none',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#fff',
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-body)', marginBottom: 6 }}>
        {label}
      </label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 14px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--text-strong)',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--brand-cyan)'; e.target.style.boxShadow = 'var(--shadow-focus)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}
