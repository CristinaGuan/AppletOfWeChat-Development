// pages/movie/movie-detail/movie-detail.js
var util=require('../../../util/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var movieId=options.id;
     var url ='http://172.16.14.238:8089/movie_subject/'+movieId;
     util.http(url,this.processDoubanData);
  },

  processDoubanData:function(data){
    if(!data){
      return;
    }
    var director={
      avatar:"",//影人头像
      name:"", //影人姓名
      id:"" //影人id
    }
    if(data.directors[0]!=null){
        if(data.directors[0].avatars!=null){
          director.avatar=data.directors[0].avatars.large;
        }
        director.name=data.directors[0].name;
        director.id=data.directors[0].id;
    }

    var movieDetail={
      movieImg:data.images?data.images.large:"",//电影图片
      country:data.countries[0], //国家
      title:data.title,  //电影中文名称
      originalTitle:data.original_title,  //原名
      wishCount:data.wish_count, //想看人数
      commentCount:data.comments_count, //评论数目
      year:data.year, //上映年分
      genres: data.genres.join("、"),  //电影所属分类，数组类型
      stars: util.convertToStarsArray(data.rating.stars), //星星
      score:data.rating.average,  //分数
      director:director,  //导演
      casts:util.convertToCastString(data.casts),  //主演--人名/人名
      castsInfo:util.convertToCastInfos(data.casts),//主演 --页面底部显示主演头像和名字
      summary:data.summary  //剧情简介

    }
   
    this.setData({
      movieDetail:movieDetail
    })

    wx.setNavigationBarTitle({
      title: data.title,
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
  
  },

  viewMoviePostImg:function(event){
    var src=event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current:src
    })
  }
})