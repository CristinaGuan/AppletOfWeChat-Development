// pages/post/post-detail/post-detail.js

//使用ES6导入模块的关键字import将DBPost导入进来，这种写法比require要高的多
import { DBPost } from '../../../db/DBPost.js'

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
    var postId=options.id;
    this.dbPost=new DBPost(postId);
    this.postData=this.dbPost.getPostItemById().data;
    this.setData({
      post:this.postData
    });
    this.addReadingTimes();//问题：第一次点击文章没有增加阅读量，这是为什么？
    this.setAniation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     wx.setNavigationBarTitle({
       title: this.postData.title,
     })
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
  return{
    title:this.postData.title,
    desc:this.postData.content,
    path:"/pages/post/post-detail/post-detail"
  }
  },

  //点击触发收藏/取消收藏功能
  onCollectionTap:function(){
    //DBPost已经在onload里面被实例化保存到了this.dbPost里，无须再实例化；
    var newData = this.dbPost.collect();
    //重新绑定数据
    //更新部分数据
    this.setData({
     'post.collectionStatus':newData.collectionStatus,
     'post.collectionNum':newData.collectionNum
    });

    //收藏的交互反馈--调用微信wx.shouwToast API函数
    wx.showToast({
      title: newData.collectionStatus? '收藏成功':'取消成功',
      duration:1000,
      icon:'success',
      mask:true
    })
  },

//点赞功能触发函数
  onUpTap:function(){
    var newData=this.dbPost.up(); //调用DBPost.js中的up()函数
    //更新部分数据
    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum
    });

    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    });
    setTimeout(function(){
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      });
    }.bind(this),300);
  
  },
//点击评论查看
  onCommentTap: function (event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id=' + id
    })
  },

//阅读数量计算事件
addReadingTimes:function(){
  this.dbPost.addReadingTimes();
},

//like动画效果
setAniation:function(){
  //定义动画
  var animationUp=wx.createAnimation({
    timeingFunction:'ease-in-out'
  })
  this.animationUp = animationUp;
}
})