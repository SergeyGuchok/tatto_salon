import reviewsApiService from '../../services/reviews'
import feedbackApiService from '../../services/feedback'
import { notification } from "antd";

const SAVE_REVIEWS = (reviews) => ({
  type: 'SAVE_REVIEWS',
  payload: reviews,
})

const loadReviews = () => async (dispatch) => {
  try {
    const { reviews } = await reviewsApiService.getReviews()
    dispatch(SAVE_REVIEWS(reviews))
  } catch (e) {
    console.log(e)
  }
}

const addReview = (data) => async (dispatch) => {
  try {
    const { reviews } = await reviewsApiService.addReview(data)
    dispatch(SAVE_REVIEWS(reviews))
  } catch (e) {
    console.log(e)
  }
}

const sendFeedback = (data) => async () => {
  try {
    const { success } = await feedbackApiService.sendFeedback(data)

    if (success) {
      notification.success({
        message: 'Заявка отправлена',
        duration: 5
      })
    } else {
      notification.error({
        message: 'Не удалось отправить форму',
        duration: 5
      })
    }
  } catch (e) {
    console.log(e)
    notification.error({
      message: 'Не удалось отправить форму',
      duration: 5
    })
  }
}

export {
  loadReviews,
  addReview,
  sendFeedback
}