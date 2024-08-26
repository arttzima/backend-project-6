const { Model } = require('objection');

module.exports = class BaseModel extends Model {
  static get Modelpath() {
    return [__dirname];
  }
};
