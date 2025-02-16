import ReactDOM from 'react-dom/client'
import { AppProvider } from '@/app/providers/AppProvider.tsx'
import { App } from '@/app/App.tsx'
import './index.css'
import '../shared/lib/i18n/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
)
