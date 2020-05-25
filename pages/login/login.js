// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardId: '',
    password: '',
    isAlien: "",
    alienName: "",
    user_type: [
      {name: "不是", value: '0'},
      {name: "是", value: '1', checked: true}
    ],
    isExist: false
  },

  pwdInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  cardIdInput: function(e) {
    this.setData({
      cardId: e.detail.value
    })
  },

  alienInput: function(e) {
    this.setData({
      isAlien: e.detail.value
    })
  },

  alienNameInput: function(e) {
    this.setData({
      alienName:e.detail.value
    })
  },

  toRegister: function() {
    wx.navigateTo({
      url: '../AlienRegister/AlienRegister',
    })
  },

  formSubmit() {
    var card_id = this.data.cardId;
    var pwd = this.data.password;
    this.userLogin(card_id, pwd);
    console.log("isExist: " + this.data.isExist)
    var that = this;
    setTimeout(function() {
      if (that.data.isExist) {
        wx.switchTab({
          url: '../index/index'
        })
      }
    }, 1000)
  },

  userLogin: function(card_id, pwd) {
    var that = this;
    wx.request({
      url: app.globalData.API + '/login',
      data: {
        cardId: card_id,
        password: pwd
      },
      success(res) {
        console.log(res)
        console.log(res.cookies[0])
        wx.showToast({
          title: res.data.message,
          icon: "none",
          duration: 2000
        })
        if(res.data.code != 100) {
          that.setIsExist(false)
        } else {
          try {
            //将card_id存储到本地，保存登录状态
            wx.setStorageSync('card_id', res.data.card_id);
            wx.setStorageSync('nick_name', res.data.nick_name);
            wx.setStorageSync("cookies", res.cookies[0]);
            wx.setStorageSync("id", res.data.id);
          } catch (e) {
            console.log(e);
          }
          that.setIsExist(true)
        }
      },
      fail(err) {
        console.log(err)
      },
      complete(com) {
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  setIsExist: function(exist) {
    this.setData({
      isExist: exist
    })
  },

  isAlienChange: function(e) {
    this.setData({
      isAlien: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      //将card_id存储到本地，保存登录状态
      var cardId = wx.getStorageSync('card_id');
      if (cardId) {
        wx.switchTab({
          url: '../index/index'
        })
      }
    } catch (e) {
      console.log(e);
    }

    wx.login({
      success: function(res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
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