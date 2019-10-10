const
    Student = require("../Models/Student"),
    Hall = require("../Models/Hall"),
    Room = require("../Models/Room");

let students = [
    { name: "Joseph Edusei", _id: 10681279, pin: 12345 },
    { name: "Kylie Jenner", _id: 12345678, pin: 12345 },
    { name: "Travis Scott", _id: 11223344, pin: 12345 },
    { name: "Kim Kardashian", _id: 10000000, pin: 12345 },
    { name: "Lionel Messi", _id: 11111111, pin: 12345 },
    { name: "Cristiano Ronaldo", _id: 22222222, pin: 12345 },
    { name: "Oprah Winfrey", _id: 33333333, pin: 12345 },
    { name: "Michelle Obama", _id: 44444444, pin: 12345 },
    { name: "John Mahama", _id: 55555555, pin: 12345 },
    { name: "Nana Akuffo-Addo", _id: 66666666, pin: 12345 }
]

let halls = [
    "Commonwealth", "Akuafo", "Volta", "Legon", "Mensah Sarbah",
    "Hilla Limann", "Jean Nelson", "Alexander Kwapong", "Elizabeth Sey"
];
let roomLetters = ["A", "B", "C", "D"];

async function clearDatabase() {
    try {
        await Student.collection.drop();
        await Hall.collection.drop();
        await Room.collection.drop();
    }
    catch (err) { }
}

async function initStudents() {
    for (let i = 0; i < students.length; i++) {
        let s = new Student(students[i]);
        await s.save();
    }
}

async function initHalls() {
    for (let i = 0; i < halls.length; i++) {
        let hall = new Hall({ name: halls[i] });
        await hall.save();
        for (let i = 0; i < 20; i++) {
            let name = roomLetters[i % 4] + ((i % 5) + 1);
            let room = new Room({ name, hall: hall.id });
            await room.save();
        }
    }
}

module.exports = async () => {
    await clearDatabase();
    await initStudents();
    await initHalls();
}