const { sendServerStatus, sendError } = require('./utils/status');
const queryGirl = require('./query/girl').queryGirl;

exports.getImagesById = async (req, res) => {
  try {
    const girl = await queryGirl(parseInt(req.params.id));
    sendServerStatus(res, girl, 200);
  } catch (err) {
    sendError(err, res);
  }
}