import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { AppState, AppAction, Step } from '../types'

const STORAGE_KEY = 'atlantida-content-tool'

function loadStorage(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveStorage(state: AppState) {
  const { cloudinaryConfig, imageBank } = state
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ cloudinaryConfig, imageBank }))
}

const stored = loadStorage()

const initialState: AppState = {
  step: 1,
  eyebrow: 'Moda Praia',
  eyebrowWeight: 'normal',
  selectedText: '',
  mainWeight: 'normal',
  subtitle: '',
  subtitleWeight: 'normal',
  textAlign: 'left',
  textCase: 'upper',
  textPosition: 'bottom',
  imageX: 50,
  imageY: 50,
  imageZoom: 100,
  darkMode: false,
  selectedImage: null,
  templateId: 'A',
  format: 'feed',
  imageBank: stored.imageBank ?? [],
  isExporting: false,
  cloudinaryConfig: stored.cloudinaryConfig ?? { cloudName: '', uploadPreset: '' },
  showSettings: false,
  brandMark: 'logo',
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STEP':             return { ...state, step: action.payload }
    case 'SET_EYEBROW':          return { ...state, eyebrow: action.payload }
    case 'SET_EYEBROW_WEIGHT':   return { ...state, eyebrowWeight: action.payload }
    case 'SELECT_TEXT':          return { ...state, selectedText: action.payload }
    case 'SET_MAIN_WEIGHT':      return { ...state, mainWeight: action.payload }
    case 'SET_SUBTITLE':         return { ...state, subtitle: action.payload }
    case 'SET_SUBTITLE_WEIGHT':  return { ...state, subtitleWeight: action.payload }
    case 'SET_TEXT_ALIGN':       return { ...state, textAlign: action.payload }
    case 'SET_TEXT_CASE':        return { ...state, textCase: action.payload }
    case 'SET_TEXT_POSITION':    return { ...state, textPosition: action.payload }
    case 'SET_IMAGE_X':          return { ...state, imageX: action.payload }
    case 'SET_IMAGE_Y':          return { ...state, imageY: action.payload }
    case 'SET_IMAGE_ZOOM':       return { ...state, imageZoom: action.payload }
    case 'TOGGLE_DARK_MODE':     return { ...state, darkMode: !state.darkMode }
    case 'SELECT_IMAGE':         return { ...state, selectedImage: action.payload }
    case 'SET_TEMPLATE':         return { ...state, templateId: action.payload }
    case 'SET_FORMAT':           return { ...state, format: action.payload }
    case 'ADD_TO_BANK':          return { ...state, imageBank: [action.payload, ...state.imageBank] }
    case 'REMOVE_FROM_BANK':     return {
      ...state,
      imageBank: state.imageBank.filter(i => i.id !== action.payload),
      selectedImage: state.selectedImage?.id === action.payload ? null : state.selectedImage,
    }
    case 'SET_EXPORTING':        return { ...state, isExporting: action.payload }
    case 'SET_CLOUDINARY':       return { ...state, cloudinaryConfig: action.payload }
    case 'TOGGLE_SETTINGS':      return { ...state, showSettings: !state.showSettings }
    case 'SET_BRAND_MARK':       return { ...state, brandMark: action.payload }
    default: return state
  }
}

interface ContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  goToStep: (s: Step) => void
  nextStep: () => void
}

const AppContext = createContext<ContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => { saveStorage(state) }, [state])
  function goToStep(s: Step) { dispatch({ type: 'SET_STEP', payload: s }) }
  function nextStep() { goToStep(Math.min(state.step + 1, 4) as Step) }
  return (
    <AppContext.Provider value={{ state, dispatch, goToStep, nextStep }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
