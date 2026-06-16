import type { TemplateProps } from '../types'
import { fw } from '../types'

const DIMS = { feed: { w: 1080, h: 1350 }, story: { w: 1080, h: 1920 } }
const HANDLE = '@atlantidamodapraia'

export default function TemplateA({ eyebrow, eyebrowWeight, text, mainWeight, subtitle, subtitleWeight, textAlign, textCase, textPosition, imageX, imageY, imageZoom, image, format, brandMark }: TemplateProps) {
  const { w, h } = DIMS[format]
  const justifyMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' }

  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', backgroundColor: '#004f8f', fontFamily: 'Agrandir, system-ui, sans-serif' }}>

      {image && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${image.url})`, backgroundSize: `${imageZoom}%`, backgroundPosition: `${imageX}% ${imageY}%` }} />
      )}

      <div style={{
        position: 'absolute', inset: 0,
        background: image
          ? 'linear-gradient(to top, rgba(0,15,30,0.72) 0%, rgba(0,15,30,0.18) 50%, rgba(0,15,30,0.04) 100%)'
          : 'linear-gradient(160deg, #004f8f 0%, #003a6a 100%)',
      }} />

      <div style={{ position: 'absolute', top: 72, left: 72 }}>
        {brandMark === 'logo'
          ? <img src="/logo-horizontal-white.png" alt="Atlântida" crossOrigin="anonymous" style={{ height: 48, width: 'auto' }} />
          : <span style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: 300, fontSize: 28, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.9)' }}>{HANDLE}</span>
        }
      </div>

      <div style={{
        position: 'absolute',
        top: textPosition === 'top' ? 160 : 0,
        bottom: textPosition === 'bottom' ? 80 : 0,
        left: 72, right: 72,
        display: 'flex', flexDirection: 'column',
        justifyContent: justifyMap[textPosition] as React.CSSProperties['justifyContent'],
        gap: 20,
        ...(textPosition === 'center' && { top: 0, bottom: 0 }),
      }}>
        {eyebrow && (
          <div style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: fw(eyebrowWeight), fontSize: 28, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0da1cc', textAlign }}>
            {eyebrow}
          </div>
        )}
        <div style={{ fontFamily: "'Agrandir Tight', Agrandir, sans-serif", fontWeight: fw(mainWeight), fontSize: format === 'story' ? 112 : 96, lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: textCase === 'upper' ? 'uppercase' : 'none', color: '#ffffff', textAlign }}>
          {text || 'SEU TEXTO AQUI'}
        </div>
        {subtitle && (
          <div style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: fw(subtitleWeight), fontSize: format === 'story' ? 36 : 32, lineHeight: 1.3, color: 'rgba(255,255,255,0.85)', textAlign }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
