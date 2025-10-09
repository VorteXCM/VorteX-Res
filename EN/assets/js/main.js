document.addEventListener("DOMContentLoaded", async () => { 
// ---- Load Resources ---- 
async function loadResources() { 
try { 
const res = await fetch("resources.json"); 
return await res.json(); 
} catch (e) { 
console.error("Error loading resources.json:", e); 
return []; 
} 
} 

function renderItem(item) { 
return ` 
<div class="card"> 
<img src="${item.thumbnail}" alt="${item.name}" class="thumb"/> 
<div class="card-body"> 
<h3>${item.name} <small>${item.version}</small></h3> 
<p>${item.description}</p> 
<p class="meta">Author: ${item.author} • Size: ${item.filesize || "Unspecified"}</p> 
<div class="tags">${(item.tags || []) 
.map((t) => `<span class="tag">${t}</span>`) 
.join("")}</div> 
<div class="actions"> 
<a class="btn" href="${item.download_url}" target="_blank" rel="noopener">Download</a> 
<a class="btn ghost" href="docs.html#${item.id}">installation command</a> 
</div> 
</div> 
</div> 
`; 
} 

function populateTagFilter(items) { 
const set = new Set(); 
items.forEach((i) => (i.tags || []).forEach((t) => set.add(t))); 
const sel = document.getElementById("tagFilter"); 
if (!sel) return; 
set.forEach((t) => { 
const opt ​​= document.createElement("option"); 
opt.value = t; 
opt.textContent = t; 
sel.appendChild(opt); 
}); 
} 

function filterAndRender(items) { 
const q = document.getElementById("search")?.value.trim().toLowerCase() || ""; 
const tag = document.getElementById("tagFilter")?.value || ""; 
const list = document.getElementById("list"); 
if (!list) return; 

const filtered = items.filter((i) => { 
const text = ( 
i.name + 
"" + 
(i.description || "") + 
"" + 
(i.tags || []).join(" ") 
).toLowerCase(); 
return (!q || text.includes(q)) && (!tag || (i.tags || []).includes(tag)); 
}); 

list.innerHTML = !filtered.length 
? "<p>No items found.</p>" 
: filtered.map(renderItem).join(""); 
} 

const items = await loadResources(); 
populateTagFilter(items); 
filterAndRender(items); 

const searchEl = document.getElementById("search"); 
if (searchEl) searchEl.addEventListener("input", () => filterAndRender(items)); 
const tagEl = document.getElementById("tagFilter"); 
if (tagEl) tagEl.addEventListener("change", () => filterAndRender(items)); 

// ---- Particles Background ---- 
const canvas = document.createElement("canvas"); 
canvas.id = "particles-bg"; 
document.body.appendChild(canvas); 
const ctx = canvas.getContext("2d"); 
let w, h; 

function resize() { 
w = canvas.width = window.innerWidth; 
h = canvas.height = window.innerHeight; 
} 
resize(); 
window.addEventListener("resize", resize); 

const particles = Array.from({ length: 80 }).map(() => ({ 
x: Math.random() * w, 
y: Math.random() * h, 
r: Math.random() * 2 + 1, 
dx: (Math.random() - 0.5) * 0.3, 
dy: (Math.random() - 0.5) * 0.3, 
})); 

function animate() { 
ctx.clearRect(0, 0, w, h); 
ctx.fillStyle = "rgba(127,90,240,0.5)"; 
particles.forEach((p) => { 
p.x += p.dx; 
p.y += p.dy; 
if (p.x < 0 || p.x > w) p.dx *= -1; 
if (p.y < 0 || p.y > h) p.dy *= -1; 
ctx.beginPath(); 
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); 
ctx.fill(); 
}); 
requestAnimationFrame(animate); 
} 
animate(); 

// ---- Draggable Images ---- 
document.querySelectorAll(".image-container img").forEach((img) => { 
let isDragging = false; 
let startX, startY, scrollLeft, scrollTop; 
const container = img.parentElement; 

img.addEventListener("mousedown", (e) => { 
isDragging = true; 
startX = e.pageX - container.offsetLeft; 
startY = e.pageY - container.offsetTop; 
scrollLeft = container.scrollLeft; 
scrollTop = container.scrollTop; 
img.style.cursor = "grabbing"; 
e.preventDefault(); 
}); 

img.addEventListener("mouseup", () => { 
isDragging = false; 
img.style.cursor = "grab"; 
}); 

img.addEventListener("mouseleave", () => { 
isDragging = false; 
img.style.cursor = "grab"; 
}); 

img.addEventListener("mousemove", (e) => { 
if (!isDragging) return; 
const x = e.pageX - container.offsetLeft; 
const y = e.pageY - container.offsetTop; 
const walkX = x - startX; 
const walkY = y - startY; 
container.scrollLeft = scrollLeft - walkX; 
container.scrollTop = scrollTop - walkY; 
}); 
});
});