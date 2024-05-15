function sendResponse(res, statusCode, message) {
    res.status(statusCode).send(message);
}

module.exports = { sendResponse };
