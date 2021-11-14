const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const dronesInDb = await Drone.find();
    res.render("drones/list", { dronesInDb });
  } catch (err) {
    console.error(err);
  }
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const { name, propellers, maxSpeed } = req.body;
    const newCreatedDrone = await Drone.create({ name, propellers, maxSpeed });
    console.log(newCreatedDrone);

    const dronesInDb = await Drone.find();
    res.render("drones/list", { dronesInDb });
  } catch (err) {
    console.error(err);
    res.render("drones/create-form");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  const droneToEdit = await Drone.findById(req.params.id);
  res.render("drones/update-form", droneToEdit);
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { name, propellers, maxSpeed } = req.body;
    const newUpdatedDrone = await Drone.findByIdAndUpdate(req.params.id, {
      name,
      propellers,
      maxSpeed,
    });
    console.log(newUpdatedDrone);

    const dronesInDb = await Drone.find();
    res.render("drones/list", { dronesInDb });
  } catch (err) {
    console.error(err);
    res.render("drones/update-form");
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    await Drone.findByIdAndDelete(req.params.id);
    const dronesInDb = await Drone.find();
    res.render("drones/list", { dronesInDb });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
