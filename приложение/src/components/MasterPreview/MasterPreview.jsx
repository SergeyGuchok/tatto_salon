import React, { useCallback } from 'react'
import './index.scss'
import like from '../../images/like.png'

const MasterPreview = ({ src, name, experience, quote, onLike, likes }) => {
  const onButtonClick = useCallback(() => {
    onLike(name)
  }, [name, onLike])
  return (
    <div className="master-preview">
      <img src={src} alt="master" />
      <h3>Тату-Мастер {name}</h3>
      <p>Стаж - {experience}</p>
      <span>{quote}</span>
      <button onClick={onButtonClick} className="like">
        <img src={like} alt="like" /> {likes}
      </button>
    </div>
  )
}
export default MasterPreview