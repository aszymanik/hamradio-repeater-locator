function destination(lat1, lon1, d, b) {
	// d in kilometers
	var R = 6378.1; // earth's radius, km
	var brng = Math.PI*(b+0.75)*1.414;
	lat1 = lat1.toRad(); lon1 = lon1.toRad();

	var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + 
		Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng) );
	
	var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), 
		Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
		lon2 = (lon2+3*Math.PI) % (2*Math.PI) - Math.PI;
	return {'lat':lat2.toDeg(), 'lon':lon2.toDeg()};
}


 function radiuscorners(lat1, lon1, d) {
	lat1 = typeof lat1 == 'number' ? lat1 : typeof lat1 == 'string' && trim(lat1)!='' ? +lat1 : NaN;
	lon1 = typeof lon1 == 'number' ? lon1 : typeof lon1 == 'string' && trim(lon1)!='' ? +lon1 : NaN;

	corners = {};
	corners.nw = destination(lat1, lon1, d, 0);
	corners.se = destination(lat1, lon1, d, 1);

	return corners;
}

/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad == 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

/** Converts radians to numeric (signed) degrees */
if (typeof Number.prototype.toDeg == 'undefined') {
  Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
  }
}

/** Trims whitespace from string (q.v. blog.stevenlevithan.com/archives/faster-trim-javascript) */
function trim(n) {
    return String(n).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
 }

function calcdistance(lat1, lon1, lat2, lon2) {
	
	var R = 6371; // km 
	//has a problem with the .toRad() method below.
	var x1 = lat2-lat1;	var dLat = x1.toRad();  
	var x2 = lon2-lon1;	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	            Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return (R * c);
}