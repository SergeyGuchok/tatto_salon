import React, { useCallback } from 'react'
import './index.scss'
import Button from '../Button'

const Tablet = ({ alt, src, firstTextBlock, secondTextBlock, secondButtonText, onOpen }) => {
  const handleSecondButtonClick = useCallback(() => {
    onOpen && onOpen()
  }, [])
  return (
    <div className="tablet-item">
      <div>
        <div className="image">
          <img src={src} alt={alt} />
        </div>
        <div className="first">{firstTextBlock}</div>
        <div className="second">{secondTextBlock}</div>
      </div>
      <div>
        <div className="buttons">
          <Button type='primary' onClick={handleSecondButtonClick}>{secondButtonText}</Button>
        </div>
      </div>
    </div>
  )
}

export default Tablet