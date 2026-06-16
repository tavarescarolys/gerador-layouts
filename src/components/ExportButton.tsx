import { useApp } from '../context/AppContext'
import { exportCanvas } from '../services/export'

interface Props {
  canvasEl: HTMLElement | null
}

export default function ExportButton({ canvasEl }: Props) {
  const { state, dispatch, goToStep } = useApp()

  async function handleExport() {
    if (!canvasEl) return
    dispatch({ type: 'SET_EXPORTING', payload: true })
    try {
      await exportCanvas(canvasEl, state.format)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erro ao exportar')
    } finally {
      dispatch({ type: 'SET_EXPORTING', payload: false })
    }
  }

  const dims = state.format === 'feed' ? '1080 × 1350 px' : '1080 × 1920 px'

  return (
    <div className="flex flex-col gap-3">
      <p className="at-eyebrow mb-1">Exportar</p>

      <button
        onClick={handleExport}
        disabled={state.isExporting}
        style={{
          width: '100%',
          padding: '16px 24px',
          backgroundColor: state.isExporting ? 'var(--gray-200)' : 'var(--brand-cyan)',
          color: state.isExporting ? 'var(--text-muted)' : '#fff',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 15,
          cursor: state.isExporting ? 'wait' : 'pointer',
          transition: 'background-color var(--dur-fast) var(--ease-out)',
          letterSpacing: '0.02em',
        }}
      >
        {state.isExporting ? 'Exportando…' : `Baixar PNG — ${dims}`}
      </button>

      <button
        onClick={() => goToStep(1)}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: 'transparent',
          color: 'var(--text-muted)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        Criar novo post
      </button>
    </div>
  )
}
