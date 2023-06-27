const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    externalId: Number,
    maxActions: Number,
    date: Date,
    actionAllowed: Number,

  }
   
);

const Action = mongoose.model('action', actionSchema, 'actions');

module.exports = Action;
