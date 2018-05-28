angular.module('Meme',[])
.controller('MainController',function($scope) {
	$scope.ruggeris = [
		{ id: 1, url: './img/ruggeri/ruggeri-1.jpg'},
		{ id: 2, url: './img/ruggeri/ruggeri-2.jpg'},
		{ id: 3, url: './img/ruggeri/ruggeri-3.jpg'},
		{ id: 4, url: './img/ruggeri/ruggeri-4.jpg'},
		{ id: 5, url: './img/ruggeri/ruggeri-5.jpg'},
		{ id: 6, url: './img/ruggeri/ruggeri-6.jpg'},
		{ id: 7, url: './img/ruggeri/ruggeri-7.jpg'},
		{ id: 8, url: './img/ruggeri/ruggeri-8.jpg'},
		{ id: 9, url: './img/ruggeri/ruggeri-9.jpg'},
		{ id: 10, url: './img/ruggeri/ruggeri-10.jpg'},
		{ id: 11, url: './img/ruggeri/ruggeri-11.jpg'},
		{ id: 12, url: './img/ruggeri/ruggeri-12.jpg'},
		{ id: 13, url: './img/ruggeri/ruggeri-13.jpg'},
		{ id: 14, url: './img/ruggeri/ruggeri-14.jpg'},		
	  ];
	/*
	var ruggeriMeme;

	function selectedRuggeri(ruggeriId) {
		ruggeriMeme = ruggeriId;
		console.meme('','',ruggeriMeme) ;
	}
	*/

	$scope.toptext = '';
	$scope.bottomtext = '';
	// $scope.selectedMeme = ruggeriSeleccion;
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
		// downloadImage(uri,generateName());
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

	/*
	var memeRuggeri;
	function twoFunctions(memeElegido) {
		openEditor();
		function ruggeriSeleccion() {
			memeRuggeri = "ruggeri-"+memeElegido;
			console.log("memeRuggeri: "+memeRuggeri);
			return memeRuggeri;
		}
	
		console.meme('','',ruggeriSeleccion());
	}
	*/	

})
.run(function() {
	
});
