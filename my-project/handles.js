const http = require('http')
const url = require('url')
const qs = require('querystring')
const JSONContent = require('./content/about.json')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Martin Bio</title>' +
'    </head>' + 
'    <body>' +
'       <p>Bio de Martin: </p>' +
'       <p>Coucou je suis un étudiant de l\'ECE ancien Top 1 Promo (crack)</p>' +
'    </body>' +
'</html>'

module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        const queryParams = qs.parse(url.parse(req.url).query);
        console.log(queryParams);

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (path === '/') {
            res.write('if you want to know more about Martin type in the url /hello&name=martin else you can just replace it by your name, DON\'T forgot the url: /about');
        } else if (path === '/hello' && 'name' in params){
            if (params['name'] === "martin")
                res.write(content);
            else
                res.write('Hello ' + params['name']);
        }else if(path === '/about'){
            res.setHeader('Content-Type', 'application/json');            res.end(JSON.stringify(JSONContent));
            
            //res.write(JSONContent);
            console.log(JSONContent);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
        }

        res.end();
    }
}