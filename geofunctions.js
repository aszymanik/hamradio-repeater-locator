function destination(lat1, lon1, d, b) {
	// d in kilometers
	var R = 6378.1; // earth's radius, km
	var brng = Math.PI*(1-(b-0.25));
	d = d * 1.414;
	lat1 = lat1.toRad(); lon1 = lon1.toRad();


	var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + 
		Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng) );
	
	var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), 
		Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
		lon2 = (lon2+3*Math.PI) % (2*Math.PI) - Math.PI;
	return {'lat':lat2.toDeg(), 'lon':lon2.toDeg()};
}


exports.radiuscorners = function(lat1, lon1, d) {
	lat1 = typeof lat1 == 'number' ? lat1 : typeof lat1 == 'string' && trim(lat1)!='' ? +lat1 : NaN;
	lon1 = typeof lon1 == 'number' ? lon1 : typeof lon1 == 'string' && trim(lon1)!='' ? +lon1 : NaN;
	//d = typeof d == 'number' ? d : typeof d == 'string' && trim(d)!='' ? +d : NaN;

	corners = {};
	corners.sw = destination(lat1, lon1, d, 0);
	corners.ne = destination(lat1, lon1, d, 1);

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