import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { loadMasters, likeMaster } from '../../actions/masters'
import Navigation from '../../components/Navigation'
import TopBar from '../../components/TopBar'
import MasterPreview from '../../components/MasterPreview'
import './index.scss'

const MastersPage = ({ loadMasters, likeMaster, masters }) => {
  useEffect(() => {
    loadMasters()
  }, [loadMasters])

  const onMasterLike = useCallback((_id) => {
    likeMaster(_id)
  }, [likeMaster])

  return (
    <>
      <TopBar />
      <Navigation />
      <section className="sixth-block">
      <div className="container">
        <div className="news-inner">
          <div className="news-inner-header">
            <h2>Наши мастера</h2>
          </div>
          <div className="news-block">
            {masters.length && masters.map((item, index) => (
              <MasterPreview key={index} {...item} onLike={() => onMasterLike(item._id)}/>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  masters: state.masters
})

export default connect (mapStateToProps, {
  loadMasters,
  likeMaster
})(MastersPage)