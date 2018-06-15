const memberService = require('../../service/member')

Page({
  onLoad: function() { },
  userInfoCb: function(res) {
    const userinfo = res.detail.userInfo
    let self = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        const [lat, lon] = [res.latitude, res.longitude]
        wx.showLoading({
          title: '搜寻中',
        })
        memberService.getMembers(lat, lon, userinfo).then(res => {
          if(res.data.code === 0) {
            wx.hideLoading()
            wx.showToast({
              title: '搜寻完毕！',
              icon: 'success'
            })
            self.setData({
              memberList: res.data.data.memberList
            })
          } else {
            console.log(res.err)
          }
        })
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        console.log('complete')
      },
    })
  }
})