const Database = require('./database/db');
const { getSubject, weekdays, subjects, convertHoursToMinutes } = require('./Utils/format');

function pageLanding(request, response){
    response.render("index.html")
}

async function pageStudy(request, response){
    const filters =  request.query;

    if(!filters.subject || !filters.weekday || !filters.time){
        return response.render("study.html", { filters, subjects, weekdays })
    }

    const timeToMinutes = convertHoursToMinutes(filters.time);

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes on (proffys.id = classes.proffy_id)
        WHERE EXISTS (
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = classes.id
            AND classes_schedule.weekday = '${filters.weekday}'
            AND classes_schedule.time_from <= '${timeToMinutes}'
            AND classes_schedule.time_to > '${timeToMinutes}'
        )
        AND classes.subject = '${filters.subject}'
    `;

    try {
        const db = await Database;
        const proffys = await db.all(query);

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        })
        return response.render("study.html", { proffys, filters, subjects, weekdays })
    } catch (error) {
        console.log(error);
    }
    
}

function pageGiveClasses(request, response){
    return response.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(request, response){
    const createProffy = require('./database/createProffy');

    const proffyValue = {
        name: request.body.name,
        avatar: request.body.avatar,
        whatsapp: request.body.whatsapp,
        bio: request.body.bio
    }

    const classValue = {
        subject: request.body.subject,
        cost: request.body.cost
    }

    const classScheduleValues = request.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(request.body.time_from[index]),
            time_to: convertHoursToMinutes(request.body.time_to[index])
        }
    });

    try {

        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classScheduleValues });

        let queryString = "?subject=" + request.body.subject;
        queryString += "&weekday=" + request.body.weekday[0];
        queryString += "&time=" + request.body.time_from[0];

        return response.redirect("/study" + queryString);

    } catch (error) {
        console.log(error);
    }      
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}