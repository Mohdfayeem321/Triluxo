const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookController')

router.post('/book', bookController.createBooks)

router.get('/book/:bookId', bookController.getBookById)

router.put('/book/:bookId', bookController.updateBooks)

router.delete('/book/:bookId', bookController.deleteBook)

router.all("/**", (req, res) => {
    return res.status(400).send({ status: false, msg: "The api you request is not available" })
});

module.exports = router
