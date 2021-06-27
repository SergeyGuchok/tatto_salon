import React, { useCallback } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import './index.css'


const ConsultButton = () => {
  return (
    <Link to="/home#consult" className="wrapper"><button className="top-bar-button">Бесплатная консультация</button></Link>
  )
}

export default ConsultButton