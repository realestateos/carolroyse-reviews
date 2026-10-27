/* =========================================================
   CAROL ROYSE TEAM CLIENT EVENTS: shared data and logic
   Used by /events/ and every event page (/events/<slug>/).
   Edit events here once and every page updates.
   ========================================================= */
const OFFICE_ADDRESS = "7890 S Hardy Dr, Ste 106, Tempe, AZ 85284";
const PIE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScB_0xEDQEd_KnOlMKvh9p7XAZ6Vxjjx76MgEr1onnTjDAJ-A/viewform?usp=header";  // Thanksgiving Pie for Your Table reservations (Google Form)
const RSVP_ENDPOINT  = "https://mcp.realestateos.com/api/crt-events/rsvp";
const AVAILABILITY_ENDPOINT = "https://mcp.realestateos.com/api/crt-events/availability"; // GET → {"counts":{"<date>|<title>": <total people>}}
const LOW_SPOTS_AT = 15;   // show "Only X spots left" at or below this

/* Past-event gallery. Add an entry after each event and the section appears.
   Example: { title:"New Year Cheers", date:"2027-01-14", photo:"photos/new-year-cheers.jpg", quote:"So fun!", quoteBy:"The Smith Family" } */
const GALLERY = [];

/* One entry per event page. The page lives at CarolRoyseReviews.com/events/<slug>
   and always shows the next upcoming date(s) for that slug, so links never go stale. */
const SERIES = {
  "thanksgiving-pie":           { name:"Thanksgiving Pie for Your Table", emoji:"🥧", blurb:"Our favorite tradition. Everyone gets a free pumpkin or apple pie for the Thanksgiving table. Pick yours up in Scottsdale or Glendale, or come to The Big Pie Party at our Tempe office." },
  "new-year-cheers":            { name:"New Year Cheers", emoji:"🥂", blurb:"Kick off the new year with drinks, bites and great company. Our New Year happy hour at The Keg in Tempe." },
  "wealth-builder-workshop":    { name:"Wealth Builder Workshop", emoji:"📈", blurb:"A free evening workshop on building wealth through Arizona real estate: using your equity, buying rentals and planning your next move." },
  "sweets-for-your-sweetheart": { name:"Sweets for Your Sweetheart", emoji:"💝", blurb:"Stop by our Tempe office and pick up a sweet Valentine's gift for the special someone in your life." },
  "spring-training":            { name:"Spring Training Day", emoji:"⚾", blurb:"Take me out to the ballgame! Join us for a Cactus League spring training game. Seats and a team hat are on us." },
  "spring-cheers":              { name:"Spring Cheers", emoji:"🌸", blurb:"Spring happy hour with the team at The Keg in Chandler. Bring a friend!" },
  "bouquet-for-mom":            { name:"Build-Your-Own Bouquet for Mom", emoji:"💐", blurb:"Build a custom bouquet for the moms in your life. Fresh flowers, wrapping and ribbon are all on us." },
  "treat-for-dad":              { name:"Treat for Dad", emoji:"🎁", blurb:"Stop by our Tempe office and grab a little something for the dads in your life." },
  "summer-cheers":              { name:"Summer Cheers", emoji:"☀️", blurb:"Beat the heat with cool drinks and good people. Our summer happy hour at The Keg in Tempe." },
  "private-screening":          { name:"Private Screening", emoji:"🎬", blurb:"We're renting out the theater! Bring the whole family to our private movie screening. Popcorn's on us." },
  "911-vigil":                  { name:"9/11 Healing Field Candlelight Vigil", emoji:"🕯️", blurb:"Join us at the Tempe Healing Field as the community honors the lives lost on September 11. The Carol Royse Team is a proud sponsor." },
  "kickoff-party":              { name:"Kickoff Party", emoji:"🏈", blurb:"Wear your team colors and watch Thursday Night Football with us at The Keg in Chandler." },
  "fall-cheers":                { name:"Fall Cheers", emoji:"🍂", blurb:"Fall happy hour with the team at The Keg at Desert Ridge." },
  "santas-cookie-workshop":     { name:"Santa's Cookie Workshop", emoji:"🎅", blurb:"Decorate Christmas cookies, sip hot cocoa and take free photos with Santa at our Tempe office." },
};

