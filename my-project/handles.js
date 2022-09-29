const http = require('http')
const url = require('url')
const qs = require('querystring')


module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        const queryParams = qs.parse(url.parse(req.url).query);
        console.log(queryParams);

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (path === '/hello' && 'name' in params) {
            res.write('Hello ' + params['name'])
        } else {
            res.write('Hello anonymous')
        }

        res.end();
    }
}