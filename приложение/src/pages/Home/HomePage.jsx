import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Navigation from '../../components/Navigation'
import TopBar from '../../components/TopBar'
import Tablet from '../../components/Tablet'
import FeedbackForm from '../../components/FeedbackForm'
import AdvantageSection from '../../components/AdvantageSection'
import NewsItem from '../../components/NewsItem'
import './HomePage.scss'

import firstBlockBackground from '../../images/slider-fon.jpg'
import secondBlockBackground from '../../images/about-fon.jpg'
import fourthBlockBackground from '../../images/form-fon.png'
import fifthBlockBackground from '../../images/adv-fon.jpg'
import tableFirstImage from '../../images/about-1.png'
import tableSecondImage from '../../images/about-2.png'
import tableThirdmage from '../../images/about-3.png'

import { loadNews } from '../../actions/news'

const tabletsConfig = [{
  alt: 'make tatto',
  src: tableFirstImage,
  firstTextBlock: 'Сделать татуировку',
  secondTextBlock: 'Сделать татуировку в нашем салоне не только абсолютно безопасно (мы имеем все необходимые медицинские сертификаты и лицензии),но и не больно. При работе мастера используют самые современные электроаппараты, которые позволяют наносить минимальный ущерб коже клиента.',
  firstButtonText: 'Подробнее',
  secondButtonText: 'Заказать',
}, {
  alt: 'fix tatto',
  src: tableSecondImage,
  firstTextBlock: 'Исправление татуировки',
  secondTextBlock: 'Исправление любых татуировок возможно, и для этого совсем необязательно их сводить – можно поверх старого рисунка нанести новый, лучше и интереснее!',
  firstButtonText: 'Подробнее',
  secondButtonText: 'Заказать',
}, {
  alt: 'delete tatto',
  src: tableThirdmage,
  firstTextBlock: 'Удаление татуировки',
  secondTextBlock: 'В салоне Tattoo-Planet применяется лазер последнего поколения Q-switch, который зарекомендовал себя как наиболее эффективный при удалении цветных и черно-белых тату. Это оборудование руках квалифицированных мастеров нашего салона позволяет проводить процедуру самым щадящим образом, не оставляя шрамов и ожогов.',
  firstButtonText: 'Подробнее',
  secondButtonText: 'Заказать',
}]

const advantageConfig = [{
  firstText: 'Сотни довольных клиентов',
  secondText: 'К нам обращаются самые искушонные люди в плане татуировок.',
}, {
  firstText: 'Опытные мастера',
  secondText: 'Только мастера с художественным образованием - эскиз любой сложности.',
}, {
  firstText: 'Безопасность наших клиентов',
  secondText: 'Безопасность вашего здоровья: только одноразовые инструменты, абсолютно стерильное помещение + специалисты с медицинским образованием.',
}]


const HomePage = ({ news, loadNews, onOpen }) => {
  useEffect(() => {
    loadNews()
  }, [])

  return (
    <>
      <TopBar />
      <Navigation />
      <section className='first-block' style={{ backgroundImage: `url(${firstBlockBackground})` }}>
        <div className="container">
          <div className='first-block-inner'>
            <h2>Тату-студия с самыми выгодными ценами</h2>
            <h3>Качественная татуировка с быстрой записью-онлайн. К каждому клиенту индивидуальный подход</h3>
            <Button type='primary' onWhiteBg onClick={onOpen}>Оставить заявку</Button>
          </div>
        </div>
      </section>
      <section className="second-block">
        <div className="container">
          <h2>Наши услуги</h2>
          <div className='tablets'>
            {tabletsConfig.map((table, index) => (
              <Tablet
                key={index}
                alt={table.alt}
                src={table.src}
                firstButtonText={table.firstButtonText}
                secondButtonText={table.secondButtonText}
                firstTextBlock={table.firstTextBlock}
                secondTextBlock={table.secondTextBlock}
                onOpen={onOpen}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="third-block" style={{ backgroundImage: `url(${secondBlockBackground})`}}>
        <div className="container">
          <div>
            <h3>О нас</h3>
            <p>Здесь Вы не найдете равнодушных сотрудников, с безразличием относящихся к работе. Наша студия тату принимает на работу только людей, действительно посвятивших свою жизнь tattoo. Не случайно многие мастера стали победителями различных выставок и тату конвенций, ведь таких вершин невозможно добиться, если ты не предан фанатично своему делу.</p>
            <Link to="/info"><Button type='primary' onWhiteBg>Узнать больше</Button></Link>
          </div>
        </div>
      </section>
      <section id="consult" className="fourth-block">
        <div className="container" style={{ backgroundImage: `url(${fourthBlockBackground})`}}>
          <h2>Получить консультацию</h2>
          <p>Мы постараемся ответить Вам в ближайшее время.</p>
          <FeedbackForm />
        </div>
      </section>
      <section className="fifth-block" style={{ backgroundImage: `url(${fifthBlockBackground})`}}>
        <div className="container">
          <div className="advantages-inner">
            {advantageConfig.map((advantage, index) => (
              <AdvantageSection {...advantage} key={index} />
            ))}
          </div>
        </div>
      </section>
      {news.length && (
        <section className="sixth-block">
        <div className="container">
          <div className="news-inner">
            <div className="news-inner-header">
              <h2>Новости</h2>
              <Link to="/news"><Button>Открыть все новости</Button></Link>
            </div>
            <div className="news-block">
              {news.length && news.slice(0,3).map((news, index) => (
                <NewsItem {...news} key={index} />
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
})(HomePage)