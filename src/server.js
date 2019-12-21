module.exports = class Server {
  constructor(express) {
    this.app = express();
  }

  async run(mode) {
    if (mode === 'developement') {
      await this.app.listen(process.env.port);
      console.log(`Server started in dev mode, port: ${process.env.port}`);
    }
  }
};
