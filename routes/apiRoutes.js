const Workout = require("../models/workout.js");

module.exports = function (app) {
    // Get past workouts
    app.get("/api/workouts", function (req, res) {
        Workout.aggregate([

            // 1. Find all workouts
            { $match: {} },

            // 2. Add the new totalDuration field which is the sum of all exercise durations
            { $addFields: { totalDuration: { $sum: "$exercises.duration" } } }
        ])
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

    // Add an exercise
    app.put("/api/workouts/:id", function (req, res) {
        let exercise = req.body;
        Workout.updateOne(
            { _id: req.params.id },
            { $push: { exercises: exercise } }
        ).then(function (dbWorkout) {
            res.json(dbWorkout);
        });
    });

    // Get all workouts (... this time for stats...?)
    app.get("/api/workouts/range", function (req, res) {
        Workout.aggregate([

            // 1. Find all workouts
            { $match: {} },

            // 2. Add the new totalDuration field which is the sum of all exercise durations
            { $addFields: { totalDuration: { $sum: "$exercises.duration" } } }
        ])
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};
