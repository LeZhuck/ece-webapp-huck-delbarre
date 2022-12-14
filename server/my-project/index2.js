const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.set('port', 8080)
const url = require('url')
const qs = require('querystring')
const JSONContent = require('./content/about.json')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(
    app.get('port'),
    () => console.log(`server listening on ${app.get('port')}`)
)

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


let db = {
    articles: [
        {
            id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
            title: 'My article',
            content: 'Content of the article.',
            date: '04/10/2022',
            author: 'Liz Gringer'
        },
        {
            id: '6ec0bd7f-11c0-43da-975e-2a8ad95bae5b',
            title: 'My article',
            content: 'Content of the article.',
            date: '04/10/2022',
            author: 'Liz mel'
        },
        // ...
    ],
    comments: [
        {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            timestamp: 1664835049,
            content: 'Content of the yeahhh.',
            articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
            author: 'Bob McLaren'
        },
        {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb7d',
            timestamp: 1664835049,
            content: 'Content of the comment.',
            articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae5b',
            author: 'Bob McLaren'
        },
        // ...
    ]
}

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

app.get(
    '/articles',
    function (req, res) {
        res.status(200).json(db.articles)
    }
)

app.get('/articles/:id', (req, res) => {

    const searchId = req.params.id;
    const article = db.articles.find( article => article.id === searchId)
    res.status(200).json(article)

})

app.get('/articles/:articleId/comments', (req, res) => {

    const searchId = req.params.articleId;
    const comm_article = db.comments.find( comm_article => comm_article.articleId === searchId)
    res.status(200).json(comm_article)

})

app.get('/articles/:articleId/comments/:commentId', (req, res) => {

    const searchId = req.params.articleId;
    const commentid = req.params.commentId;
    const comm_article = db.comments.find( comm_article => comm_article.articleId === searchId && comm_article.id ===commentid)
    res.status(200).json(comm_article)

})

// To test the POST methode on POSTMAN:
//  - select the POST methode and insert URL: http://localhost:8080/articles
//  - then go into the "body" parameter section and select x-www-form-urlencoded
//  - insert key value format that you want
//  -  once done press send

app.post( '/articles',  function (req, res) {
        console.log(req.body)

        Article = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            author: req.body.author,
        }
        db['articles'].push(Article)

        
    }
)
// To test the POST methode on POSTMAN:
//  - select the POST methode and insert URL: http://localhost:8080/articles/:ArticleId/comments
//  - then go into the "body" parameter section and select x-www-form-urlencoded
//  - insert key value format that you want
//  -  once done press send


app.post( '/articles/:articleId/comments',  function (req, res) {
    console.log(req.params)

    const searchId = req.params.articleId
    const article = db.articles.find( article => article.id === searchId)

    Comments = {
        id: req.body.id,
        timestamp: req.body.timestamp,
        content: req.body.content,
        ArticleID: searchId,
        author: req.body.author,
    }
    db['comments'].push(Comments)
    console.log(db.comments)

    
}
)

