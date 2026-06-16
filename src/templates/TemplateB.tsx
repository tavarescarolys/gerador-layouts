import type { TemplateProps } from '../types'
import { fw } from '../types'

const DIMS = { feed: { w: 1080, h: 1350 }, story: { w: 1080, h: 1920 } }
const HANDLE = '@atlantidamodapraia'


export default function TemplateB({ eyebrow, eyebrowWeight, text, mainWeight, subtitle, subtitleWeight, textAlign, textCase, textPosition, imageX, imageY, imageZoom, image, format, brandMark }: TemplateProps) {
  const { w, h } = DIMS[format]
  const isFeed = format === 'feed'
  const pad = 80
  const splitY = isFeed ? 1010 : 1440
  const waveH = 134
  const wavePath = `M0,${splitY + 60} C${w * 0.25},${splitY - 74} ${w * 0.75},${splitY + 134} ${w},${splitY + 14} L${w},${h} L0,${h} Z`
  const textTop = splitY + waveH + 48
  const justifyMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' }

  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', backgroundColor: '#004f8f', fontFamily: 'Agrandir, system-ui, sans-serif' }}>

      {image && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: splitY + waveH, backgroundImage: `url(${image.url})`, backgroundSize: `${imageZoom}%`, backgroundPosition: `${imageX}% ${imageY}%` }} />
      )}
      {!image && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: splitY + waveH, background: 'linear-gradient(135deg, #003a6a 0%, #0da1cc44 100%)' }} />
      )}

      <svg style={{ position: 'absolute', top: 0, left: 0 }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <path d={wavePath} fill="#004f8f" />
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <path d={`M0,${splitY + 60} C${w * 0.25},${splitY - 74} ${w * 0.75},${splitY + 134} ${w},${splitY + 14}`} fill="none" stroke="#0da1cc" strokeWidth="4" opacity="0.7" />
      </svg>

      <div style={{ position: 'absolute', top: pad, left: pad }}>
        {brandMark === 'logo'
          ? <img src="/icon-cyan.png" alt="Atlântida" crossOrigin="anonymous" style={{ height: 160, width: 'auto' }} />
          : <span style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: 300, fontSize: 28, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.9)' }}>{HANDLE}</span>
        }
      </div>

      <div style={{
        position: 'absolute',
        top: textTop,
        bottom: 80,
        left: pad, right: pad,
        display: 'flex', flexDirection: 'column',
        justifyContent: justifyMap[textPosition] as React.CSSProperties['justifyContent'],
        gap: 20,
      }}>
        {eyebrow && (
          <div style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: fw(eyebrowWeight), fontSize: isFeed ? 26 : 30, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0da1cc', textAlign }}>
            {eyebrow}
          </div>
        )}
        <div style={{ fontFamily: "'Agrandir Tight', Agrandir, sans-serif", fontWeight: fw(mainWeight), fontSize: isFeed ? 100 : 118, lineHeight: 0.91, letterSpacing: '-0.02em', textTransform: textCase === 'upper' ? 'uppercase' : 'none', color: '#ffffff', textAlign }}>
          {text || 'SEU TEXTO AQUI'}
        </div>
        {subtitle && (
          <div style={{ fontFamily: "'Agrandir Wide', Agrandir, sans-serif", fontWeight: fw(subtitleWeight), fontSize: isFeed ? 34 : 38, lineHeight: 1.3, color: 'rgba(255,255,255,0.82)', textAlign }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
