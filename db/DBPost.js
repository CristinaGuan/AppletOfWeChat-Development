// 方法一：构造函数
// var DBPost=function(){
//   this.storageKeyName='postList';//所有的文章本地存储键值

// }

// //prototype原型链构建对象
// DBPost.prototype={
//   //得到全部文章信息
//   getAllPostData:function(){
//     var res = wx.getStorageSync(this.storageKeyName);
//     if(!res){
//       res = require('../data/data.js').postList;
//       this.execSetStorageSync(res);
//     }
//     return res;
//   },
//   //本地缓存，保存/更新
//   execSetStorageSync:function(data){
//     wx.setStorageSync(this.storageKeyName,data);
//   },
// };
// module.exports={
//   DBPost:DBPost
// };

// 方法二：使用ES6

var util=require('../util/util.js');

class DBPost
{
  constructor(postId)
  {
    this.storageKeyName = 'postList';
    this.postId=postId;
   }
   //获取指定id的文章数据
   getPostItemById(){
      var postData=this.getAllPostData();
      var len=postData.length;
      for(var i=0;i<len;i++){
        if(postData[i].postId==this.postId){
          return{
            //当前文章在缓存数据库数组中的序号
            index:i,
            data:postData[i]
          }
        }
      }
   }

   //收藏文章
   collect(){
     return this.updataPostData('collect');
   }
   updataPostData(category,newValue){
     var itemData=this.getPostItemById();
     var postData=itemData.data;
     var allPostData=this.getAllPostData();
     switch(category){
       case 'collect':
                      if(!postData.collectionStatus){
                        //如果当前状态是未收藏
                        postData.collectionNum++;
                        postData.collectionStatus=true;
                      }else{
                        postData.collectionNum--;
                        postData.collectionStatus =false;
                      }
                      break;
      case 'up':
                 if(!postData.upStatus){
                   postData.upNum++;
                   postData.upStatus=true;
                 }else{
                   postData.upNum--;
                   postData.upStatus = false;
                 }
                 break;
      case 'comment':
         postData.comments.push(newValue);
         postData.commentNum++;
         break;
      case 'reading':
         console.log(postData.readingNum);
         postData.readingNum++;
         break;
      default:break;
     
     }
     //更新缓存数据库
     allPostData[itemData.index]=postData;
     this.execSetStorageSync(allPostData);
     return postData;
   }

   //点赞功能
   up(){
     var updata=this.updataPostData('up');
     return updata;
   }
   //获取文章的评论数据
   getCommentData(){
      var itemData=this.getPostItemById().data;
      //按时间降序排列评论
      itemData.comments.sort(this.compareWithTime);
      var len=itemData.comments.length,comment;
      for(var i=0;i<len;i++){
        //将comment中的时间转换成可阅读模式
        comment=itemData.comments[i];
        comment.create_time=util.getDiffTime(comment.create_time,true);
      }
      return itemData.comments;
   }

   compareWithTime(value1,value2){
     var flag=parseFloat(value1.create_time)-parseFloat(value2.create_time);
     if(flag<0){
       return 1;
     }else if(flag>0){
       return -1;
     }else{
       return 0;
     }
   }

   getAllPostData(){
   var res = wx.getStorageSync(this.storageKeyName);
   if(!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
     }
   return res;
   }


   execSetStorageSync(data){
     wx.setStorageSync(this.storageKeyName,data);
    }

   newComment(newComment){
     this.updataPostData('comment', newComment);
   }

   //文章阅读量增加
   addReadingTimes(){
     this.updataPostData('reading');
   }

};
export{DBPost}