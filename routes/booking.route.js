const express = require('express');
const bookingRouter = express.Router();
const { bookingModel } = require('../models/booking.model');

// Book a flight
bookingRouter.post('/booking', async (req, res) => {
  try {
    const newBooking = await bookingModel.create(req.body);
    res.status(201).send(newBooking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

bookingRouter.get('/dashboard', async (req, res) => {
    try {
      const bookings = await bookingModel.find().populate({ path: 'user flight' });
      res.status(200).send(bookings);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  bookingRouter.patch('/dashboard/:id', async (req, res) => {
    try {
      const updatedBooking = await bookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBooking) {
        return res.status(404).send({ message: 'Booking not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  
  bookingRouter.delete('/dashboard/:id', async (req, res) => {
    try {
      const deletedBooking = await bookingModel.findByIdAndDelete(req.params.id);
      if (!deletedBooking) {
        return res.status(404).send({ message: 'Booking not found' });
      }
      res.status(202).end();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

module.exports = {bookingRouter};
