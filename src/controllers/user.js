module.exports = class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(u) {
    // eslint-disable-next-line new-cap
    const user = new this.userModel(u);
    await user.save();
  }

  async login(u) {
    const result = await this.userModel.findOne({ username: u.username });
    if (result) {
      const passMatch = await this.userModel.comparePassword(u.password, result.password);
      if (passMatch) {
        return result;
      }
    }
    throw new Error('Invalid username or password');
  }
};
