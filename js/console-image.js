(function(console) {
	"use strict";

	var memes = {"ruggeri1":"./img/ruggeri/ruggeri-1.jpg", "ruggeri2":"./img/ruggeri/ruggeri-2.jpg", "ruggeri3":"./img/ruggeri/ruggeri-3.jpg", "ruggeri4":"./img/ruggeri/ruggeri-4.jpg", "ruggeri5":"./img/ruggeri/ruggeri-5.jpg", "ruggeri6":"./img/ruggeri/ruggeri-6.jpg", "ruggeri7":"./img/ruggeri/ruggeri-7.jpg", "ruggeri8":"./img/ruggeri/ruggeri-8.jpg", "ruggeri9":"./img/ruggeri/ruggeri-9.jpg", "ruggeri10":"./img/ruggeri/ruggeri-10.jpg", "ruggeri11":"./img/ruggeri/ruggeri-11.jpg", "ruggeri12":"./img/ruggeri/ruggeri-12.jpg", "ruggeri13":"./img/ruggeri/ruggeri-13.jpg", "ruggeri14":"./img/ruggeri/ruggeri-14.jpg"};

	var canvas = document.createElement("canvas");
	
	console.list = memes;

	function drawMemeText(ctx, type, text, width, y) {
		text = text.toUpperCase();
		//Determine the font size
		if(text.length < 24) {
			var val = Math.max(0, text.length - 12),
				size = 70 + (val * - 3);

			drawText(ctx, size, text, width/2, y);
		} else if(text.length < 29) {
			drawText(ctx, 40, text, width/2, y);
		} else {
			var strs = wrap(text, 27);
			strs.forEach(function(str, i) {
				drawText(ctx, 40, str, width/2, (type == "lower") ? (y - ((strs.length - 1) * 40)) + (i * 40) : y + (i * 40));
			});
		}
	}

	function drawText(ctx, size, text, x, y) {
		ctx.font = "bold " + size + "px Impact";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.lineWidth = 7;
		ctx.strokeStyle = "#000";
		ctx.strokeText(text, x, y);
		ctx.fillText(text, x, y);
	}
	function wrap(text, num) {
		var output = [],
			split = text.split(" ");

		var str = [];
		for(var i = 0, cache = split.length; i < cache; i++) {
			if((str + split[i]).length < num) str.push(split[i])
			else {
				output.push(str.join(" "));
				str.length = 0;
				str.push(split[i]);
			}
		}

		//Push the final line
		output.push(str.join(" "));

		return output;
	}
	console.meme = function(upper, lower, image, width, height) {
		if(!upper && !lower && !image) return console.log("> " + Object.keys(memes).join("\n> "));
		
			var ctx = canvas.getContext("2d"),
			width = width || 500,
			height = width || 500,
			//I tweaked it at these dimensions,
			//So everything scales from here
			_w = 500, _h = 500; 
			
			ctx.clearRect(0,0,width,height);

			var img = new Image();
    		img.setAttribute('crossOrigin','anonymous');
			img.onload = function() {
			canvas.width = width;
			canvas.height = height;

			var text = upper.toUpperCase();

			ctx.scale(width/500, height/500);

			//Draw the background
			ctx.drawImage(this, 0, 0, _w, _h);

			drawMemeText(ctx, "upper", upper, _w, 300); //upper
			drawMemeText(ctx, "lower", lower, _w, _h - 50); //upper

			//my lil' hack
			canvas.id = 'canvas';
			$('.canvas').html(canvas);
			
		};

		if(memes[image]) var url = memes[image];
		else var url = image;

		img.src = url;
	};
})(console);