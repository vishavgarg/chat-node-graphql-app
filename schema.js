const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    messagesSent: [Message!]!
    messagesReceived: [Message!]!
  }

  type Message {
    id: ID!
    sender: User!
    receiver: User!
    text: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    messages: [Message!]!
  }

  type Mutation {
    addUser(name: String!): User!
    addMessage(sender_id: ID!, receiver_id: ID!, text: String!): Message!
  }

  type Subscription {
    messageAdded: Message!
  }
`;

module.exports = typeDefs;
