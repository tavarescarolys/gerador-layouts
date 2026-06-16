import html2canvas from 'html2canvas'
import type { Format } from '../types'

const DIMS = {
  feed:  { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
}

export async function exportCanvas(el: HTMLElement, format: Format): Promise<void> {
  const { w, h } = DIMS[format]

  await document.fonts.ready

  // Clone the element and render at full size off-screen (without the CSS scale transform)
  const clone = el.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.transformOrigin = 'top left'
  clone.style.position = 'fixed'
  clone.style.top = '-99999px'
  clone.style.left = '-99999px'
  clone.style.width = w + 'px'
  clone.style.height = h + 'px'
  clone.style.zIndex = '-1'
  document.body.appendChild(clone)

  try {
    const canvas = await html2canvas(clone, {
      width: w,
      height: h,
      scale: 1,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
    })

    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `atlantida-${format}-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  } finally {
    document.body.removeChild(clone)
  }
}
