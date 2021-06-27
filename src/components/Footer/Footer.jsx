import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { authenticateAction } from '../../actions/authentication'
import ConsultButton from '../ConsultButton'
import { withRouter } from 'react-router-dom'
import './index.scss'

const Footer = ({ authenticateAction, ...rest }) => {
  useEffect(() => {
    authenticateAction()
  }, [])
  return rest.location.pathname !== '/admin' ? (
    <footer className="footer">
      <div className="content">
        <div className="container">
          <div className="footer-inner">
          <div className="footer-info">
              <div className="footer-title">Тату-салон TATTOO-PLANET.BY</div>
              <div className="footer-text">
                Выбери Нас и будь доволен всю жизнь, консультация каждого
                клиента индивидуально.
              </div>
              <ConsultButton />
              <ul className="footer-list">
                <li>
                  <a className="footer-phone" href="tel:375292522039">+375(29) 25-220-39</a>
                </li>
                <li><a className="footer-mail" href="#">tattoo-planet@gmail.by</a></li>
                <li>
                  <span className="footer-address">г Лида, ул Вороновская,8</span>
                </li>
              </ul>
            </div>
            <div className="footer-map">
              <iframe title="map" height="250px" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.7334775978984!2d25.281683214523458!3d53.93647873411026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46de61ef154995dd%3A0x57e481669823e7d2!2zVm9yb25vdnNrYXlhIDgsINCb0LjQtNCw!5e0!3m2!1sru!2sby!4v1621617328160!5m2!1sru!2sby" width="400" allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="copy" />
  </footer>
  ) : null
}

export default withRouter(connect(null, {
  authenticateAction
})(Footer))