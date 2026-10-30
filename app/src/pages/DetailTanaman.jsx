import { Link, useNavigate, useParams } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext'

export default function DetailTanaman() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { koleksi, loading, hapusTanaman } = useKoleksi()

  const tanaman = koleksi.find((item) => String(item.id) === String(id))

  if (loading) {
    return <p className="pesan-status">Loading data koleksi...</p>
  }

  if (!tanaman) {
    return (
      <section className="halaman-detail detail-kosong">
        <p>Tanaman tidak ditemukan dalam koleksi.</p>
        <Link to="/koleksi" className="tautan-kembali">
          Kembali ke Daftar Koleksi
        </Link>
      </section>
    )
  }

  const handleHapus = () => {
    if (window.confirm(`Hapus tanaman "${tanaman.judul}"?`)) {
      hapusTanaman(tanaman.id)
      navigate('/koleksi')
    }
  }

  return (
    <article className="halaman-detail">
      <h2>{tanaman.judul}</h2>
      <p className="kategori-detail">
        Kategori: {tanaman.kategori}
      </p>

      <dl className="detail-spesifikasi">
        <dt>Nama Latin</dt>
        <dd>{tanaman.namaLatin}</dd>

        <dt>Frekuensi Siram</dt>
        <dd>{tanaman.frekuensiSiram}</dd>

        <dt>Kebutuhan Cahaya</dt>
        <dd>{tanaman.kebutuhanCahaya}</dd>
      </dl>

      <div className="aksi-detail">
        <button
          type="button"
          className="tombol-hapus"
          onClick={handleHapus}
        >
          Hapus
        </button>
        <Link to="/koleksi" className="tautan-kembali">
          Kembali ke Koleksi
        </Link>
      </div>
    </article>
  )
}

export { DetailTanaman }
