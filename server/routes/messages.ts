import express from 'express'
import { getMessages } from '../controllers/messages';

const MessageRouter = express.Router()

MessageRouter.route('/:userId/:receiverId').get(getMessages)

export default MessageRouter;