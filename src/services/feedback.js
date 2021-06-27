import apiMap from "../API/apiMap"
import { apiPost } from '../API/apiRequest'

class FeedbackService {
  sendFeedback = (data) => apiPost(apiMap.feedback(), data)
}

export default new FeedbackService()