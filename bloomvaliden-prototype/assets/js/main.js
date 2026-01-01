(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem("bv_theme");
  if(saved){ root.setAttribute("data-theme", saved); }

  const themeBtn = document.querySelector("[data-theme-toggle]");
  if(themeBtn){
    themeBtn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("bv_theme", next);
    });
  }

  const burger = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-mobilemenu]");
  if(burger && menu){
    burger.addEventListener("click", () => menu.classList.toggle("open"));
  }

  // Accordion
  document.querySelectorAll("[data-accordion] .item button").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".item");
      item.classList.toggle("open");
    });
  });

  // Forms (contact + ticket) – prototype-only (no server)
  function setStatus(el, ok, msg){
    if(!el) return;
    el.className = "alert" + (ok ? "" : " err");
    el.textContent = msg;
    el.hidden = false;
  }

  // Contact form draft saving
  const contactForm = document.querySelector("[data-contact-form]");
  if(contactForm){
    const key = "bv_contact_draft";
    const status = contactForm.querySelector("[data-form-status]");

    // load draft
    try{
      const draft = JSON.parse(localStorage.getItem(key) || "{}");
      ["name","email","company","service","message"].forEach(k => {
        if(draft[k] && contactForm.elements[k]) contactForm.elements[k].value = draft[k];
      });
    }catch(e){}

    contactForm.addEventListener("input", () => {
      const data = {};
      ["name","email","company","service","message"].forEach(k => data[k] = contactForm.elements[k]?.value || "");
      localStorage.setItem(key, JSON.stringify(data));
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const msg = contactForm.elements.message.value.trim();

      if(!name || !email || !msg){
        return setStatus(status, false, "Please fill in your name, email, and message.");
      }

      // Prototype action: open mail client with a prefilled email
      const subject = encodeURIComponent("Bloomvaliden – Assessment Request (" + (contactForm.elements.service.value || "General") + ")");
      const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Company: " + (contactForm.elements.company.value || "") + "\n" +
        "Service: " + (contactForm.elements.service.value || "") + "\n\n" +
        msg + "\n"
      );

      window.location.href = "mailto:bloomvaliden@gmail.com?subject=" + subject + "&body=" + body;
      localStorage.removeItem(key);
      setStatus(status, true, "Opening your email app… If nothing happens, copy your message and email bloomvaliden@gmail.com.");
      contactForm.reset();
    });
  }

  // Ticket form
  const ticketForm = document.querySelector("[data-ticket-form]");
  if(ticketForm){
    const status = ticketForm.querySelector("[data-form-status]");
    const listEl = document.querySelector("[data-ticket-list]");
    const key = "bv_tickets";

    function loadTickets(){
      if(!listEl) return;
      listEl.innerHTML = "";
      const tickets = JSON.parse(localStorage.getItem(key) || "[]");
      if(!tickets.length){
        listEl.innerHTML = '<div class="small">No tickets saved on this device yet.</div>';
        return;
      }
      tickets.slice().reverse().forEach(t => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <div class="badge">Ticket <strong>${t.id}</strong> • ${new Date(t.created).toLocaleString()}</div>
          <div class="hr"></div>
          <div><strong>${t.subject}</strong></div>
          <div class="small">${t.category || 'General IT'} • ${t.name} • ${t.email} • ${t.priority}</div>
          <p style="margin-top:10px;color:var(--muted)">${t.details.replace(/</g,"&lt;")}</p>
        `;
        listEl.appendChild(div);
      });
    }

    loadTickets();

    ticketForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = ticketForm.elements.name.value.trim();
      const email = ticketForm.elements.email.value.trim();
      const subject = ticketForm.elements.subject.value.trim();
      const details = ticketForm.elements.details.value.trim();
      if(!name || !email || !subject || !details){
        return setStatus(status, false, "Please complete all fields to submit a ticket.");
      }

      const id = "BV-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      const ticket = {
        id,
        created: Date.now(),
        name, email,
        category: ticketForm.elements.category?.value || "General IT",
        subject,
        priority: ticketForm.elements.priority.value || "Normal",
        details
      };

      const tickets = JSON.parse(localStorage.getItem(key) || "[]");
      tickets.push(ticket);
      localStorage.setItem(key, JSON.stringify(tickets));
      setStatus(status, true, `Ticket ${id} saved (prototype). In a real app, this would be sent to your helpdesk or email.`);
      ticketForm.reset();
      loadTickets();
    });

    const clearBtn = document.querySelector("[data-clear-tickets]");
    if(clearBtn){
      clearBtn.addEventListener("click", () => {
        localStorage.removeItem(key);
        loadTickets();
        setStatus(status, true, "Local ticket list cleared.");
      });
    }
  }
})();
