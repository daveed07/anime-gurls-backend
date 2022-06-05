exports.sendError = (message, res) => {
    res.status(500).send({"Server error": message});
}

exports.sendServerStatus = (res, data, status) => {
    res.status(status).json(data);
}