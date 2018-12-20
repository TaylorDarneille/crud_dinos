var express = require('express');
var router = express.Router();
var fs = require('fs');
var phData = fs.readFileSync('./prehistoric_creatures.json');
phData = JSON.parse(phData);

var dataToPass = {
	myCreatures: phData
};

// index route for phc
router.get('/', function(req, res){
	res.render('prehistoric_creatures/index', dataToPass);
});

module.exports = router;