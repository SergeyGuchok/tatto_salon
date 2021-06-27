import portfolioApiService from '../../services/portfolio'
import { notification } from 'antd'

const SAVE_PORTFOLIO = (news) => ({
  type: 'SAVE_PORTFOLIO',
  payload: news,
})

const loadPortfolio = () => async (dispatch) => {
  try {
    const { items } = await portfolioApiService.getPortfolio()
    dispatch(SAVE_PORTFOLIO(items))
  } catch (e) {
    console.log(e)
  }
}

const addPortfolio = (data) => async (dispatch) => {
  try {
    const { items } = await portfolioApiService.addPortfolio(data)
    dispatch(SAVE_PORTFOLIO(items))
    notification.success({
      message: 'Портфолио добавлено',
      duration: 5
    })
  } catch (e) {
    console.log(e)
    notification.error({
      message: 'Портфолио не добавлено',
      duration: 5
    })
  }
}

export {
  loadPortfolio,
  addPortfolio
}