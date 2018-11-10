function helloWorld(req, res) {
  res.json({hello: 'world'});
}

module.exports = {
  helloWorld: helloWorld
};
