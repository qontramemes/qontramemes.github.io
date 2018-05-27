angular.module('Meme',[])
.controller('MainController',function($scope) {

	$scope.toptext = '';
	$scope.bottomtext = '';
	$scope.selectedMeme ='ruggeri1';
	$scope.memes = [];

	for(var key in console.list) {
		$scope.memes.push({name:key,url:console.list[key]});
	}
	
	$scope.alterMeme = function(){
		var url = $scope.memes[$scope.memes.indexOf($scope.selectedMeme)].name;
		console.meme($scope.toptext,$scope.bottomtext,url);
	}

	$scope.create = function() {
		var uri = document.getElementById('canvas').toDataURL();
		downloadImage(uri,generateName());
	}

	function generateName() {
		var n = [];
		for(var i =0; i < 10;i++) {
			n.push((Math.floor(Math.random() *16)).toString(16));
		}
		return n.join('');
	};

	function downloadImage(uri,name) {
		var link = document.createElement('a');
		link.download = name;
		link.href = uri;
		link.click();
	};

})
.run(function() {
	console.meme('','','ruggeri1');
});
