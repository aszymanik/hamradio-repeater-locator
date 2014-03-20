angular.module('starter.controllers', [])


.controller('RepeaterIndexCtrl', ['$scope','$http', 'RepeaterService', 'GeolocationService', '$cookieStore' , 
	function($scope, $http, RepeaterService, GeolocationService, $cookieStore) {
		GeolocationService.getpos().then(
		function (position) {
			$scope.position = position;
			RepeaterService.all($scope, $cookieStore.get('distance'), $cookieStore.get('bands')).then(function(data) {
				$scope.repeaters = data;
			});
		}, 
		function (reason) {
			$scope.message = "Could not be determined.";
		});	
}])

.controller('RepeaterDetailCtrl', function($scope, $stateParams, RepeaterService) {
  RepeaterService.get($stateParams.repeaterId).then(function(data) {
			$scope.repeater = data;
		});
})

.controller('SettingsCtrl', function($scope, $stateParams, $cookieStore) {
  	var bands = [
	  	{text:'10 m', selected:false},
	  	{text:'6 m', selected:false},
	  	{text:'2 m', selected:false},
	  	{text:'1.25 m', selected:false},
	  	{text:'70 cm', selected:false},
	  	{text:'33 cm', selected:false},
	  	{text:'23 cm', selected:false},
  	];
  	var distance = 25;


	$cookieStore.get('distance') ? $scope.distance = $cookieStore.get('distance') : $scope.distance = distance;
	$cookieStore.get('bands') ? $scope.bands = $cookieStore.get('bands') : $scope.bands = bands;	

	$scope.$watch('distance', function(d) {
		$cookieStore.put('distance', d)
	});

	$scope.selection = [];
	
	$scope.$watch('bands|filter:{selected:true}', function (nv) {
	    $scope.selection = nv.map(function (band) {$cookieStore.put('bands', $scope.bands); return band.name;});
	  }, true);

});