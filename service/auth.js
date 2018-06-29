const api = require('./index')

module.exports = {
  login: (code) => {
    return api.post('/login', { code })
  }
}