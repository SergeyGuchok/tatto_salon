import newsApiService from '../../services/news'
import { notification } from 'antd'

const SAVE_NEWS = (news) => ({
  type: 'SAVE_NEWS',
  payload: news,
})

const loadNews = () => async (dispatch) => {
  try {
    const { news } = await newsApiService.getNews()
    dispatch(SAVE_NEWS(news))
  } catch (e) {
    console.log(e)
  }
}

const addNew = (data) => async (dispatch) => {
  try {
    const { news } = await newsApiService.addNew(data)
    dispatch(SAVE_NEWS(news))
    notification.success({
      message: 'Новость добавлена',
      duration: 5
    })
  } catch (e) {
    console.log(e)
    notification.error({
      message: 'Новость не была добавлена',
      duration: 5,
    })
  }
}

export {
  addNew,
  loadNews
}