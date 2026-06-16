import { useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { uploadImage } from '../services/cloudinary'
import type { ImageItem } from '../types'

export default function ImageBank() {
  const { state, dispatch, nextStep } = useApp()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')

    if (!state.cloudinaryConfig.cloudName) {
      const localItem: ImageItem = {
        id: `local-${Date.now()}`,
        url: URL.createObjectURL(file),
        name: file.name,
        uploadedAt: Date.now(),
      }
      dispatch({ type: 'ADD_TO_BANK', payload: localItem })
      dispatch({ type: 'SELECT_IMAGE', payload: localItem })
      e.target.value = ''
      return
    }

    setUploading(true)
    try {
      const item = await uploadImage(file, state.cloudinaryConfig)
      dispatch({ type: 'ADD_TO_BANK', payload: item })
      dispatch({ type: 'SELECT_IMAGE', payload: item })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no upload')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function selectImage(item: ImageItem) {
    dispatch({ type: 'SELECT_IMAGE', payload: state.selectedImage?.id === item.id ? null : item })
  }

  function removeImage(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    dispatch({ type: 'REMOVE_FROM_BANK', payload: id })
  }

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    accentColor: 'var(--brand-cyan)',
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p className="at-eyebrow" style={{ marginBottom: 0 }}>Banco de Imagens</p>

      {/* Upload */}
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{
          width: '100%', padding: '12px 20px',
          border: '2px dashed var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          background: 'transparent',
          cursor: uploading ? 'wait' : 'pointer',
          fontSize: 13, color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
        onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--brand-cyan)'; (e.currentTarget).style.color = 'var(--brand-cyan)' }}
        onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--border-strong)'; (e.currentTarget).style.color = 'var(--text-muted)' }}
      >
        <span style={{ fontSize: 18 }}>+</span>
        {uploading ? 'Enviando…' : 'Adicionar imagem'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

      {!state.cloudinaryConfig.cloudName && (
        <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: -8 }}>
          Sem Cloudinary — imagens ficam só nesta sessão.
        </p>
      )}

      {error && (
        <div style={{ padding: '8px 12px', background: '#fbe9e8', border: '1px solid #d2453f', borderRadius: 'var(--radius-sm)', fontSize: 12, color: '#d2453f' }}>
          {error}
        </div>
      )}

      {/* Grid */}
      {state.imageBank.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxHeight: 240, overflowY: 'auto' }}>
          {state.imageBank.map(item => {
            const isSelected = state.selectedImage?.id === item.id
            return (
              <div
                key={item.id}
                onClick={() => selectImage(item)}
                style={{
                  position: 'relative', aspectRatio: '1',
                  borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                  cursor: 'pointer',
                  border: `2px solid ${isSelected ? 'var(--brand-deep)' : 'transparent'}`,
                  transition: 'border-color var(--dur-fast) var(--ease-out)',
                }}
              >
                <img src={item.url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {isSelected && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,79,143,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 20 }}>✓</span>
                  </div>
                )}
                <button
                  onClick={e => removeImage(item.id, e)}
                  style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(0,33,61,0.7)', border: 'none',
                    color: '#fff', fontSize: 10, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >✕</button>
              </div>
            )
          })}
        </div>
      ) : (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
          Nenhuma imagem adicionada ainda.
        </p>
      )}

      {/* Position controls — só aparece quando há imagem selecionada */}
      {state.selectedImage && (
        <div style={{ background: 'var(--sand-100)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="at-eyebrow" style={{ marginBottom: 0 }}>Posição da imagem</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: '← Esquerda / Direita →', value: state.imageX, action: 'SET_IMAGE_X' as const },
              { label: '↑ Cima / Baixo ↓',       value: state.imageY, action: 'SET_IMAGE_Y' as const },
            ].map(({ label, value, action }) => (
              <div key={action}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontSize: 12, color: 'var(--brand-deep)', fontWeight: 700 }}>{value}%</span>
                </div>
                <input type="range" min={0} max={100} step={1} value={value}
                  onChange={e => dispatch({ type: action, payload: Number(e.target.value) })}
                  style={sliderStyle} />
              </div>
            ))}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>🔍 Zoom</span>
                <span style={{ fontSize: 12, color: 'var(--brand-deep)', fontWeight: 700 }}>{state.imageZoom}%</span>
              </div>
              <input type="range" min={100} max={300} step={5} value={state.imageZoom}
                onChange={e => dispatch({ type: 'SET_IMAGE_ZOOM', payload: Number(e.target.value) })}
                style={sliderStyle} />
            </div>
          </div>

          <button
            onClick={() => {
              dispatch({ type: 'SET_IMAGE_X', payload: 50 })
              dispatch({ type: 'SET_IMAGE_Y', payload: 50 })
              dispatch({ type: 'SET_IMAGE_ZOOM', payload: 100 })
            }}
            style={{ fontSize: 11, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'var(--font-body)' }}
          >
            Resetar tudo
          </button>
        </div>
      )}

      <button
        onClick={nextStep}
        style={{
          width: '100%', padding: '14px 24px',
          backgroundColor: 'var(--brand-deep)', color: '#fff',
          border: 'none', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}
      >
        Continuar {state.selectedImage ? '→' : '(sem imagem) →'}
      </button>
    </div>
  )
}
