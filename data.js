// ─────────────────────────────────────────────────────────
//  Yatra Yug — Shared Data & Utilities
// ─────────────────────────────────────────────────────────

const DESTINATIONS = [
  { id:1,  name:'Manali',          state:'Himachal Pradesh', desc:'Snow-capped peaks, adventure sports, and serene valleys make Manali a paradise for mountain lovers.',    km:2050, budget:45, cat:'Mountains',  season:'Oct–Jun', rating:4.8, emoji:'🏔️', color:'#1a3a5c' },
  { id:2,  name:'Jaipur',          state:'Rajasthan',        desc:'The Pink City dazzles with grand forts, vibrant bazaars, and royal palaces echoing Rajput glory.',       km:1200, budget:35, cat:'Heritage',   season:'Nov–Mar', rating:4.7, emoji:'🏰', color:'#8B2500' },
  { id:3,  name:'Goa',             state:'Goa',              desc:'Golden beaches, Portuguese heritage, and electric nightlife make Goa India\'s ultimate coastal escape.', km:600,  budget:40, cat:'Beach',      season:'Nov–Feb', rating:4.9, emoji:'🏖️', color:'#006666' },
  { id:4,  name:'Munnar',          state:'Kerala',           desc:'Lush tea gardens carpeting misty hills — Munnar is Kerala\'s most enchanting hill station.',             km:1600, budget:50, cat:'Hills',       season:'Sep–May', rating:4.7, emoji:'🍃', color:'#1a4a1a' },
  { id:5,  name:'Leh-Ladakh',      state:'J&K / Ladakh',     desc:'High-altitude desert, monasteries, and the world\'s most breathtaking mountain roads await.',           km:2700, budget:55, cat:'Adventure',  season:'Jun–Sep', rating:4.9, emoji:'⛰️', color:'#2c1a0e' },
  { id:6,  name:'Shimla',          state:'Himachal Pradesh', desc:'Colonial charm, toy-train rides, and apple orchards — Shimla is nostalgia wrapped in mountain mist.',   km:1700, budget:40, cat:'Mountains',  season:'Mar–Jun', rating:4.6, emoji:'🚂', color:'#3a1c71' },
  { id:7,  name:'Darjeeling',      state:'West Bengal',      desc:'The queen of hills, world-famous tea, and a glorious sunrise over Kanchenjunga.',                       km:2100, budget:45, cat:'Hills',       season:'Mar–May', rating:4.7, emoji:'🌅', color:'#0d3b2e' },
  { id:8,  name:'Ooty',            state:'Tamil Nadu',       desc:'The Nilgiri queen with emerald-green valleys, rose gardens, and a charming heritage railway.',           km:1500, budget:38, cat:'Hills',       season:'Oct–Jun', rating:4.5, emoji:'🌹', color:'#2d5016' },
  { id:9,  name:'Udaipur',         state:'Rajasthan',        desc:'City of Lakes — shimmering palaces on water make Udaipur one of the world\'s most romantic cities.',    km:1200, budget:38, cat:'Heritage',   season:'Sep–Mar', rating:4.8, emoji:'💎', color:'#4a1a4a' },
  { id:10, name:'Agra',            state:'Uttar Pradesh',    desc:'Home to the immortal Taj Mahal and Mughal grandeur frozen in marble and red sandstone.',                km:1300, budget:30, cat:'Heritage',   season:'Oct–Mar', rating:4.8, emoji:'🕌', color:'#5c3a00' },
  { id:11, name:'Varanasi',        state:'Uttar Pradesh',    desc:'The eternal city on the Ganga — ghats, temples, and rituals that have flowed unbroken for millennia.', km:1400, budget:32, cat:'Spiritual',  season:'Oct–Mar', rating:4.7, emoji:'🪔', color:'#8B4513' },
  { id:12, name:'Rishikesh',       state:'Uttarakhand',      desc:'Yoga capital of the world, white-water rafting, and sacred Ganga banks in the Himalayan foothills.',   km:1300, budget:35, cat:'Adventure',  season:'Sep–Jun', rating:4.6, emoji:'🧘', color:'#1a4a3a' },
  { id:13, name:'Coorg',           state:'Karnataka',        desc:'Scotland of India — misty coffee estates, waterfalls, and warrior heritage in the Western Ghats.',      km:1100, budget:42, cat:'Nature',     season:'Oct–May', rating:4.7, emoji:'☕', color:'#2d4a1a' },
  { id:14, name:'Andaman Islands', state:'Andaman & Nicobar',desc:'Pristine coral reefs, crystal-clear water, and untouched beaches at the edge of the Indian Ocean.',    km:2400, budget:70, cat:'Beach',      season:'Oct–May', rating:4.9, emoji:'🐠', color:'#003366' },
  { id:15, name:'Mysuru',          state:'Karnataka',        desc:'Royal palaces, sandalwood fragrance, and the grandest Dasara celebration in the country.',              km:1200, budget:35, cat:'Heritage',   season:'Oct–Feb', rating:4.6, emoji:'👑', color:'#4a3a00' },
  { id:16, name:'Nainital',        state:'Uttarakhand',      desc:'A sparkling lake nestled between hills — Nainital is Uttarakhand\'s most beloved hill retreat.',        km:1500, budget:38, cat:'Mountains',  season:'Mar–Jun', rating:4.5, emoji:'🏞️', color:'#1a2a4a' },
  { id:17, name:'Jim Corbett',     state:'Uttarakhand',      desc:'India\'s oldest national park — dense sal forests, the Ramganga river, and the Bengal tiger.',         km:1400, budget:45, cat:'Wildlife',   season:'Nov–Jun', rating:4.7, emoji:'🐯', color:'#3a2500' },
  { id:18, name:'Ranthambore',     state:'Rajasthan',        desc:'Ancient fort ruins rising above a tiger reserve — wildlife and history in one dramatic landscape.',     km:1100, budget:42, cat:'Wildlife',   season:'Oct–Jun', rating:4.6, emoji:'🦁', color:'#5c2a00' },
  { id:19, name:'Spiti Valley',    state:'Himachal Pradesh', desc:'Cold desert mountain valley — monasteries, fossils, and stark lunar landscapes at 12,500 ft.',          km:2400, budget:52, cat:'Adventure',  season:'Jun–Oct', rating:4.8, emoji:'🏜️', color:'#2a1a0a' },
  { id:20, name:'Hampi',           state:'Karnataka',        desc:'UNESCO World Heritage ruins of the Vijayanagara Empire set among giant boulders on the Tungabhadra.',  km:1400, budget:38, cat:'Heritage',   season:'Oct–Feb', rating:4.8, emoji:'🗿', color:'#5c3a1a' },
];

