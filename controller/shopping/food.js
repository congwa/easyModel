'use strict';

import {Food as FoodModel, Menu as MenuModel} from '../../models/shopping/food'
import ShopModel from '../../models/shopping/shop'
import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'

class Food extends BaseComponent{
	constructor(){
		super();
		this.defaultData = [{
			name: '热销榜',
			description: '大家喜欢吃，才叫真好吃。', 
			icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
			is_selected: true,
			type: 1,
			foods: [],
		}, {
			name: '优惠',
			description: '美味又实惠, 大家快来抢!', 
			icon_url: "4735c4342691749b8e1a531149a46117jpeg",
			type: 1,
			foods: [],
		}]
		this.initData = this.initData.bind(this);
		this.addFood = this.addFood.bind(this);
		this.getCategory = this.getCategory.bind(this);
		this.addCategory = this.addCategory.bind(this);
	}
	async initData(restaurant_id){
		for (let i = 0; i < this.defaultData.length; i++) {
			let category_id;
			try{
				category_id = '1';
			}catch(err){
				console.log('获取category_id失败');
				throw new Error(err);
			}
			const defaultData = this.defaultData[i];
			const Category = {...defaultData, id: category_id, restaurant_id};
			const newFood = new MenuModel(Category);
			try{
				await newFood.save();
				console.log('初始化食品数据成功');
			}catch(err){
				console.log('初始化食品数据失败');
				throw new Error(err);
			}
		}
	}
	async getCategory(req, res, next){
		const restaurant_id = req.params.restaurant_id;
		try{
			const category_list = await MenuModel.find({restaurant_id});
			res.send({
				status: 1,
				category_list,
			})
		}catch(err){
			console.log('获取餐馆食品种类失败');
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取数据失败'
			})
		}
	}
	//http://127.0.0.1:8001/shopping/addcategory?name='吃的'&description="asdgdgdgdgdgdgdgdgdgdgdgdg"&restaurant_id=1
	async addCategory(req, res, next){
		console.log(req,res);
		var query = req.query;
		const foodObj = {
			name: query.name,
			description: query.description, 
			icon_url: query.restaurant_id,
			is_selected: true,
			type: 1,
			foods: []
		}
		const newFood = new MenuModel(foodObj);
		try{
			await newFood.save();
			res.send({
				status: 1,
				success: '添加食品种类成功',
			})
		}catch(err){
			console.log('保存数据失败');
			res.send({
				status: 0,
				type: 'ERROR_IN_SAVE_DATA',
				message: '保存数据失败',
			})
		}
	}
	
}

export default new Food()