const bookModel = require('../models/bookModel');

const validation = require('../validator/validation');

// ================================ Creating Books ======================================= // 

const createBooks = async function (req, res) {
    try {
        let data = req.body;

        let { title, category } = data;

        if (!validation.isVAlidRequestBody(data)) return res.status(400).send({ status: false, message: "please enter books details" })

        if (!validation.isValid(title)) return res.status(400).send({ status: false, message: "use correct title which is mandatory " })

        let checkTitle = await bookModel.findOne({ title: title })

        if (checkTitle) {
            if (checkTitle.title == title) return res.status(409).send({ status: false, message: "title already exist" })
        };

        if (!validation.isValid(category)) return res.status(400).send({ status: false, message: "please enter  category or category can not be Empty " })

        let createBook = await bookModel.create(data)
        return res.status(201).send({ status: true, message: 'Success', data: createBook })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// ============================================= Get Books By Path params Id ================================//


const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        if (!validation.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Please enter valid bookId" })

        let booksWithId = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!booksWithId) return res.status(404).send({ status: false, message: "Books not found or already deleted" })

        //bookwithid has 3 internal keys and the data of book was in ._doc key so to add review key we have to edit bookwithid internally

        return res.status(200).send({ status: true, message: "Particular books", data: booksWithId })
    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


// ========================================= Update Books =============================================//


const updateBooks = async function (req, res) {
    try {
        let bookId = req.params.bookId

        let data = req.body;

        let { title, category } = data

        if (!validation.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Please enter valid bookId" })

        let chekdBooks = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!chekdBooks) return res.status(404).send({ status: false, message: "Book is deleted" })

        if (!validation.isVAlidRequestBody(data)) return res.status(400).send({ status: false, message: "please enter updation details" })

        let updations = {}

        if (title) {
            if (!validation.isValid(title)) return res.status(400).send({ status: false, message: "please enter title" })

            updations.title = title
        };
        if (category) {
            updations.category = category
        };

        if (title || category) {
            let updatedBooks = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: updations }, { new: true })
            return res.status(200).send({ status: true, message: "Updated successfully", data: updatedBooks })
        };
    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }

};

// ============================================ Delete Books ====================================== //

const deleteBook = async function (req, res) {

    try {

        let bookId = req.params.bookId

        let deleteBook = await bookModel.findOneAndUpdate({ $and: [{ _id: bookId }, { isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });

        if (!deleteBook) return res.status(404).send({ status: false, message: "No book found or it may be deleted" })

        return res.status(200).send({ status: true, message: "successfully deleted" })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


module.exports = { createBooks, getBookById, updateBooks, deleteBook }
