### Deploy on DO - connection refused issues
![Alt text](https://cloud.githubusercontent.com/assets/16150075/23662841/10aeaeaa-0351-11e7-8711-a622bbef9fa8.PNG "Optional Title")


# JavaScriptExpressTest_Pd02
JavaScript Period 2 - Express, REST and Test

#### Why would you consider a Scripting Language as JavaScript as your Backend Platform.
* It supports asynchronous execution through either promises or callbacks.
* Common Language, better team efficiency with less resources - there is no such thing as gap between front and back end that occurs when two teams are working separately using different technologies.
* Extensive code reuse - With full stack JavaScript, you save time through code reuse and sharing. Following the “don’t repeat yourself” (DRY) principle, you might be able to reduce the effort by reusing the parts of the code (or sharing libraries, templates, and models) on both back and front end that are very close in terms of logic and implementation.
* High Performance and Speed - Node.js uses event-driven, non-blocking IO model that makes it lightweight and fast as compared to other commonly used back end technologies.
* Extensive Knowledge Base - JavaScript has a powerful and fast-growing community.
* Free, open source toolset - Most of the full stack JavaScript development tools are free or open source projects.

#### Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using for example Java/JAX-RS/Tomcat
##### PROS:
* Same language in both frontend and backend
* Unified data format: JSON.
* Not having to deal with threads because of node.js non-blocking event queue.
* Speed. Node.js is often faster than the Java, JAX-RS, Tomcat stack.
* Fairly new technology, so other cool technologies such as websockets are easy to implement.
* Scalability.
* NPM

##### CONS:
* Insufficiency with computation-heavy back end - When it comes to heavy computation and data processing on the server side, Node.js is not the best option. There are lots of far better technologies to handle projects like machine learning, algorithms, or heavy mathematical calculations. Having a single CPU core and only one thread, that processes one request at a time, it might be easily blocked by a single computational intensive task. 
* Relatively young technologies - When compared with PHP or Java, server side JavaScript has been around for a shorter period of time. This results in a smaller knowledge base and limited integration capabilities. 
* Jack of all trades, master of none? - It is a common belief that a developer can truly master only one area of knowledge. With every other skill gained the quality of his/her expertise will decline. While syntax and grammar of JavaScript are mostly the same on client and server side, there are still many details to consider. Aside from being proficient in front end development, full stack JavaScript developers need to have an expertise in back end programming, such as HTTP protocol, asynchronous I/O, data storage fundamentals, cookies, etc. That is why some say that there are really no full stack developers: Every one of them is either front or back end oriented. However, we have all the reasons to disagree, based on our own experience and strong JavaScript skills.
* Drawbacks of every separate tool in the stack combined - In order to use the stack, it’s important to realize possible bottlenecks of every tool and adjust your development strategy accordingly.

#### Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.
Since CPU's speed have more or less stopped increasing, the number of cores has increased. By using threads, we could really take advantage of the multi-core system. Since Node.js is single threaded, it is only running on one core. By using the Cluster module, we can spawn a pool of workers, running under a parent Node process. The parent/master process is in charge of initiating and controller workers.
The cluster module lets us create multiple processes that all uses the same server port:
```
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('process ' + process.pid + ' says hello!');
    }).listen(8000);
}
```
#### Explain, using relevant examples, concepts related to the testing a REST-API using Node/JavaScript + relevant packages 
If the tests, so not need to be automated and you just want to see that your REST-API works, you can simply use the request module.

The 'Request' module allows us to make http requests from our node.js application. This can be used to 'test' our RESTful api:

Get:
```
request('http://localhost:3000/api/joke', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
```
Post:
```
request({
        url: "http: //localhost:3000/api/joke",
        method: "POST",
        json: true,
        body: {
            joke: "I'm a joke"
        }
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });
```
However, if we want to make 'real' tests, we have to use mocha and chai.

#### Explain, using relevant examples, the Express concept; middleware.
Alot of the work we're doing on a web server, is happening between the request and respond, for instance processing the http request, and building the appropriate response for that request.

In Express, we use middleware to do just that. Middleware is just code that is being executed between two layers of software. In our case, it's between the request and response.

In Express the middleware functions are given access to the request object, response object and the next middleware function in the application's cycle. We can use middleware to log what type of http methods gets through our server:
```
app.use(function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```
Notice that no URL was given for this middleware, so it will be executed for all incoming requests.

We can use a URL if we want our middleware to only be executed from certain pages. We can for instance make a middleware function that logs at what time someone access the 'secret page' url:
```
app.use('/secretPage',function (req, res, next) {
  console.log('Someone was at the secret page at:', Date.now());
  next();
});
```
It's important to call 'next()', if the middleware is not ending the request-response cycle.

Often we're using third party middleware. We can use 'serve-favicon' to handle the favicon of our site:
```
app.use(favicon(__dirname + '/public/favicon.ico'));
Or we can use middleware to handle routing:

var users = require('./routes/users');
var login = require('./routes/login');

app.use('/users', users);
app.use('/login', login);
```
#### Explain, using relevant examples, how to implement sessions, and the legal implications of doing this.
There are various ways of implementing sessions, but the most used one is by using the module called "express-session". The way it works (on the surface), is by saving a cookie holding the Session ID. When ever a request comes in, the session middleware will look at the session ID found in the cookie, and make the session object available for us.

It can be used like this to check if a user is logged in with a username:
```
var express = require('express');
var session = require("express-session");
var app = express();

//Alot of other middleware stuff is going on here


app.use(session({
    secret: 'secretWordIsSecret',
    saveUninitialized: true,
    resave: true
}));


app.use(function (req, res, next) {
    //Taking the session object from the request object.
    var sess = req.session; 


    //If the session object has a userName, the request is allowed access to the rest of the site and we call next() to go to the next middleware in the express stack.
    if (sess.userName) {
        return next();
    }

    //Else if the requests body has a userName, that means that it's a login attempt, so we will save the username to the session and respond with a redirect to '/' path.
    else if (req.body.userName) {
        sess.userName = req.body.userName;
        return res.redirect('/');
    } 

    //Else the user is not logged in and is not trying to login, so we do not want to give access to the rest of the site so we redirect to the '/login' page.
    else {
         return res.redirect('/login');
    }
});
The express-session module comes with a 'MemoryStore', but in a production environment i'd properbly use something like a seperate mongodb or redis database. This would make it possible to scale up and use multiple node.js servers:

var express = require('express');
var RedisStore = require('connect-redis')(session);

var app = express();

app.use(session({
    store: new RedisStore({
        url: 'redis://redistogo:87b3f59d153dc010dc97257b6a270ae5@tarpon.redistogo.com:10768'
    }),
    secret: 'secretWordIsSecret'
}));
```
Since we're using a cookie to store our Session ID, we will have to let the users know that we're using cookies, why we're using them and how.

#### Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
On 2nd semester, we used a MVC pattern, using servlets, java classes and jsp pages. The servlet(with other controller classes), took the data from our java objects(from db -> mapping to objects -> facade) and put the data into the jsp pages, which was then generated to html and send back to the user.

With node.js server side templating, we're using the same principles but other technologies. We have a view engine that takes some data, and puts it into our views and returns some generated html. Since we're using a view engine, we can easily change which engine to use, and therefore we have more oppotunities. The most used ones are Jade, EJS and Handlebars.

#### Explain, using a relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using for example the Request package.
The 'Request' module allows us to make http requests from our node.js application. This can be used to 'test' our RESTful api:

Get:
```
request('http://localhost:3000/api/joke', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
```
Post:
```
request({
        url: "http: //localhost:3000/api/joke",
        method: "POST",
        json: true,
        body: {
            joke: "I'm a joke"
        }
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });
```
Put:
```
request({
        url: "http: //localhost:3000/api/joke/3",
        method: "PUT",
        json: true,
        body: {
            joke: "I'm an updated joke"
        }
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });
```
Delete:
```
request({
        url: "http: //localhost:3000/api/joke/3",
        method: "Delete",
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });
```
#### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
In 3.sem we used JUnit for testing and this package had it ‘all’, Mocha is the biggest framework for JavaScript backend testing.

Mocha is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test case. Mocha can use any assertion library Assertions, but I will use Chai(uses ‘expect’), the test code is written in behaviour driven development, which should be used for documentation.

Mock (fake) objects are simulated objects that mimic the behavior of real objects in controlled ways. Mock object frameworks allow the programmers to create mocks Automatically from existing code/interfaces.
To test asynchronous code Mocha provides a callback that lets it know when an asynchronous test is complete. By adding a callback to it() Mocha will know that it should wait for completion.

#### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
Nock is an HTTP mocking and expectations library for Node.js. Nock can be used to test modules that perform HTTP requests in isolation (that is without performing a real network operation).
```
var nock = require('nock');
```
Do:
Complete the exercises and use those or your own examples to provide practical examples for the questions above.
