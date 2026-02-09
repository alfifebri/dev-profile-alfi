import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [links, setLinks] = useState([])
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Fullstack Developer | DevHandal 2026'

  useEffect(() => {
    fetchLinks()

    // Efek Typewriter yang lebih stabil untuk Mobile
    let i = 0
    let isMounted = true
    setDisplayText('')

    const typing = setInterval(() => {
      if (isMounted && i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typing)
      }
    }, 100)

    return () => {
      isMounted = false
      clearInterval(typing)
    }
  }, [])

  const fetchLinks = async () => {
    const { data, error } = await supabase.from('links').select('*')
    if (error) console.log('Error fetching links:', error)
    else setLinks(data)
  }

  const trackClick = async (id, currentClicks) => {
    const { error } = await supabase
      .from('links')
      .update({ clicks: (currentClicks || 0) + 1 })
      .eq('id', id)

    if (error) console.log('Error updating clicks:', error)
    fetchLinks() // Refresh data otomatis setelah klik
  }

  return (
    <div className="container">
      <header>
        <div className="profile-wrapper">
          <img
            src="https://github.com/alfifebri.png"
            alt="Profile"
            className="profile-img"
          />
        </div>
        <h1>Alfi Febriawan</h1>
        <p className="bio">
          {displayText}
          <span className="cursor">|</span>
        </p>
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
                    className="custom-icon"
                  />
                ) : (
                  link.icon
                )}
              </span>
              <span className="label">{link.label}</span>
            </div>
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
