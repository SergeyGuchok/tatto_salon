import React from 'react'
import './index.scss'

const AdvantageSection = ({ firstText, secondText }) => {
  return (
    <div className="advantage-section">
      <p>{firstText}</p>
      <span>{secondText}</span>
    </div>
  )
}

export default AdvantageSection