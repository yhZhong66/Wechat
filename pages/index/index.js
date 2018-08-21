//index.js
//获取应用实例
const app = getApp()
var a = 1;
var inputContent = {};
var text_data= {};
var text_data2 = 'hello'
var nonedata = "该视频无主题"
var labelarr = [];
var plabelarr = [];
var errolabel = [];
var filename_data = {};
var picture_lable ='';

Page(
  {
  //数据文本编辑
  data: {
    //msg: 'Hi',
    //motto: 'Hello World',
    confirm_label: false,
    confirm_label2: false,
    confirm_picture:false,
    confirm_video:false,
    hiddenName: true,
    hiddenName2:true,
    hiddenlabel1:true,
    hiddenlabel2: true,
    hiddenlabel3: true,
    inputContent:{},
    userInfo: {},
    videoSource:'',
    videoHidden:true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tempFilePaths: '',
    nodes: [{name: 'div',
            attrs: {
            class: 'div_class',
            style: 'line-height:60px; color: red;'
                     },
            children: [{
              type: 'text',
              text: ' 请上传您需要分类的照片或视频'
                     }]
          }],
    

  },
  onShareAppMessage: function () {
    return {
      title: '网宿智能AI分类，快来分类你的生活',
      imageUrl: '/data/1.jpg'
    }
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () 
  {
    if (app.globalData.userInfo)
     {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
     } 
    else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else 
    {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) 
  {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /*
  //获取用户输入内容
  bindChange: function (e) {
    this.data.inputContent = e.detail.value;

  },*/
  formSubmit:function(e){
    //console.log(this.data.inputContent)
    this.setData({
      confirm_picture: true,
    })
    var that = this
    var text_data = e.detail.value
    //反馈用户输入的标签
    wx.showToast
      ({
        title: '谢谢反馈！',
        icon: 'success',
        duration: 2000
      })
      wx.request({
        url: app.globalData.urldata0,
        header: { 'process_method': 'add_label' },
        method: 'POST',
        data: { label: text_data, filename: filename_data},
        success: function (res1) 
        {
          var pdata = res1.data;
          console.log(pdata);
          var presult = pdata["recommend_video_dir"];//结果
          var pimage = pdata["recommend_picture_dir"];
          var pstatus = pdata["status"];//状态
          var presult_len = presult.length
          console.log(presult_len)
          var presult_rand0 = Math.floor(Math.random() * presult_len );
          var presult_rand1 = Math.ceil(Math.random() * presult_len);
          var presult_rand2 = Math.floor(Math.random() * presult_len);
          //防止重复推荐
          while (presult_rand0 == presult_rand1 || presult_rand1 == presult_rand2 || presult_rand0 == presult_rand2)
          {
            var presult_rand0 = Math.floor(Math.random() * presult_len);
            var presult_rand1 = Math.ceil(Math.random() * presult_len);
            var presult_rand2 = Math.floor(Math.random() * presult_len);
          }

          console.log(presult_rand0);
          console.log(presult_rand1);
          console.log(presult_rand2);
          var base0 = presult[presult_rand0]; 
          var image0 = pimage[presult_rand0]; 
          var base1 = presult[presult_rand1];
          var image1 = pimage[presult_rand1]; 
          var base2 = presult[presult_rand2];
          var image2 = pimage[presult_rand2]; 
          wx.showModal
          ({
              title: '小宿提示',
              content: '确定获取推荐视频吗？该操作会消耗流量哦~',
              success: function (res) {
                  if (res.confirm) 
                  {
                    that.setData({
                      confirm_video:true,
                      pimage0: app.globalData.urldata1 + image0,
                      ptext0: app.globalData.urldata1 + base0,
                      pimage1: app.globalData.urldata1 + image1,
                      ptext1: app.globalData.urldata1 + base1,
                      pimage2: app.globalData.urldata1 + image2,
                      ptext2: app.globalData.urldata1 + base2,
                    })
                  }
                  else if (res.cancel) {
                    wx.showToast
                      ({
                        title: '用户取消',
                        icon: 'none',
                        duration: 2000
                      })
                  }
                }
          })


        }
      })

  },
  display_pic:function(){
    this.setData({confirm_picture: true,
    })
  },
  display_label:function(){
    this.setData({confirm_label2: true,})
  },
  //选择视频
  choosevideo:function(e){
    var that = this
    wx.chooseVideo
    ({
      sourceType: ['album','camera'],
      maxDuration: 10,
      camera: 'back',
      success: function(res)
        {
          var tempFilePaths = res.tempFilePath;
          that.setData({tempFilePaths: res.tempFilePath,
          hiddenName2: false,
          size: (res.size / (1024 * 1024)).toFixed(2)})
          wx.showModal
          ({
            title: '小宿提示',
            content: '要开始分析视频了呢，请注意视频大小并做好准备哟',
            success: function (res) 
          {
            if (res.confirm) 
            {
              //console.log('确定')
              wx.showLoading
              ({title: '正在上传中……', })
              wx.uploadFile
              ({
                  url: app.globalData.urldata0,
                //http://10.8.74.3:55580/
                //morfast.f3322.net:55580
                // http://morfast.ddns.net:55580/
                filePath: tempFilePaths,
                name: 'file',
                header: { 'process_method': 'predict' },
                //formData: { 'label': text_data},
                success: function (res) 
                {
                  that.setData({ confirm_label: true, })
                  wx.showLoading({ title: '正在欣赏中……', })
                  var data1 = res.data;
                  var count = 0;
                  var arr = new Array();
                  console.log(data1)
                  var obj = JSON.parse(data1);
                  console.log(obj);
                  var result = obj["result"];//结果
                  var video_name = obj["file_name"];//文件名
                  var status = obj["status"];//状态
                 // console.log(obj["result"]);//结果
                  //console.log(obj["file_name"])//文件名
                  //console.log(obj["status"]);//状态
                  for (var sub_key in obj["result"])
                  {
                    console.log(sub_key + ":" + obj["result"][sub_key])
                  }
                  for (var sub_key2 in obj["result"]) 
                  {
                    arr[count] = [sub_key2];
                    console.log(sub_key2);
                    labelarr.push(sub_key2);
                    if (count == 2) break;
                    count = count + 1;
                  }
                  /*var obj = JSON.parse(data)
                  for (var key in obj){
                    console.log(key)
                    console.log(obj[key])
                  }
                  console.log(data);
                  that.setData({
                    text2:obj,
                    text:data
                  });*/
                  console.log(arr[0]);
                  //显示标签选择数量
                  if (arr.length == 0) {
                    that.setData
                      ({
                        hiddenlabel1: true,
                        hiddenlabel2: true,
                        hiddenlabel3: true,
                      })
                  }
                  if(arr.length==1)
                  {
                    that.setData
                      ({ hiddenlabel1: false,
                        hiddenlabel2: true,
                        hiddenlabel3: true, })
                  }
                  if (arr.length == 2) {
                    that.setData
                      ({
                        hiddenlabel1: false,
                        hiddenlabel2: false, 
                        hiddenlabel3: true, })
                  }
                  if (arr.length == 3) {
                    that.setData
                      ({
                        hiddenlabel1: false,
                        hiddenlabel2: false,
                        hiddenlabel3: false,
                      })
                  }
                  //判断返回的值是否为空，即判断是否有分类
                  if(arr.length>0)
                  {
                    that.setData
                    ({ text: arr[0],
                    text2:arr[1],
                    text3:arr[2]})
                  }
                  else if(arr.length==0)
                  {
                    that.setData
                    ({text:nonedata})
                  }



                  console.log('上传成功');
                  wx.showToast
                    ({
                      title: '分析成功',
                      icon: 'success',
                      duration: 2000
                    })
                  filename_data=obj["file_name"],
                  that.setData({
                    hiddenName: false,
                  })
                  console.log(filename_data)
                  },
                fail: function (res) 
                {
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
            else if (res.cancel) 
            {
              wx.showToast
                ({
                  title: '用户取消上传',
                  icon: 'none',
                  duration: 2000
                })
            }
          }
        })


      }

     })

  }

  
})
