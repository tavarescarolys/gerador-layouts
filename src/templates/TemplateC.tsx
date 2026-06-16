import type { TemplateProps } from '../types'
import { fw } from '../types'

const DIMS = { feed: { w: 1080, h: 1350 }, story: { w: 1080, h: 1920 } }
const HANDLE = '@atlantidamodapraia'

export default function TemplateC({ eyebrow, eyebrowWeight, text, mainWeight, subtitle, subtitleWeight, textAlign, textCase, textPosition, imageX, imageY, imageZoom, image, format, brandMark }: TemplateProps) {
  const { w, h } = DIMS[format]
  const isFeed = format === 'feed'
  const pad = 72
  const justifyMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' }

  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', backgroundColor: '#1a7fb5', fontFamily: 'Agrandir, system-ui, sans-serif' }}>

      {image && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${image.url})`, backgroundSize: `${imageZoom}%`, backgroundPosition: `${imageX}% ${imageY}%` }} />
      )}

      <div style={{
        position: 'absolute', inset: 0,
        background: image
          ? 'linear-gradient(to bottom, rgba(0,15,35,0.50) 0%, rgba(0,15,35,0.10) 35%, rgba(0,15,35,0.10) 65%, rgba(0,15,35,0.45) 100%)'
          : 'linear-gradient(180deg, #003a6a 0%, #1a7fb5 100%)',
      }} />

      {/* Logo / handle — top center */}
      <div style={{ position: 'absolute', top: isFeed ? 56 : 80, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        {brandMark === 'logo'
          ? <img src="/logo-horizontal-white.png" alt="Atlântida" crossOrigin="anonymous" style={{ height: isFeed ? 52 : 64, width: 'auto' }} />
          : <span style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: 300, fontSize: 30, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.9)' }}>{HANDLE}</span>
        }
      </div>

      {/* Text block */}
      <div style={{
        position: 'absolute',
        top: textPosition === 'top' ? (isFeed ? 200 : 280) : 0,
        bottom: textPosition === 'bottom' ? 120 : 0,
        left: pad, right: pad,
        display: 'flex', flexDirection: 'column',
        justifyContent: justifyMap[textPosition] as React.CSSProperties['justifyContent'],
        gap: isFeed ? 22 : 28,
        ...(textPosition === 'center' && { top: 0, bottom: 0 }),
      }}>
        {eyebrow && (
          <div style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: fw(eyebrowWeight), fontSize: isFeed ? 26 : 30, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0da1cc', textAlign }}>
            {eyebrow}
          </div>
        )}
        <div style={{ fontFamily: "'Agrandir Tight', Agrandir, sans-serif", fontWeight: fw(mainWeight), fontSize: isFeed ? 148 : 170, lineHeight: 0.87, letterSpacing: '-0.02em', textTransform: textCase === 'upper' ? 'uppercase' : 'none', color: '#ffffff', textAlign }}>
          {text || 'SEU TEXTO AQUI'}
        </div>
        {subtitle && (
          <div style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: fw(subtitleWeight), fontSize: isFeed ? 38 : 44, lineHeight: 1.35, color: 'rgba(255,255,255,0.88)', textAlign }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
