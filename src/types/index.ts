export type Format = 'feed' | 'story'
export type TemplateId = 'A' | 'B' | 'C'
export type Step = 1 | 2 | 3 | 4
export type BrandMark = 'logo' | 'handle'
export type TextAlign = 'left' | 'center' | 'right'
export type TextCase = 'upper' | 'normal'
export type TextPosition = 'top' | 'center' | 'bottom'
export type FontWeight = 'normal' | 'bold' | 'black'

export interface ImageItem {
  id: string
  url: string
  name: string
  uploadedAt: number
}

export interface CloudinaryConfig {
  cloudName: string
  uploadPreset: string
}

export interface AppState {
  step: Step
  eyebrow: string
  eyebrowWeight: FontWeight
  selectedText: string
  mainWeight: FontWeight
  subtitle: string
  subtitleWeight: FontWeight
  textAlign: TextAlign
  textCase: TextCase
  textPosition: TextPosition
  imageX: number
  imageY: number
  imageZoom: number
  darkMode: boolean
  selectedImage: ImageItem | null
  templateId: TemplateId
  format: Format
  imageBank: ImageItem[]
  isExporting: boolean
  cloudinaryConfig: CloudinaryConfig
  showSettings: boolean
  brandMark: BrandMark
}

export type AppAction =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'SET_EYEBROW'; payload: string }
  | { type: 'SET_EYEBROW_WEIGHT'; payload: FontWeight }
  | { type: 'SELECT_TEXT'; payload: string }
  | { type: 'SET_MAIN_WEIGHT'; payload: FontWeight }
  | { type: 'SET_SUBTITLE'; payload: string }
  | { type: 'SET_SUBTITLE_WEIGHT'; payload: FontWeight }
  | { type: 'SET_TEXT_ALIGN'; payload: TextAlign }
  | { type: 'SET_TEXT_CASE'; payload: TextCase }
  | { type: 'SET_TEXT_POSITION'; payload: TextPosition }
  | { type: 'SET_IMAGE_X'; payload: number }
  | { type: 'SET_IMAGE_Y'; payload: number }
  | { type: 'SET_IMAGE_ZOOM'; payload: number }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SELECT_IMAGE'; payload: ImageItem | null }
  | { type: 'SET_TEMPLATE'; payload: TemplateId }
  | { type: 'SET_FORMAT'; payload: Format }
  | { type: 'ADD_TO_BANK'; payload: ImageItem }
  | { type: 'REMOVE_FROM_BANK'; payload: string }
  | { type: 'SET_EXPORTING'; payload: boolean }
  | { type: 'SET_CLOUDINARY'; payload: CloudinaryConfig }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'SET_BRAND_MARK'; payload: BrandMark }

export interface TemplateProps {
  eyebrow: string
  eyebrowWeight: FontWeight
  text: string
  mainWeight: FontWeight
  subtitle: string
  subtitleWeight: FontWeight
  textAlign: TextAlign
  textCase: TextCase
  textPosition: TextPosition
  imageX: number
  imageY: number
  imageZoom: number
  image: ImageItem | null
  format: Format
  brandMark: BrandMark
}

export function fw(weight: FontWeight): number {
  return weight === 'black' ? 900 : weight === 'bold' ? 700 : 300
}
