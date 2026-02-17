// routes/customCardRoutes.js - API routes for custom sound cards
const express = require('express');
const router = express.Router();
const CustomCard = require('../models/CustomCard');

// Get all custom cards for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const cards = await CustomCard.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all public cards
router.get('/public', async (req, res) => {
    try {
        const cards = await CustomCard.find({ isPublic: true }).sort({ usageCount: -1 });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new custom card
router.post('/', async (req, res) => {
    try {
        const card = new CustomCard(req.body);
        await card.save();
        res.status(201).json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a custom card
router.patch('/:id', async (req, res) => {
    try {
        const card = await CustomCard.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        res.json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Increment usage count
router.post('/:id/use', async (req, res) => {
    try {
        const card = await CustomCard.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        card.usageCount++;
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a custom card
router.delete('/:id', async (req, res) => {
    try {
        const card = await CustomCard.findByIdAndDelete(req.params.id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
