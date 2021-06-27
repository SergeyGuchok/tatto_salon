import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// import ApplicationHeader from 'containers/ApplicationHeader'
// import ApplicationNavigation from 'containers/ApplicationNavigation'
// import LoginPage from 'pages/LoginPage'
import HomePage from './pages/Home'
import NewsPage from './pages/News'
import MorePage from './pages/More'
import PortfolioPage from './pages/Portfolio'
import Footer from './components/Footer'
import MastersPage from './pages/Masters'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'
import ReviewsPage from './pages/Reviews'
import ScheduleSection from './components/ScheduleSection'
import AdminPage from './pages/Admin'
// import RegisterPage from 'pages/RegisterPage'
// import NewApplicationPage from "pages/NewApplicationPage";
// import AdminPanelPage from 'pages/AdminPanelPage'
// import ApplicationsListPage from 'pages/ApplicationsListPage'
// import ReviewApplicationsPage from 'pages/ReviewApplicationsPage'
// import MyApplicationsPage from 'pages/MyApplicationsPage'

import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const onOpen = () => {
    setVisible(true)
  }
  return (
    <Provider store={store}>
      <Router>
        {/* <ApplicationHeader />
          <ApplicationNavigation /> */}
          <Switch>
            <Route exact path="/home">
              <HomePage onOpen={onOpen} />
            </Route>
            <Route path="/news">
              <NewsPage />
            </Route>
            <Route path="/info">
              <MorePage />
            </Route>
            <Route path="/portfolio">
              <PortfolioPage />
            </Route>
            <Route path="/masters">
              <MastersPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/profile">
              <ProfilePage onOpen={onOpen} />
            </Route>
            <Route path="/reviews">
              <ReviewsPage />
            </Route>
            <Route path="/admin">
              <AdminPage onOpen={onOpen} />
            </Route>
            {/* <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/admin-panel">
              <AdminPanelPage />
            </Route>
            <Route path="/providers/1">
              <NewApplicationPage />
            </Route>
            <Route path="/application-list">
              <ApplicationsListPage />
            </Route>
            <Route path="/review-applications">
              <ReviewApplicationsPage />
            </Route>
            <Route path="/my-applications">
              <MyApplicationsPage />
            </Route> */}
            <Redirect to="/home" />
          </Switch>
          <Footer />
      </Router>
      <ScheduleSection onClose={onClose} visible={visible} />
    </Provider>
  )
}

export default App
