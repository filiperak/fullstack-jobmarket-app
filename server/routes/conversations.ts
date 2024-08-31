import express from 'express'
import { auth } from '../middleware/authentication'
import { createConversation, getMyConversations } from '../controllers/conversations'

const ConversationRouter = express.Router()

ConversationRouter.route('/').get(auth,getMyConversations)
ConversationRouter.route('/').post(auth,createConversation)
ConversationRouter.route('/').patch()

export default ConversationRouter