import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { KpiProvider, MetricsProvider, SegmentsProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KpiProvider>
      <MetricsProvider>
        <SegmentsProvider>
          <App />
        </SegmentsProvider>
      </MetricsProvider>
    </KpiProvider>
  </React.StrictMode>,
)
