// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreen = player.querySelector('.fullscreen');

// Build our functions
function togglePlay() {
    if(video.paused) video.play();
    else video.pause();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    // console.log(percent);
}

function scrub(e) {
    const percent = (e.offsetX / progress.offsetWidth);
    video.currentTime = percent * video.duration;
}

function handleRangeUpdate() {
    // console.log(this.name);
    // console.log(this.value);
    video[this.name] = this.value;
}

function skip() {
    // console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function toggleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
      }
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
toggle.addEventListener('click', togglePlay);
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
ranges.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));
fullscreen.addEventListener('click', toggleFullscreen);