
import express from 'express';
const router = express.Router();
import { loginStudent } from '../../Controller/StudentController/StudentController';

router.post('/login', loginStudent);

export default router;

