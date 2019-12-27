const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const articleViews = require('./views/article');

module.exports = class Server {
  constructor(express, mode) {
    this.mode = mode;
    this.app = express();
    this.articleViews = articleViews;
    this.setMiddle();
    this.app.use('/', this.articleViews);
  }

  setMiddle() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    if (this.mode === 'developement') {
      this.app.use(morgan('tiny'));
    } else {
      this.app.use(compression());
      this.app.use(helmet());
    }
  }

  async run() {
    await this.app.listen(process.env.port);
    console.log(`Server started in dev mode, port: ${process.env.port}`);
  }
};
