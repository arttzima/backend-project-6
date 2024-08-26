const crypto = require('crypto');

/**
 * @param {string} value
 * Создаем хеш пароля
 */
module.exports = (value) => crypto.createHash('sha256')
  .update(value)
  .digest('hex');
