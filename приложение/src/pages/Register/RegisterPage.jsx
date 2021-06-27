import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'
import Navigation from '../../components/Navigation'
import './index.scss'
import { registerAction } from '../../actions/authentication'

const RegisterPage = ({ registerAction }) => {
  const [data, setData] = useState({
    login: '',
    password: '',
  })
  const onButtonClick = () => {
    if (!data.login || !data.password) return
    registerAction(data)
  }

  const onFormChange = useCallback((e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }, [data])

  return (
    <>
    <TopBar />
    <Navigation />
    <section className="register sixth-block">
      <div className="container">
        <div className="news-inner-header">
          <h2>Регистрация</h2>
        </div>
        <div className="register-inner">
          <label>
            Логин <input name="login" onChange={onFormChange}/>
          </label>
          <label>
            Пароль <input name="password" type="password" onChange={onFormChange}/>
          </label>
        </div>
        <div className='go-to-login'>
          <Link to='/login'><Button>Уже зарегестрированы?</Button></Link>
          <Button type='primary' onClick={onButtonClick}>Зарегестрироваться</Button>
        </div>
      </div>
    </section>
    </>
  )
}

export default connect(null, {
  registerAction
})(RegisterPage)