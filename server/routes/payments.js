const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Called by your frontend to initiate a payment
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stripe webhook — confirms payment server-side
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'payment_intent.succeeded') {
      // handle successful payment
    }
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook error: ${err.message}`);
  }
});

module.exports = router;