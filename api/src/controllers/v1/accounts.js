const appDAO = require('../../../db/appDAO');
const Accounts = require('../../models/accounts');
const _ = require('lodash');

async function createAccount(req, res) {
  try {
    const dao = new appDAO('./db/app.db');
    const accounts = new Accounts(dao);
    const accountParams = _.pick(req.body, [
      'username',
      'password',
      'fullName',
      'email'
    ]);

    const result = await accounts.create(
      accountParams.username,
      accountParams.password,
      accountParams.fullName,
      accountParams.email
    );
    dao.close();
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function getAccount(req, res) {
  try {
    const dao = new appDAO('./db/app.db');
    const accounts = new Accounts(dao);
    const result = await accounts.getById(req.params.accountId);
    dao.close();
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function updateAccount(req, res) {
  try {
    const dao = new appDAO('./db/app.db');
    const accounts = new Accounts(dao);
    const account = _.pick(req.body, [
      'username',
      'password',
      'fullName',
      'email'
    ]);
    const result = await accounts.update(account);
    dao.close();
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

module.exports = {
  createAccount: createAccount,
  getAccount: getAccount,
  updateAccount: updateAccount
};
