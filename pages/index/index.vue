<template>
	<view> 
		<up-tabs :list="list1" @click="tabClick"></up-tabs>
		<view v-if="selectedIndex==0">
			<view>
				<up-swiper
				    :list="list3"
				    indicator
				    indicatorMode="line"
				    circular
				></up-swiper>
			</view>
			<view style="display: flex;justify-content: space-evenly;
			align-items: center;flex-wrap: wrap;margin: 30rpx 0;">
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<view>
						<image src="/static/image/资源 59.png"
						style="width: 200rpx;" mode="widthFix"></image>
					</view>
					<view style="display: flex;justify-content: center;">
						模块1
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<view>
						<image src="/static/image/资源 59 (1).png"
						style="width: 200rpx;" mode="widthFix"></image>
					</view>
					<view style="display: flex;justify-content: center;">
						模块2
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<view>
						<image src="/static/image/资源 59 (2).png"
						style="width: 200rpx;" mode="widthFix"></image>
					</view>
					<view style="display: flex;justify-content: center;">
						模块3
					</view>
				</view>
				<view style="display: flex;flex-direction: column;
				justify-content: center;margin-top: 30rpx;">
					<view>
						<image src="/static/image/资源 59 (3).png"
						style="width: 200rpx;" mode="widthFix"></image>
					</view>
					<view style="display: flex;justify-content: center;">
						模块4
					</view>
				</view>
				<view style="display: flex;flex-direction: column;
				justify-content: center;margin-top: 30rpx;">
					<view>
						<image src="/static/image/资源 59 (4).png"
						style="width: 200rpx;" mode="widthFix"></image>
					</view>
					<view style="display: flex;justify-content: center;">
						模块5
					</view>
				</view>
				<view style="display: flex;flex-direction: column;
				justify-content: center;margin-top: 30rpx;">
					<view>
						<image src="/static/image/资源 59 (5).png"
						style="width: 200rpx;" mode="widthFix"></image>
					</view>
					<view style="display: flex;justify-content: center;">
						模块6
					</view>
				</view>
			</view>
		
			<view style="display: flex;flex-wrap: wrap;justify-content: space-evenly;">
				<view style="width: 350rpx;" v-for="(item,index) in bottomGoodList"
				:key="index" @click="goodClickFun">
					<!-- 只能作为练习使用 -->
					<image :src="item.coverImage"
					style="width: 350rpx;display: block;border-radius: 20rpx;"
					mode="widthFix"></image>
					<view style="text-align: justify;">{{item.goodsName}}</view>
					<view>￥{{item.skuList[0].price}}</view>
				</view>
<!-- 				<view style="width: 350rpx;">
					<image src="/static/goodsImage/ningrongrong1.webp"
					style="width: 350rpx;display: block;border-radius: 20rpx;"
					mode="widthFix"></image>
					<view style="text-align: justify;height: 160rpx;">斗罗大陆宁荣荣神装cos服装女款
					二次元全套COS服斗罗大陆cos服装</view>
					<view>￥199</view>
				</view> -->
			</view>
		</view>
		<view v-if="selectedIndex==1">
			test1
		</view>
	</view>
</template>

<script>
import { onMounted, ref } from 'vue';
import { request, showTost } from "../../api/request.js";
	export default {
		setup(props, context) {
			const list1=ref([{
                    name: '首页',
                }, {
                    name: 'test1',
                },]);
				const selectedIndex=ref(0);
				const tabClick=(item)=>{
					console.log('item', item);
					selectedIndex.value=item.index;
				}
				const list3=ref([
					"/static/image/hongdi1.png",
					"/static/image/hongdi1.png",
					"/static/image/hongdi1.png"
				]);
				const bottomGoodList=ref();
				bottomGoodList.value=[];
				// 获取商品列表
				const getGoodsFun=async ()=>{
					const res=await request({url:"/goods/getGoods?pageNum=1&pageSize=10",method:"get"});
					console.log(res);
					if(res.data.success){
						const arr=[...res.data.content.iPage.records];
						let arr2=[];
						for(let i=0;i<arr.length;i++){
							const obj={};
							obj.id=arr[i].id;
							obj.coverImage=arr[i].coverImg;
							obj.goodsDesc=arr[i].goodsDesc;
							obj.goodsName=arr[i].goodsName;
							obj.categoryList=[];
							obj.skuList=[];
							if(!goodContains(obj,arr2)){
								arr2.push(obj);
							}
						}
						for(let j=0;j<arr2.length;j++){
								let obj={};
							for(let i=0;i<arr.length;i++){
								if(arr[i].id==arr2[j].id){
									 obj={...arr2[j]};
									const catObj={};
									catObj.name=arr[i].catName;
									catObj.goodId=arr[i].id;
									if(!catContains(catObj,obj.categoryList)){
										obj.categoryList.push(catObj);	
									}
									const skuObj={};
									skuObj.color=arr[i].color;
									skuObj.size=arr[i].size;
									skuObj.stock=arr[i].skuStock;
									skuObj.price=arr[i].skuPrice;
									skuObj.goodId=arr[i].id;
									if(!skuContains(skuObj,obj.skuList)){
										obj.skuList.push(skuObj);
									}
								}
							}
							arr2[j]={...obj};
						}
						bottomGoodList.value=arr2;
					}else{
						showTost(res.data.message)
					}
				}
				// 判断商品分类是否赋值进去了
				const catContains=(elment,arr)=>{
					let flag=false;
					for(let i=0;i<arr.length;i++){
						if(arr[i].name==elment.name){
							flag=true;
							break;
						}
					}
					return flag;
				}
				// 判断当前sku是否存在
				const skuContains=(elment,arr)=>{
					let flag=false;
					for(let i=0;i<arr.length;i++){
						if(arr[i].color==elment.color&&arr[i].size==elment.size){
							flag=true;
							break;
						}
					}
					return flag;
				}
				// 判断商品是否在列表里面
				const goodContains=(elment,arr)=>{
					let flag=false;
					for(let i=0;i<arr.length;i++){
						if(arr[i].goodName==elment.goodName&&arr[i].id==elment.id){
							flag=true;
							break;
						}
					}
					return flag;
				}
				// 商品点击
				const goodClickFun=async ()=>{
					
				}
				onMounted(async ()=>{
					await getGoodsFun();
				});
				return {
					list1,
					selectedIndex,
					list3,
					bottomGoodList,
					tabClick,
					getGoodsFun,
					goodClickFun
				}
		},
	}
</script>

<style>
</style>
