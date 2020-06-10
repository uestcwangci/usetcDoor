//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    eduArray: ['本科', '研究生'],
    objectEduArray: [
      {
        id: 0,
        name: '本科'
      },
      {
        id: 1,
        name: '研究生'
      }
    ],
    inOrOut: '进校',

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  switchChange: function(e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        inOrOut: '出校'
      })
    }else {
      this.setData({
        inOrOut: '进校'
      })
    }
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let userName = e.detail.value.userName
    let userEdu = e.detail.value.userEdu
    let inOrOut;
    if (e.detail.value.inOrOut) {
      inOrOut = '出校'
    }else {
      inOrOut = '进校'
    }
    
    let userData = { 'userName': userName, 'userEdu': userEdu, 'inOrOut': inOrOut}

    console.log(userData)
    wx.navigateTo({
      url: '../main/main',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromIndexPage', userData)
      }
    })
   
  }
})
