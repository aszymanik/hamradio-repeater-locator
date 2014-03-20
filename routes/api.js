
/*
 * GET home page.
 */

var bands = [
		{text:'10 m', start: 28.0, stop: 29.7 },
	  	{text:'6 m',  start: 50.0, stop: 54.0},
	  	{text:'2 m',  start: 144.0, stop: 148.0 },
	  	{text:'1.25 m',  start: 222.0, stop: 225.0 },
	  	{text:'70 cm',  start: 420.0, stop: 450.0},
	  	{text:'33 cm',  start: 902.0, stop: 928.0},
	  	{text:'23 cm',  start: 1240.0, stop: 1300.0},
];

exports.repeaterlist = function(req, res){
	if (req.body.dist) { var distance = req.body.dist; } else {var distance = 25;}
	var coords = rc(req.body.lat, req.body.lon, distance);
	var bandfilter = "";
	var query = "SELECT id, location, lat, lon, call FROM repeaters " + 
				"WHERE lat BETWEEN " + coords.sw.lat + " AND " + coords.ne.lat +
				" AND lon BETWEEN " + coords.sw.lon + " AND " + coords.ne.lon;
	
	var firstfilter = true;
	for (band in req.body.filter) {
		if (req.body.filter[band].selected) {
			if (firstfilter) {bandfilter += " AND (";}

			bandfilter += " freq_in BETWEEN " + bands[band].start + " AND " + bands[band].stop;
		}
	}
	console.log(query);
	console.log(bandfilter);
	db.all(query, 
		function (err, row) {
			res.send(row);
		}
	);
}

exports.repeaterdetail = function(req, res){
	var query = "SELECT * FROM repeaters " + 
				"WHERE id = " + req.params.repeaterid;
	
	db.get(query, 
		function (err, row) {
			res.send(row);
		}
	);
}