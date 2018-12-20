// import express
var express = require('express');

// set up express Router
var router = express.Router();

// bring in dinoData
var fs = require('fs');
var dinoData = fs.readFileSync('./dinosaurs.json');
dinoData = JSON.parse(dinoData);

// >>>>> ROUTES <<<<<<<<
// dino index route
router.get('/', function(req, res){
	var nameFilter= req.query.nameFilter;
	if(nameFilter){
		var filteredData = dinoData.filter(function(dino){
			return dino.name.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('dinosaurs/index', {myDinos: filteredData});
	} else {
		res.render('dinosaurs/index', {myDinos: dinoData});
	}
});

// dino new route
router.get('/new', function(req, res){
	res.render('dinosaurs/new');
});

router.get('/edit/:idx', function(req, res){
	res.render('dinosaurs/edit', {dinoToEdit: dinoData[req.params.idx], dinoId: req.params.idx});
});

//dino show router
router.get('/:idx', function(req, res){
	if(dinoData[req.params.idx-1]){
			res.render('dinosaurs/show', {dino: dinoData[req.params.idx-1]})
	} else {
		res.send("Uh Oh! This dino doesn't exist!");
	}
});

//new dino post route
router.post('/', function(req, res){
	// add new dino to our array
	dinoData.push(req.body);
	// save new dino to our json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	//redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs');
});

router.delete('/:idx', function(req, res){
	// remove the dinosaur from the dinoData array
	dinoData.splice(req.params.idx, 1);

	// save the new dinoData array to the json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

	// after deleting the dinosaur, redirect back to the index page
	res.redirect('/dinosaurs');
});

router.put('/:idx', function(req, res){
	// edit the dinosaur in my dinoData array
	dinoData[req.params.idx].name = req.body.name;
	dinoData[req.params.idx].type = req.body.type;
	// update my json file with my editted dinoData array
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	//redirect to index of dinosarus
	res.redirect('/dinosaurs');
});

// tell node to export router object
module.exports = router;


