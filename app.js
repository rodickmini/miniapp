const authService = require('./service/auth')

App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
          // 根据code获取token
          authService.login(res.code).then(res => {
            console.log(res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})