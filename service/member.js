const api = require('./index')

module.exports = {
  getMembers: (lat, lon, userinfo) => {
    return api.post('/getMembers', {lat, lon, userinfo})
  }
}