import mongoose from 'mongoose';

const accountModel = new mongoose.Schema({
  agencia: {
    required: true,
    type: Number
  },
  conta: {
    required: true,
    type: Number
  },
  name: {
    required: true,
    type: String
  },
  balance: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return value >= 0;
      }
    }
  }
});

export const Account = mongoose.model('account', accountModel);