const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	console.log(navigator);
	console.log(navigator.mediaDevices);
	// navigator.mediaDevices.getUserMedia(): 비디오를 가져옴. promise 리턴
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch(err => {
			console.error(`Oh no!!!`, arr);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		// video를 0,0 부터 width,height 까지 그림 
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		
		//pixels = redEffect(pixels);
		pixels = rgbSplit(pixels);
		// pixels = greenScreen(pixels);


		ctx.globalAlpha = 0.1; // whoooo~~~
		ctx.putImageData(pixels, 0, 0); 
		// 위 에러 남 
		// Uncaught TypeError: Failed to execute 'putImageData' on 'CanvasRenderingContext2D': 
		// parameter 1 is not of type 'ImageData'
	}, 16);
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();

	const data  = canvas.toDataURL('image/jpeg');
	console.log(data);

	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
	strip.insertBefore(link, strip.firstChild);
}


function redEffect(pixels) {
	for(let i=0; i<pixels.data.length; i+=4){
		pixels.data[i + 0] = pixels.data[i + 0] +200;
		pixels.data[i + 1] = pixels.data[i + 1] -50;
		pixels.data[i + 2] = pixels.data[i + 2] *0.5;
	}
	return pixels;
}

function rgbSplit(pixels) {
	for(let i=0; i<pixels.data.length; i+=4){
		pixels.data[i - 150] = pixels.data[i + 0]; // RED
		pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
		pixels.data[i - 550] = pixels.data[i + 2]; // Blue
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};
	document.querySelectorAll('.rgb input').forEach((input) => {
		levels[input.name] = input.value;
	});
	// console.log(levels);

	for(let i=0; i<pixels.data.length; i+=4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];

		if(red >= levels.rmin 
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax
			&& green <= levels.gmax
			&& blue <= levels.bmax) {
			// take it out!
			pixels.data[i + 3] = 0;
		}
	}

	return pixels;
}


getVideo();

// 비디오가 실행(video.play())되면 발생하는 이벤트
video.addEventListener('canplay', paintToCanvas);