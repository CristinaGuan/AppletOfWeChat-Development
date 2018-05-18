// pages/post/post.js
//引入data.js数据模块
// var DBPost=require('../../db/DBPost.js').DBPost;

//使用ES6导入模块的关键字import将DBPost导入进来，这种写法比require要高的多
import {DBPost} from '../../db/DBPost.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("监听页面加载");
    var dbPost=new DBPost();
    //重新渲染数据
    this.setData({
      postList:dbPost.getAllPostData()
    });
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示");
  },

  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    console.log("监听页面初次渲染完成");
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("监听用户下拉动作");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("用户点击右上角分享");
  },

  onTapToDetail:function(event){
    //获取当前文章的id
    var postId=event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },

  onCommentTap:function(event){
    var id=event.currentTarget.dadaset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id='+id,
    })
  },

  OnSwiperTap:function(event){
    var postId=event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }
})