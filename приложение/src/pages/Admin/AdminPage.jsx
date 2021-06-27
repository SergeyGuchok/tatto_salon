import React, { useEffect, useCallback, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'
import { loadSchedules } from '../../actions/schedules'
import { loadMasters, addMaster } from '../../actions/masters'
import { addPortfolio } from '../../actions/portfolio'
import { addNew } from '../../actions/news'
import { logoutAction } from '../../actions/authentication'
import Button from '../../components/Button'

const AdminPage = ({ history, user, schedules, masters, loadMasters, loadSchedules, onOpen, addPortfolio, addNew, addMaster, logoutAction }) => {
  if (!user || user.role !== 'admin') {
    history.push('/home')
  }

  useEffect(() => {
    loadSchedules()
    loadMasters()
  }, [])

  const [data, setFormData] = useState({
    new: {
      src: '',
      title: '',
      text: '',
      date: ''
    },
    master: {
      name: '',
      experience: '',
      src: '',
      quote: '',
    },
    portfolio: {
      src: '',
      author: '',
      style: ''
    }
  })

  const handleFormChange = useCallback((e) => {
    const keys = e.target.name.split('.')
    setFormData({
      ...data,
      [keys[0]]: {
        ...data[keys[0]],
        [keys[1]]: e.target.value
      }
    })
  }, [data])

  const getSchedules = useCallback(() => {
    if (!user.login) return
    const arr = []
    schedules.forEach((s) => {
      const master = masters.find((m) => m._id === s.master)
      arr.push({
        ...s,
        master: master.name,
      })
    })

    return arr
  }, [masters, schedules, user.login])

  const handleAddPortfolio = useCallback(() => {
    if (!data.portfolio.src || !data.portfolio.author || !data.portfolio.style) return

    addPortfolio({
      ...data.portfolio
    })
  }, [data.portfolio, addPortfolio])

  const handleAddNew = useCallback(() => {
    if (!data.new.src || !data.new.title || !data.new.text || !data.new.date) return

    addNew({
      ...data.new
    })
  }, [data.new, addNew])

  const handleAddMaster = useCallback(() => {
    if (!data.master.src || !data.master.name || !data.master.experience || !data.master.quote) return

    addMaster({
      ...data.master
    })
  }, [data.master, addMaster])

  const sc = getSchedules()
  if (!user.login) return null
  return (
    <div className="admin">
      <div className="admin-container">
        <h2 className="header">Админка</h2>
        <div>
          <Link to="/home"><Button>На главную</Button></Link>
          <Button onClick={onOpen}>Добавить запись</Button>
          <Button onClick={logoutAction}>Выйти</Button>
        </div>
        <div className="mini-form">
          <h2>Добавить портфолио:</h2>
          <label>Ссылка на картинку</label><input value={data.portfolio.src} onChange={handleFormChange} name="portfolio.src" />
          <label>Автор </label><input onChange={handleFormChange} name="portfolio.author" />
          <label>Стиль </label><input onChange={handleFormChange} name="portfolio.style" />
          <Button onClick={handleAddPortfolio}>Добавить портфолио</Button>
        </div>
        <div className="mini-form">
          <h2>Добавить мастера:</h2>
          <label>Ссылка на фото </label><input onChange={handleFormChange} name="master.src" />
          <label>Имя </label><input onChange={handleFormChange} name="master.name" />
          <label>Опыт </label><input onChange={handleFormChange} name="master.experience" />
          <label>Фраза </label><input onChange={handleFormChange} name="master.quote" />
          <Button onClick={handleAddMaster}>Добавить мастера</Button>
        </div>
        <div className="mini-form">
          <h2>Добавить новость:</h2>
          <label>Ссылка на фото </label><input onChange={handleFormChange} name="new.src" />
          <label>Тайтл </label><input onChange={handleFormChange} name="new.title" />
          <label>текст</label><input onChange={handleFormChange} name="new.text" />
          <label>дата в формате dd/mm </label><input onChange={handleFormChange} name="new.date" />
          <Button onClick={handleAddNew}>Добавить новость</Button>
        </div>
        <div>
          <p className="requests-header">Заявки:</p>
          <div className="requests">
            {sc.map((s, index) => (
              <div key={index} className="portfolio-item">
                <h3>Мастер - {s.master}</h3>
                <p>Дата - {s.date}</p>
                <span>Время - {s.time}</span>
                <span>Услуга - {s.service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  schedules: state.schedules,
  masters: state.masters,
})

export default withRouter(connect(mapStateToProps, {
  loadMasters,
  loadSchedules,
  addPortfolio,
  addNew,
  logoutAction,
  addMaster
})(AdminPage))