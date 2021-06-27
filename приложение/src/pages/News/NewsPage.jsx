import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadNews } from '../../actions/news'

import Navigation from '../../components/Navigation'
import TopBar from '../../components/TopBar'
import NewsItem from '../../components/NewsItem'

const MorePage = ({ news, loadNews }) => {
  useEffect(() => {
    loadNews()
  })
  return (
    <>
      <TopBar />
      <Navigation />
      {news.length && (
        <section className="sixth-block">
        <div className="container">
          <div className="news-inner">
            <div className="news-inner-header">
              <h2>Новости</h2>
            </div>
            <div className="news-block">
              {news.length && news.reverse().map((news) => (
                <NewsItem {...news} />
              ))}
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  news: state.news,
})

export default connect(mapStateToProps, {
  loadNews
})(MorePage)