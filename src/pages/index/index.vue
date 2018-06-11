<template>
  <ul class="userlist">
    <li class="useritem" v-for="item in userList" :key="item.id">
      name: {{item.name}} <br>
      phone: {{item.phone}}
    </li>
  </ul>
</template>

<script>
import card from '@/components/card'
import { ab2hex } from '@/utils'

export default {
  data () {
    return {
      userList: [
        {id: 1, name: 'caiyou', phone: '13347719847'},
        {id: 2, name: 'xiaoming', phone: '18911235259'},
        {id: 3, name: 'xiaohong', phone: '13072558338'},
      ]
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log(this.userInfo)
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getLocalUsers () {
      console.log('get local users')
      wx.openBluetoothAdapter({
        success: function (res) {
          wx.startBluetoothDevicesDiscovery({
            success: function (res) {
              console.log(res)
            }
          })
        }
      })
      wx.getBluetoothDevices({
        success: function(res){
          // success
          //{devices: Array[11], errMsg: "getBluetoothDevices:ok"}
          console.log("getBluetoothDevices")
          console.log(res)
          this.list = res.devices
        }
      })
    }
  },

  created () {
    console.log('created')
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getLocalUsers()
  },
}
</script>

<style scoped>
.userlist li {
  background-color: #ccc;
  border-bottom: 1px solid #666;
}
</style>
