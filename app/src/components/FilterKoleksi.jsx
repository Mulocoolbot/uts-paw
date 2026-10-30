export default function FilterKoleksi({
  kataKunci,
  onUbahKataKunci,
  kategoriAktif,
  onUbahKategori,
  daftarKategori = [],
}) {
  const opsiKategori = ['Semua', ...daftarKategori.filter((k) => k !== 'Semua')]

  return (
    <section className="panel-filter">
      <div className="filter-grup-cari">
        <input
          type="search"
          role="searchbox"
          placeholder="Cari judul tanaman..."
          value={kataKunci}
          onChange={(e) => onUbahKataKunci(e.target.value)}
          aria-label="Cari tanaman"
          className="input-cari"
        />
      </div>
      <div className="filter-grup-kategori">
        <select
          aria-label="Filter kategori"
          value={kategoriAktif}
          onChange={(e) => onUbahKategori(e.target.value)}
          className="select-kategori"
        >
          {opsiKategori.map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori === 'Semua' ? 'Semua Kategori' : kategori}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export { FilterKoleksi }
