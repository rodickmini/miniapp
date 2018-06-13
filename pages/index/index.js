Page({
  onLoad: function() {
    let self = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log('success')
        console.log(`lat: ${res.latitude} -- lon: ${res.longitude}`)
        self.setData({
          location: {
            lat: res.latitude,
            lon: res.longitude
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
  },
  openMap: function() {
    wx.openLocation({
      latitude: this.data.location.lat,
      longitude: this.data.location.lon,
      scale: 28
    })
  }
})