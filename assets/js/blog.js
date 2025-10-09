AOS.init({duration:800,once:true});

// داده های وبلاگ نمونه
const blogs = [
  {id:"2",title:"اولین مپ",content:"اولین مپ سایت VorteX اضافه گردید روی دکمه زیر بزن تا به بخش مپ بری",image:"assets/imgs/gta-map.jpg",link:"DLMAP/maps.html?id=moder-party-villa"},
  {id:"1",title:"بروزرسانی سایت",content:"سایت ما به تازگی بخش درباره ما، سوالات متداول و وبلاگ اضافه کرده و همینطور صفحه ای جدید برای وبلاگ های سایت اضافه شده",image:"assets/imgs/blog.png",link:"../VorteX-Res"},
  {id:"3",title:"LBphone اضافه گردید",content:"یک اسکیریپت و یا ریسورس گوشی جدید اضافه گردید",descon:"این ریسورس اسمش LBPhone هست اما اون ریسورس هایی که در اینترنت موجود هست خراب هستند و یا کار نمیکنند اما این ریسورس تست شده وکار میکنه و برای تغییر اسم ها و برنامه ها باید یک کد نویسی و یا در همان حد تغییر اسم و یک برنامه کد نویسی مثل VSCode داشته باشید که آن برنامه را میتوانید از سایت اصلی خود برنامه دانلود کنید.",image:"assets/imgs/lbphone.jpg",link:"DL/download.html?id=LB-Phone"},
  {id:"3",title:"Road Phone اضفه گردید",content:"یک گوشی جدید به اسم Road Phone به سایت اضافه شد",descon:"این ریسورس اسمش Road Phone هست اما اون ریسورس هایی که در اینترنت موجود هست خراب هستند و یا کار نمیکنند اما این ریسورس تست شده وکار میکنه و برای تغییر اسم ها و برنامه ها باید یک کد نویسی و یا در همان حد تغییر اسم و یک برنامه کد نویسی مثل VSCode داشته باشید که آن برنامه را میتوانید از سایت اصلی خود برنامه دانلود کنید.",image:"assets/imgs/roadphone.jpg",link:"DL/download.html?id=Road-Phone"}
];

const blogId = new URLSearchParams(window.location.search).get('id') || "1";
const contentEl = document.getElementById('blog-content');
const titleEl = document.getElementById('blog-title');
const relatedEl = document.getElementById('related-blogs');

// بارگذاری وبلاگ
const blog = blogs.find(b => b.id == blogId);
if(blog){
  titleEl.textContent = blog.title;

  // اگر لینک وجود داشته باشد دکمه ایجاد شود
  const fullLinkButton = blog.link ? `<a href="${blog.link}" class="btn">مشاهده کامل</a>` : '';

  contentEl.innerHTML = `
    <a href="index.html" class="back-btn"><i class="fa-solid fa-arrow-right"></i> بازگشت</a>
    <h1>${blog.title}</h1>
    <img src="${blog.image}" class="blog-image" onclick="zoomImage(this)">
    <p>${blog.content}</p>
    <p style="color: rgba(117, 114, 114, 1);">${blog.descon}</p>
    ${fullLinkButton}
  `;

  // مطالب مرتبط
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
    range.insertNode(span);

    // ذخیره در localStorage
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
