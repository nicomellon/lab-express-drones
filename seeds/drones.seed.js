// Iteration #1
const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");
const MONGO_URI =
  "mongodb+srv://nico:NydPTjv8voDT7lEN@cluster0.d3xqw.mongodb.net/drones-lab?authSource=admin&replicaSet=atlas-n7pdge-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true";

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Drone.create(drones);
  })
  .then((newEntries) => {
    console.log(newEntries);
    mongoose.disconnect();
    console.log("disconnected");
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
