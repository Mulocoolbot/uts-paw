export default function RingkasanKoleksi({ totalItem = 0, totalKategori = 0 }) {
  return (
    <section className="ringkasan-grid">
      <div className="kartu-ringkasan">
        <span className="kartu-ringkasan-angka">{totalItem}</span>
        <span className="kartu-ringkasan-label">Total Tanaman Hias</span>
      </div>
      <div className="kartu-ringkasan">
        <span className="kartu-ringkasan-angka">{totalKategori}</span>
        <span className="kartu-ringkasan-label">Total Kategori</span>
      </div>
    </section>
  )
}

export { RingkasanKoleksi }
