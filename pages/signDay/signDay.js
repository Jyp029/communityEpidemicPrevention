// pages/signDay/signDay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healthItems: [
      {name: '健康', value: '0', checked: true},
      {name: '疑似病例', value: '1'},
      {name: '确诊病例', value: '2'}
    ],
    address: '',
    health: ''
  },

  bindHealthChange: function (e) {
    this.setData({
      health: e.detail.value
    });
    console.log(this.data.health);
  },

  commSign: function() {
    console.log(health);
    var that = this;
    wx.request({
      url: app.globalData.API + '/user/sign', 
      data: {
        health: health
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        
      }
    })
  },

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