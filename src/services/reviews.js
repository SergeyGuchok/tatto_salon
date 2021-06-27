import apiMap from "../API/apiMap"
import { apiGet, apiPost } from '../API/apiRequest'

class NewsService {
  addNew = () => {}
  getReviews = () => apiGet(apiMap.reviews())
  addReview = (data) => apiPost(apiMap.reviews.add(), data)
}

export default new NewsService()