import express from 'express'
const UserRouter = express.Router()
UserRouter.route('/').get().post()

export default UserRouter;