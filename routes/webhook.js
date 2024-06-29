const express = require('express');
const router = express.Router();
const Webhook = require('../models/Webhook');
const axios = require('axios');

// Webhook endpoint to receive data
router.post('/check', async (req, res) => {
    try {
        res.status(201).send('Webhook received and saved');
    } catch (error) {
        res.status(500).send('Error saving webhook data');
    }
});

// Subscribe to webhook
router.post('/subscribe', async (req, res) => {
    const { targetUrl } = req.body;

    if (!targetUrl) {
        return res.status(400).json({ error: 'targetUrl is required' });
    }

    try {
        const newWebhook = new Webhook({ targetUrl });
        await newWebhook.save();
        res.status(201).json({ id: newWebhook._id, message: 'Subscription successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error subscribing to webhook' });
    }
});

// Unsubscribe from webhook
router.post('/unsubscribe', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }

    try {
        await Webhook.findByIdAndDelete(id);
        res.status(200).json({ message: 'Unsubscription successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error unsubscribing from webhook' });
    }
});


// Example data to be sent in the webhook
const data = { message: 'This is a test event' };

router.get('/trigger', async (req, res) => {
    try {
        const webhooks = await Webhook.find();

        webhooks.forEach(async (webhook) => {
            try {
                await axios.post(webhook.targetUrl, data);
                console.log(`Event sent to ${webhook.targetUrl}`);
            } catch (error) {
                console.error(`Error sending event to ${webhook.targetUrl}:`, error.message);
            }
        });

        res.status(200).json({ message: 'Event triggered to all webhooks' });
    } catch (error) {
        console.error('Error fetching webhooks:', error.message);
        res.status(500).json({ error: 'Error fetching webhooks' });
    }
});



module.exports = router;
