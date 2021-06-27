import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadPortfolio } from '../../actions/portfolio'

import Navigation from '../../components/Navigation'
import TopBar from '../../components/TopBar'
import PortfolioItem from '../../components/PortfolioItem'

const PortfolioPage = ({ portfolio, loadPortfolio }) => {
  useEffect(() => {
    loadPortfolio()
  }, [])
  return (
      <>
      <TopBar />
      <Navigation />
      <section className="sixth-block">
      <div className="container">
        <div className="news-inner">
          <div className="news-inner-header">
            <h2>Портфолио</h2>
          </div>
          <div className="news-block">
            {portfolio.length && portfolio.map((item, index) => (
              <PortfolioItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  portfolio: state.portfolio,
})

export default connect(mapStateToProps, {
  loadPortfolio
})(PortfolioPage)