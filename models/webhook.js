const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
    targetUrl: {
        type: String,
        required: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Webhook', webhookSchema);