/* Event list: add, remove or edit lines. Times are Arizona time. Every event needs a slug from SERIES above. */
const EVENTS = [
  { slug:"thanksgiving-pie", date:"2026-11-23", start:"16:00", end:"18:00", title:"Thanksgiving Pie for Your Table: Scottsdale Pickup", type:"Thanksgiving", desc:"Everyone gets a free pie! Choose pumpkin or apple and pick it up in Scottsdale.", location:"Title Alliance of Arizona LLC, 6991 E Camelback Rd, Suite C230, Scottsdale, AZ 85251", rsvpUrl:PIE_FORM, rsvpLabel:"Reserve your pie", rsvpBy:"RSVP by Thu, Nov 19" },
  { slug:"thanksgiving-pie", date:"2026-11-23", start:"16:00", end:"18:00", title:"Thanksgiving Pie for Your Table: Glendale Pickup", type:"Thanksgiving", desc:"Everyone gets a free pie! Choose pumpkin or apple and pick it up in Glendale.", location:"TA Conference Room, 20241 N 67th Ave, A101, Glendale, AZ 85308", rsvpUrl:PIE_FORM, rsvpLabel:"Reserve your pie", rsvpBy:"RSVP by Thu, Nov 19" },
  { slug:"thanksgiving-pie", date:"2026-11-24", start:"16:00", end:"18:30", title:"Thanksgiving Pie for Your Table: The Big Pie Party", type:"Thanksgiving", desc:"Everyone gets a free pie! Pick up your pumpkin or apple pie and stay for complimentary Italian pasta, sodas, hot cocoa and specialty coffees. Season of Giving: please bring a non-perishable item to give to those in need.", rsvpUrl:PIE_FORM, rsvpLabel:"Reserve your pie", rsvpBy:"RSVP by Thu, Nov 19" },
  { slug:"new-year-cheers", date:"2027-01-14", start:"16:00", end:"18:00", title:"New Year Cheers",                      type:"Happy Hour",   desc:"Our New Year happy hour. Kick off 2027 with drinks, bites and great company at The Keg in Tempe.", location:"The Keg Steakhouse + Bar, 23 S McClintock Dr, Tempe, AZ 85288", capacity:60 },
  { slug:"wealth-builder-workshop", date:"2027-01-21", start:"18:00", end:"20:00", title:"Wealth Builder Workshop",               type:"Workshop", desc:"Your 2027 Wealth Plan: how to use the equity in your home to buy your first rental, run the numbers, and choose the right financing for a Phoenix-area investment property.", capacity:40 },
  { slug:"sweets-for-your-sweetheart", date:"2027-02-11", start:"16:00", end:"18:00", title:"Sweets for Your Sweetheart",               type:"Valentine\'s Day",   desc:"Stop by our Tempe office and pick up a sweet Valentine\'s gift, like chocolates and treats, for the special someone in your life." },
  { slug:"spring-training", date:"2027-03-13", start:"12:30", end:"16:00", title:"Spring Training Day", type:"Family", desc:"Take me out to the ballgame! Join us for a Cactus League spring training game. Meet the team before first pitch to pick up your tickets and a free team hat, then cheer with us all afternoon. Up to 4 seats per family. Exact game time and ballpark announced when the 2027 schedule is released.", location:"Cactus League ballpark (announced with the 2027 schedule)", capacity:150 },
  { slug:"spring-cheers", date:"2027-04-08", start:"16:00", end:"18:00", title:"Spring Cheers",                      type:"Happy Hour",   desc:"Spring happy hour with the team at The Keg in Chandler. Bring a friend!", location:"The Keg Steakhouse + Bar, 3065 W Chandler Blvd, Chandler, AZ 85226", capacity:60 },
  { slug:"bouquet-for-mom", date:"2027-05-06", start:"16:00", end:"18:00", title:"Build-Your-Own Bouquet for Mom",            type:"Mother\'s Day",   desc:"Stop by our Tempe office and build a custom bouquet for the moms in your life. Fresh flowers, wrapping and ribbon are all on us." },
  { slug:"treat-for-dad", date:"2027-06-17", start:"16:00", end:"18:00", title:"Treat for Dad",             type:"Father\'s Day",   desc:"Stop by our Tempe office and grab a little something for the dads in your life." },
  { slug:"summer-cheers", date:"2027-07-15", start:"16:00", end:"18:00", title:"Summer Cheers",                      type:"Happy Hour",   desc:"Beat the heat with cool drinks and good people at The Keg in Tempe.", location:"The Keg Steakhouse + Bar, 23 S McClintock Dr, Tempe, AZ 85288", capacity:60 },
  { slug:"private-screening", date:"2027-08-21", start:"09:30", end:"12:00", title:"Private Screening: Shrek 5",                       type:"Family",   desc:"We're renting out the theater! Bring the whole family to a private screening of Shrek 5 at Harkins Tempe Marketplace. Doors open at 9:30, movie starts at 10. Popcorn's on us.", location:"Harkins Theatres Tempe Marketplace, 2000 E Rio Salado Pkwy #1160, Tempe, AZ 85288", capacity:150 },
  { slug:"911-vigil", date:"2027-09-11", start:"19:00", end:"20:30", title:"9/11 Healing Field Candlelight Vigil", type:"Community", desc:"Join us at the Tempe Healing Field as the community honors the 2,977 lives lost on September 11. The evening ceremony features a pipe band, the honor guard, the National Anthem and Taps, and attendees place candles at the base of the flags. The reading of the names continues at 7:30. The Carol Royse Team is a proud sponsor, and snow cones are on us.", location:"Tempe Beach Park, 80 W Rio Salado Pkwy, Tempe, AZ 85281" },
  { slug:"kickoff-party", date:"2027-09-16", start:"17:00", end:"19:00", title:"Kickoff Party",       type:"Game Day",   desc:"Wear your team colors and watch Thursday Night Football with us at The Keg in Chandler.", location:"The Keg Steakhouse + Bar, 3065 W Chandler Blvd, Chandler, AZ 85226", capacity:60 },
  { slug:"fall-cheers", date:"2027-10-14", start:"16:00", end:"18:00", title:"Fall Cheers",                      type:"Happy Hour",   desc:"Fall happy hour with the team at The Keg at Desert Ridge.", location:"The Keg Steakhouse + Bar, 21001 N Tatum Blvd, Phoenix, AZ 85050", capacity:60 },
  { slug:"wealth-builder-workshop", date:"2027-10-21", start:"18:00", end:"20:00", title:"Wealth Builder Workshop",               type:"Workshop", desc:"Market Update and Year-End Investor Moves: where prices, rates and rents are heading, plus 1031 exchanges, cash-out refinancing and planning your next purchase before the new year.", capacity:40 },
  { slug:"thanksgiving-pie", date:"2027-11-22", start:"16:00", end:"18:00", title:"Thanksgiving Pie for Your Table: Scottsdale Pickup", type:"Thanksgiving", desc:"Our annual tradition is back! Everyone gets a free pie. Pick yours up in Scottsdale.", location:"Title Alliance of Arizona LLC, 6991 E Camelback Rd, Suite C230, Scottsdale, AZ 85251" },
  { slug:"thanksgiving-pie", date:"2027-11-22", start:"16:00", end:"18:00", title:"Thanksgiving Pie for Your Table: Glendale Pickup", type:"Thanksgiving", desc:"Our annual tradition is back! Everyone gets a free pie. Pick yours up in Glendale.", location:"TA Conference Room, 20241 N 67th Ave, A101, Glendale, AZ 85308" },
  { slug:"thanksgiving-pie", date:"2027-11-23", start:"16:00", end:"18:30", title:"Thanksgiving Pie for Your Table: The Big Pie Party", type:"Thanksgiving", desc:"Our annual tradition is back! Pick up your free pie and stay for food, drinks and the Season of Giving drive at our Tempe office." },
  { slug:"santas-cookie-workshop", date:"2027-12-11", start:"10:00", end:"13:00", title:"Santa's Cookie Workshop", type:"Christmas", desc:"Bring the whole family to our Tempe office for a holiday morning! Decorate Christmas cookies, sip hot cocoa, and take free photos with Santa that we'll text right to you. Please RSVP so we have enough cookies for everyone." },
];/* ========================================================= */

