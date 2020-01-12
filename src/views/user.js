const jwt = require('jsonwebtoken');
const router = require('express').Router();

const UserController = require('../controllers/user');
const userModel = require('../models/user');

const userController = new UserController(userModel);

router.post('/login', async (req, res) => {
  try {
    const user = await userController.login(req.body);
    const token = jwt.sign({ username: user.username }, process.env.secret);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    await userController.create({ username, password, email });
    return res.status(201).send(`Nice to meet you, ${username}`).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
