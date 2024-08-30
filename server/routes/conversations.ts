import express from 'express'
import { auth } from '../middleware/authentication'
import { createConversation } from '../controllers/conversations'

const ConversationRouter = express.Router()

ConversationRouter.route('/').get()
ConversationRouter.route('/').post(auth,createConversation)
ConversationRouter.route('/').patch()

export default ConversationRouter