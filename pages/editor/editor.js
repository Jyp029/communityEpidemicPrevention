// 查看事件文档https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.html
const app = getApp();
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '编辑你的内容吧，支持文字和图片...',
    _focus: false,
    images: "",
    isPost: false,
    title: "",
    qId: 0,
    answerId: 0,
    editorHtml: '',
    isModifyAnswer: true
  },

  setTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },

  checkTitleNums(e) {
    var eTitle = e.detail.value;
    if (eTitle.length > 50) {
      wx.showToast({
        title: '字数超过限制了',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        title: eTitle
      })
    } else {
      this.setData({
        title: eTitle
      })
    }
  },

  //提交内容
  toPost() {
    this.editorCtx.getContents({
      success: (res) => {
        if (this.data.title.length > 50) {
          wx.showToast({
            title: '字数超过限制了',
            icon: 'none',
            duration: 1500
          })
          return;
        }
        app.globalData.html = ''
        app.globalData.html = res.html
        if (this.data.isPost) {
          this.postQuestion()
          return;
        } else {
          this.postAnswer()
          return;
        }
      },
      fail: (res) => {
        console.log("fail：", res);
      }
    });
  },

  //提交问题
  postQuestion: function () {
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.API + '/question/publish', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        cardId: wx.getStorageSync('card_id'),
        title: this.data.title,
        description: app.globalData.html
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      success(res) {
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
        if (res.data.code != 100) {
          wx.showToast({
            title: res.data.code + "-" +res.data.message,
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.navigateTo({
            url: '../community/community',
          })
        }
      },
      fail(error) {
        console.log(error)
      },
      complete(com) {
        wx.hideLoading({
          complete: (res) => {
            console.log(res)
          },
        })
      }
    })
  },

  //提交回答
  postAnswer: function() {
    var that = this;
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.API + '/answer/publish', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        userId: wx.getStorageSync('id'),
        content: app.globalData.html,
        qId: that.data.qId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      success(res) {
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
        if (res.data.code != 100) {
          wx.showToast({
            title: res.data.code + "-" +res.data.message,
            icon: 'none',
            duration: 1500
          })
        } else {
          console.log("提交了，要跳转了" + that.data.qId);
          wx.navigateTo({
            url: '../questDetail/questDetail?id=' + that.data.qId
          })
        }
      },
      fail(error) {
        console.log(error)
      },
      complete(com) {
        wx.hideLoading({
          complete: (res) => {
            console.log(res)
          },
        })
      }
    })
  },

  //修改内容
  toModify: function() {
    this.editorCtx.getContents({
      success: (res) => {
        if (this.data.title.length > 50) {
          wx.showToast({
            title: '字数超过限制了',
            icon: 'none',
            duration: 1500
          })
          return;
        }
        app.globalData.html = ''
        app.globalData.html = res.html
        if (this.data.isModifyAnswer) {
          this.toModifyAnswer()
          return;
        } else {
          this.postAnswer()
          return;
        }
      },
      fail: (res) => {
        console.log("fail：", res);
      }
    });
  },

  //修改回答内容
  toModifyAnswer: function() {
    var that = this;
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.API + '/answer/modify', 
      method: "POST",
      data: {
        userId: wx.getStorageSync('id'),
        content: app.globalData.html,
        qId: that.data.qId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      success(res) {
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
        if (res.data.code != 100) {
          wx.showToast({
            title: res.data.code + "-" +res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          console.log(that.data.qId)
          wx.navigateTo({
            url: '../questDetail/questDetail?id=' + that.data.qId
          })
        }
      },
      fail(error) {
        console.log(error)
      },
      complete(com) {
        wx.hideLoading({
          complete: (res) => {
            console.log(res)
          },
        })
      }
    })
  },

  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  onLoad: function (option) {
    console.log(option)
    var isPost;
    if (option.isPost == "true") {
      isPost = true;
    } else {
      isPost = false;
    }
    var isModifyAns;
    if(option.isModifyAns == "true") {
      isModifyAns = true;
    } else {
      isModifyAns = false;
    }
    this.setData({
      isPost: isPost,
      qId: option.qId,
      answerId: option.answerId,
      isModifyAnswer: isModifyAns
    });
    if(option.isModifyAns == "true") {
      this.getAnswerContent(this.data.answerId);
    }
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {data: 'editor'});
    // eventChannel.emit('someEvent', {data: 'editor'});
    // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })
  },

  getAnswerContent: function(answerId) {
    var that = this;
    wx.request({
      url: app.globalData.API + '/answer/contents',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('cookies')
      },
      data: {
        id: answerId
      },
      success(res) {
        console.log(res)
        that.setData({
          editorHtml: res.data.content
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
            duration: 2000
          })
          wx.navigateTo({
            url: '../login/login',
          })
          return;
        }
        // {
        //   wx.navigateTo({
        //     url: '../../pages/answerContent/answerContent?answerId=' + that.data.answerId
        //   })
        // }
      },
      fail(err){
        console.log(err)
      }
    })
  },

  // 编辑器初始化完成时触发
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.editorCtx.setContents({
        html: that.data.editorHtml,
        success:(res) => {
          console.log(res)
        },
        fail:(err) => {
          console.log(err)
        }
      })
    }).exec();
  },
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset;
    if (!name) return;
    console.log('format', name, value)
    this.editorCtx.format(name, value);
  },
  // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
  onStatusChange(e) {
    const formats = e.detail;
    console.log(formats)
    this.setData({
      formats
    });
  },
  // 插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    });
  },
  // 清除
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    });
  },
  // 移除样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  // 插入当前日期
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  // 插入图片
  insertImage() {
    wx.chooseImage({
      count: 1,
      success: () => {
        this.editorCtx.insertImage({
          src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
          width: '100%',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: () => {
            console.log('insert image success')
          }
        })
      }
    });
  },
  //选择图片
  chooseImage(e) {
    console.log(e)
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var images = res.tempFilePaths[0];
        this.data.images = images
        this.uploadImage()
        this.editorCtx.insertImage({
          src: this.data.images,
          width: '100%',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: () => {
            console.log('insert image success')
          }
        })
      }
    })
  },

  uploadImage: function () {
    console.log("图片地址： " + this.data.images)
    var imgStart = this.data.images.substring(11);
    var imagesName = imgStart.substring(0, imgStart.length - 4);
    var that = this;
    wx.uploadFile({
      url: app.globalData.API + '/upload/image',
      filePath: this.data.images,
      name: 'fileImage',
      header: {
        'content-type': 'multipart/form-data',
        'Cookie': wx.getStorageSync('cookies')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          images: res.data.path
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})