const PLACES = {
  1:  [{name:'Rohtang Pass',type:'Adventure',desc:'Snow-covered high mountain pass with stunning 360° views'},{name:'Solang Valley',type:'Adventure',desc:'Skiing, paragliding and cable car rides over snow-covered hills'},{name:'Hadimba Temple',type:'Spiritual',desc:'Ancient wooden temple amidst deodar forests built in 1553'},{name:'Beas River',type:'Nature',desc:'White-water rafting and scenic riverside camping'}],
  2:  [{name:'Amber Fort',type:'Heritage',desc:'Magnificent hilltop fort with intricate mirror palace Sheesh Mahal'},{name:'Hawa Mahal',type:'Heritage',desc:'Iconic palace of winds with 953 small windows'},{name:'City Palace',type:'Heritage',desc:'Royal palace complex in the heart of the Pink City'},{name:'Jantar Mantar',type:'Heritage',desc:'UNESCO astronomical instruments from the 18th century'}],
  3:  [{name:'Baga Beach',type:'Beach',desc:'Lively beach with water sports, shacks and vibrant nightlife'},{name:'Old Goa Churches',type:'Heritage',desc:'Portuguese-era UNESCO World Heritage basilicas and churches'},{name:'Dudhsagar Falls',type:'Nature',desc:'Majestic 4-tiered waterfall inside Bhagwan Mahaveer Sanctuary'},{name:'Anjuna Market',type:'Shopping',desc:'Famous hippie flea market running every Wednesday'}],
  4:  [{name:'Eravikulam NP',type:'Wildlife',desc:'Home to the endangered Nilgiri Tahr — the mountain goat'},{name:'Tea Museum',type:'Culture',desc:'Interactive museum inside a working Munnar tea factory'},{name:'Mattupetty Dam',type:'Nature',desc:'Scenic reservoir surrounded by lush tea gardens'},{name:'Echo Point',type:'Nature',desc:'Acoustic wonder with stunning valley views'}],
  5:  [{name:'Pangong Lake',type:'Nature',desc:'Crystal-blue high-altitude lake straddling India-China border'},{name:'Thiksey Monastery',type:'Spiritual',desc:'12-storey Buddhist monastery resembling the Potala Palace'},{name:'Nubra Valley',type:'Nature',desc:'Double-humped Bactrian camels in a sand dune desert valley'},{name:'Magnetic Hill',type:'Wonder',desc:'Mysterious road that appears to defy gravity'}],
  6:  [{name:'The Ridge',type:'Landmark',desc:'Central promenade with panoramic Himalayan views and colonial buildings'},{name:'Kalka-Shimla Railway',type:'Adventure',desc:'UNESCO narrow-gauge toy train through 103 tunnels'},{name:'Jakhu Temple',type:'Spiritual',desc:'Ancient Hanuman temple with sweeping Himalayan vistas'},{name:'Kufri',type:'Adventure',desc:'Popular ski resort 16 km from Shimla'}],
  7:  [{name:'Tiger Hill',type:'Nature',desc:'Iconic sunrise over Mt Kanchenjunga — India\'s highest peak'},{name:'Darjeeling Himalayan Rwy',type:'Heritage',desc:'UNESCO toy train through misty hills since 1881'},{name:'Happy Valley Tea',type:'Culture',desc:'Premium Darjeeling tea factory tour with tasting session'},{name:'Batasia Loop',type:'Landmark',desc:'Spectacular railway spiral with war memorial'}],
  8:  [{name:'Botanical Gardens',type:'Nature',desc:'150-year-old gardens with rare flora and a 20-million-year-old fossil tree'},{name:'Doddabetta Peak',type:'Nature',desc:'Highest peak in the Nilgiris at 2637m with telescope house'},{name:'Pykara Falls',type:'Nature',desc:'Stunning waterfall in a dense shola forest'},{name:'Nilgiri Mountain Rwy',type:'Heritage',desc:'UNESCO rack railway from Mettupalayam to Ooty'}],
  9:  [{name:'City Palace',type:'Heritage',desc:'Largest palace complex on Lake Pichola with stunning architecture'},{name:'Lake Pichola',type:'Nature',desc:'Shimmering artificial lake with iconic island palaces'},{name:'Saheliyon ki Bari',type:'Heritage',desc:'18th century Garden of the Maids of Honour with fountains'},{name:'Jagdish Temple',type:'Spiritual',desc:'Largest temple in Udaipur dedicated to Lord Vishnu'}],
  10: [{name:'Taj Mahal',type:'Heritage',desc:'UNESCO ivory marble mausoleum — one of the 7 Wonders of the World'},{name:'Agra Fort',type:'Heritage',desc:'Massive Mughal fort of red sandstone with exquisite palaces'},{name:'Fatehpur Sikri',type:'Heritage',desc:'Abandoned Mughal capital city — UNESCO World Heritage Site'},{name:'Mehtab Bagh',type:'Nature',desc:'Moon garden with the finest view of the Taj across the Yamuna'}],
  11: [{name:'Dashashwamedh Ghat',type:'Spiritual',desc:'Grand Ganga Aarti fire ceremony performed every evening'},{name:'Kashi Vishwanath',type:'Spiritual',desc:'One of the 12 sacred Jyotirlingas of Lord Shiva'},{name:'Sarnath',type:'Spiritual',desc:'Where the Buddha gave his first sermon after enlightenment'},{name:'Ramnagar Fort',type:'Heritage',desc:'17th century fort-museum on the eastern bank of the Ganga'}],
  12: [{name:'Laxman Jhula',type:'Landmark',desc:'Iconic iron suspension bridge over the Ganga built in 1929'},{name:'Ganga Rafting',type:'Adventure',desc:'Thrilling Class 3–4 white-water rapids through scenic gorges'},{name:'Beatles Ashram',type:'Culture',desc:'Maharishi\'s abandoned ashram where The Beatles stayed in 1968'},{name:'Neelkanth Temple',type:'Spiritual',desc:'Sacred Shiva temple 32 km from Rishikesh in dense forest'}],
  13: [{name:'Abbey Falls',type:'Nature',desc:'Stunning 70-foot waterfall surrounded by a working coffee estate'},{name:'Raja\'s Seat',type:'Nature',desc:'Royal garden used by kings of Coorg with panoramic sunset views'},{name:'Nagarhole NP',type:'Wildlife',desc:'Diverse wildlife including wild elephants, tigers and leopards'},{name:'Talakaveri',type:'Spiritual',desc:'Origin of the river Kaveri atop the Brahmagiri hills'}],
  14: [{name:'Radhanagar Beach',type:'Beach',desc:'Asia\'s best beach — turquoise waters, white sand and stunning sunsets'},{name:'Cellular Jail',type:'Heritage',desc:'Colonial prison known as "Kala Pani" — now a National Memorial'},{name:'Havelock Island',type:'Beach',desc:'Snorkelling and scuba diving in pristine coral reefs'},{name:'Ross Island',type:'Heritage',desc:'Ruins of the British administrative headquarters in the Andamans'}],
  15: [{name:'Mysore Palace',type:'Heritage',desc:'Ornate royal palace illuminated by 97,000 bulbs on Sundays'},{name:'Chamundi Hills',type:'Spiritual',desc:'Temple atop 300-step hill with sweeping views of the city'},{name:'Brindavan Gardens',type:'Nature',desc:'Spectacular musical fountain garden at Krishna Raja Sagara dam'},{name:'Mysore Zoo',type:'Wildlife',desc:'One of India\'s oldest and finest zoological gardens'}],
  16: [{name:'Naini Lake',type:'Nature',desc:'Heart-shaped lake surrounded by seven hills — the soul of Nainital'},{name:'Snow View Point',type:'Nature',desc:'Panoramic Himalayan views via cable car at 2270m'},{name:'Nainital Zoo',type:'Wildlife',desc:'High-altitude zoo with Himalayan animals including snow leopard'},{name:'Tiffin Top',type:'Nature',desc:'Scenic hilltop viewpoint reached by horseback ride'}],
  17: [{name:'Dhikala Zone',type:'Wildlife',desc:'Best zone inside Corbett for Bengal tiger sightings'},{name:'Ramganga River',type:'Nature',desc:'Crocodile sunbathing spots and exceptional bird watching'},{name:'Corbett Museum',type:'Culture',desc:'Museum in Jim Corbett\'s bungalow with his personal memorabilia'},{name:'Garjia Temple',type:'Spiritual',desc:'Shiva temple on a large rock in the middle of the Kosi river'}],
  18: [{name:'Ranthambore Fort',type:'Heritage',desc:'UNESCO heritage 10th century fort inside the tiger reserve'},{name:'Zone 3 & 4',type:'Wildlife',desc:'Most popular jeep safari zones for tiger photography'},{name:'Padam Lake',type:'Nature',desc:'Crocodile and water bird watching by the scenic lake'},{name:'Jogi Mahal',type:'Heritage',desc:'Historic forest rest house next to the Padam Talao'}],
  19: [{name:'Key Monastery',type:'Spiritual',desc:'1000-year-old Tibetan monastery at 4166m altitude'},{name:'Chandratal Lake',type:'Nature',desc:'Moon Lake — one of the most beautiful high-altitude lakes in the Himalayas'},{name:'Kaza',type:'Culture',desc:'Main town and cultural hub of Spiti Valley at 3800m'},{name:'Pin Valley NP',type:'Wildlife',desc:'Snow leopard habitat and rare high-altitude flora'}],
  20: [{name:'Virupaksha Temple',type:'Spiritual',desc:'Living temple worshipped since the 7th century — still active today'},{name:'Vittala Temple',type:'Heritage',desc:'Stone chariot and musical pillars — UNESCO World Heritage Site'},{name:'Hampi Bazaar',type:'Heritage',desc:'Ancient marketplace ruins stretching nearly 1 km in length'},{name:'Lotus Mahal',type:'Heritage',desc:'Delicately carved Indo-Islamic style palace in the Zenana Enclosure'}],
};

