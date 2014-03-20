angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('RepeaterService', ['$rootScope', '$http', function ($rootScope, $http) {
  return {
    all: function($rootScope, distance, bands) {
      console.log(distance)
      return $http.post('/api/repeaters/', 
        {'lat': $rootScope.position.coords.latitude, 
         'lon': $rootScope.position.coords.longitude, 
         'dist': distance,
         'filter': bands
        },
        { cache: true}).then(

        function(result) { 
        //console.log(coords.latitude, ", ", coords.longitude);
          for (var item in result.data) {
            result.data[item].distance = calcdistance($rootScope.position.coords.latitude, $rootScope.position.coords.longitude, result.data[item].lat, result.data[item].lon);
            
            //console.log(result.data[item].call, result.data[item].lat, ", ", result.data[item].lon, result.data[item].distance)
          }
          return result.data;
        });
      },
    
    get: function(repeaterId) {
      return $http.get('/api/repeater/'+repeaterId+'/').then(
        function(result) {  
          return result.data;
        });
      }
  }
}])

.factory('GeolocationService', ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
    return {
      getpos: function () {
        var deferred = $q.defer();

        if (!$window.navigator) {
            $rootScope.$apply(function() {
                deferred.reject(new Error("Geolocation is not supported"));
            });
        } else {
            $window.navigator.geolocation.getCurrentPosition(function (position) {
                $rootScope.$apply(function() {
                    deferred.resolve(position);
                });
            }, function (error) {
                $rootScope.$apply(function() {
                    deferred.reject(error);
                });
            });
        }

        return deferred.promise;
    }
  }
}]);
