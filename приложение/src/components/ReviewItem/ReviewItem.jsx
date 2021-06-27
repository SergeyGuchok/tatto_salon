import React from 'react'

const ReviewItem = ({ score, author, text, user }) => {
  return (
    <div className="portfolio-item">
      {user
        ? <div className="user">{user}</div>
        : ''
      }
      <h3>Мастер - {author}</h3>
      <p>Оценка - {score}</p>
      <span>{text}</span>
    </div>
  )
}

export default ReviewItem