const btn = document.getElementById('music-btn');
const panel = document.getElementById('music-panel');
const player = document.getElementById('player');
btn.onclick = ()=> panel.style.display = panel.style.display==='none'?'block':'none';
document.getElementById('play').onclick = ()=>player.play();
document.getElementById('pause').onclick = ()=>player.pause();
document.getElementById('volume').oninput = e=>player.volume = e.target.value;