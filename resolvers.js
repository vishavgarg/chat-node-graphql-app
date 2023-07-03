const User = require('./models/User');
const Message = require('./models/Message');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: async () => {
      return await User.query();
    },
    messages: async () => {
      return await Message.query();
    },
  },
  Mutation: {
    addUser: async (_, { name }) => {
      return await User.query().insert({ name });
    },
    addMessage: async (_, { sender_id, receiver_id, text }) => {
      const message = await Message.query().insert({ sender_id, receiver_id, text });

      pubsub.publish('messageAdded', { messageAdded: message });

      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['messageAdded']),
    },
  },
  User: {
    messagesSent: async (user) => {
      return await user.$relatedQuery('messagesSent');
    },
    messagesReceived: async (user) => {
      return await user.$relatedQuery('messagesReceived');
    },
  },
  Message: {
    sender: async (message) => {
      return await message.$relatedQuery('sender');
    },
    receiver: async (message) => {
      return await message.$relatedQuery('receiver');
    },
  },
};

module.exports = resolvers;
