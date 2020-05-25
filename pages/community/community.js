// pages/community/community.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "热榜",
        isActive: true
      },
      {
        id: 1,
        value: "推荐",
        isActive: false
      }
    ],
    hotQuestionList: []
  },

  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v, i) =>  i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    });
  },

  toQuestionDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/questDetail/questDetail?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initCommunityQueList();
  },

  initCommunityQueList: function() {
    console.log("start init community questions list.")
    var that = this;
    wx.request({
      url: app.globalData.API + '/hotQuestion/list',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      success(res) {
        console.log(res)
        that.setData({
          hotQuestionList: res.data.result
        })
        if(res.data.code == 98) {
          wx.removeStorageSync('card_id');
          wx.removeStorageSync('cookies');
          wx.removeStorageSync('nick_name');
          wx.removeStorageSync('id');
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
    console.log("user pull to refresh.")
    this.initCommunityQueList();
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