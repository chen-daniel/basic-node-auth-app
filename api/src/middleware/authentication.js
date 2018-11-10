const appDAO = require('../../../db/appDAO');
const SessionTokens = require('../models/sessionTokens');
const moment = require('moment');

async function requireSession(req, res) {
  try {
    const token = req.get('Session-Token');
    const currAccount = req.get('Current-Account');
    const dao = new appDAO('./db/app.db');
    const sessionTokens = new SessionTokens(dao);
    const sessionToken = await sessionTokens.getById(token);
    dao.close();
    if (
      sessionToken.token === token &&
      sessionToken.accountId === currAccount &&
      moment(sessionToken.expiryDate).isAfter(moment())
    ) {
      if (req.get('Device') === 'web') {
        _updateToken(sessionToken);
      }
      return;
    } else {
      throw error;
    }
  } catch (err) {
    res.sendState(403);
  }
}

async function _updateToken(sessionToken) {
  try {
    const newExpiryDate = moment().add(30, 'm');

    sessionToken.expiryDate = newExpiryDate;
    const dao = new appDAO('./db/app.db');
    const sessionTokens = new SessionTokens(dao);
    const result = await sessionTokens.update(sessionToken);
    dao.close();
    return;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  requireSession: requireSession
};
