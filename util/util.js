/* 根据客户端的时间信息得到发表评论的时间格式
多少分钟前，多少小时前，昨天，月日
para:
recordtime-{float}时间截
yearsFlag-{bool} 是否要年份

date.formate()方法--格式化日期显示
*/

function getDiffTime(recordTime,yearsFlag){
  if (recordTime){
    recordTime = new Date(parseFloat(recordTime)*1000);
    var minute=1000*60;
    var hour=minute*60;
    var day=hour*24;
    var now=new Date();
    var diff = now - recordTime;
    var result='';

    if(diff<0){
       return result;
    }
    var weekR=diff/(7*day);
    var dayC=diff/day;
    var hourC=diff/hour;
    var minC=diff/minute;
    if(weekR>=1){
      var formate='MM-dd hh:mm';
      if(yearsFlag){
        formate='yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }else if(dayC==1 || (hourC<24 && recordTime.getDate()!=now.getDate())){
      result='昨天'+recordTime.format('hh:mm');
      return result;
    }else if(dayC>1){
      var formate='MM-dd hh:mm';
      if(yearsFlag){
        formate='yyyy-MM-dd hh:mm';
       
      }
      return recordTime.format(formate);
    }else if(hourC>=1){
      result=parseInt(hourC)+'小时前';
      return result;
    }else if(minC>=1){
      result = parseInt(minC) + '分钟前';
      return result;
    }else{
      result = '刚刚';
      return result;
    }

  }
  return '';
}

/*
 *拓展Date方法。得到格式化的日期形式
 *date.format('yyyy-MM-dd')，date.format('yyyy/MM/dd'),date.format('yyyy.MM.dd')
 *date.format('dd.MM.yy'), date.format('yyyy.dd.MM'), date.format('yyyy-MM-dd HH:mm')
 *使用方法 如下：
 *                       var date = new Date();
 *                       var todayFormat = date.format('yyyy-MM-dd'); //结果为2015-2-3
 *Parameters:
 *format - {string} 目标格式 类似('yyyy-MM-dd')
 *Returns - {string} 格式化后的日期 2015-2-3
 *
 */
(function initTimeFormat() {
  Date.prototype.format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  };
})()

//计算电影星级
function convertToStarsArray(stars){
   var num=stars/10;
    var array=[];
    for(var i=1;i<=5;i++){
      if(i<=num){
        array.push(1);
      }else if(i-num===0.5){
        array.push(0.5);
      }else{
        array.push(0);
      }
    }
    return array;
}

//请求豆瓣电影
function http(url,callback){
  wx.request({
    url: url,
    method:'GET',
    header:{
      "content-type":"json"
    },
    success:function(res){
      callback(res.data);
    },
    fail:function(err){console.log(err);}
    
  })
}

//电影主演
//将数组转换为以‘/’分隔的字符串
function convertToCastString(casts){
   var castsjoin="";
   for(var idx in casts){
       castsjoin=castsjoin+casts[idx].name+"/";

   }
   return castsjoin.substring(0, castsjoin.length-1); //substring() 方法用于提取字符串中介于两个指定下标之间的字符。
}


function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
     var cast={
       img:casts[idx].avatars?casts[idx].avatars.large:'',
       name:casts[idx].name
     }
     castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  getDiffTime: getDiffTime,
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos

}