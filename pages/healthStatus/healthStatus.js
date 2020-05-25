// pages/healthStatus/healthStatus.js
const util = require("../../utils/util.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: "none",        //获取到时间后再显示页面
    codePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.API + '/user/healthCode',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        nickName: wx.getStorageSync('nick_name'),
        cardId: wx.getStorageSync('card_id')
      },
      success(res) {
        console.log(res.data)
        that.setData({
          codePath: res.data.path,
          username: res.data.name
        })
        if(res.data.code == 98) {
          wx.removeStorageSync('card_id');
          wx.removeStorageSync('cookies');
          wx.removeStorageSync('nick_name');
          wx.removeStorageSync('id')
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 1500
          })
          wx.navigateTo({
            url: '../login/login',
          })
          return;
        }
      },
      fail(err){
        console.log(err)
      }
    })


    //时间显示
    setInterval(function () {
      const _currentHour = util.formatTime(new Date()).split(" ")[1];
      const _currentYear = util.formatTime(new Date()).split(" ")[0];
      that.setData({
        currentYear: _currentYear,
        currentHour:_currentHour,
        flag: "block"
      });
    }, 1000)
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