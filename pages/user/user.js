


Page({

  data: {

    disabled: true,  //是否可用

    opacity: 0.4,    //设置透明度

  },

  //跳转注册页面

  gotoRegist: function () {

    wx.redirectTo({ url: '../../pages/login/regist/regist' })

  },

  //手机的输入框

  phone: function (e) {

    var that = this

    //console.log(e.detail.value)

    var isTel = IsTel(e.detail.value)

    //console.log(isTel)

    if (isTel) {

      that.setData({

        disabled: false,

        opacity: 1

      })

    } else {

      that.setData({

        disabled: true,

        opacity: 0.4

      })

    }

  },

  //提交按钮确认

  sumit: function (e) {

    console.log(e.detail.value)

    if (e.detail.value.passworld.length == 0) {

      wx.showModal({

        title: '密码不得为空',

        showCancel: false

      })

    } else {

      //提交

      wx.request({

        url: 'https://URL',

        data: e.detail.value,

        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT

        // header: {}, // 设置请求的 header

        success: function (res) {

          // success

          if (res.data == 1) {  //请求成功返回码

            wx.showToast({

              title: '登陆成功',

              icon: 'success',

              duration: 2000

            })

          }

        },

        fail: function () {

          // fail

        },

        complete: function () {

          // complete

        }

      })

    }

  },

})
