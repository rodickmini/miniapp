const domain = "http://192.168.0.30:3000"

module.exports = {
  post: function (url, data, opts, cb) {
    const app = getApp()
    const header = opts && opts.header ? opts.header : {}
    // let jwt = app.globalData.jwt ? app.globalData.jwt : wx.getStorageSync('jwt')
    // if (jwt.expire_after * 1000 <= +new Date()) {
    //   return new Promise((resolve, reject) => {
    //     renewToken().then(jwt => {
    //       app.globalData.jwt = jwt
    //       wx.setStorageSync('jwt', jwt)
    //       Object.assign(header, { Authorization: jwt.token })
    //       doRequest(domain + url, data, header, 'POST', opts && opts.dataType ? opts.dataType : 'json', cb).then(res => {
    //         resolve(res)
    //       }).catch(err => {
    //         reject(err)
    //       })
    //     })
    //   })
    // } else {
      // Object.assign(header, { Authorization: jwt.token })
      return doRequest(domain + url, data, header, 'POST', opts && opts.dataType ? opts.dataType : 'json', cb)
    // }
  }
}

function renewToken() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        let code = res.code
        doRequest(domain + '/sns/getToken', { code: code }, {}, 'POST', 'json').then(res => {
          if (res.data.code === 0) {
            const openid = res.data.data.openid, token = res.data.data.token, unionid = res.data.data.unionid
            wx.getUserInfo({
              success: (res) => {
                const userInfo = res.userInfo
                wx.getSystemInfo({
                  success: res => {
                    const system = res.system
                    const clientType = system.indexOf('iOS') !== -1 ? 1 : 0 // 0：Android   1：iOS
                    const gender = 2 - userInfo.gender // 0：女  1：男  2：未知
                    const model = res.model, os = system, screenHeight = res.screenHeight * 2, screenWidth = res.screenWidth * 2
                    wx.getNetworkType({
                      success: res => {
                        const networkType = res.networkType
                        doRequest(domain + '/sns/wxLogin', {
                          token: token, nickname: userInfo.nickName, head_img_url: userInfo.avatarUrl, gender: gender, city: userInfo.city, province: userInfo.province,
                          country: userInfo.country, client_type: clientType, phone_model: model, os: os, screen_height: screenHeight, screen_width: screenWidth, network_type: networkType
                        }, {}, 'POST', 'json').then(res => {
                          if (res.data.code === 0) { // 登录成功
                            console.log(">>>>>>>>重新登录成功>>>>>>>")
                            console.log(res)
                            let jwt = res.data.data.jwt
                            resolve(jwt) // resolve jwt
                          } else {
                            console.log(res.data.msg)
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log(res.data.msg)
          }
        })
      }
    })
  })
}

function doRequest(url, data, header, method, dataType, cb) {
  return new Promise((resolve, reject) => {
    let requestTask = wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      dataType: dataType,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        wx.hideLoading()
        reject(res)
      },
      complete: () => {

      }
    })
    if (typeof cb === 'function') cb(requestTask)
  })
}