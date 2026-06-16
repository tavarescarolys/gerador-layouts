import type { CloudinaryConfig, ImageItem } from '../types'

export async function uploadImage(
  file: File,
  config: CloudinaryConfig
): Promise<ImageItem> {
  if (!config.cloudName || !config.uploadPreset) {
    throw new Error('Cloudinary não configurado. Abra as configurações.')
  }

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', config.uploadPreset)
  form.append('folder', 'atlantida-content')

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    { method: 'POST', body: form }
  )

  if (!res.ok) throw new Error(`Erro no upload: ${res.status}`)

  const data = await res.json() as { public_id: string; secure_url: string; original_filename: string }

  return {
    id: data.public_id,
    url: data.secure_url,
    name: data.original_filename ?? file.name,
    uploadedAt: Date.now(),
  }
}
