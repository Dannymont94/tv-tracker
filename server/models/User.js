const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const showSchema = require('./Show');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[\S]+/
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    completed: [showSchema],
    interested: [showSchema],
    watching: [showSchema],
    // ratings: [Rating.schema],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('completedCount').get(function () {
  return this.completed.length;
});

userSchema.virtual('interestedCount').get(function () {
  return this.interested.length;
});

userSchema.virtual('watchingCount').get(function () {
  return this.watching.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;