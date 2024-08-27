import express from 'express'

const NotificationRouter = express.Router()

NotificationRouter.route('/:reciverId').get()
NotificationRouter.route('/send').post()

export default NotificationRouter;