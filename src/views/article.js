const router = require('express').Router();

const ArticleController = require('../controllers/article');
const articleModel = require('../models/article');

const articleController = new ArticleController(articleModel);

router.get('/articles', async (req, res) => {
  try {
    const articles = await articleController.getAll();
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
