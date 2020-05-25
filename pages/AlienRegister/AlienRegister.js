// pages/signDay/signDay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2019-12-01",
    isAlien: 0,
    health: 0,
    name: '',
    cardId: '',
    pwd: '',
    sex: 0,
    phone: '',
    age: '',
    address: '',
    isHasAlien: true,
    healthItems: [
      {name: '健康', value: '0', checked: true},
      {name: '疑似病例', value: '1'},
      {name: '确诊病例', value: '2'}
    ],
    sexItems: [
      {name: '男', value: '0', checked: true},
      {name: '女', value: '1'}
    ],
    user_type: [
      {name: "不是", value: '0', checked: true},
      {name: "是", value: '1'}
    ]
  },

  //提交信息登记
  commRegister: function() {
    if (this.data.address.length == 0) {
      this.checkValueIsNotBlank(this.data.address, "地址不能为空");
      return;
    }
    this.checkNameAndCardId(this.data.name, this.data.cardId);
    var that = this;
    setTimeout(function() {
      console.log("is has alien: " + that.data.isHasAlien)
      if(that.data.isHasAlien) {
        that.commRegisterInfo();
      }
    }, 1000)
  },

  commRegisterInfo: function() {
    wx.request({
      url: app.globalData.API + '/reg/alien',
      data: {
        name: this.data.name,
        cardId: this.data.cardId,
        pwd: this.data.pwd,
        phone: this.data.phone,
        age: this.data.age,
        sex: this.data.sex,
        isAlien: this.data.isAlien,
        health: this.data.health,
        address: this.data.address
      },
      success(res) {
        console.log(res.data)
        if(res.data.code != 100) {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          })
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  //校验用户名和身份证号是否存在
  checkNameAndCardId: function(name, cardId) {
    var that = this;
    wx.request({
      url: app.globalData.API + '/reg/alien/exist',
      data: {
        name: name,
        cardId: cardId
      },
      success(res) {
        console.log(res.data)
        if(res.data.code != 100) {
          that.setData({
            isHasAlien: false
          })
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 1500
          })
          console.log(that.data.isHasAlien)
        } else {
          that.setData({
            isHasAlien: true
          })
        }
      },
      fail(err) {
        that.setData({
          isHasAlien: false
        })
        console.log(err)
      }
    })
  },

  //以下是绑定输入框值到data中
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
    console.log(this.data.date);
  },

  isAlienChange: function(e) {
    this.setData({
      isAlien: e.detail.value
    });
    console.log(this.data.isAlien);
  },

  bindHealthChange: function(e) {
    this.setData({
      health: e.detail.value
    })
    console.log(this.data.health);
  },

  sexChange: function(e) {
    this.setData({
      sex: e.detail.value
    })
    console.log(this.data.sex)
  },

  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },

  cardIdInput: function(e) {
    this.setData({
      cardId: e.detail.value
    })
    console.log(this.data.cardId)
  },

  pwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
    console.log(this.data.pwd)
  },

  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },

  ageInput: function(e) {
    this.setData({
      age: e.detail.value
    })
    console.log(this.data.age)
  },

  addressInput: function(e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.address)
  },

  //以下是校验输入框值
  checkNameInput: function(e) {
    this.checkValueIsNotBlank(e.detail.value, "姓名不能为空");
  },

  checkCardIdInput: function(e) {
    this.checkValueIsNotBlank(e.detail.value, "身份证号码不能为空");
  },

  checkPwdInput: function(e) {
    this.checkValueIsNotBlank(e.detail.value, "密码不能为空");
  },

  checkPhoneInput: function(e) {
    this.checkValueIsNotBlank(e.detail.value, "手机号不能为空");
  },

  checkAgeInput: function(e) {
    this.checkValueIsNotBlank(e.detail.value, "年龄不能为空");
  },

  checkAddressInput: function(e) {
    this.checkValueIsNotBlank(e.detail.value, "地址不能为空");
  },

  checkValueIsNotBlank: function(val, msg) {
    var value = val;
    if(value == "") {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 1500
      })
    }
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