// pages/questDetail/questDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answersList: [],
    qId: 0,
    qTitle: '',
    qDesc: '',
    qUserId: 0,
    isAnswered: false,
    answerId: 0,
    isFollowed: false
  },

  //跳转到回答内容页
  toAnswerContent: function (e) {
    wx.navigateTo({
      url: '../../pages/answerContent/answerContent?answerId=' + e.currentTarget.dataset.id
    })
  },

  toLookAnswer: function() {
    wx.navigateTo({
      url: '../../pages/answerContent/answerContent?answerId=' + this.data.answerId
    })
  },

  //跳转到编写回答页
  toWriteAnswer: function () {
    wx.navigateTo({
      url: '../../pages/editor/editor?isPost=false&qId=' + this.data.qId + "&isModifyAns=false"
    })
  },

  toFolloweduestion: function(e) {
    if(this.data.isFollowed) {
      //已关注,取消关注
      this.followedOperate(0);
    } else {
      //未关注,去关注
      this.followedOperate(1);
    }
  },

  followedOperate: function(isFollow) {
    wx.request({
      url: app.globalData.API + '/question/isFollowed',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        status: isFollow,
        qId: this.data.qId,
        userId: wx.getStorageSync('id')
      },
      success(res) {
        console.log(res)
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
          wx.removeStorageSync('card_id');
          wx.removeStorageSync('cookies');
          wx.removeStorageSync('nick_name');
          wx.removeStorageSync('id')
          wx.showToast({
            title: res.data.code + "-" + res.data.message,
            icon: "none",
            duration: 2000
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
   * 生命周期函数--监听页面加载
   *   onLoad: function (options) {
    this.setData({
      html: app.globalData.html,
      title: options.title
    })
  },
   */
  onLoad: function (options) {
    var that = this;
    this.initQuestionList(options);
    setTimeout(function(){
      that.initIsFollowed(options);
    },300);
  },

  initIsFollowed: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.API + '/question/getIsFollowed',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        qId: options.id,
        userId: wx.getStorageSync('id')
      },
      success(res) {
        console.log(res)
        console.log(that.data.answersList)
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
        if(res.data.code == 52) {
          that.setData({
            isFollowed:false
          })
          return;
        }
        if(res.data.code != 100) {
          wx.removeStorageSync('card_id');
          wx.removeStorageSync('cookies');
          wx.removeStorageSync('nick_name');
          wx.removeStorageSync('id')
          wx.showToast({
            title: res.data.code + "-" + res.data.message,
            icon: "none",
            duration: 2000
          })
          return;
        } else {
          that.setData({
            isFollowed:true
          })
        }
      },
      fail(err){
        console.log(err)
      }
    })
  },

  initQuestionList: function(options) {
    //options.id 然后去请求该问题下的所有回答
    console.log(options)
    var that = this;
    wx.request({
      url: app.globalData.API + '/answer/list',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        id: options.id
      },
      success(res) {
        console.log(res)
        that.setData({
          answersList: res.data.result,
          qId: res.data.qId,
          qTitle: res.data.qTitle,
          qDesc: res.data.qDesc,
          qUserId: res.data.qUserId
        })
        console.log(that.data.answersList)
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
      },
      fail(err){
        console.log(err)
      }
    })

    //防止前面的请求太慢，导致后面的qId获取不到
    setTimeout(function() {
    //检查该问用是否已经回答了该问题，已经回答则设置写回答为不可用，且换为去查看回答
    wx.request({
      url: app.globalData.API + '/answer/isAnswered',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        id: wx.getStorageSync('id'),
        qId: that.data.qId
      },
      success(res) {
        console.log(res)
        if(res.data.code == 51) {
          that.setData({
            isAnswered: true,
            answerId: res.data.result.answerId
          })
        }
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
      },
      fail(err){
        console.log(err)
      }
    })
    }, 300);
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