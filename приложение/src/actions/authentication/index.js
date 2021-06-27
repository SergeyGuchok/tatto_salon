import authenticationApiService from '../../services/authentication'
import { saveToLocalStorage, removeFromLocalStorage } from '../../utils/localstorage'
import { notification } from "antd";

const TOKEN_KEY = 'token'

const saveUserInfo = (data) => ({
  type: 'SAVE_USER_INFO',
  payload: data
})

const removeUser = () => ({
  type: 'REMOVE_USER'
})

const authenticateAction = () => async (dispatch) => {
  try {
    const { userData } = await authenticationApiService.authenticate()
    if (userData) {
      dispatch(saveUserInfo(userData))
    }
  } catch (e) {
    console.log(e)
  }
}

const registerAction = (data) => async () => {
  console.log(data)
  try {
    const { message } = await authenticationApiService.register(data)
    console.log(message.includes('exist'))
    if (message.includes('exist')) {
      notification.error({
        message,
        duration: 5
      })
    } else {
      window.location.href = '/login'
    }
  } catch (e) {
    console.log(e)
  }
}

const loginAction = (data) => async (dispatch) => {
  try {
    const { token, user } = await authenticationApiService.login(data)
    if (!token) {

      return
    }

    saveToLocalStorage(TOKEN_KEY, token)

    dispatch(saveUserInfo(user))

    window.location.href = '/home'
  } catch (e) {
    console.log(e)
  }
}

const logoutAction = () => (dispatch) => {
  try {
    removeFromLocalStorage(TOKEN_KEY)
    dispatch(removeUser())
    window.location.href = '/home'
  } catch (e) {
    console.log(e)
  }
}

export {
  authenticateAction,
  registerAction,
  loginAction,
  logoutAction
}
