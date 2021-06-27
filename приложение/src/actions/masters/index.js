import { notification } from 'antd'
import mastersApiService from '../../services/masters'

const SAVE_MASTERS = (masters) => ({
  type: 'SAVE_MASTERS',
  payload: masters,
})

const loadMasters = () => async (dispatch) => {
  try {
    const { masters } = await mastersApiService.getMasters()
    dispatch(SAVE_MASTERS(masters))
  } catch (e) {
    console.log(e)
  }
}

const likeMaster = (_id) => async (dispatch) => {
  try {
    const { masters } = await mastersApiService.likeMaster(_id)
    dispatch(SAVE_MASTERS(masters))
  } catch (e) {
    console.log(e)
  }
}

const addMaster = (data) => async (dispatch) => {
  try {
    const { masters } = await mastersApiService.addMaster(data)
    dispatch(SAVE_MASTERS(masters))
    notification.success({
      message: 'Мастер добавлен',
      duration: 5
    })
  } catch (e) {
    console.log(e)
    notification.error({
      message: 'Мастер не добавлен',
      duration: 5,
    })
  }
}

export {
  loadMasters,
  likeMaster,
  addMaster
}