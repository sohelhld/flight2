const express = require('express');
const { flightModel } = require('../models/flight.model');
const flightRouter = express.Router();

// Get all available flights
flightRouter.get('/flights', async (req, res) => {
  try {
    const flights = await flightModel.find();
    res.status(200).send(flights);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

flightRouter.get('/flights/:id', async (req, res) => {
    try {
      const flight = await flightModel.findById(req.params.id);
      if (!flight) {
        return res.status(404).send({ message: 'Flight not found' });
      }
      res.status(200).send(flight);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  flightRouter.post('/flights', async (req, res) => {
    try {
      const newFlight = await flightModel.create(req.body);
      res.status(201).send(newFlight);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  flightRouter.put('/flights/:id', async (req, res) => {
    try {
      const updatedFlight = await flightModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedFlight) {
        return res.status(404).send({ message: 'Flight not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  flightRouter.delete('/flights/:id', async (req, res) => {
    try {
      const deletedFlight = await flightModel.findByIdAndDelete(req.params.id);
      if (!deletedFlight) {
        return res.status(404).send({ message: 'Flight not found' });
      }
      res.status(202).end();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

module.exports = {flightRouter};
