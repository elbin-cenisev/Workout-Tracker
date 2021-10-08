const Workout = require("../models/workout.js");

module.exports = function (app) {
    // Get past workouts
    app.get("/api/workouts", function (req, res) {
        Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    // Create new workout
    app.post("/api/workouts", function (req, res) {
        Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};
