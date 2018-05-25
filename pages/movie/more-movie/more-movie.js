// pages/movie/more-movie/more-movie.js
var app=getApp();
var util=require("../../../util/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category=options.category;
    this.data.navigationBarTitleText=category;

    var dataUrl="";
    switch(category){
        case "正在热映":
        dataUrl = app.globalData.doubanBase+"/theaters";
          break;
        case "即将上映":
        dataUrl = app.globalData.doubanBase+ "/comingSoon";
          break;
        case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase+ "/top250";
          break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl,this.processDouBanData);
    wx.showNavigationBarLoading();
  },

  processDouBanData:function(moviesDouBan){
    var movies=[];
    for(var idx in moviesDouBan.subjects){
      var subject=moviesDouBan.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
       movies.push(temp);
    }
    //加载数据后重新渲染movies
    var totalMovies=[];
    totalMovies=this.data.movies.concat(movies);
    this.setData({
      movies: totalMovies
    });

    //停止刷新
    wx.stopPullDownRefresh();
    //隐藏loading状态
    wx.hideNavigationBarLoading();
      
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitleText,
    })
    wx.showNavigationBarLoading();
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
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";

    //刷新页面后将页面所有初始化参数恢复到初始值，避免重复显示
    this.data.movies=[];
    util.http(refreshUrl, this.processDouBanData);
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var totalCount=this.data.movies.length;
    // console.log(totalCount);
    //拼接下一组数据的Url
    var nextUrl=this.data.requestUrl+"?start="+totalCount+"&&count=20";
    // console.log(nextUrl);
    util.http(nextUrl,this.processDouBanData);
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 点击查看电影详情
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  }


})