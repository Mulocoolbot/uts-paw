import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [koleksi, setKoleksi] = useLocalStorage('koleksi_tanaman_paw', null)
  const [loading, setLoading] = useState(() => {
    try {
      const tersimpan = window.localStorage.getItem('koleksi_tanaman_paw')
      if (tersimpan) {
        const parsed = JSON.parse(tersimpan)
        return !(Array.isArray(parsed) && parsed.length > 0)
      }
    } catch {}
    return true
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    let abaikan = false

    async function muatDataAwal() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!response.ok) {
          throw new Error(`Gagal memuat data (status ${response.status})`)
        }
        const dataJson = await response.json()

        if (abaikan) return

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
        if (!abaikan) {
          setError(err.message || 'Gagal memuat data koleksi')
        }
      } finally {
        if (!abaikan) {
          setLoading(false)
        }
      }
    }

    muatDataAwal()

    return () => {
      abaikan = true
    }
  }, [setKoleksi])

  const tambahTanaman = (itemBaru) => {
    let tanamanBaru = null
    setKoleksi((prev) => {
      const daftar = Array.isArray(prev) ? prev : []
      const idBaru = String(Math.max(0, ...daftar.map((t) => Number(t.id) || 0)) + 1)
      tanamanBaru = { id: idBaru, ...itemBaru }
      return [...daftar, tanamanBaru]
    })
    return tanamanBaru
  }

  const hapusTanaman = (id) => {
    setKoleksi((prev) => {
      const daftar = Array.isArray(prev) ? prev : []
      return daftar.filter((t) => String(t.id) !== String(id))
    })
  }

  const ubahTanaman = (id, dataBaru) => {
    setKoleksi((prev) => {
      const daftar = Array.isArray(prev) ? prev : []
      return daftar.map((t) => (String(t.id) === String(id) ? { ...t, ...dataBaru } : t))
    })
  }

  const dapatkanTanamanBerdasarkanId = (id) => {
    const daftar = Array.isArray(koleksi) ? koleksi : []
    return daftar.find((t) => String(t.id) === String(id))
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
    ubahTanaman,
    ubah: ubahTanaman,
    dapatkanTanamanBerdasarkanId,
  }

  return (
    <KoleksiContext.Provider value={value}>
      {children}
    </KoleksiContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export function useKoleksi() {
  const context = useContext(KoleksiContext)
  if (!context) {
    throw new Error('useKoleksi harus digunakan di dalam KoleksiProvider')
  }
  return context
}

export { KoleksiContext }
