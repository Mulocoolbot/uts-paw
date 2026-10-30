import mahasiswa from '../../mahasiswa.json'

export default function Tentang() {
  return (
    <section className="halaman-tentang">
      <h2>Tentang Pengembang & Aplikasi</h2>
      <p className="deskripsi-katalog">
        Aplikasi katalog untuk mencatat dan mengelola koleksi tanaman hias beserta identitas pengembang.
      </p>

      <div className="kartu-profil">
        <dl className="daftar-profil">
          <dt>Nama Lengkap</dt>
          <dd>{mahasiswa.nama}</dd>

          <dt>NIM</dt>
          <dd>{mahasiswa.nim}</dd>

          <dt>Kelas</dt>
          <dd>{mahasiswa.kelas}</dd>

          <dt>Tema Aplikasi</dt>
          <dd>{mahasiswa.tema}</dd>

          <dt>Repositori Proyek</dt>
          <dd>
            <a
              href="https://github.com/Mulocoolbot/uts-paw"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/Mulocoolbot/uts-paw
            </a>
          </dd>
        </dl>
      </div>
    </section>
  )
}

export { Tentang }
