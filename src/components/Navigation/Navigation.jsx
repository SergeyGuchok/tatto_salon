import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import NavigationLink from '../Link'
import './Navigation.scss'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

const Navigation = ({ user }) => {
  const [visible, setVisible] = useState(false)
  const onBurgerClick = useCallback(() => {
    setVisible(!visible)
  }, [setVisible, visible])

  return (
    <nav>
      <div className="container">
      <div className='nav-container'>
        <img src={logo} alt='logo' />
        <ul>
          <NavigationLink to='/home'>Главная</NavigationLink>
          <NavigationLink to="/info">О нас</NavigationLink>
          <NavigationLink to="/portfolio">Портфолио</NavigationLink>
          <NavigationLink to="/masters">Наши мастера</NavigationLink>
          <NavigationLink to="/reviews">Отзывы</NavigationLink>
          {user.login
            ? user.role === 'admin' ? <NavigationLink to="/admin">Админка</NavigationLink> : <NavigationLink to="/profile">Профиль</NavigationLink>
            : <NavigationLink to="/login">Вход/Регистрация</NavigationLink>
          }
        </ul>
        <div className="menu-btn" onClick={onBurgerClick}>
          <span />
        </div>
        <ul className={`second-menu ${visible && 'visible'}`}>
          <li><Link to='/home'>Главная</Link></li>
          <li><Link to='/info'>О нас</Link></li>
          <li><Link to='/portfolio'>Портфолио</Link></li>
          <li><Link to="/masters">Наши мастера</Link></li>
          <li><Link to="/reviews">Отзывы</Link></li>
          {user.login
            ? <li><Link to="/profile">Профиль</Link></li>
            : <li><Link to="/login">Вход/Регистрация</Link></li>
          }
        </ul>
      </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Navigation)