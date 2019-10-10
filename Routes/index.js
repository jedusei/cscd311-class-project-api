const
    { Router } = require('express'),
    Students = require('../Models/Student'),
    Halls = require('../Models/Hall'),
    Rooms = require('../Models/Room'),
    reset = require('../Utils/ResetDatabase');

let router = new Router();

// Special route that prompts the server to fill the database with halls and rooms
router.get('/reset', async (req, res) => {
    await reset();
    res.send("Done!");
})

// Get a student by ID (and PIN)
router.get('/student', async (req, res) => {
    let student = await Students.findById(req.query.studentID);
    if (!student)
        res.send("wrong_id");
    else {
        if (student.pin != req.query.pin)
            res.send("wrong_pin");
        else {
            let data = { id: student._id, name: student.name };
            if (student.hall) { // Student has a room
                data.hall = (await Halls.findById(student.hall)).name;
                data.room = (await Rooms.findById(student.room)).name;
            }
            res.json(data);
        }
    }
})

// Get all the halls in the database
router.get('/halls', async (req, res) => {
    res.json(await Halls.find({}, { name: 1 }, { sort: { name: 1 } }));
})

// Get a list of all halls and their respective rooms
router.get('/halls/rooms', async (req, res) => {
    const results = [];
    let halls = await Halls.find({}, { name: 1 }, { sort: { name: 1 } });
    for (let i = 0; i < halls.length; i++) {
        const hall = halls[i];
        let entry = { name: hall.name, rooms: [] };
        let rooms = await Rooms.find({ hall: hall.id }, {}, { sort: { name: 1 } });
        for (let j = 0; j < rooms.length; j++) {
            const room = rooms[j];
            const members = [];
            for (let k = 0; k < room.members.length; k++) {
                let student = await Students.findById(room.members[k]);
                members.push(student.name);
            }
            entry.rooms.push({ name: room.name, members });
        }
        results.push(entry);
    }
    res.json(results);
})

router.get('/rooms/available', async (req, res) => {
    let rooms = await Rooms.find(
        { hall: req.query.hall, "members.3": { $exists: false } },
        { name: 1 },
        { sort: { name: 1 } }
    )
    res.json(rooms);
})

router.post('/apply', async (req, res) => {
    let student = await Students.findById(req.body.studentID);
    if (!student)
        res.sendStatus(404);
    else if (student.hall)  // Student already registered
        res.sendStatus(403);
    else {
        let room = await Rooms.findById(req.body.room);
        if (!room)
            res.sendStatus(400);
        else {
            room.members.push(student._id);
            await room.save();
            student.hall = room.hall; // ID of the hall
            student.room = room._id; // ID of the room
            await student.save();
            res.sendStatus(200);
        }
    }
})

module.exports = router;