const loc=e=>e.location||OFFICE_ADDRESS;
const key=e=>`${e.date}|${e.title}`;
let COUNTS={};
const spotsLeft=e=>e.capacity&&key(e) in COUNTS?Math.max(0,e.capacity-COUNTS[key(e)]):null;
const isFull=e=>spotsLeft(e)===0;
const spotsBadge=e=>{const n=spotsLeft(e); if(n===null) return "";
  if(n===0) return `<div class="spots full">This event is full. Join the waitlist and we'll call you if a spot opens.</div>`;
  return n<=LOW_SPOTS_AT?`<div class="spots">🔥 Only ${n} spot${n===1?"":"s"} left</div>`:""};
const sponsorLine=e=>e.sponsor?`<div class="sponsor">Presented by ${e.sponsor.url?`<a href="${esc(e.sponsor.url)}" target="_blank" rel="noopener">${esc(e.sponsor.name)}</a>`:esc(e.sponsor.name)}</div>`:"";
const rsvpBtn=(e,cls)=>e.rsvpUrl?`<a class="btn ${cls}" href="${esc(e.rsvpUrl)}" target="_blank" rel="noopener">${esc(e.rsvpLabel||"RSVP")}</a>`:`<button class="btn ${cls}" data-rsvp="${e.id}">${isFull(e)?"Join waitlist":"RSVP"}</button>`;
const pageUrl=e=>`/events/${e.slug}/`;
const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const AZ_OFFSET="-07:00"; // Arizona has no daylight saving time