const BUS_RATES = { Standard: 2.5, Sleeper: 3.5, Luxury: 4.0, 'Volvo AC': 5.0 };

function calcBudget(km, passengers, busType) {
  const rate = BUS_RATES[busType] || 2.5;
  const fuel  = Math.round(km * rate * passengers);
  const accom = passengers * 1500;
  const food  = passengers * 800;
  const sight = passengers * 500;
  const misc  = passengers * 300;
  const total = fuel + accom + food + sight + misc;
  return { fuel, accom, food, sight, misc, total };
}

function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

// ── Auth helpers ──
function hashSimple(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h.toString(16);
}

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    localStorage.removeItem(key);
    return fallback;
  }
}

function getUsers()   { return readStoredJson('tb_users', []); }
function saveUsers(u) { localStorage.setItem('tb_users', JSON.stringify(u)); }
function getSession() { return readStoredJson('tb_session', null); }
function setSession(u){ localStorage.setItem('tb_session', JSON.stringify(u)); }
function clearSession(){ localStorage.removeItem('tb_session'); }
function getBookings(uid) { return readStoredJson('tb_bookings_' + uid, []); }
function saveBookings(uid, b) { localStorage.setItem('tb_bookings_' + uid, JSON.stringify(b)); }

function requireLogin(redirectTo) {
  if (!getSession()) {
    window.location.href = 'login.html?next=' + encodeURIComponent(redirectTo || window.location.href);
    return false;
  }
  return true;
}

