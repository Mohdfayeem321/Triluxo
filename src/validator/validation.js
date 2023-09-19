//============================== validations ===================================== //
const mongoose = require('mongoose');
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isVAlidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
};


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId);
};

module.exports = { isValid, isVAlidRequestBody, isValidObjectId }

