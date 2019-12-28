module.exports = class ArticleController {
  constructor(articleModel) {
    this.articleModel = articleModel;
  }

  async getAll() {
    const articles = await this.articleModel.find({});
    if (articles.length > 0) {
      return articles;
    }
    throw new Error('Nothing to see here.');
  }

  async create(description) {
    // eslint-disable-next-line new-cap
    const story = new this.articleModel({ description });
    await story.save();
  }
};
