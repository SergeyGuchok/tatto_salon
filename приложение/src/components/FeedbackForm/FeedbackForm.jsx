import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { sendFeedback } from '../../actions/reviews'
import './index.scss'
import Button from '../Button'

const FeedbackForm = ({ sendFeedback }) => {
  const [isVisible, setVisible] = useState(false)
  const [item, setItem] = useState('---------')
  const [mail, setMail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const onTextChange = useCallback((e) => {
    setText(e.target.value)
  }, [])
  const onMailChange = useCallback((e) => {
    setMail(e.target.value)
  }, [])
  const onNameChange = useCallback((e) => {
    setName(e.target.value)
  }, [])
  const onPhoneChange = useCallback((e) => {
    setPhone(e.target.value)
  }, [])

  const handleVisible = useCallback(() => {
    setVisible(!isVisible)
  }, [isVisible])

  const handleSubmit = useCallback(() => {
    console.log(item, text, name, phone)
    if (item.includes('-') || !text || !name || !phone) return
    sendFeedback({
      name,
      phone,
      mail,
      text,
      detail: item,
    })
  }, [item, text, name, phone, mail, sendFeedback])

  return (
    <div className='feedback-form'>
      <div className='feedback-form-left'>
        <label>E-mail<input value={mail} onChange={onMailChange} /></label>
        <label>Контактный телефон<input value={phone} onChange={onPhoneChange} /></label>
        <label>ФИО<input value={name} onChange={onNameChange} /></label>
        <label>
          Тема вопроса
          <div className="select" onClick={handleVisible}>
            {item}
            {isVisible && (
            <div className="options">
              <p onClick={() => setItem('Сделать татуировку')}>Сделать татуировку</p>
              <p onClick={() => setItem('Исправление татуировки')}>Исправление татуировки</p>
              <p onClick={() => setItem('Удаление татуировки')}>Удаление татуировки</p>
            </div>
          )}
          </div>
        </label>
      </div>
      <div className='feedback-form-right'>
        <label>Сообщение<textarea value={text} onChange={onTextChange} /></label>
        <Button type='primary' onClick={handleSubmit}>Получить консультацию</Button>
      </div>
    </div>
  )
}

export default connect(null, {
  sendFeedback
})(FeedbackForm)