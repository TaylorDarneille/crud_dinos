var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
// var fs = require('fs');
// var dinoData = fs.readFileSync('./dinosaurs.json');
// dinoData = JSON.parse(dinoData);


app.set('view engine', 'ejs');
app.use(ejsLayouts);
// tells our app to look for a _method query string in the request URL
app.use(methodOverride('_method'));
// body parser middleware
app.use(express.urlencoded({extended: false}));
// >>>> CONTROLLERS <<<<<<
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

// home route
app.get('/', function(req, res){
	res.send("This is my home route!");
});

// dino index route
// app.get('/dinosaurs', function(req, res){
// 	var nameFilter= req.query.nameFilter;
// 	if(nameFilter){
// 		var filteredData = dinoData.filter(function(dino){
// 			return dino.name.toLowerCase() === nameFilter.toLowerCase();
// 		});
// 		res.render('index', {myDinos: filteredData});
// 	} else {
// 		res.render('index', {myDinos: dinoData});
// 	}
// });

// // dino new route
// app.get('/dinosaurs/new', function(req, res){
// 	res.render('new');
// });

// //dino show route
// app.get('/dinosaurs/:idx', function(req, res){
// 	if(dinoData[req.params.idx-1]){
// 			res.render('show', {dino: dinoData[req.params.idx-1]})
// 	} else {
// 		res.send("Uh Oh! This dino doesn't exist!");
// 	}
// });

// //new dino post route
// app.post('/dinosaurs', function(req, res){
// 	// add new dino to our array
// 	dinoData.push(req.body);
// 	// save new dino to our json file
// 	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
// 	//redirect to the GET /dinosaurs route (index)
// 	res.redirect('/dinosaurs');
// });



app.listen(8000);