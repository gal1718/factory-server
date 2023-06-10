const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    
    _id: Schema.Types.ObjectId,
    externalId: Number,
    fullName: String,
    NumOfActions: Number
  },
  { id: false },
  { versionKey: false },
   
  
);

const User = mongoose.model('user', userSchema, 'users');

module.exports = User;
