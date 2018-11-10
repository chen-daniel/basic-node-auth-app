express = require('express');
router = new express.Router();
controllers = require('../../controllers');
v1Controller = controllers.v1;

router.get('/helloworld', v1Controller.helloWorld);

module.exports = router;