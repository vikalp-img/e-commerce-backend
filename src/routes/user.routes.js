import express from 'express';
import { addUser, login, logout, userDetails } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { accessTokenRefresh } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/add',addUser);
router.get('/details',protect,userDetails);
router.get('/refresh',accessTokenRefresh);
router.post('/login',login);
router.get('/logout',logout);

export default router;