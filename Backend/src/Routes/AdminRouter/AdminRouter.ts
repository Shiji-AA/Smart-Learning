import express from 'express';
const adminRouter =express.Router();

import {adminLogin} from '../../Controller/AdminController/AdminController';
import { getAllCategory } from '../../Controller/AdminController/AdminController';
import addCategory from '../../Controller/AdminController/AdminAddCategory';

adminRouter.post('/admin',adminLogin)
adminRouter.post('/addcategory',addCategory);
adminRouter.get('/getallcategory',getAllCategory);



export default adminRouter;
