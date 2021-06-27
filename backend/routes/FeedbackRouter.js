const express = require('express')
const ResponseResult = require('../common/ResponseResult')
const nodemailer = require('nodemailer');

const FeedbackRouter = express.Router()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'tattoo.planetby@gmail.com',
    pass: 'qwerty12345qwe'
  }
});

FeedbackRouter.post('/', async (req, res) => {
  const data = req.body
  const mailOptions = {
    from: 'tattoo.planetby@gmail.com',
    to: 'skukaaaa@yandex.ru',
    subject: 'Tatto форма с сайта',
    text: `ФИО - ${data.name}, моб.телефон - ${data.phone}, почта - ${data.mail}, услуга - ${data.detail}, текст - ${data.text}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (!error) {
      const result = {
        status: 200,
        message: { success: true }
      }
      ResponseResult(result, res)
    } else {
      ResponseResult({ status: 400, message: 'error' }, res)
    }
  });
})

module.exports = FeedbackRouter