function renderNavUser(navId) {
  const u = getSession();
  const el = document.getElementById(navId || 'navUser');
  if (!el) return;
  if (u) {
    el.innerHTML = `
      <a href="dashboard.html" class="nav-link hide-m">My Trips</a>
      <div class="user-badge">
        <div class="user-av">${u.name[0].toUpperCase()}</div>
        <span class="hide-m">${u.name.split(' ')[0]}</span>
      </div>
      <a href="#" onclick="logout()" class="nav-out">Logout</a>`;
  } else {
    el.innerHTML = `
      <a href="login.html" class="nav-link hide-m">Login</a>
      <a href="register.html" class="nav-cta">Get Started →</a>`;
  }
}

function logout() { clearSession(); window.location.href = 'index.html'; }

function today() { return new Date().toISOString().split('T')[0]; }

function handleInvalidSession(nextPath) {
  clearSession();
  const target = nextPath || window.location.pathname.split('/').pop() || 'dashboard.html';
  window.location.href = 'login.html?next=' + encodeURIComponent(target) + '&reason=session';
}

async function apiRequest(path, options) {
  const opts = options || {};
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  let res;
  try {
    res = await fetch(path, Object.assign({}, opts, { headers }));
  } catch (err) {
    if (window.location.protocol === 'file:') {
      throw new Error('Open the site through `server.py`, not by double-clicking the HTML files.');
    }
    throw new Error('Cannot reach the local server. Start `server.py` and refresh the page.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Request failed.');
  }
  return data;
}

