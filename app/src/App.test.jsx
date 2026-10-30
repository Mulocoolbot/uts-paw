import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import App from './App.jsx'

const DATA_UJI = [
  {
    id: '1',
    judul: 'Monstera Deliciosa',
    kategori: 'Daun',
    namaLatin: 'Monstera deliciosa',
    frekuensiSiram: '2x seminggu',
    kebutuhanCahaya: 'sedang',
  },
  {
    id: '2',
    judul: 'Anggrek Bulan',
    kategori: 'Bunga',
    namaLatin: 'Phalaenopsis amabilis',
    frekuensiSiram: '2x seminggu',
    kebutuhanCahaya: 'sedang',
  },
]

describe('Pengujian Aplikasi Koleksi Tanaman Hias', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url) => {
        if (String(url).includes('koleksi.json')) {
          return {
            ok: true,
            status: 200,
            json: async () => DATA_UJI,
          }
        }
        return {
          ok: false,
          status: 404,
          json: async () => ({}),
        }
      }),
    )
  })

  test('1. Menampilkan judul utama "Koleksi Tanaman Hias" di halaman beranda (/)', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    const judulUtama = await screen.findByRole('heading', { level: 1 })
    expect(judulUtama).toHaveTextContent(/Koleksi Tanaman Hias/i)
  })

  test('2. Menampilkan daftar tanaman hias di halaman /koleksi setelah data dimuat melalui fetch', async () => {
    render(
      <MemoryRouter initialEntries={['/koleksi']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText('Monstera Deliciosa')).toBeInTheDocument()
    expect(await screen.findByText('Anggrek Bulan')).toBeInTheDocument()
  })

  test('3. Menyaring daftar tanaman di halaman /koleksi saat pengguna mengetik di kotak pencarian', async () => {
    render(
      <MemoryRouter initialEntries={['/koleksi']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText('Monstera Deliciosa')).toBeInTheDocument()
    expect(await screen.findByText('Anggrek Bulan')).toBeInTheDocument()

    const inputCari = screen.getByRole('searchbox')
    fireEvent.change(inputCari, { target: { value: 'Monstera' } })

    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument()
      expect(screen.queryByText('Anggrek Bulan')).not.toBeInTheDocument()
    })
  })

  test('4. Menampilkan pesan peringatan (role="alert") di halaman /tambah jika tombol Simpan ditekan saat judul kosong', async () => {
    render(
      <MemoryRouter initialEntries={['/tambah']}>
        <App />
      </MemoryRouter>,
    )
    const tombolSimpan = await screen.findByRole('button', { name: /simpan/i })
    fireEvent.click(tombolSimpan)

    const pesanPeringatan = await screen.findByRole('alert')
    expect(pesanPeringatan).toBeInTheDocument()
    expect(pesanPeringatan).toHaveTextContent(/wajib diisi/i)
  })

  test('5. Menampilkan identitas mahasiswa Ahmad Mulia Saputra dan NIM 123140168 di halaman /tentang', async () => {
    render(
      <MemoryRouter initialEntries={['/tentang']}>
        <App />
      </MemoryRouter>,
    )
    const elemenNama = await screen.findAllByText(/Ahmad Mulia Saputra/i)
    expect(elemenNama.length).toBeGreaterThan(0)
    const elemenNim = await screen.findAllByText(/123140168/)
    expect(elemenNim.length).toBeGreaterThan(0)
  })

  test('6. Menampilkan pesan 404 saat mengakses rute yang tidak dikenal', async () => {
    render(
      <MemoryRouter initialEntries={['/rute-acak-tidak-ada']}>
        <App />
      </MemoryRouter>,
    )
    const pesan404 = await screen.findByText(/404/i)
    expect(pesan404).toBeInTheDocument()
  })
})
