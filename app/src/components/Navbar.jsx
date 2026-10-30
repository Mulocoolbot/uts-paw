import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header id="header-utama" className="header-utama">
      <div className="header-konten">
        <NavLink to="/" className="logo-aplikasi">
          Koleksi Tanaman Hias
        </NavLink>
        <nav className="navigasi-utama" aria-label="Navigasi Utama">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'tautan-navigasi aktif' : 'tautan-navigasi'
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/koleksi"
            className={({ isActive }) =>
              isActive ? 'tautan-navigasi aktif' : 'tautan-navigasi'
            }
          >
            Koleksi
          </NavLink>
          <NavLink
            to="/tambah"
            className={({ isActive }) =>
              isActive ? 'tautan-navigasi aktif' : 'tautan-navigasi'
            }
          >
            Tambah Tanaman
          </NavLink>
          <NavLink
            to="/statistik"
            className={({ isActive }) =>
              isActive ? 'tautan-navigasi aktif' : 'tautan-navigasi'
            }
          >
            Statistik
          </NavLink>
          <NavLink
            to="/tentang"
            className={({ isActive }) =>
              isActive ? 'tautan-navigasi aktif' : 'tautan-navigasi'
            }
          >
            Tentang
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export { Navbar }
