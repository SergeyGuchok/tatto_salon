import React, { useCallback, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import TopBar from '../../components/TopBar'
import Navigation from '../../components/Navigation'
import ReviewItem from '../../components/ReviewItem'
import Button from '../../components/Button'
import { loadReviews, addReview } from '../../actions/reviews'
import { loadMasters } from '../../actions/masters'
import './index.scss'

const ReviewsPage = ({ reviews, loadReviews, addReview, loadMasters, masters, user }) => {
  useEffect(() => {
    loadReviews()
    loadMasters()
  }, [])

  const [textValue, setText] = useState('')
  const [isVisible, setVisible] = useState(false)
  const [item, setItem] = useState('---------')
  const [checked, setChecked] = useState(3)

  const handleVisible = useCallback(() => {
    setVisible(!isVisible)
  }, [isVisible])

  const onTextChange = useCallback((e) => {
    setText(e.target.value)
  }, [setText])

  const onCheck = useCallback((value) => {
    setChecked(value)
  }, [])

  const handleSubmit = useCallback(() => {
    addReview({
      user: user.login,
      text: textValue,
      author: item,
      score: checked,
    }, [textValue, item, checked, user.login])
  })

  return (
    <>
      <TopBar />
      <Navigation />
      <section className="reviews-section">
        <div className="container">
          {reviews.length ? (
            <>
            <div className="reviews-header">
            <h2>Отзывы</h2>
          </div>
          <div className="reviews-inner">
            {reviews.map((item, index) => (
              <ReviewItem key={index} {...item} />
            ))}
          </div>
          </>
          ) : ''}
          {user.login
            ? (
              <>
              <div className="news-inner-header">
                <h2>Оставить отзыв</h2>
              </div>
              <div className='feedback-form'>
                <div className='feedback-form-left'>
                  <h3>Оценка</h3>

                  <div className="rating">
                    <div className="form_radio_btn">
                      <input id="radio-1" type="radio" name="radio" value="1" checked={checked === 1} />
                      <label onClick={() => onCheck(1)} htmlFor="radio-1">1</label>
                    </div>

                    <div className="form_radio_btn">
                      <input id="radio-2" type="radio" name="radio" value="2" checked={checked === 2}/>
                      <label onClick={() => onCheck(2)} htmlFor="radio-2">2</label>
                    </div>

                    <div className="form_radio_btn">
                      <input id="radio-3" type="radio" name="radio" value="3" checked={checked === 3}/>
                      <label onClick={() => onCheck(3)} htmlFor="radio-3">3</label>
                    </div>

                    <div className="form_radio_btn">
                      <input id="radio-4" type="radio" name="radio" value="4" checked={checked === 4}/>
                      <label onClick={() => onCheck(4)} htmlFor="radio-4">4</label>
                    </div>

                    <div className="form_radio_btn">
                      <input id="radio-5" type="radio" name="radio" value="5" checked={checked === 5}/>
                      <label onClick={() => onCheck(5)} htmlFor="radio-5">5</label>
                    </div>
                  </div>
                  <label>
                    Мастер
                    <div className="select" onClick={handleVisible}>
                      {item}
                      {isVisible && (
                      <div className="options">
                        {masters.length && masters.map((master, index) => (
                          <p key={index} onClick={() => setItem(master.name)}>{master.name}</p>
                        ))}
                      </div>
                    )}
                    </div>
                  </label>
                </div>
                <div className='feedback-form-right'>
                  <label>Текст отзыва<textarea value={textValue} onChange={onTextChange}/></label>
                  <Button type='primary' onClick={handleSubmit}>Оставить отзыв</Button>
                </div>
              </div>
              </>
            )
            : ''
          }
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  reviews: state.reviews,
  masters: state.masters,
  user: state.user,
})

export default connect(mapStateToProps, {
  loadReviews,
  addReview,
  loadMasters
})(ReviewsPage)