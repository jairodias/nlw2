const Database = require('./db');
const createProffy = require('./createProffy');

Database.then( async (db) => {

    proffyValue = {
        name: 'Jairo Dias',
        avatar: 'https://avatars0.githubusercontent.com/u/51006591?s=460&u=b307f14b724b3869b1d91bf0bd350736885065a4&v=4',
        whatsapp: '8989898989',
        bio: 'Software Developer'
    };

    classValue = {
        subject: "Desenvolvedor",
        cost: "20",
    };

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 780,
            time_to: 880
        },
        {
            weekday: 0,
            time_from: 980,
            time_to: 780
        }
    ];

    // await createProffy(db, {proffyValue, classValue, classScheduleValues});

    const selectedProffys = await db.all("SELECT * FROM proffys");
    

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes on (proffys.id = classes.proffy_id)
        WHERE classes.proffy_id = 1;
    `);

    const selectedClassesSchedules = await db.all(`
        SELECT classes_schedule.*
        FROM classes_schedule
        WHERE classes_schedule.class_id = "1"
        AND classes_schedule.weekday = "0"
        AND classes_schedule.time_from <= "2000"
        AND classes_schedule.time_to > "600";
    `);

    console.log(selectedClassesSchedules);

});