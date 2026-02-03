import { useEffect } from 'react'
import Header from './components/Header'
import Online from './components/Online'
import About from './components/About'
import Certificate from './components/Certificate'
import Students from './components/Students'
import Price from './components/Price'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ApplicationModal from './components/ApplicationModal'
import { CloudinaryProvider } from './context/CloudinaryProvider'
import { ModalProvider } from './context/ModalContext'
import { I18nProvider } from './i18n'
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import ThankYou from './pages/ThankYou.tsx'

const HomePage = () => (
  <div className="app">
    <Header />
    <Online />
    <About />
    <Certificate />
    <Students />
    <Price />
    <FAQ />
    <Footer />
    <ApplicationModal />
  </div>
)

const RedirectHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect')
    if (redirect) {
      const target = decodeURIComponent(redirect)
      navigate(target, { replace: true })
    }
  }, [navigate])

  return null
}

function App() {
  return (
    <I18nProvider>
      <CloudinaryProvider>
        <ModalProvider>
          <BrowserRouter>
            <RedirectHandler />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </CloudinaryProvider>
    </I18nProvider>
  )
}

export default App
