---
Authors: Clément DELBARRE, Martin HUCK
title: "ECE WEB APP"
version: 1.0.0
---


# Lab: First Node js & Git project 

## Introduction

Le but de ce TP est de se familiariser avec l'utilisation de git, mais également d'utiliser des langages de programmation JSON, HTML et Javascript pour des application sur des serveurs HTTP dans le cadre de ce TP.

## Éléments techniques 

### Créer un serveur HTTP

Tout d'abord nous avons pu créer un serveur HTTP grâce aux lignes de commandes suivante en Javascript : 

```javascript
// Import a module
const http = require('http')
// Declare an http server
http.createServer(function (req, res) {
  // Write a response header
  res.writeHead(200, {'Content-Type': 'text/plain'});
  // Write a response content
  res.end('Hello World\n');
// Start the server
}).listen(8080)
```

Nous pouvons nous connecter au serveur HTTP créé localement sur "localhost:8080" avec l'identifiant 8080. Nous allons à présent pouvoir coder plusieurs instructions en Javascript et HTML et voir les résultats sur notre page web locale. 

### Afficher du code HTML

Pour afficher du contenu HTML à parti d'un code javascript, nous pouvons créer une constante prenant la valeur de code en HTML. Cette valeur est appelé en paramètre de la fonction res.write(content) qui saura reconnaître du code HTML grâce au Content-Type "text/html" déclaré juste avant. L'ensemble de ces fonctions sont appelés dans un callback.

```javascript
// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'
const serverHandle = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
```

### Basic routing example 

À partir d'un URL, il est possible de récupérer des valeurs qui permettent à l'ordinateur de savoir quoi afficher. 
Dans notre exemple, nous voulons mettre en paramètre de l'url un nom : 

```
http://localhost:8080/hello?name=John
```

Pour pouvoir récupérer cette valeur nous utilisons la fonction :
``` javascript
const route = url.parse(req.url)
const path = route.pathname 
const params = qs.parse(route.query)
```

La méthode url.parse() prend une chaîne d'URL, l'analyse et renvoie un objet URL avec chaque partie de l'adresse comme propriété. On peut donc obtenir à partir de la constante "routeur" le chemin de l'URL et les paramètres de celui-ci. Nous pouvons ainsi faire des conditions sur les constantes définis pour afficher des informations spécifique:
``` javascript
if (path === '/hello' && 'name' in params) {
    res.write('Hello ' + params['name'])
  } else {
    res.write('Hello anonymous')
  }
```

### Create a basic application with multiple routes (hard level)

À partir des notions précédentes, nous pouvons à présent créer une application avec plusieurs affichages en fonctions de l'URL entré. 

``` javascript
module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        const queryParams = qs.parse(url.parse(req.url).query);
        console.log(queryParams);

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (path === '/') {
            res.write('if you want to know more about Clement  type in the url /hello&name=martin else you can just replace it by your name, DON\'T forgot the url: /about');
        } else if (path === '/hello' && 'name' in params){
            if (params['name'] === "clement")
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
```

# Contributeurs
1. Martin HUCK: martin.huck@edu.ece.fr
2. Clément DELBARRE: clement.delbarre@edu.ece.fr