import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'
import {ThemeContextProvider, UseTheme} from "./context/ThemeContext.jsx"
import { KidsContextProvider } from "./context/KidsContext.jsx"
import CssBaseline from '@mui/material/CssBaseline'

function Root() {
  const {theme} = UseTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <ThemeContextProvider>
      <KidsContextProvider>
        <Root />
      </KidsContextProvider>
    </ThemeContextProvider>
  </>,
)
