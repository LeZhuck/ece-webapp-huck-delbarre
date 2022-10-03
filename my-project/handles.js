const http = require('http')
const url = require('url')
const qs = require('querystring')
const JSONContent = require('./content/about.json')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Clement Bio</title>' +
'    </head>' + 
'    <body>' +
'       <p>Bio de Martin: </p>' +
'       <p>Coucou je suis un étudiant de l\'ECE et j\'aime beaucoup faire des projets perso, j\'irai très loins dans la vie !</p>' +
'    </body>' +
'</html>'

module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        const queryParams = qs.parse(url.parse(req.url).query);
        console.log(queryParams);

        res.setHeader('Content-Type', 'application/json'); 

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (path === '/') {
            res.write('if you want to know more about Clement  type in the url /hello&name=clement else you can just replace it by your name, DON\'T forgot the url: /about');
        } else if (path === '/hello' && 'name' in params){
            if (params['name'] === "clement")
                res.write(content);
            else
                res.write('Hello ' + params['name']);
        }else if(path === '/about'){            
            
            res.end(JSON.stringify(JSONContent));            
            
            console.log(JSONContent);
        }
        else {
            res.write('URL not existing sorry');
            // res.writeHead(404, {"Content-Type": "text/plain"}); NOT WORKING
        }

        res.end();
    }
}