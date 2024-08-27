import express from 'express'
import { auth } from '../middleware/authentication';
import { getMyNotifications } from '../controllers/notifications';

const NotificationRouter = express.Router()

NotificationRouter.route('/').get(auth,getMyNotifications)
NotificationRouter.route('/send').post()

export default NotificationRouter;