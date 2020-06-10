// pages/main/main.js
// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inOrOut: '出校',
    userName: '法外狂徒',
    userEdu: '麻绳理工',
    masterInfo: '',
    inOrOut: '进校',
    currentTime: '0',

    marqueePace: 1, //滚动速度

    marqueeDistance: 0, //初始滚动距离

    marqueeDistance2: 0,

    marquee2copy_status: false,

    marquee2_margin: 60,

    size: 14,

    orientation: 'left', //滚动方向

    interval: 20, // 时间间隔

    text: '这是一条会滚动的文字滚来滚去的文字跑马灯，哈哈哈哈哈哈哈哈'


  },

  /**
   * 生命 周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    this.setData({
      currentTime: time
    })
    console.log(this.data.currentTime)
    const eventChannel = this.getOpenerEventChannel()

    // 监听acceptDataFromIndexPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromIndexPage', data => {
      if (data.userName != null && data.userName != '') {
        this.setData({
          userName: data.userName
        })
      }
      if (data.userEdu != null) {
        if (data.userEdu == 0) {
          this.setData({
            userEdu: '本科'
          })
        } else {
          this.setData({
            userEdu: '研究生',
            masterInfo: '（硕士）'
          })
        }
      }
      if (data.inOrOut != null) {
        this.setData({
          inOrOut: data.inOrOut
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var vm = this;

    var length = vm.data.text.length * vm.data.size; //文字长度

    // var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    var windowWidth = 150; // 屏幕宽度

    vm.setData({

      length: length,

      windowWidth: windowWidth,

      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin //当文字长度小于屏幕长度时，需要增加补白

    });



    vm.run2();

  },

  run2: function() {

    var vm = this;

    var interval = setInterval(function() {

      if (-vm.data.marqueeDistance2 < vm.data.length) {

        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示

        vm.setData({

          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,

          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,

        });

      } else {

        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时

          vm.setData({

            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动

          });

          clearInterval(interval);

          vm.run2();

        } else {

          clearInterval(interval);

          vm.setData({

            marqueeDistance2: -vm.data.windowWidth

          });

          vm.run2();

        }

      }

    }, vm.data.interval);

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})