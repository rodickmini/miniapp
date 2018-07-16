Page({
  openAlbum: function () {
    wx.chooseImage({
      count: 3,
      sourceType: ['album'],
      success: function (res) { 
        console.log(res)
      }
    })
  },
  openCamera: function () {
    wx.chooseImage({
      count: 3,
      sourceType: ['camera'],
      success: function (res) {
        console.log(res)
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/pages/radix/radix'
    }
  }
})