const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
];

const weekdays = [
"Segunda Feira",
"Terça Feira",
"Quarta Feira",
"Quinta Feira",
"Sexta Feira",
"Sábado",
"Domingo",
];

function getSubject(subjectNumber){
    return subjects[subjectNumber-1];
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":");

    return Number((hour * 60) + minutes);
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
};