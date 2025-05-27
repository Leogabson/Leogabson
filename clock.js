const timeZones = [
  { city: "New York, USA", zone: "America/New_York", offset: -4 },
  { city: "London, UK", zone: "Europe/London", offset: 1 },
  { city: "Tokyo, Japan", zone: "Asia/Tokyo", offset: 9 },
  { city: "Nairobi, Kenya", zone: "Africa/Nairobi", offset: 3 },
  { city: "Moscow, Russia", zone: "Europe/Moscow", offset: 3 },
  { city: "Rio de Janeiro, Brazil", zone: "America/Sao_Paulo", offset: -3 },
  { city: "Sydney, Australia", zone: "Australia/Sydney", offset: 10 },
  { city: "Dubai, UAE", zone: "Asia/Dubai", offset: 4 },
  { city: "Delhi, India", zone: "Asia/Kolkata", offset: 5.5 },
  { city: "Beijing, China", zone: "Asia/Shanghai", offset: 8 },
];

async function fetchTime(zone) {
  try {
    const res = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
    const data = await res.json();
    return new Date(data.datetime);
  } catch (error) {
    console.warn(`API failed for ${zone}, falling back to local offset.`);
    return null;
  }
}

function getLocalTimeWithOffset(offset) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offset);
}

async function updateClocks() {
  const container = document.getElementById("clockContainer");
  container.innerHTML = "";

  for (const tz of timeZones) {
    const date =
      (await fetchTime(tz.zone)) || getLocalTimeWithOffset(tz.offset);
    const card = document.createElement("div");
    card.className = "alarm-card";
    card.innerHTML = `
      <p class="time">${date.toLocaleTimeString()}</p>
      <p class="label">${tz.city}</p>
      <p class="repeat">${tz.zone}</p>
    `;
    container.appendChild(card);
  }
}

updateClocks();
setInterval(updateClocks, 60000); // refresh every minute
