import { Link } from 'react-router-dom'

export default function KartuTanaman({ tanaman }) {
  if (!tanaman) return null

  const {
    id,
    judul,
    kategori,
    namaLatin,
    frekuensiSiram,
    kebutuhanCahaya,
  } = tanaman

  return (
    <article className="kartu-tanaman">
      <div className="kartu-header">
        <h3 className="kartu-judul">{judul}</h3>
        <span className={`badge-kategori badge-${kategori?.toLowerCase()}`}>
          {kategori}
        </span>
      </div>
      <p className="nama-latin">{namaLatin}</p>
      <div className="info-perawatan">
        <span className="info-item">
          <strong>Siram:</strong> {frekuensiSiram}
        </span>
        <span className="info-item">
          <strong>Cahaya:</strong> {kebutuhanCahaya}
        </span>
      </div>
      <Link to={`/koleksi/${id}`} className="tombol-detail">
        Lihat Detail
      </Link>
    </article>
  )
}

export { KartuTanaman }
