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

  // FUNGSI BARU: Untuk lapor ke Supabase kalau link diklik
  const trackClick = async (id, currentClicks) => {
    const { error } = await supabase
      .from('links')
      .update({ clicks: (currentClicks || 0) + 1 })
      .eq('id', id)

    if (error) console.log('Error updating clicks:', error)
    // Kita panggil fetchLinks lagi biar data di UI langsung update (opsional)
    fetchLinks()
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
            onClick={() => trackClick(link.id, link.clicks)}
          >
            <div className="link-content">
              <span className="icon">
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
            </div>

            {/* Tampilan angka klik di pojok kanan */}
            <span className="click-count">{link.clicks || 0} clicks</span>
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
