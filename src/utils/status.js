exports.sendError = (message, res) => {
    console.log(message);
    res.status(500).send({"Server error": message});
}

exports.sendServerStatus = (res, data, status) => {
    res.status(status).json(data);
}