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

function App() {
  return (
    <I18nProvider>
      <CloudinaryProvider>
        <ModalProvider>
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
        </ModalProvider>
      </CloudinaryProvider>
    </I18nProvider>
  )
}

export default App
