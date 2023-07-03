const { Model } = require('objection');

class Message extends Model {
  static get tableName() {
    return 'messages';
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.sender_id',
          to: 'users.id',
        },
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.receiver_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Message;
