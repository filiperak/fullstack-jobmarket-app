import express from 'express'

const ConversationRouter = express.Router()

ConversationRouter.route('/').get()
ConversationRouter.route('/').post()
ConversationRouter.route('/').patch()

export default ConversationRouter