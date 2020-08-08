const Database = require('./db');
const createProffy = require('./createProffy');

Database.then((db) => {

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

    classSchedule = [
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

    // createProffy(db, {proffyValue, classValue, classScheduleValue});

});