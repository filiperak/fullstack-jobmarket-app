import express from 'express'
import { register, getAllUsers, getUser } from '../controllers/users';
const UserRouter = express.Router()
UserRouter.route('/register').post(register)

//for development
UserRouter.route('/all').get(getAllUsers)
UserRouter.route('/:id').get(getUser)

export default UserRouter;