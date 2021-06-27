import React from 'react'
import './TopBar.scss'
import ConsultButton from '../ConsultButton'

const TopBar = () => {
  return (
    <div className='top-bar'>
      <div className="container">
        <div className="top-bar-container">
        <div className='top-bar-contacts'>
          <a href='tel:375292522039'>+375 (29) 25-220-39</a>
          <a href="#">tattoo-planet@gmail.by</a>
        </div>
        <ConsultButton />
        </div>
      </div>
    </div>
  )
}

export default TopBar