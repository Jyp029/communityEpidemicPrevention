const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  sign: function () {
    wx.redirectTo({
      url: '../../pages/signDay/signDay'
    })
  },
  alienReg: function () {
    wx.redirectTo({
      url: '../../pages/AlienRegister/AlienRegister'
    })
  },
  announcement: function() {
    wx.redirectTo({
      url: '../../pages/announce/announce'
    })
  },
  healthStatus: function() {
    wx.redirectTo({
      url: '../../pages/healthStatus/healthStatus'
    })
  },

  postQuestion: function() {
    wx.navigateTo({
      url: '../editor/editor?isPost=true'
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function(data) {
      //     console.log(data)
      //   },
      //   someEvent: function(data) {
      //     console.log(data)
      //   }
      // },
      // success: function(res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'editor' })
      // }
    })
  },

  /**
   * 轮播图开始
   */
  getNum(e) {
    console.log("执行了getNum函数");
    // 小程序和其他web开发中给data中数据赋值方式不同，用下面这种方式给data中的数据赋值
		this.setData({
			num: e.detail.value
		});
		console.log(e.detail.value)
	},
	
	changNum(e) {
		console.log(e);
		const n = e.currentTarget.dataset.number;
		this.setData({
			num: parseInt(this.data.num) + parseInt(n)
		})
	},
 /**
   * 轮播图结束
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      //将card_id存储到本地，保存登录状态
      var cardId = wx.getStorageSync('card_id');
      if (cardId) {
        wx.switchTab({
          url: '../index/index'
        })
      } else {
        console.log("cardId" + cardId);
        wx.navigateTo({
          url: '../login/login',
        })
      }
    } catch (e) {
      console.log("开始打印异常信息：");
      console.log(e);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})