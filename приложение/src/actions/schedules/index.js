import schedulesApiService from '../../services/schedules'
import { notification } from "antd";

const SAVE_SCHEDULES = (reviews) => ({
  type: 'SAVE_SCHEDULES',
  payload: reviews,
})

const loadSchedules = () => async (dispatch) => {
  try {
    const { schedules } = await schedulesApiService.getSchedules()
    dispatch(SAVE_SCHEDULES(schedules))
  } catch (e) {
    console.log(e)
  }
}

const addSchedule = (data) => async () => {
  try {
    const { success } = await schedulesApiService.addSchedule(data)

    if (success) {
      notification.success({
        message: 'Заявка успешно создана! Наш менеджер свяжется с вами в ближайшее время',
        duration: 5,
      })
    } else {
      notification.error({
        message: 'Что-то пошло не так :('
      })
    }
  } catch (e) {
    console.log(e)
    notification.error({
      message: 'Что-то пошло не так :('
    })
  }
}

export {
  loadSchedules,
  addSchedule,
}