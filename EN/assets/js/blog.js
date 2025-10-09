AOS.init({duration:800,once:true});

// Sample blog data
const blogs = [
{id:"2",title:"First Map",content:"The first VorteX site map has been added. Click the button below to go to the map section",image:"assets/imgs/gta-map.jpg",link:"DLMAP/maps.html?id=moder-party-villa"},
{id:"1",title:"Site Update",content:"Our site has recently added an About Us, FAQ and Blog section and also a new page for the site's blogs",image:"assets/imgs/blog.png",link:"../VorteX-Res"},
{id:"3",title:"LBphone Added",content:"A new phone script or resource has been added",descon:"This resource is called LBPhone but those resources available on the internet are broken or do not work but this resource has been tested and works and to change the names and programs you need to write a code or change it to the same extent Have a name and a coding program like VSCode, which you can download from the main site of the program.",image:"assets/imgs/lbphone.jpg",link:"DL/download.html?id=LB-Phone"},
{id:"4",title:"Road Phone added",content:"A new phone called Road Phone was added to the site",descon:"This resource is called Road Phone, but those resources available on the internet are broken or do not work, but this resource has been tested and works, and to change the names and programs, you must have a coder or at the same time change the name and a coding program like VSCode, which you can download from the main site of the program.",image:"assets/imgs/roadphone.jpg",link:"DL/download.html?id=Road-Phone"}
];

const blogId = new URLSearchParams(window.location.search).get('id') || "1";
const contentEl = document.getElementById('blog-content');
const titleEl = document.getElementById('blog-title');
const relatedEl = document.getElementById('related-blogs');

// Load blog
const blog = blogs.find(b => b.id == blogId);
if(blog){
titleEl.textContent = blog.title;

// Create button if link exists
const fullLinkButton = blog.link ? `<a href="${blog.link}" class="btn">View full</a>` : '';

contentEl.innerHTML = ` 
<a href="index.html" class="back-btn"><i class="fa-solid fa-arrow-right"></i> Back</a> 
<h1>${blog.title}</h1> 
<img src="${blog.image}" class="blog-image" onclick="zoomImage(this)"> 
<p>${blog.content}</p> 
<p style="color: rgba(117, 114, 114, 1);">${blog.descon}</p> 
${fullLinkButton} 
`; 

// Related content 
blogs.filter(b => b.id != blogId).forEach(b => { 
const li = document.createElement('li'); 
li.innerHTML = `<a href="blog.html?id=${b.id}">${b.title}</a>`; 
relatedEl.appendChild(li); 
});
}

// Scroll progress bar
window.addEventListener('scroll', () => { 
const scrollTop = window.scrollY; 
const docHeight = document.body.scrollHeight - window.innerHeight; 
const percent = (scrollTop / docHeight) * 100; 
document.getElementById('scroll-progress').style.width = percent + '%';
});

// Dark mode toggle
document.getElementById('toggle-dark').addEventListener('click', () => { 
document.body.classList.toggle('dark-mode'); 
document.body.classList.toggle('light-mode');
});

// Image zoom
function zoomImage(img){ 
const overlay=document.createElement('div'); 
overlay.style.position='fixed'; 
overlay.style.top=0; 
overlay.style.left=0; 
overlay.style.width='100%'; 
overlay.style.height='100%'; 
overlay.style.background='rgba(0,0,0,0.8)'; 
overlay.style.display='flex'; 
overlay.style.alignItems='center'; 
overlay.style.justifyContent='center'; 
overlay.style.zIndex=9999; 
overlay.onclick=()=>document.body.removeChild(overlay); 
const zoomed=img.cloneNode(); 
zoomed.style.maxWidth='90%'; 
zoomed.style.maxHeight='90%'; 
zoomed.style.borderRadius='10px'; 
overlay.appendChild(zoomed); 
document.body.appendChild(overlay);
}

// Text highlight with localStorage
contentEl.addEventListener('mouseup', () => { 
const selection = window.getSelection().toString(); 
if(selection){ 
const span = document.createElement('span'); 
span.textContent = selection; 
span.classList.add('highlight'); 
const range = window.getSelection().getRangeAt(0); 
range.deleteContents(); 
range. insertNode(span); 

// store in localStorage 
let highlights = JSON.parse(localStorage.getItem('highlights_'+blogId) || '[]'); 
highlights.push(selection); 
localStorage.setItem('highlights_'+blogId, JSON.stringify(highlights)); 
}
});

// Load highlights
window.addEventListener('load', () => { 
let highlights = JSON.parse(localStorage.getItem('highlights_'+blogId) || '[]'); 
highlights.forEach(text => { 
const html = contentEl.innerHTML.replace(text, `<span class="highlight">${text}</span>`); 
contentEl.innerHTML = html; 
});
});