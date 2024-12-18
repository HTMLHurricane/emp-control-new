import ReactDOM from 'react-dom/client'
import { AppProvider } from '@/app/providers/AppProvider.tsx'
import { App } from '@/app/App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
)
