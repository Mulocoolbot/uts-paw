import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext'

export default function TambahTanaman() {
  const navigate = useNavigate()
  const { tambahTanaman } = useKoleksi()

  const [judul, setJudul] = useState('')
  const [kategori, setKategori] = useState('Daun')
  const [namaLatin, setNamaLatin] = useState('')
  const [frekuensiSiram, setFrekuensiSiram] = useState('')
  const [kebutuhanCahaya, setKebutuhanCahaya] = useState('')
  const [pesanError, setPesanError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!judul.trim()) {
      setPesanError('Judul tanaman wajib diisi')
      return
    }

    tambahTanaman({
      judul: judul.trim(),
      kategori: kategori || 'Daun',
      namaLatin: namaLatin.trim() || '-',
      frekuensiSiram: frekuensiSiram.trim() || '2x seminggu',
      kebutuhanCahaya: kebutuhanCahaya.trim() || 'sedang',
    })

    navigate('/koleksi')
  }

  return (
    <section className="halaman-tambah">
      <h2>Tambah Koleksi Tanaman Baru</h2>

      {pesanError && (
        <div role="alert" className="pesan-error">
          {pesanError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-tambah">
        <div className="form-grup">
          <label htmlFor="input-judul">Judul</label>
          <input
            id="input-judul"
            type="text"
            value={judul}
            onChange={(e) => {
              setJudul(e.target.value)
              if (pesanError) setPesanError('')
            }}
            placeholder="Contoh: Monstera Deliciosa"
          />
        </div>

        <div className="form-grup">
          <label htmlFor="input-kategori">Kategori</label>
          <select
            id="input-kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            <option value="Daun">Daun</option>
            <option value="Bunga">Bunga</option>
            <option value="Sukulen">Sukulen</option>
            <option value="Gantung">Gantung</option>
          </select>
        </div>

        <div className="form-grup">
          <label htmlFor="input-nama-latin">Nama Latin</label>
          <input
            id="input-nama-latin"
            type="text"
            value={namaLatin}
            onChange={(e) => setNamaLatin(e.target.value)}
            placeholder="Contoh: Monstera deliciosa"
          />
        </div>

        <div className="form-grup">
          <label htmlFor="input-frekuensi-siram">Frekuensi Siram</label>
          <input
            id="input-frekuensi-siram"
            type="text"
            value={frekuensiSiram}
            onChange={(e) => setFrekuensiSiram(e.target.value)}
            placeholder="Contoh: 2x seminggu"
          />
        </div>

        <div className="form-grup">
          <label htmlFor="input-kebutuhan-cahaya">Kebutuhan Cahaya</label>
          <input
            id="input-kebutuhan-cahaya"
            type="text"
            value={kebutuhanCahaya}
            onChange={(e) => setKebutuhanCahaya(e.target.value)}
            placeholder="Contoh: sedang"
          />
        </div>

        <div className="form-aksi">
          <button type="submit" className="tombol-simpan">
            Simpan
          </button>
        </div>
      </form>
    </section>
  )
}

export { TambahTanaman }
