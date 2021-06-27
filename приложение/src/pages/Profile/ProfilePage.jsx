import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import Navigation from '../../components/Navigation'
import Button from '../../components/Button'
import { logoutAction } from '../../actions/authentication'
import { loadSchedules } from '../../actions/schedules'
import { loadMasters } from '../../actions/masters'
import './index.scss'

const ProfilePage = ({ user, history, logoutAction, loadSchedules, schedules, masters, loadMasters }) => {
  useEffect(() => {
    loadSchedules()
    loadMasters()
  }, [])

  if (!user || !user.login) {
    history.push('/home')
  }

  const getUserSchedules = useCallback(() => {
    if (!masters.length || !schedules.length) return []
    const userSchedules = []
    user.schedules && user.schedules.forEach((s) => {
      const us = schedules.find((sc) => sc._id === s)
      const master = masters.find((m) => m._id === us.master)
      const res = {
        ...us,
        master: master.name,
      }
      userSchedules.push(res)
    })
    return userSchedules
  }, [user, schedules, masters])

  const userSchedules = getUserSchedules()

  return (
    <>
      <TopBar />
      <Navigation />
      <section className="profile-section">
        <div className="container">
          <div className="profile-inner">
            <div className="profile-header">
              <h2>{user.login}</h2>
              <div>
                <Link to="/reviews"><Button type="primary">Оставить отзыв</Button></Link>
                <Button onClick={logoutAction}>Выйти</Button>
              </div>
            </div>
            <div className="profile-schedule">
              <h2>Ваши записи:</h2>
              <div className="profile-schedule-inner">
                {userSchedules.length
                  ? userSchedules.map((s, key) => (
                    <div key={key} className="portfolio-item">
                      <h3>Мастер - {s.master}</h3>
                      <p>Дата - {s.date}</p>
                      <span>Время - {s.time}</span>
                      <span>Услуга - {s.service}</span>
                    </div>
                  ))
                  : <span>У вас нет записей :( Скорее записывайтесь!</span>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  schedules: state.schedules,
  masters: state.masters,
})

export default withRouter(connect(mapStateToProps, {
  logoutAction,
  loadSchedules,
  loadMasters
})(ProfilePage))