import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'
import Navigation from '../../components/Navigation'
import { loginAction } from '../../actions/authentication'
import './index.scss'

const LoginPage = ({ loginAction }) => {
  const [data, setData] = useState({
    login: '',
    password: '',
  })
  const onButtonClick = () => {
    if (!data.login || !data.password) return
    loginAction(data)
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
          <h2>Логин</h2>
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
          <Link to='/register'><Button>Еще не зарегестрированы?</Button></Link>
          <Button type='primary' onClick={onButtonClick}>Войти</Button>
        </div>
      </div>
    </section>
    </>
  )
}

export default connect(null, {
  loginAction
})(LoginPage)