import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [koleksi, setKoleksi] = useLocalStorage('koleksi_tanaman_paw', null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function muatDataAwal() {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!response.ok) {
          throw new Error(`Gagal memuat data (status ${response.status})`)
        }
        const dataJson = await response.json()

        const tersimpan = window.localStorage.getItem('koleksi_tanaman_paw')
        let dataTersimpan = null
        if (tersimpan) {
          try {
            dataTersimpan = JSON.parse(tersimpan)
          } catch {
            dataTersimpan = null
          }
        }

        if (Array.isArray(dataTersimpan) && dataTersimpan.length > 0) {
          setKoleksi(dataTersimpan)
        } else {
          setKoleksi(dataJson)
        }
        setError(null)
      } catch (err) {
        setError(err.message || 'Gagal memuat data koleksi')
      } finally {
        setLoading(false)
      }
    }

    muatDataAwal()
  }, [setKoleksi])

  const tambahTanaman = (itemBaru) => {
    const tanamanBaru = { id: String(Date.now()), ...itemBaru }
    setKoleksi((prev) => {
      const daftar = Array.isArray(prev) ? prev : []
      return [...daftar, tanamanBaru]
    })
    return tanamanBaru
  }

  const hapusTanaman = (id) => {
    setKoleksi((prev) => {
      const daftar = Array.isArray(prev) ? prev : []
      return daftar.filter((item) => String(item.id) !== String(id))
    })
  }

  const value = {
    koleksi: koleksi ?? [],
    items: koleksi ?? [],
    loading,
    error,
    tambahTanaman,
    tambah: tambahTanaman,
    hapusTanaman,
    hapus: hapusTanaman,
  }

  return (
    <KoleksiContext.Provider value={value}>
      {children}
    </KoleksiContext.Provider>
  )
}

export function useKoleksi() {
  const context = useContext(KoleksiContext)
  if (!context) {
    throw new Error('useKoleksi harus digunakan di dalam KoleksiProvider')
  }
  return context
}

export { KoleksiContext }
