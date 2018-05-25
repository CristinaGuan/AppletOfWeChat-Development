// pages/movie/movie.js
var app=getApp();
var util = require('../../util/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    containerShow:true, //电影分类面板显示
    searchPanelShow:false,//搜索面板隐藏
    searchResult:{}, //搜索结果变量
    keyWord:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var inTheatersUrl = app.globalData.doubanBase +"/theaters" + "?start=0&count=3";
    console.log(inTheatersUrl);
    var comingSoonUrl = app.globalData.doubanBase+"/comingSoon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase+ "/top250" + "?start=0&count=3";
   
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
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
  onReachBottom: function (event) {
    if (this.data.searchPanelShow){
    // console.log(this.data.searchResult);
    var searchMovies=[];
    if (this.data.searchResult.length!=0){
       var totalCount = this.data.searchResult.movies.length;
      //  console.log(totalCount);
       //拼接下一组数据的Url
       var nextUrl = app.globalData.doubanBase+ "/search" + "?q="+this.data.keyWord+ "&start=" + totalCount;
      // console.log(nextUrl);
      util.http(nextUrl, this.processDouBanData_search);
      wx.showNavigationBarLoading();
   }
    }
  },

  processDouBanData_search: function (moviesDouBan) {
    var movies = [];
    for (var idx in moviesDouBan.subjects) {
      var subject = moviesDouBan.subjects[idx];
      var title = subject.title;
     
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
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
  
    //加载数据后重新渲染
    var totalMovies = [];
    totalMovies = this.data.searchResult.movies.concat(movies);
    this.data.searchResult.movies=totalMovies;
   

    var readyData= {
      categoryTitle: "搜索结果",
      movies: totalMovies 
    }
    this.setData({
      searchResult:readyData
    });

    // //停止刷新
    wx.stopPullDownRefresh();
    // //隐藏loading状态
    wx.hideNavigationBarLoading();

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //获取豆瓣电影列表数据
  getMovieListData:function(url,settedkey,categoryTitle){
     var that=this;
     wx.request({
       url: url,
       method:"GET",
       header:{
         "content-type":"json"
       },
       success:function(res){
        //  console.log(res.data);
         that.processDoubanData(res.data,settedkey,categoryTitle);
       },
       fail:function(error){
        console.log(error);
       }
     })
  },

  processDoubanData: function (movieDouBan,settedkey,categoryTitle){
     var movies=[];
     
     //for中的代码将所有豆瓣电影数据转化成需要的格式
     for (var idx in movieDouBan.subjects){
       var subject = movieDouBan.subjects[idx];
       var title =subject.title;
       
       if(title.length>=6){
          //电影名称显示前6位
          title=title.substring(0,6)+"...";
       }

       var temp={
         stars:util.convertToStarsArray(subject.rating.stars),
         title:title,
         average: subject.rating.average,
         coverageUrl: subject.images.large,
         movieId:subject.id
       }
       movies.push(temp);
      
     }
     var readyData={};
     readyData[settedkey]={
       categoryTitle:categoryTitle,
       movies:movies
     }
    //  console.log(readyData);
     this.setData(readyData);

   
  },

  //获取很多电影
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    })
  },

  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
  },


  //搜索电影
  //搜索input光标获得焦点时，显示搜索面板，隐藏电影分类面板
  onBindFocus:function(){
    this.setData({
      containerShow: false,
      searchPanelShow: true
    });

  },

  //当输入完成后按回车或手机键盘确认键会触发onBindConfirm
  onBindConfirm:function(event){
     this.data.keyWord=event.detail.value;
     var searchUrl = app.globalData.doubanBase+ "/search" + "?q=" + this.data.keyWord;
     this.getMovieListData(searchUrl,"searchResult","");
     
  },

  //input右边的X图标，点击删除input内容
  onCancelImgTap:function(){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      inputValue:"",
      searchResult: {}
    });
  }

})