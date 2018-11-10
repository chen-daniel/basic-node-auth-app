const appDAO = require('../../../db/appDAO');
const SessionTokens = require('../../models/sessionTokens');
const _ = require('lodash');

async function createSession(req, res) {
  try {
    const dao = new appDAO('./db/app.db');
    const sessionTokens = new SessionTokens(dao);

    const result = await sessionTokens.create(
      sessionParams.accountId,
      sessionParams.token,
      sessionParams.expiryDate
    );
    dao.close();
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }
}

async function deleteSession(req, res) {
  try {
    const dao = new appDAO('./db/app.db');
    const sessionTokens = new SessionTokens(dao);

    const result = await sessionTokens.delete(sessionToken);
    dao.close();
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }
}

module.exports = {
  createSession: createSession,
  deleteSession: deleteSession
};