const toDate=(e,t)=>new Date(`${e.date}T${t}:00${AZ_OFFSET}`);
const fmtTime=t=>{let[h,m]=t.split(":").map(Number);const ap=h>=12?"pm":"am";h=h%12||12;return m?`${h}:${String(m).padStart(2,"0")}${ap}`:`${h}${ap}`};
const fmtLong=e=>{const[y,mo,d]=e.date.split("-").map(Number);const dt=new Date(y,mo-1,d);return `${DAYS[dt.getDay()]}, ${MONTHS[mo-1]} ${d}, ${y}`};
const fmtRange=e=>`${fmtTime(e.start)}${e.end?"–"+fmtTime(e.end):""}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const mapLink=e=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc(e))}`;

const now=new Date();
const upcoming=EVENTS.map((e,i)=>({...e,id:i})).filter(e=>toDate(e,e.end)>now).sort((a,b)=>toDate(a,a.start)-toDate(b,b.start));

/* Standard event card (used on the main page and in "More events") */
function cardHTML(e){const[,mo,d]=e.date.split("-").map(Number);return `
    <article class="card">
      <div class="card-top">
        <div class="date"><span class="m">${MONTHS[mo-1]}</span><span class="d">${d}</span></div>
        <div><span class="tag">${esc(e.type)}</span><h3><a href="${pageUrl(e)}">${esc(e.title)}</a></h3>
        <div class="meta">${fmtLong(e).split(",")[0]} · ${fmtRange(e)}</div></div>
      </div>
      <p>${esc(e.desc)}</p>
      ${sponsorLine(e)}
      ${e.rsvpBy?`<div class="meta" style="color:var(--gold);font-weight:600">⏰ ${esc(e.rsvpBy)}</div>`:""}
      ${spotsBadge(e)}
      <div class="meta">📍 <a href="${mapLink(e)}" target="_blank" rel="noopener">${esc(loc(e))}</a></div>
      <div class="card-actions">
        ${rsvpBtn(e,"btn-navy")}
        <button class="btn btn-ghost" data-ics="${e.id}">Add to calendar</button>
        <a class="details" href="${pageUrl(e)}">Details →</a>
      </div>
    </article>`}

/* Countdown boxes */
function startCountdown(e,elId){
  const tick=()=>{const el=document.getElementById(elId); if(!el) return; let s=Math.max(0,(toDate(e,e.start)-new Date())/1000);
    const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);
    el.innerHTML=[[d,"days"],[h,"hrs"],[m,"min"]].map(([v,l])=>`<div class="cd"><b>${v}</b><span>${l}</span></div>`).join("")};
  tick(); clearInterval(window.__cd); window.__cd=setInterval(tick,30000);
}

/* .ics download */
function ics(e){
  const z=d=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
  const body=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Carol Royse Team//Events//EN","BEGIN:VEVENT",
    `UID:crt-${e.date}-${e.id}@carolroysereviews.com`,`DTSTAMP:${z(new Date())}`,
    `DTSTART:${z(toDate(e,e.start))}`,`DTEND:${z(toDate(e,e.end||e.start))}`,
    `SUMMARY:Carol Royse Team ${e.title}`,`DESCRIPTION:${e.desc.replace(/,/g,"\\,")}\\n\\nhttps://carolroysereviews.com${pageUrl(e)}`,
    `LOCATION:${loc(e).replace(/,/g,"\\,")}`,"END:VEVENT","END:VCALENDAR"].join("\r\n");
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([body],{type:"text/calendar"}));
  a.download=`CRT-${e.title.replace(/\W+/g,"-")}-${e.date}.ics`; a.click();
}

/* RSVP send */
async function sendRsvp(e,p){
  const data={source:"CarolRoyseReviews.com/Events",page:location.pathname,event:e.title,eventDate:e.date,eventTime:fmtTime(e.start),
    firstName:p.firstName,lastName:p.lastName,email:p.email,phone:p.phone,guests:p.guests,
    friend:p.friend||null,waitlist:!!p.waitlist,chainedFrom:p.chainedFrom||null,
    submittedAt:new Date().toISOString(),
    tags:["Event RSVP",e.title].concat(p.waitlist?["Event Waitlist"]:[]).concat(p.chainedFrom?["Multi-Event RSVP"]:[])};
  try{ if(RSVP_ENDPOINT) await fetch(RSVP_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); }catch(_){}
  if(key(e) in COUNTS) COUNTS[key(e)]+=parseInt(p.guests)||1;
}
function nextEventAfter(e){
  return upcoming.find(x=>!x.rsvpUrl&&toDate(x,x.start)>toDate(e,e.start)&&x.title!==e.title)||null;
}

