module.exports = class Database {
  constructor(mongoose, mode) {
    this.mongoose = mongoose;
    this.mode = mode;
  }

  connect(done) {
    let url = '';
    if (this.mode === 'developement') {
      url = process.env.devDB;
    } else {
      url = process.env.prodDB;
    }
    this.mongoose.connect(url, { useNewUrlParser: true }, (error) => {
      if (!error) {
        console.log(`Connected to ${this.mode} database -> ${url}`);
        done(null);
      }
    });
  }
};
