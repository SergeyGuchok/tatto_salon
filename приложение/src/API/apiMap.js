const ApiUri = 'http://localhost:8000'

const auth = () => ApiUri + '/auth'
auth.register = () => auth() + '/register'
auth.login = () => auth() + '/login'
auth.authenticate = () => auth() + '/authenticate'

const user = () => ApiUri + '/user'
user.findByUsername = (username) => user() + `/${username}`
user.block = () => user() + '/block'
user.unblock = () => user() + '/unblock'

const application = () => ApiUri + '/application'
application.pending = () => application() + '/pending'
application.my = () => application() + '/my'

const news = () => ApiUri + '/news'
news.add = () => news() + '/add'

const portfolio = () => ApiUri + '/portfolio'
portfolio.add = () => portfolio() + '/add'

const masters = () => ApiUri + '/masters'
masters.like = () => masters() + '/like'
masters.add = () => masters() + '/add'

const reviews = () => ApiUri + '/reviews'
reviews.add = () => reviews() + '/add'

const feedback = () => ApiUri + '/feedback'

const schedules = () => ApiUri + '/schedules'
schedules.add = () => schedules() + '/add'

const apiMap = {
  auth,
  user,
  application,
  news,
  portfolio,
  masters,
  reviews,
  feedback,
  schedules
}
export default apiMap
