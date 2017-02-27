let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 80;
let files = {
	html: fs.readFileSync(path.join(__dirname, '/index.html')).toString(),
	css: fs.readFileSync(path.join(__dirname, '/index.css')).toString()
}
let light = false, user = 'naeem', pass = 'ictmbstu';
let html = e => `
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="theme-color" content="#F9BF3B">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>Light Switch</title>
	<style>${files.css}</style>
</head>
<body>
<script>var LIGHT = ${ light ? 'true' : 'false' };</script>
${files.html}
</body>
</html>
`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send(html());
	// console.log(req);
});

app.get('/user', (req, res) => {
	res.send(html());
	// console.log(req);
});

app.get('/arduino', (req, res) => {
	res.send(`{ "light": "${ light ? 'on' : 'off' }" }`);
	// res.send(light ? '1' : '0');
	// console.log(`Light: `, req);
});

app.post('/user', (req, res) => {
	// console.log('user: ', req.body);
	if(req.body.user == user && req.body.pass == pass) {
		console.log('Switching!');
		light = !(light);
		res.send(`<h1>Switched ${ light ? 'on' : 'off' }!</h1>`);
	} else {
		res.send(`<h1>Wrong Username and/or Password!<br>Go back and try again.</h1>`);
	}
});

let server = app.listen(port, () => {
	console.log(`Serving on port ${port} ...`);
});