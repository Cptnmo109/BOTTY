const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, default: null },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
