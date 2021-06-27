import React, { useState, useCallback, useEffect } from 'react'
import 'date-fns';
import { loadMasters } from '../../actions/masters'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { addSchedule, loadSchedules } from '../../actions/schedules'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './index.scss'
import Button from '../../components/Button'

const timeOptions = ['8:00', '11:00', '14:00', '17:00']
const ScheduleSection = ({ visible, onClose, masters, loadMasters, addSchedule, loadSchedules, schedules, user }) => {
  useEffect(() => {
    loadMasters()
    loadSchedules()
  }, [])

  const [selected, setSelected] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().toJSON().slice(0, 19)));
  const [isVisibleMaster, setVisibleMaster] = useState(false)
  const [isVisibleService, setVisibleService] = useState(false)
  const [master, setMaster] = useState('')
  const [service, setService] = useState('')

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectTime = useCallback((time) => {
    setSelected(time)
  }, [setSelected])

  const handleVisibleMaster = useCallback(() => {
    setVisibleMaster(!isVisibleMaster)
  }, [isVisibleMaster])

  const handleVisibleService = useCallback(() => {
    setVisibleService(!isVisibleService)
  }, [isVisibleService])

  const handleSubmit = useCallback(() => {
    if (!selected || !master || !selectedDate || !service) return

    addSchedule({
      date: selectedDate.toJSON().slice(0, 10),
      master: masters.find((m) => m.name === master)._id,
      service,
      time: selected
    })
  }, [selectedDate, service, selected, masters, master, addSchedule])

  const getAvailableTimeOptions = useCallback(() => {
    const currentDate = schedules.filter((schedule) => schedule.date === selectedDate.toJSON().slice(0, 10))

    if (!currentDate.length) return timeOptions
    if (!master) return timeOptions
    const currentMaster = currentDate.filter((op) => op.master === masters.find((i) => i.name === master)._id)
    let timeAvailable = [...timeOptions]
    currentMaster.forEach((m) => {
      const index = timeAvailable.indexOf(m.time)
      if (index) timeAvailable.splice(index, 1)
    })

    return timeAvailable
  }, [masters, schedules, master, selectedDate])

  const availableTimeOptions = getAvailableTimeOptions()

  return (
    <div className={`schedule-section ${visible && 'visible'}`}>
      <div className="inner">
      {user.login
        ? (
          <>
          <div>
            <div className="header">
              <h3>
                Оставьте заявку
              </h3>
              <span onClick={onClose}>X</span>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Выберите день"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="feedback-form">
                <div className="schedule-section-rest">
                  <p>Мастер</p>
                    <div className="select" onClick={handleVisibleMaster}>
                      {master}
                      {isVisibleMaster && (
                    <div className="options">
                      {masters.length && masters.map((master, index) => (
                        <p key={index} onClick={() => setMaster(master.name)}>{master.name}</p>
                      ))}
                    </div>
                  )}
                  </div>
                  <p>Услуга</p>
                    <div className="select" onClick={handleVisibleService}>
                      {service}
                      {isVisibleService && (
                      <div className="options">
                        <p onClick={() => setService('Сделать татуировку')}>Сделать татуировку</p>
                        <p onClick={() => setService('Исправление татуировки')}>Исправление татуировки</p>
                        <p onClick={() => setService('Удаление татуировки')}>Удаление татуировки</p>
                      </div>
                  )}
                  </div>
                  <div className="time-options">
                    {availableTimeOptions.length ? availableTimeOptions.map((option, index) => (
                      <span key={index} className={`${selected === option && 'selected'}`} onClick={() => handleSelectTime(option)}>{option}</span>
                    )) : 'Нет доступных часов'}
                  </div>
                </div>
              </div>
            </div>
            <Button type='primary' onClick={handleSubmit}>Оставить заявку</Button>
          </>
        ) : (
          <div className="header">
            <h3>
              Войдите в аккаунт
            </h3>
            <span onClick={onClose}>X</span>
          </div>
        )
      }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  masters: state.masters,
  schedules: state.schedules,
  user: state.user,
})

export default connect(mapStateToProps, {
  loadMasters,
  addSchedule,
  loadSchedules,
})(ScheduleSection)