import { useState } from 'react'

export default function useFilterTanaman(daftarTanaman = []) {
  const [kataKunci, setKataKunci] = useState('')
  const [kategoriAktif, setKategoriAktif] = useState('Semua')

  const daftarKategori = [
    ...new Set(daftarTanaman.map(({ kategori }) => kategori).filter(Boolean)),
  ]

  const tanamanTersaring = daftarTanaman.filter((tanaman) => {
    const { judul = '', kategori = '' } = tanaman
    const teksPencarian = `${kataKunci}`.trim().toLowerCase()
    const cocokJudul = judul.toLowerCase().includes(teksPencarian)
    const cocokKategori = kategoriAktif === 'Semua' || kategori === kategoriAktif
    return cocokJudul && cocokKategori
  })

  const hitungKategori = daftarTanaman.reduce((acc, { kategori }) => {
    if (kategori) {
      acc[kategori] = (acc[kategori] ?? 0) + 1
    }
    return acc
  }, {})

  const statistikKategori = Object.entries(hitungKategori).map(([kategori, jumlah]) => ({
    kategori,
    jumlah,
  }))

  return {
    kataKunci,
    setKataKunci,
    kategoriAktif,
    setKategoriAktif,
    tanamanTersaring,
    daftarKategori,
    statistikKategori,
  }
}

export { useFilterTanaman }
