const express = require('express')
const app = express()

app.set('port', 8080)

app.listen(
    app.get('port'),
    () => console.log(`server listening on ${app.get('port')}`)
)
const url = require('url')
const qs = require('querystring')
const JSONContent = require('./content/about.json')


const content = '<!DOCTYPE html>' +
    '<html>' +
    '    <head>' +
    '        <meta charset="utf-8" />' +
    '        <title>TinmarBio</title>' +
    '    </head>' +
    '    <body>' +
    '       <p>Bio de Clement: </p>' +
    '       <p>Coucou je suis un étudiant de l\'ECE et j\'aime beaucoup faire des projets perso, j\'irai très loins dans la vie !</p>' +
    '    </body>' +
    '</html>'

app.get(
    '/hello/:name',
    function (req, res) {
        res.send(content)
    }
)

app.get(
    '/',
    function (req, res) {
        res.send("if you want to know more about Clement  type in the url /hello/clement else you can just replace it by your name, DON\'T forgot the url: /about");
    }
)

app.get(
    '/about',
    function (req, res) {
        res.send(JSON.stringify(JSONContent))
    }
)


