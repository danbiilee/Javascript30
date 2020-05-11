const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector('.full');


function togglePlay(){
	// if(video.paused){
	// 	video.play();
	// } else{
	// 	video.pause();
	// }

	const method = video.paused ? 'play' : 'pause';
	video[method](); 

	//video[video.paused ? 'play' : 'pause']();
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.innerHTML = icon;

	//toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	console.log(mousedown);
	// 영상너비 대비 내가 클릭한 위치만큼 비디오 영상의 시간을 구해서 대입 
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function getfullScreen(){
	// player.style.width = window.outerWidth;
	// player.style.height = window.outerHeight;
	player.requestFullscreen();
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
full.addEventListener('click', getfullScreen);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
// 마우스를 누른채 드래그 하는 경우에만 아래 이벤트가 발생함
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); 

