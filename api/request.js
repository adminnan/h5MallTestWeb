
import {apiFlag} from "./commonProps.js";
export const baseUrl='http://localhost:8880';
let ajaxCount=0;
export async function request({url,method,param={},header={}}){
  ajaxCount++;
  wx.showLoading({
    title: '加载中',
    mask:true
  })
	return new Promise((resolve,reject)=>{
    if(header){
      uni.request({
        url:baseUrl+url,
        method:(method?method:"GET"),
        data:param,
        header:header,
        success:(res)=>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err)
        },
        complete:()=>{
          ajaxCount--;
          if(ajaxCount===0){
            wx.hideLoading();
          }
        }
      });
    }else{
      uni.request({
        url:baseUrl+url,
        method:(method?method:"GET"),
        data:param,
        success:(res)=>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err)
        },
        complete:()=>{
          ajaxCount--;
          if(ajaxCount===0){
            wx.hideLoading();
          }
        }
      });
    }
	})
}

export async function showTost(content){
		uni.showToast({title:content})
}