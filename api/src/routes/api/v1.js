express = require('express');
router = new express.Router();
controllers = require('../../controllers');
v1Controller = controllers.v1;

router.get('/helloworld', v1Controller.helloWorld);

router
  .route('/sessions')
  .post(v1Controller.sessions.create)
  .delete(v1Controller.sessions.delete);

router
  .route('/accounts/:accountId')
  .get(v1Controller.accounts.getAccount)
  .post(v1Controller.accounts.createAccount)
  .put(v1Controller.accounts.updateAccount);

module.exports = router;