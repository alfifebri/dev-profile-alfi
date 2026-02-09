import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    const { data, error } = await supabase.from('links').select('*')

    if (error) console.log('Error fetching links:', error)
    else setLinks(data)
  }

  return (
    <div className="container">
      <header>
        <img
          src="https://github.com/alfifebri.png"
          alt="Profile"
          className="profile-img"
        />
        <h1>Alfi Febriawan</h1>
        <p className="bio">Fullstack Developer | DevHandal 2026 </p>
      </header>

      <div className="links-container">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <span className="icon">
              {/* Logika cerdas: Cek kalau icon isinya link (http), tampilin gambar. Kalau bukan, tampilin teks/emoji */}
              {link.icon && link.icon.startsWith('http') ? (
                <img
                  src={link.icon}
                  alt={link.label}
                  style={{ width: '24px', height: '24px', display: 'block' }}
                />
              ) : (
                link.icon
              )}
            </span>
            <span className="label">{link.label}</span>
          </a>
        ))}
      </div>

      <footer>
        <p>Built with React & Supabase</p>
      </footer>
    </div>
  )
}

export default App