function normalizeBooking(row) {
  return {
    id: row.id,
    userId: row.user_id,
    destId: row.destination_id,
    destName: row.destination_name,
    state: row.state,
    emoji: row.emoji,
    color: row.color,
    season: row.season,
    km: row.km,
    tDate: row.travel_date,
    rDate: row.return_date,
    pax: row.passengers,
    bus: row.bus_type,
    budget: {
      fuel: row.fuel_cost,
      accom: row.accom_cost,
      food: row.food_cost,
      sight: row.sight_cost,
      misc: row.misc_cost,
      total: row.total_cost
    },
    status: row.status,
    bookedAt: row.booked_at
  };
}

async function apiRegisterUser(payload) {
  const data = await apiRequest('/api/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return data.user;
}

async function apiLoginUser(email, passwordHash) {
  const data = await apiRequest('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password_hash: passwordHash })
  });
  return data.user;
}

async function apiGetBookings(userId) {
  const data = await apiRequest('/api/bookings?user_id=' + encodeURIComponent(userId));
  return (data.bookings || []).map(normalizeBooking);
}

async function apiGetBooking(userId, bookingId) {
  const data = await apiRequest('/api/bookings/' + encodeURIComponent(bookingId) + '?user_id=' + encodeURIComponent(userId));
  return normalizeBooking(data.booking);
}

async function apiCreateBooking(payload) {
  const data = await apiRequest('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return data;
}

async function apiGetPlannedTrips() {
  const data = await apiRequest('/api/planned-trips');
  return data.planned_trips || [];
}
