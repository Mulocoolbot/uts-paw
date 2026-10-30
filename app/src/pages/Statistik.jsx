import { useKoleksi } from '../context/KoleksiContext'
import useFilterTanaman from '../hooks/useFilterTanaman'

export default function Statistik() {
  const { koleksi } = useKoleksi()
  const { statistikKategori } = useFilterTanaman(koleksi)

  return (
    <section className="halaman-statistik">
      <h2>Statistik Koleksi Tanaman</h2>
      <p className="deskripsi-halaman">
        Distribusi jumlah tanaman hias berdasarkan kategori yang dimiliki.
      </p>

      <div className="tabel-wadah">
        <table className="tabel-statistik">
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Jumlah Tanaman</th>
            </tr>
          </thead>
          <tbody>
            {statistikKategori.map(({ kategori, jumlah }) => (
              <tr key={kategori}>
                <td>{kategori}</td>
                <td>{jumlah}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>{koleksi.length}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export { Statistik }
