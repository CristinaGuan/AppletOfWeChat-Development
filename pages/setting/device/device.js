// pages/setting/device/device.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo:{},
    softInfo:{},
    srceenInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;
     wx.getSystemInfo({
       success: function(res) {
        that.setData({
          phoneInfo:[
            {key:"手机型号",val:res.model},
            {key:"手机语言",val:res.language}
          ],
          softInfo:[
            { key: "微信版本", val: res.version },
            { key: "操作系统版本", val: res.system},
             {key: "客户端平台", val: res.platform },
          ],
          screenInfo:[
            { key: "屏幕像素比", val: res.pixelRatio },
            { key: "屏幕尺寸", val: res.windowWidth+'X'+res.windowHeight }
          ]
        });
       },
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