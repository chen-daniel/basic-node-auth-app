function helloWorld(req, res) {
  res.json('Hello World!');
}

module.exports = {
  helloWorld: helloWorld
};
