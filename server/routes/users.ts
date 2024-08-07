import express from 'express'
const UserRouter = express.Router()
UserRouter.route('/login').get()

export default UserRouter;