'use strict';

import express from 'express';

import Food from '../controller/shopping/food'


const router = express.Router();


router.get('/addcategory', Food.addCategory);

Food.initData();


export default router