import { Link } from 'react-router-dom'

export default function TidakDitemukan() {
  return (
    <section className="halaman-tidak-ditemukan">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.</p>
      <Link to="/" className="tautan-beranda">
        Kembali ke Beranda
      </Link>
    </section>
  )
}

export { TidakDitemukan }
