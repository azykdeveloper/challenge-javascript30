const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButton = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");



function togglePlay() {
  video.paused ? video.play() : video.pause();
}
function updateButton() {
  const icon = this.paused ? "▶" : "⏸"
  toggle.textContent = icon
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdeta() {
  video[this.name] = this.value
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
skipButton.forEach(btn => btn.addEventListener("click", skip))
ranges.forEach(range => range.addEventListener('click', handleRangeUpdeta))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdeta))

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
