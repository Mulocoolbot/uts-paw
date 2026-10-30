import { useKoleksi } from '../context/KoleksiContext'
import useFilterTanaman from '../hooks/useFilterTanaman'
import FilterKoleksi from '../components/FilterKoleksi'
import KartuTanaman from '../components/KartuTanaman'

export default function DaftarKoleksi() {
  const { koleksi, loading, error } = useKoleksi()
  const {
    kataKunci,
    setKataKunci,
    kategoriAktif,
    setKategoriAktif,
    tanamanTersaring,
    daftarKategori,
  } = useFilterTanaman(koleksi)

  return (
    <section className="halaman-koleksi">
      <h2>Daftar Koleksi Tanaman</h2>

      <FilterKoleksi
        kataKunci={kataKunci}
        onUbahKataKunci={setKataKunci}
        kategoriAktif={kategoriAktif}
        onUbahKategori={setKategoriAktif}
        daftarKategori={daftarKategori}
      />

      {loading && <p className="pesan-status">Loading data koleksi...</p>}
      {error && !loading && (
        <p className="pesan-error" role="alert">
          Error memuat data: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {tanamanTersaring.length === 0 ? (
            <p className="pesan-kosong">Tidak ada tanaman yang cocok dengan pencarian.</p>
          ) : (
            <div className="grid-koleksi">
              {tanamanTersaring.map((item) => (
                <KartuTanaman key={item.id} tanaman={item} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export { DaftarKoleksi }
