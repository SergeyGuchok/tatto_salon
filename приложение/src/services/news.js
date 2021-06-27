import apiMap from "../API/apiMap"
import { apiGet, apiPost, apiPut, apiDelete } from '../API/apiRequest'

class NewsService {
  addNew = (data) => apiPost(apiMap.news.add(), data)
  getNews = () => apiGet(apiMap.news())
}

export default new NewsService()