/* Live spots-left counts (pages still work if this fails). Each page sets window.onCounts to re-render. */
async function loadCounts(){
  if(!AVAILABILITY_ENDPOINT) return;
  try{ const r=await fetch(AVAILABILITY_ENDPOINT); if(!r.ok) return; const j=await r.json(); COUNTS=j.counts||{}; if(window.onCounts) window.onCounts(); }catch(_){}
}

/* RSVP modal (needs the <dialog id="rsvp"> markup on the page) */
const dlg=document.getElementById("rsvp"); let current=null; const formHTML=document.getElementById("mBody").innerHTML;
function openRsvp(e){
  current=e;
  document.getElementById("mDate").textContent=`${fmtLong(e)} · ${fmtTime(e.start)}`;
  document.getElementById("mTitle").textContent=e.title;
  document.getElementById("mBody").innerHTML=formHTML;
  if(isFull(e)) document.getElementById("submitBtn").textContent="Join the waitlist";
  bindForm(); dlg.showModal();
}
function bindForm(){
  document.getElementById("cancel").onclick=()=>dlg.close();
  document.getElementById("rsvpForm").onsubmit=async ev=>{
    ev.preventDefault(); const f=ev.target;
    if(f.company.value) return; // spam trap
    if(!f.reportValidity()) return;
    const btn=document.getElementById("submitBtn"); btn.disabled=true; btn.textContent="Saving…";
    const person={firstName:f.firstName.value.trim(),lastName:f.lastName.value.trim(),email:f.email.value.trim(),phone:f.phone.value.trim()};
    const friend=f.friendName.value.trim()||f.friendPhone.value.trim()?{name:f.friendName.value.trim(),phone:f.friendPhone.value.trim()}:null;
    const waitlist=isFull(current);
    await sendRsvp(current,{...person,guests:f.guests.value,friend,waitlist});
    const nxt=nextEventAfter(current);
    document.getElementById("mBody").innerHTML=`<div class="success"><div class="check">✓</div>
      <h3 style="margin:0 0 6px;color:var(--navy-deep)">${waitlist?`You're on the waitlist, ${esc(person.firstName)}!`:`You're on the list, ${esc(person.firstName)}!`}</h3>
      <p class="meta" style="margin:0 0 18px">${waitlist?"We'll call you the moment a spot opens.":"We'll text you a confirmation and a reminder before the event."}${friend&&friend.name?` We saved a spot for ${esc(friend.name)} too.`:""}</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-ghost" id="addCal">Add to calendar</button>
      <button class="btn ${nxt?"btn-ghost":"btn-gold"}" id="done">Done</button></div>
      ${nxt?`<div class="upsell" id="upsell"><small>Up next</small><b>${esc(nxt.title)}</b>
        <div class="meta">${fmtLong(nxt)} · ${fmtRange(nxt)}</div>
        <button class="btn btn-gold" id="alsoBtn" style="width:100%;justify-content:center">${isFull(nxt)?"Join that waitlist too":"Save my spot for this one too"}</button></div>`:""}
      </div>`;
    document.getElementById("addCal").onclick=()=>ics(current);
    if(nxt) document.getElementById("alsoBtn").onclick=async()=>{
      const b=document.getElementById("alsoBtn"); b.disabled=true; b.textContent="Saving…";
      await sendRsvp(nxt,{...person,guests:f.guests.value,friend:null,waitlist:isFull(nxt),chainedFrom:current.title});
      document.getElementById("upsell").innerHTML=`<small>Up next</small><b>You're set for ${esc(nxt.title)} too! 🎉</b>
        <div class="meta" style="margin-bottom:10px">${fmtLong(nxt)} · ${fmtTime(nxt.start)}</div>
        <button class="btn btn-ghost" id="addCal2">Add this one to calendar</button>`;
      document.getElementById("addCal2").onclick=()=>ics(nxt);
    };
    document.getElementById("done").onclick=()=>dlg.close();
  };
}
dlg.addEventListener("click",ev=>{if(ev.target===dlg)dlg.close()});
document.addEventListener("click",ev=>{
  const r=ev.target.closest("[data-rsvp]"); if(r) return openRsvp(upcoming.find(e=>e.id==r.dataset.rsvp));
  const c=ev.target.closest("[data-ics]"); if(c) return ics(upcoming.find(e=>e.id==c.dataset.ics));
});
