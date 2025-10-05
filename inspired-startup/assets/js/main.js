// Small prototype script: mobile menu, reveal, and a simple carousel population + auto-scroll
document.addEventListener('DOMContentLoaded', ()=>{
  const menuBtn = document.getElementById('menu-btn');
  const siteNav = document.getElementById('site-nav');
  menuBtn.addEventListener('click', ()=>{
    const isOpen = siteNav.style.display === 'block';
    siteNav.style.display = isOpen ? 'none' : 'block';
    menuBtn.setAttribute('aria-expanded', (!isOpen).toString());
    siteNav.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  });

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries, o)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); o.unobserve(e.target);} });
  },{threshold:0.2});
  reveals.forEach(r=>obs.observe(r));

  // simple project items
  const track = document.querySelector('.carousel-track');
  const projects = ['Alpha','Bravo','Charlie','Delta','Echo'];
  projects.concat(projects).forEach(name=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h4>${name}</h4><p style="color:var(--muted)">Descrição breve do projeto ${name}.</p>`;
    track.appendChild(card);
  });

  // auto-scroll via rAF
  (function auto(){
    if(!track) return; let raf; let last=null; const speed=20;
    function step(now){ if(!last) last=now; const delta=(now-last)/1000; last=now; if(document.hidden || track.dataset.paused==='true'){ raf=requestAnimationFrame(step); return;} track.scrollLeft += speed*delta; const half = track.scrollWidth/2; if(track.scrollLeft>=half) track.scrollLeft -= half; raf=requestAnimationFrame(step);} 
    raf = requestAnimationFrame(step);
    track.addEventListener('mouseenter', ()=>track.dataset.paused='true');
    track.addEventListener('mouseleave', ()=>track.dataset.paused='false');
  })();
});
