import Header from './components/Header'
import Online from './components/Online'
import About from './components/About'
import Certificate from './components/Certificate'
import Students from './components/Students'
import Price from './components/Price'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { CloudinaryProvider } from './context/CloudinaryProvider'
import './App.css'

function App() {
  return (
    <CloudinaryProvider>
      <div className="app">
        <Header />
        <Online />
        <About />
        <Certificate />
        <Students />
        <Price />
        <FAQ />
        <Footer />
      </div>
    </CloudinaryProvider>
  )
}

export default App
