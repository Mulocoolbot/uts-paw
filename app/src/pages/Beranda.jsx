import { Link } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext'
import useFilterTanaman from '../hooks/useFilterTanaman'
import RingkasanKoleksi from '../components/RingkasanKoleksi'

export default function Beranda() {
  const { koleksi } = useKoleksi()
  const { daftarKategori } = useFilterTanaman(koleksi)

  return (
    <section className="halaman-beranda">
      <div className="hero-beranda">
        <h1>Koleksi Tanaman Hias</h1>
        <p className="deskripsi-katalog">
          Aplikasi katalog untuk mencatat dan mengelola koleksi tanaman hias
          beserta jadwal penyiraman dan kebutuhan cahayanya.
        </p>
      </div>

      <RingkasanKoleksi
        totalItem={koleksi.length}
        totalKategori={daftarKategori.length}
      />

      <div className="aksi-beranda">
        <Link to="/koleksi" className="tombol-utama">
          Jelajahi Koleksi
        </Link>
        <Link to="/tambah" className="tombol-sekunder">
          Tambah Tanaman Baru
        </Link>
      </div>
    </section>
  )
}

export { Beranda }
