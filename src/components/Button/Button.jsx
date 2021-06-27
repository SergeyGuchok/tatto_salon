import React, { useCallback } from 'react'
import './index.css'

const Button = ({ type, children, onClick, onWhiteBg = false }) => {
  const handleClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  switch (type) {
    case 'primary':
      return (
        <button
          className={`button button-primary ${onWhiteBg && 'on-white-bg'}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )

    case 'link':
      return (
        <button
          className={`button button-link ${onWhiteBg && 'on-white-bg'}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )

    default:
      return (
        <button
          className={`button button-default ${onWhiteBg && 'on-white-bg'}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )
  }
}

export default Button