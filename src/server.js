const proffys = [
    {
        name: "Jairo Dias",
        avatar: "https://avatars1.githubusercontent.com/u/51006591?s=60&v=4",
        whatsapp: "646684648466",
        bio: "Desenvolvedor, apaixonado por tecnologia, ando desbravando tudo aquilo que o mercado tem de novo, melhorando meus aspectos negativo e aprimorando os positivos. ",
        subject: "Desenvolvedor",
        cost: "20",
        weekday: [0,2],
        time_from: [780],
        time_to: [1880]
    }
]

function pageLanding(request, response){
    response.render("index.html")
}

function pageStudy(request, response){
    response.render("study.html", { proffys })
}

function pageGiveClasses(request, response){
    response.render("give-classes.html")
}

const express = require('express');
const server = express();

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

server
.use(express.static("public"))
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.listen(5500);