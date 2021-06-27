import React from 'react'
import './index.scss'

const NewsItems = ({ title, text, src, date }) => {
  const shouldSliceText = text.length > 200
  if (shouldSliceText) {
    text = text.split('').slice(0, 200).join('')
    text += '...'
  }

  return (
    <div className="news-item">
      <div className="date">{date}</div>
      <div className="image">
        <img src={src} alt="news-logo" />
      </div>
      <h2 className="title">{title}</h2>
      <p className="text">{text}</p>
    </div>
  )
}

export default NewsItems