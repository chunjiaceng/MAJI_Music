//封装功能函数
//发送ajax请求
import config from "./config"
export default (url,data={},method='get')=>{
 return new Promise((resolve,reject)=>{
  wx.request( 
    { url:config.host+url,
     data,
     method,
     header:{
     cookie:wx.getStorageSync('cookies')?(wx.getStorageSync('cookies').find(item=>item.indexOf('MUSIC_U')!== -1)):''
     },
     success:(res)=>{
      if(data.isLogin){
       wx.setStorage({
         key:'cookies',
         data:res.cookies
       })
     }
    
     resolve(res.data);//修改成功状态
    
     },
   fail:(err)=>{
     console.log("请求失败："+err.errMsg);
     reject(err);//修改失败状态
   }})
   
 })
}
