// pages/announce/announce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.API + '/announ/obtain', 
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      success (res) {
        console.log(res.data)
        if(res.data.code == 98) {
          wx.removeStorageSync('card_id');
          wx.removeStorageSync('cookies');
          wx.removeStorageSync('nick_name');
          wx.removeStorageSync('id')
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 1000
          })
          wx.navigateTo({
            url: '../login/login',
          })
          return;
        }
        if(res.data.code != 100) {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          })
        } else {
          that.setData({
            announList : res.data.result
          })
          console.log(that.data.announList)
        }
      }
    })
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