import { Route, Routes } from 'react-router-dom'
import { KoleksiProvider } from './context/KoleksiContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Beranda from './pages/Beranda'
import DaftarKoleksi from './pages/DaftarKoleksi'
import DetailTanaman from './pages/DetailTanaman'
import TambahTanaman from './pages/TambahTanaman'
import Statistik from './pages/Statistik'
import Tentang from './pages/Tentang'
import TidakDitemukan from './pages/TidakDitemukan'

export default function App() {
  return (
    <KoleksiProvider>
      <div className="wadah-aplikasi">
        <Navbar />
        <main id="konten-utama" className="konten-utama">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/koleksi" element={<DaftarKoleksi />} />
            <Route path="/koleksi/:id" element={<DetailTanaman />} />
            <Route path="/tambah" element={<TambahTanaman />} />
            <Route path="/statistik" element={<Statistik />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="*" element={<TidakDitemukan />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </KoleksiProvider>
  )
}
