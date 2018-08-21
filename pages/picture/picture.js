// pages/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirm_label: false,
    confirm_label2: false,
    hiddenName: true,
    hiddenName2: true,
    hiddenlabel1: true,
    hiddenlabel2: true,
    hiddenlabel3: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tempFilePaths: '',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height:100px; color: blue;'
      },
      children: [{
        type: 'text',
        text: ' '
      }]
    }]
  },
  formSubmit: function (e) {
    //console.log(this.data.inputContent)


    var text_data = e.detail.value
    //反馈用户输入的标签
    wx.showToast
      ({
        title: '谢谢反馈！',
        icon: 'success',
        duration: 2000
      })
    wx.request({
      url: 'http://10.8.74.3:55580/',
      header: { 'process_method': 'add_label' },
      method: 'POST',
      data: { label: text_data, filename: filename_data },
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
      }
    })
    console.log(text_data)
    console.log(filename_data)
  },
  display_label: function () {
    this.setData({ confirm_label2: true, })
  },
  //获取用户输入内容
  bindChange2: function (e) {
    this.data.inputContent = e.detail.value;

  },
  obtain_data2: function () {
    console.log(this.data.inputContent)
  },
  chooseimge: function () {
    var that = this
    wx.chooseImage
      ({
        count: 15,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) 
        {
          var tempFilePath = res.tempFilePaths;
          that.setData({tempFilePaths: res.tempFilePaths})
          console.log(tempFilePath)
          wx.showModal
            ({
              title: '提示',
              content: '确认上传该图片吗',
              success: function (res) 
              {
                wx.uploadFile
                ({
                    url: 'http://morfast.f3322.net:55580/',
                  filePath: tempFilePath[0],
                  name: 'file',
                  header: { 'content-type': 'multipart/form-data' },
                  formData: {},
                  success: function (res)
                  {
                    var data = res.data;
                    console.log('上传成功');
                    wx.showToast
                      ({
                        title: '上传成功',
                        icon: 'fail',
                        duration: 2000
                      })
                  },
                  fail: function (res)
                  {
                    var tempFilePath = res.tempFilePaths;
                    var data = res.data;
                    console.log('上传失败')
                    wx.showToast
                      ({
                        title: '上传失败',
                        icon: 'none',
                        duration: 2000
                      })
                  },
                })
              }
            })
        },
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