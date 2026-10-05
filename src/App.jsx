import './App.css'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Navbar from './Navbar'
import Hero from './Hero'
import MatchCard from './MatchCard'

function App() {
  const [matches, setMatches] = useState([])
  const [name, setName] = useState('')
  const [seat, setSeat] = useState('')

  useEffect(() => {
    getMatches()
  }, [])

  async function getMatches() {
    const { data, error } = await supabase
      .from('Matches')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setMatches(data)
    }
  }

  async function bookMatch(matchId) {
    const { error } = await supabase
      .from('Bookings')
      .insert([
        {
          match_id: matchId,
          student_name: name,
          seat_number: seat
        }
      ])

    if (error) {
      alert(error.message)
    } else {
      alert('Booking successful!')
    }
  }

  return (
  <div>
    <Navbar />

    <Hero />

    <main className="container">

      <h2 className="section-title">
        🏏 Upcoming Matches
      </h2>

      <div className="matches">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onBook={bookMatch}
          />
        ))}
      </div>

      <div className="booking-box">
        <h2>🎟️ Booking Details</h2>

        <input
          className="booking-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="booking-input"
          placeholder="Enter seat number"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        />
      </div>

    </main>
  </div>
)  
}

export default App