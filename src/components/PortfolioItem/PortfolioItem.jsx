import React from 'react'
import './index.scss'

const PortfolioItem = ({ src, author, style }) => {
  return (
    <div className="portfolio-item">
      <img src={src} alt="portfolio-item" />
      <h3>Мастер - {author}</h3>
      <p>Выполнено в стиле {style}</p>
    </div>
  )
}

export default PortfolioItem