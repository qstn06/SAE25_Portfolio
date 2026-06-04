// ── Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function animCursor(){
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    rx += (mx-rx)*0.14; ry += (my-ry)*0.14;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.proj-card,.comp-card,.detail-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.style.transform='translate(-50%,-50%) scale(2)'; ring.style.transform='translate(-50%,-50%) scale(1.4)'; });
    el.addEventListener('mouseleave',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1)'; ring.style.transform='translate(-50%,-50%) scale(1)'; });
  });

  // ── Page navigation
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    const pg = document.getElementById('page-'+id);
    if(pg) { pg.classList.add('active'); window.scrollTo(0,0); }
    document.querySelectorAll('.nav-tab').forEach(t => {
      if(t.dataset.page===id) t.classList.add('active');
    });
  }

  document.querySelectorAll('.nav-tab').forEach(tab=>{
    tab.addEventListener('click', ()=> showPage(tab.dataset.page));
  });

  // ── Filter buttons (projects page)
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Animate progress bars when competences page is shown
  const compTab = document.querySelector('[data-page="competences"]');
  if(compTab) {
    compTab.addEventListener('click', ()=>{
      setTimeout(()=>{
        document.querySelectorAll('.prog-fill').forEach(bar=>{
          const w = bar.style.width;
          bar.style.width = '0';
          requestAnimationFrame(()=>{ bar.style.width = w; });
        });
      }, 50);
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".proj-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});
