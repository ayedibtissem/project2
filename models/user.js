const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  attempts: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  score: { type: Number, required: true },
  attempts: [attemptSchema],
});

;


module.exports = mongoose.model('user', userSchema);
