import { useCallback, useEffect, useState } from 'react'

export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = window.localStorage.getItem(kunci)
      return tersimpan !== null ? JSON.parse(tersimpan) : nilaiAwal
    } catch {
      return nilaiAwal
    }
  })

  useEffect(() => {
    try {
      if (nilai === null || nilai === undefined) {
        window.localStorage.removeItem(kunci)
      } else {
        window.localStorage.setItem(kunci, JSON.stringify(nilai))
      }
    } catch {}
  }, [kunci, nilai])

  const perbaruiNilai = useCallback((nilaiBaru) => {
    setNilai((prev) => {
      const hasil = typeof nilaiBaru === 'function' ? nilaiBaru(prev) : nilaiBaru
      try {
        if (hasil === null || hasil === undefined) {
          window.localStorage.removeItem(kunci)
        } else {
          window.localStorage.setItem(kunci, JSON.stringify(hasil))
        }
      } catch {}
      return hasil
    })
  }, [kunci])

  return [nilai, perbaruiNilai]
}

export { useLocalStorage }
