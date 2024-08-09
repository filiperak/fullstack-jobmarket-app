import express from 'express'
import { register, getAllUsers, getUser,login } from '../controllers/users';
const UserRouter = express.Router()
UserRouter.route('/register').post(register)
UserRouter.route('/login').post(login)

//for development
UserRouter.route('/all').get(getAllUsers)
UserRouter.route('/:id').get(getUser)

export default UserRouter;