const bcrypt = require('bcrypt')
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoClient.connect()

const init = async () => {
  const db = await mongoClient.db('tattoo')
  const news = await db.collection('news')
  news && await news.deleteMany({})
  await news.insertOne({
    src: 'https://lh3.googleusercontent.com/Kpd5iclJIm1vBG1YFduU9tNQKWyeFLEUBo9XO4QvEytJ9S6x_Kg8rTM5uXYU0a12O4xGETo=s93',
    title: 'Мы переехали!',
    text: 'Теперь мы находимся по адресу г.Лида ул. Вороновская д.8, рады будем вас видеть.',
    date: '03.05'
  })
  await news.insertOne({
    src: 'https://lh3.googleusercontent.com/Kpd5iclJIm1vBG1YFduU9tNQKWyeFLEUBo9XO4QvEytJ9S6x_Kg8rTM5uXYU0a12O4xGETo=s93',
    title: 'Акция',
    text: 'Посоветуйте другу Нас - получите скидку 50%!',
    date: '03.05'
  })
  await news.insertOne({
    src: 'https://lh3.googleusercontent.com/61DnNOubkO-KseckbjDViAwG1rPsyvFkfmJ97P9LKkRG8eM6b7j3Qd8nHkAxTfMz49mboA=s141',
    title: 'Новость компании',
    text: 'На сегодняшний день, коллектив компании объединяет высокопрофессиональных экспертов имеющих специализации в отдельных областях права',
    date: '03.05'
  })
  await news.insertOne({
    src: 'https://lh3.googleusercontent.com/61DnNOubkO-KseckbjDViAwG1rPsyvFkfmJ97P9LKkRG8eM6b7j3Qd8nHkAxTfMz49mboA=s141',
    title: 'Новость компании',
    text: 'На сегодняшний день, коллектив компании объединяет высокопрофессиональных экспертов имеющих специализации в отдельных областях права',
    date: '03.05'
  })

  const masters = await db.collection('masters')
  masters && await masters.deleteMany({})
  await masters.insertOne({
    name: 'Вадим',
    experience: '2 года',
    src: 'data:image/jpeg;base64,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',
    quote: 'Я думаю, что тело — это в каком-то смысле дневник.',
    likes: 5,
    likedBy: [],
  })
  await masters.insertOne({
    name: 'Юлия',
    experience: '5 года',
    src: 'https://www.sostav.ru/images/news/2019/04/11/ym1qcllo.jpg',
    quote: 'Татуировки — как знак времени, они напоминают о каком-то периоде в жизни...',
    likes: 3,
    likedBy: [],
  })
  await masters.insertOne({
    name: 'Максим',
    experience: '1 год',
    src: 'https://thumbs.dreamstime.com/b/%D1%8E-%D0%B8-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-s-%D1%87%D0%B5-%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-69803479.jpg',
    quote: 'Хорошая музыка как татуировка, нанесённая прямо на мозг. После того как ты услышал её, тебе от неё уже не избавиться.',
    likes: 2,
    likedBy: [],
  })

  const portfolio = await db.collection('portfolio')
  portfolio && await portfolio.deleteMany({})

  await portfolio.insertOne({
    src: 'https://www.menshairstylesnow.com/wp-content/uploads/2019/07/Small-Tattoos.jpg',
    author: 'Вадим',
    style: 'Нью Скул'
  })
  await portfolio.insertOne({
    src: 'https://tattoo-masters.com/uploads/content/untitled-1.172.jpg',
    author: 'Юлия',
    style: 'Графика'
  })
  await portfolio.insertOne({
    src: 'data:image/jpeg;base64,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',
    author: 'Максим',
    style: 'Кельтика'
  })

  const reviews = await db.collection('reviews')
  reviews && await reviews.deleteMany({})
  await reviews.insertOne({
    author: 'Вадим',
    score: '5',
    text: 'Ну лучше некуда!',
    user: 'admin',
  })
  await reviews.insertOne({
    author: 'Юлия',
    score: '5',
    text: 'Юля молодец!',
    user: 'admin',
  })
  await reviews.insertOne({
    author: 'Вадим',
    score: '4',
    text: 'Есть куда',
    user: 'admin',
  })
  const salt = bcrypt.genSaltSync(10)
  const users = await db.collection('users')
  users && await users.deleteMany({})
  await users.insertOne({
    login: 'admin',
    password: bcrypt.hashSync('6)Xt]cHJ2-3T!V(t', salt),
    role: 'admin',
    blocked: false,
    schedules: [],
  })

  const schedules = await db.collection('schedules')
  schedules && await schedules.deleteMany({})

  mongoClient.close()
}

init()