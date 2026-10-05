function MatchCard({ match, onBook }) {
  return (
    <div className="match-card">
      <h2>
        🏏 {match.team1} vs {match.team2}
      </h2>

      <p className="match-time">
        🕐 {match.match_time}
      </p>

      <button
        className="book-button"
        onClick={() => onBook(match.id)}
      >
        Book This Match
      </button>
    </div>
  )
}

export default MatchCard