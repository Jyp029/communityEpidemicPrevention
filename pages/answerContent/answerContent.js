const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerId: 0,
    time: '',
    content: '',
    nickName: '',
    agree: 0,
    like: 0,
    qId: '',
    currentUserId: '',
    otherUserId: ''
  },

  toModifyAnswer: function(e) {
    // app.globalData.html = this.data.content;
    wx.navigateTo({
      url: '../editor/editor?isPost=false&answerId=' + this.data.answerId + "&isModifyAns=true&qId=" + this.data.qId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      answerId: options.answerId
    })
    var that = this;
    wx.request({
      url: app.globalData.API + '/answer/contents',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        id: options.answerId
      },
      success(res) {
        console.log(res)
        that.setData({
          nickName: res.data.nickName,
          content: res.data.content,
          agree: res.data.agree,
          like: res.data.like,
          time: res.data.time,
          qId: res.data.qId,
          otherUserId: res.data.id,
          currentUserId: wx.getStorageSync('id')
        })
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
        if(res.data.code == 50){
          wx.removeStorageSync('card_id');
          wx.removeStorageSync('cookies');
          wx.removeStorageSync('nick_name');
          wx.removeStorageSync('id')
          wx.showToast({
            title: res.data.code + "-" +res.data.message,
            icon: "none",
            duration: 1000
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