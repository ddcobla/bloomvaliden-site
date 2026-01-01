(function(){
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener("click", ()=>{
      const open = mobileMenu.style.display === "block";
      mobileMenu.style.display = open ? "none" : "block";
      menuBtn.setAttribute("aria-expanded", String(!open));
    });
  }

  // Tawk helper: open chat widget when users click CTAs
  function openTawk(){
    const tryOpen = () => {
      if(window.Tawk_API && typeof window.Tawk_API.maximize === "function"){
        try{ window.Tawk_API.maximize(); }catch(e){}
        return true;
      }
      return false;
    };
    if(tryOpen()) return;
    let attempts = 0;
    const t = setInterval(()=>{
      attempts++;
      if(tryOpen() || attempts > 25) clearInterval(t);
    }, 200);
  }

  document.querySelectorAll("[data-open-chat='true']").forEach(el=>{
    el.addEventListener("click", (e)=>{
      e.preventDefault();
      openTawk();
    });
  });

  // Support request form fallback -> mailto
  const form = document.getElementById("supportRequestForm");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const f = form.elements;
      const subject = `[${f.priority.value}] ${f.category.value} — ${f.subject.value}`;
      const body =
`Name: ${f.name.value}
Phone: ${f.phone.value}
Email: ${f.email.value}
Category: ${f.category.value}
Priority: ${f.priority.value}

Details:
${f.details.value}

(Submitted via Bloomvaliden website)`;
      window.location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Assessment form -> mailto
  const af = document.getElementById("assessmentForm");
  if(af){
    af.addEventListener("submit", (e)=>{
      e.preventDefault();
      const a = af.elements;
      const subject = `Assessment Request — ${a.service.value}`;
      const body =
`Name: ${a.name.value}
Phone: ${a.phone.value}
Email: ${a.email.value}
Service: ${a.service.value}

Message:
${a.msg.value}

(Submitted via Bloomvaliden website)`;
      window.location.href = `mailto:dd.cobla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();