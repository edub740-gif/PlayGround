const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const state = {
  view: 'home',
  browseKind: 'movies',
  browseFilter: 'All',
  heroIndex: 0,
  heroId: FEATURED_IDS[0],
  heroTimer: null,
  searchOpen: false,
  playerOpen: false,
  menuOpen: false,
  myList: readStore('tubi:list', []),
  progress: readStore('tubi:progress', {}),
  playback: null,
  previewTried: false,
  statusTimer: null,
  idleTimer: null
};

function readStore(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function findTitle(id) {
  return CATALOG.find((title) => title.id === id);
}

function findEpisode(title, episodeId) {
  if (!title?.episodes) return null;
  return title.episodes.find((episode) => episode.id === episodeId) || null;
}

function allSources() {
  const sources = new Map();
  const add = (title) => {
    if (!title.source) return;
    const key = title.source.url;
    if (!sources.has(key)) {
      sources.set(key, {
        title: title.title,
        url: title.source.url,
        name: title.source.name,
        item: title.source.item,
        license: title.source.license,
        licenseUrl: title.source.licenseUrl
      });
    }
  };
  CATALOG.forEach((title) => {
    add(title);
    (title.episodes || []).forEach(add);
  });
  return Array.from(sources.values());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function metaLine(title) {
  const parts = [title.year, title.runtime, title.type === 'show' ? 'Series' : title.genres[0]];
  return parts.filter(Boolean).join(' · ');
}

function progressFor(id) {
  const entry = state.progress[id];
  if (!entry || !entry.duration) return 0;
  return Math.max(0, Math.min(100, (entry.position / entry.duration) * 100));
}

function isSaved(id) {
  return state.myList.includes(id);
}

function syncBodyLock() {
  const dialogOpen = $('#detailDialog').open || $('#sourcesDialog').open;
  document.body.classList.toggle('is-locked', state.searchOpen || state.playerOpen || state.menuOpen || dialogOpen);
}

function showToast(message, duration = 2400) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), duration);
}

function setActiveNav(view, kind) {
  $$('.nav-link, .mobile-nav-link, .mobile-menu [data-view-link]').forEach((link) => {
    const target = link.dataset.viewLink;
    const active = target === view || (view === 'browse' && target === kind);
    link.classList.toggle('is-active', active);
  });
}

function syncGenreStrip() {
  const active = state.view === 'movies' ? state.browseFilter : 'All';
  $$('.genre-pill').forEach((pill) => {
    pill.classList.toggle('is-active', pill.dataset.genre === active);
  });
}

function renderMeta(title) {
  const parts = [];
  if (title.rating) parts.push(`<span class="meta-rating">${escapeHtml(title.rating)}</span>`);
  if (title.year) parts.push(`<span>${escapeHtml(title.year)}</span>`);
  if (title.runtime) parts.push(`<span>${escapeHtml(title.runtime)}</span>`);
  if (title.genres?.[0]) parts.push(`<span>${escapeHtml(title.genres.slice(0, 2).join(' · '))}</span>`);
  parts.push('<span class="meta-free">FREE</span>');
  return parts.join('<span class="meta-dot" aria-hidden="true"></span>');
}

function makeCard(title, options = {}) {
  if (!title) return null;
  const card = document.createElement('button');
  card.type = 'button';
  card.className = `card${title.type === 'show' ? ' is-show' : ''}${options.rank ? ' is-top10' : ''}`;
  card.dataset.titleId = title.id;
  card.setAttribute('aria-label', `${title.title}, ${title.year}, ${title.type === 'show' ? 'series' : 'movie'}`);
  const progress = progressFor(title.id);
  const badge = title.type === 'show' ? 'SERIES' : 'FREE';
  card.innerHTML = `
    ${options.rank ? `<span class="card-rank" aria-hidden="true">${options.rank}</span>` : ''}
    <span class="card-art" style="--accent:${title.accent || '#8b5cf6'}">
      <img src="${title.image}" alt="" loading="lazy">
      <span class="card-badge${title.type === 'show' ? '' : ' is-free'}">${badge}</span>
      <span class="card-rating">${escapeHtml(title.rating)}</span>
      <span class="card-play" aria-hidden="true"><svg><use href="#i-play"/></svg></span>
      ${progress > 1 && title.type !== 'show' ? `<span class="card-progress"><span style="width:${progress.toFixed(1)}%"></span></span>` : ''}
    </span>
    <span class="card-copy">
      <span class="card-title">${escapeHtml(title.title)}</span>
      <span class="card-meta">${escapeHtml(metaLine(title))}</span>
    </span>
  `;
  const image = card.querySelector('img');
  image.addEventListener('error', () => {
    image.remove();
    card.querySelector('.card-art').classList.add('is-fallback');
  }, { once: true });
  card.addEventListener('click', () => openDetail(title.id));
  return card;
}

function makeRow(titleText, items, options = {}) {
  if (!items.length) return null;
  const row = document.createElement('section');
  row.className = 'row';
  row.dataset.rowId = options.id || '';
  row.innerHTML = `
    <div class="row-head">
      <h2>${escapeHtml(titleText)}</h2>
      ${options.note ? `<span class="row-note">${escapeHtml(options.note)}</span>` : ''}
      ${options.link ? `<button class="row-link" data-view-link="${options.link}">See all</button>` : ''}
    </div>
    <div class="row-wrap">
      <button class="row-arrow prev" aria-label="Scroll ${escapeHtml(titleText)} left"><svg><use href="#i-chevron-left"/></svg></button>
      <div class="row-scroller"></div>
      <button class="row-arrow next" aria-label="Scroll ${escapeHtml(titleText)} right"><svg><use href="#i-chevron-right"/></svg></button>
    </div>
  `;
  const scroller = row.querySelector('.row-scroller');
  const prev = row.querySelector('.prev');
  const next = row.querySelector('.next');
  items.forEach((item, index) => {
    const card = makeCard(item, { rank: options.mode === 'top10' ? index + 1 : null });
    if (card) scroller.appendChild(card);
  });
  const updateArrows = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    prev.disabled = scroller.scrollLeft <= 4;
    next.disabled = scroller.scrollLeft >= max - 4;
    prev.style.opacity = prev.disabled ? '0.24' : '';
    next.style.opacity = next.disabled ? '0.24' : '';
  };
  prev.addEventListener('click', () => scroller.scrollBy({ left: -scroller.clientWidth * 0.82, behavior: 'smooth' }));
  next.addEventListener('click', () => scroller.scrollBy({ left: scroller.clientWidth * 0.82, behavior: 'smooth' }));
  scroller.addEventListener('scroll', updateArrows, { passive: true });
  requestAnimationFrame(updateArrows);
  window.addEventListener('resize', updateArrows);
  return row;
}

function makeLiveCard(channel) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'live-card';
  card.dataset.channelId = channel.id;
  card.innerHTML = `
    <img src="${channel.image}" alt="" loading="lazy">
    <span class="live-shade"></span>
    <span class="live-top">
      <span class="live-badge"><span class="live-dot"></span>LIVE</span>
      <span class="live-time">${escapeHtml(channel.time)}</span>
    </span>
    <span class="live-copy">
      <span class="live-channel">${escapeHtml(channel.name)}</span>
      <span class="live-now">${escapeHtml(channel.now)}</span>
      <span class="live-next">Up next · ${escapeHtml(channel.next)}</span>
      <span class="live-bar"><span style="width:${channel.progress}%"></span></span>
    </span>
  `;
  const image = card.querySelector('img');
  image.addEventListener('error', () => {
    image.style.background = `linear-gradient(135deg, ${channel.accent}, #0b0b11)`;
    image.removeAttribute('src');
  }, { once: true });
  card.addEventListener('click', () => {
    const title = findTitle(channel.itemId);
    if (title) openPlayer(title.id);
  });
  return card;
}

function renderHome() {
  const featured = findTitle(state.heroId) || findTitle(FEATURED_IDS[0]);
  $('#heroImage').src = featured.image;
  $('#heroImage').alt = '';
  $('#heroTitle').textContent = featured.title;
  $('#heroMeta').innerHTML = renderMeta(featured);
  $('#heroDesc').textContent = featured.description;
  $('#heroFootnote').textContent = `Free with ads · ${featured.heroKicker || 'Always'}`;
  $('#heroPlay').dataset.titleId = featured.id;
  $('#heroInfo').dataset.titleId = featured.id;
  updateSaveButton($('#heroSave'), featured.id, true);
  document.querySelectorAll('.hero-pager button').forEach((button, index) => {
    button.classList.toggle('is-active', index === state.heroIndex);
    if (index === state.heroIndex) {
      button.style.animation = 'none';
      void button.offsetWidth;
      button.style.animation = '';
    }
  });
  syncHeroVideo(featured);
}

function syncHeroVideo(featured) {
  const video = $('#heroVideo');
  if (!video) return;
  if (featured.id === 'big-buck-bunny' && !reducedMotion && window.innerWidth > 940 && !state.playerOpen) {
    clearTimeout(syncHeroVideo.timer);
    syncHeroVideo.timer = setTimeout(() => {
      if (state.heroId !== 'big-buck-bunny' || state.view !== 'home' || state.playerOpen) return;
      video.currentTime = 3;
      video.play().then(() => video.classList.add('is-playing')).catch(() => {});
    }, 2600);
  } else {
    video.pause();
    video.classList.remove('is-playing');
  }
}

function buildHeroPager() {
  const pager = $('#heroPager');
  pager.innerHTML = '';
  FEATURED_IDS.forEach((id, index) => {
    const title = findTitle(id);
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Featured: ${title.title}`);
    if (index === 0) button.classList.add('is-active');
    button.addEventListener('click', () => {
      state.heroIndex = index;
      state.heroId = id;
      renderHome();
      restartHeroRotation();
    });
    pager.appendChild(button);
  });
}

function restartHeroRotation() {
  clearInterval(state.heroTimer);
  if (state.view !== 'home' || reducedMotion) return;
  state.heroTimer = setInterval(() => {
    if (state.view !== 'home' || state.searchOpen || state.playerOpen) return;
    state.heroIndex = (state.heroIndex + 1) % FEATURED_IDS.length;
    state.heroId = FEATURED_IDS[state.heroIndex];
    renderHome();
  }, 8000);
}

function renderRows() {
  const rows = $('#rows');
  rows.innerHTML = '';
  const continueItems = Object.entries(state.progress)
    .filter(([, entry]) => entry.position > 6 && entry.duration > 0 && entry.position / entry.duration < 0.96)
    .sort((a, b) => (b[1].updated || 0) - (a[1].updated || 0))
    .map(([id]) => findTitle(id))
    .filter(Boolean)
    .slice(0, 10);
  if (continueItems.length) {
    const continueRow = makeRow('Continue watching', continueItems, { id: 'continue' });
    if (continueRow) rows.appendChild(continueRow);
  }
  HOME_ROWS.forEach((row) => {
    const items = row.items.map(findTitle).filter(Boolean);
    const element = makeRow(row.title, items, row);
    if (element) rows.appendChild(element);
  });
  const liveRow = document.createElement('section');
  liveRow.className = 'row';
  liveRow.innerHTML = `
    <div class="row-head">
      <h2>Live TV</h2>
      <span class="row-note"><span class="live-dot"></span> On air now</span>
      <button class="row-link" data-view-link="live">See all</button>
    </div>
    <div class="row-wrap">
      <button class="row-arrow prev" aria-label="Scroll live channels left"><svg><use href="#i-chevron-left"/></svg></button>
      <div class="row-scroller live-scroller"></div>
      <button class="row-arrow next" aria-label="Scroll live channels right"><svg><use href="#i-chevron-right"/></svg></button>
    </div>
  `;
  const liveScroller = liveRow.querySelector('.live-scroller');
  LIVE_CHANNELS.forEach((channel) => liveScroller.appendChild(makeLiveCard(channel)));
  const livePrev = liveRow.querySelector('.prev');
  const liveNext = liveRow.querySelector('.next');
  livePrev.addEventListener('click', () => liveScroller.scrollBy({ left: -liveScroller.clientWidth * 0.8, behavior: 'smooth' }));
  liveNext.addEventListener('click', () => liveScroller.scrollBy({ left: liveScroller.clientWidth * 0.8, behavior: 'smooth' }));
  rows.appendChild(liveRow);
}

function renderBrowse() {
  const kind = state.browseKind;
  const view = $('#browseView');
  view.hidden = false;
  const titleEl = $('#browseTitle');
  const subtitle = $('#browseSubtitle');
  const filters = $('#browseFilters');
  let base;
  if (kind === 'shows') {
    base = CATALOG.filter((title) => title.type === 'show');
    titleEl.textContent = 'TV Shows';
    subtitle.textContent = 'Series, shorts, and animated worlds to get lost in.';
  } else if (kind === 'mylist') {
    base = CATALOG.filter((title) => state.myList.includes(title.id));
    titleEl.textContent = 'My List';
    subtitle.textContent = base.length ? `${base.length} saved title${base.length === 1 ? '' : 's'} — ready when you are.` : 'Your saved movies and shows, all in one place.';
  } else {
    base = CATALOG.filter((title) => title.type === 'movie');
    titleEl.textContent = 'Movies';
    subtitle.textContent = 'Every title, free to watch. No subscription, no credit card.';
  }
  filters.innerHTML = '';
  const showFilters = kind !== 'mylist';
  if (showFilters && state.browseFilter !== 'All') {
    const allChip = document.createElement('button');
    allChip.className = 'filter-chip';
    allChip.textContent = 'Clear';
    allChip.addEventListener('click', () => setBrowseFilter('All'));
    filters.appendChild(allChip);
  }
  if (kind === 'movies') {
    BROWSE_FILTERS.forEach((label) => filters.appendChild(makeFilterChip(label)));
  } else if (kind === 'shows') {
    ['All', 'Animation', 'Comedy', 'Kids'].forEach((label) => filters.appendChild(makeFilterChip(label)));
  }
  const filtered = state.browseFilter === 'All' ? base : base.filter((title) => title.genres.includes(state.browseFilter));
  const grid = $('#browseGrid');
  grid.innerHTML = '';
  filtered.forEach((title) => {
    const card = makeCard(title);
    if (card) grid.appendChild(card);
  });
  const empty = $('#browseEmpty');
  empty.hidden = filtered.length > 0;
  grid.hidden = filtered.length === 0;
  if (kind === 'mylist') {
    empty.querySelector('h3').textContent = 'Your list is empty';
    empty.querySelector('p').textContent = 'Tap the + on any movie or show and it will show up here.';
  } else {
    empty.querySelector('h3').textContent = 'Nothing matches that filter';
    empty.querySelector('p').textContent = 'Try a different genre or clear the filter.';
  }
  if (filtered.length === 0 && kind === 'mylist') {
    empty.querySelector('button').textContent = 'Find something to watch';
    empty.querySelector('button').onclick = null;
  } else {
    empty.querySelector('button').textContent = 'Clear filter';
    empty.querySelector('button').onclick = () => setBrowseFilter('All');
  }
}

function makeFilterChip(label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `filter-chip${state.browseFilter === label ? ' is-active' : ''}`;
  button.textContent = label;
  button.addEventListener('click', () => setBrowseFilter(label));
  return button;
}

function setBrowseFilter(label) {
  state.browseFilter = label;
  renderBrowse();
}

function renderLive() {
  const grid = $('#liveGrid');
  grid.innerHTML = '';
  LIVE_CHANNELS.forEach((channel) => grid.appendChild(makeLiveCard(channel)));
  const schedule = $('#scheduleList');
  schedule.innerHTML = '';
  LIVE_CHANNELS.forEach((channel) => {
    const now = document.createElement('div');
    now.className = 'schedule-row is-live';
    now.innerHTML = `
      <span class="schedule-time">Now</span>
      <span class="schedule-title">${escapeHtml(channel.now)}</span>
      <span class="schedule-channel">${escapeHtml(channel.name)}</span>
      <span class="schedule-live"><span class="live-dot"></span>Live</span>
    `;
    now.addEventListener('click', () => {
      const title = findTitle(channel.itemId);
      if (title) openPlayer(title.id);
    });
    now.style.cursor = 'pointer';
    schedule.appendChild(now);
    const next = document.createElement('div');
    next.className = 'schedule-row';
    next.innerHTML = `
      <span class="schedule-time">Next</span>
      <span class="schedule-title">${escapeHtml(channel.next)}</span>
      <span class="schedule-channel">${escapeHtml(channel.name)}</span>
      <span class="schedule-live"></span>
    `;
    schedule.appendChild(next);
  });
}

function setView(view, { filter = 'All', updateHash = true } = {}) {
  const target = view === 'mylist' ? 'mylist' : view;
  state.view = target;
  $$('.view').forEach((section) => {
    const sectionView = section.dataset.view;
    const show = target === 'home' ? sectionView === 'home' : target === 'live' ? sectionView === 'live' : sectionView === 'browse';
    section.hidden = !show;
    section.classList.toggle('is-active', show);
  });
  if (target === 'movies' || target === 'shows' || target === 'mylist') {
    state.browseKind = target;
    state.browseFilter = filter;
    renderBrowse();
  }
  if (target === 'live') renderLive();
  if (target === 'home') {
    renderHome();
    renderRows();
    restartHeroRotation();
  } else {
    clearInterval(state.heroTimer);
    $('#heroVideo').pause();
    $('#heroVideo').classList.remove('is-playing');
  }
  setActiveNav(target);
  syncGenreStrip();
  if (updateHash) {
    const hash = target === 'home' ? '' : `#${target}`;
    history.replaceState(null, '', `${location.pathname}${location.search}${hash}`);
  }
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  syncHeader();
}

function openBrowse(kind, filter = 'All') {
  setView(kind, { filter });
}

function syncHeader() {
  $('#siteHeader').classList.toggle('is-scrolled', window.scrollY > 12);
}

function updateSaveButton(button, id, round = false) {
  if (!button) return;
  const saved = isSaved(id);
  button.classList.toggle('is-saved', saved && round);
  button.setAttribute('aria-label', saved ? 'Remove from My List' : 'Add to My List');
  const use = button.querySelector('use');
  if (use) use.setAttribute('href', saved ? '#i-check' : '#i-plus');
  const text = button.querySelector('.save-label');
  if (text) text.textContent = saved ? 'In My List' : 'My List';
  if (!round && button.classList.contains('btn')) {
    button.innerHTML = `<svg aria-hidden="true"><use href="${saved ? '#i-check' : '#i-plus'}"/></svg> ${saved ? 'In My List' : 'My List'}`;
  }
}

function toggleMyList(id) {
  const title = findTitle(id);
  if (!title) return;
  if (state.myList.includes(id)) {
    state.myList = state.myList.filter((entry) => entry !== id);
    showToast(`Removed ${title.title} from My List`);
  } else {
    state.myList = [...state.myList, id];
    showToast(`Added ${title.title} to My List`);
  }
  writeStore('tubi:list', state.myList);
  updateSaveButton($('#heroSave'), state.heroId, true);
  if ($('#detailDialog').open) updateSaveButton($('#detailSave'), id);
  if (state.view === 'mylist') renderBrowse();
  if (state.view === 'home') renderRows();
}

function openDetail(id) {
  const title = findTitle(id);
  if (!title) return;
  closeSearch();
  state.currentDetail = title;
  const dialog = $('#detailDialog');
  $('#detailBackdrop').src = title.image;
  $('#detailBackdrop').alt = '';
  $('#detailKicker').textContent = title.type === 'show' ? 'Series · Free to watch' : 'Free to watch';
  $('#detailTitle').textContent = title.title;
  $('#detailMeta').innerHTML = renderMeta(title);
  $('#detailDesc').textContent = title.description;
  $('#detailTags').innerHTML = [
    ...title.genres.map((genre) => `<span class="detail-tag">${escapeHtml(genre)}</span>`),
    `<span class="detail-tag">${escapeHtml(title.year)}</span>`,
    `<span class="detail-tag">${escapeHtml(title.rating)}</span>`
  ].join('');
  $('#detailPlay').dataset.titleId = title.id;
  $('#detailPlay').dataset.episodeId = title.episodes?.[0]?.id || '';
  $('#detailPlay').innerHTML = `<svg aria-hidden="true"><use href="#i-play"/></svg> ${title.type === 'show' ? 'Play S1 E1' : 'Play'}`;
  updateSaveButton($('#detailSave'), title.id);
  const source = title.source;
  $('#sourceCard').innerHTML = `
    <svg aria-hidden="true"><use href="#i-info"/></svg>
    <span class="source-copy">
      <strong>Streaming from ${escapeHtml(source.name)}</strong>
      <span>${escapeHtml(source.item)} · ${escapeHtml(source.license)}</span>
    </span>
    <a href="${source.url}" target="_blank" rel="noopener">View source</a>
  `;
  $('#detailFacts').innerHTML = `
    <dt>Type</dt><dd>${title.type === 'show' ? 'TV series' : 'Movie'}</dd>
    <dt>Released</dt><dd>${escapeHtml(title.year)}</dd>
    <dt>Runtime</dt><dd>${escapeHtml(title.runtime)}</dd>
    <dt>Rated</dt><dd>${escapeHtml(title.rating)}</dd>
    <dt>Genres</dt><dd>${escapeHtml(title.genres.join(', '))}</dd>
    <dt>Price</dt><dd>Free with ads</dd>
  `;
  const episodeBlock = $('#episodeBlock');
  const episodeList = $('#episodeList');
  episodeList.innerHTML = '';
  if (title.episodes?.length) {
    episodeBlock.hidden = false;
    $('#episodeCount').textContent = `${title.episodes.length} episodes`;
    title.episodes.forEach((episode, index) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'episode-row';
      row.innerHTML = `
        <span class="episode-number">${index + 1}</span>
        <span class="episode-thumb"><img src="${episode.image}" alt="" loading="lazy"></span>
        <span class="episode-copy">
          <span class="episode-title">${escapeHtml(episode.title)}</span>
          <span class="episode-desc">${escapeHtml(episode.description)}</span>
        </span>
        <span class="episode-runtime">${escapeHtml(episode.runtime)}</span>
      `;
      row.addEventListener('click', () => {
        dialog.close();
        openPlayer(title.id, episode.id);
      });
      episodeList.appendChild(row);
    });
  } else {
    episodeBlock.hidden = true;
  }
  const related = CATALOG
    .filter((item) => item.id !== title.id)
    .map((item) => ({ item, score: item.genres.filter((genre) => title.genres.includes(genre)).length }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry) => entry.item);
  const more = $('#detailMore');
  more.innerHTML = '';
  related.forEach((item) => {
    const card = makeCard(item);
    if (card) more.appendChild(card);
  });
  if (!dialog.open) dialog.showModal();
  syncBodyLock();
  dialog.scrollTop = 0;
}

function closeDetail() {
  const dialog = $('#detailDialog');
  if (dialog.open) dialog.close();
}

function openSearch() {
  state.searchOpen = true;
  const overlay = $('#searchOverlay');
  overlay.hidden = false;
  syncBodyLock();
  $('#searchInput').value = '';
  renderSearch('');
  requestAnimationFrame(() => $('#searchInput').focus());
}

function closeSearch() {
  if (!state.searchOpen) return;
  state.searchOpen = false;
  $('#searchOverlay').hidden = true;
  syncBodyLock();
}

function searchMatches(title, query) {
  if (!query) return false;
  const haystack = [
    title.title,
    title.year,
    title.type,
    title.rating,
    title.genres.join(' '),
    title.description,
    ...(title.episodes || []).map((episode) => episode.title)
  ].join(' ').toLowerCase();
  return query.split(/\s+/).filter(Boolean).every((part) => haystack.includes(part));
}

function renderSearch(query) {
  const clean = query.trim().toLowerCase();
  const suggestions = $('#searchSuggestions');
  const resultsHead = $('#searchResultsHead');
  const results = $('#searchResults');
  const empty = $('#searchEmpty');
  if (!clean) {
    suggestions.hidden = false;
    resultsHead.hidden = true;
    results.innerHTML = '';
    empty.hidden = true;
    return;
  }
  suggestions.hidden = true;
  resultsHead.hidden = false;
  const matches = CATALOG.filter((title) => searchMatches(title, clean));
  $('#searchResultsLabel').textContent = `Results for “${query.trim()}”`;
  $('#searchCount').textContent = `${matches.length} title${matches.length === 1 ? '' : 's'}`;
  results.innerHTML = '';
  matches.forEach((title) => {
    const card = makeCard(title);
    if (card) results.appendChild(card);
  });
  empty.hidden = matches.length > 0;
}

function openSources() {
  const dialog = $('#sourcesDialog');
  const list = $('#sourcesList');
  list.innerHTML = '';
  allSources().forEach((source) => {
    const row = document.createElement('div');
    row.className = 'source-row';
    row.innerHTML = `
      <span class="source-title">${escapeHtml(source.title)}<small>${escapeHtml(source.name)} · ${escapeHtml(source.item)}</small></span>
      <span class="source-license">${escapeHtml(source.license)}</span>
      <a class="source-open" href="${source.url}" target="_blank" rel="noopener">Open</a>
    `;
    list.appendChild(row);
  });
  if (!dialog.open) dialog.showModal();
  syncBodyLock();
  dialog.scrollTop = 0;
}

function openPlayer(titleId, episodeId = null) {
  const title = findTitle(titleId);
  if (!title) return;
  const episode = episodeId ? findEpisode(title, episodeId) : null;
  const media = episode || title;
  state.playback = { title, episode, media, live: false };
  state.previewTried = false;
  closeDetail();
  closeSearch();
  closeMenu();
  const player = $('#player');
  const video = $('#video');
  player.hidden = false;
  player.setAttribute('aria-hidden', 'false');
  state.playerOpen = true;
  document.body.classList.add('is-locked');
  $('#playerTitle').textContent = episode ? `${title.title} · ${episode.title}` : title.title;
  $('#playerKicker').textContent = episode ? 'Episode' : title.type === 'show' ? 'Series' : 'Now playing';
  $('#playerError').hidden = true;
  $('#playerPreviewBtn').hidden = !media.preview;
  $('#playerSourceLink').href = media.source?.url || title.source?.url || '#';
  updatePlayButton(false);
  updateMuteButton(false);
  video.poster = media.image || '';
  video.src = media.video;
  video.currentTime = 0;
  setProgress(0, 0);
  $('#currentTime').textContent = '0:00';
  $('#durationTime').textContent = '0:00';
  showPlayerStatus('Loading stream…', 1600);
  const playPromise = video.play();
  if (playPromise) playPromise.catch(() => {});
  resetIdleTimer();
  syncBodyLock();
}

function closePlayer() {
  if (!state.playerOpen) return;
  const video = $('#video');
  video.pause();
  video.removeAttribute('src');
  video.load();
  $('#player').hidden = true;
  $('#player').setAttribute('aria-hidden', 'true');
  state.playerOpen = false;
  state.playback = null;
  clearTimeout(state.idleTimer);
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  syncBodyLock();
  if (state.view === 'home') renderRows();
}

function updatePlayButton(playing) {
  const player = $('#player');
  const icon = $('#playToggle use');
  const bigIcon = $('#playerBigPlay use');
  player.classList.toggle('is-playing', playing);
  if (icon) icon.setAttribute('href', playing ? '#i-pause' : '#i-play');
  if (bigIcon) bigIcon.setAttribute('href', playing ? '#i-pause' : '#i-play');
  $('#playToggle').setAttribute('aria-label', playing ? 'Pause' : 'Play');
  $('#playerBigPlay').setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function togglePlayback() {
  const video = $('#video');
  if (!state.playerOpen) return;
  if (video.paused) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

function updateMuteButton(muted) {
  $('#muteToggle use').setAttribute('href', muted ? '#i-muted' : '#i-volume');
  $('#muteToggle').setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours) return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function setProgress(position, duration) {
  const percent = duration ? Math.max(0, Math.min(100, (position / duration) * 100)) : 0;
  $('#progressPlayed').style.width = `${percent}%`;
  $('#progressKnob').style.left = `${percent}%`;
  const track = $('#progressTrack');
  track.setAttribute('aria-valuenow', String(Math.round(percent)));
  track.setAttribute('aria-valuetext', `${formatTime(position)} of ${formatTime(duration)}`);
}

function saveProgress() {
  const video = $('#video');
  if (!state.playback || !Number.isFinite(video.duration) || video.duration <= 0) return;
  const id = state.playback.media.id || state.playback.title.id;
  if (video.currentTime > 5) {
    state.progress[id] = {
      position: video.currentTime,
      duration: video.duration,
      updated: Date.now()
    };
    writeStore('tubi:progress', state.progress);
  }
}

function showPlayerStatus(message, duration = 2200) {
  const status = $('#playerStatus');
  status.textContent = message;
  status.classList.add('is-visible');
  clearTimeout(state.statusTimer);
  state.statusTimer = setTimeout(() => status.classList.remove('is-visible'), duration);
}

function showPlayerError(message) {
  const source = state.playback?.media?.source || state.playback?.title?.source;
  $('#playerErrorTitle').textContent = 'This stream did not load';
  $('#playerErrorText').textContent = message || 'The source may be unavailable in this browser or region. Open the original source for the full film.';
  $('#playerError').hidden = false;
  $('#playerPreviewBtn').hidden = !state.playback?.media?.preview;
  $('#playerSourceLink').href = source?.url || '#';
  updatePlayButton(false);
}

function tryPreviewFallback() {
  const preview = state.playback?.media?.preview;
  if (!preview) return false;
  const video = $('#video');
  state.previewTried = true;
  $('#playerError').hidden = true;
  video.src = preview;
  video.currentTime = 0;
  video.play().then(() => {
    showPlayerStatus('Playing a short open preview', 3600);
  }).catch(() => {});
  return true;
}

function handleVideoError() {
  if (!state.playerOpen) return;
  if (!state.previewTried && tryPreviewFallback()) return;
  showPlayerError();
}

function resetIdleTimer() {
  const player = $('#player');
  player.classList.remove('is-idle');
  clearTimeout(state.idleTimer);
  const video = $('#video');
  if (video.paused) return;
  state.idleTimer = setTimeout(() => player.classList.add('is-idle'), 3200);
}

function closeMenu() {
  if (!state.menuOpen) return;
  state.menuOpen = false;
  $('#menuBtn').setAttribute('aria-expanded', 'false');
  $('.mobile-menu')?.classList.remove('is-open');
  syncBodyLock();
}

function openMenu() {
  let menu = $('.mobile-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.innerHTML = `
      <button data-view-link="home"><svg aria-hidden="true"><use href="#i-home"/></svg> Home</button>
      <button data-view-link="movies"><svg aria-hidden="true"><use href="#i-movie"/></svg> Movies</button>
      <button data-view-link="shows"><svg aria-hidden="true"><use href="#i-tv"/></svg> TV Shows</button>
      <button data-view-link="live"><svg aria-hidden="true"><use href="#i-live"/></svg> Live TV</button>
      <button data-view-link="mylist"><svg aria-hidden="true"><use href="#i-list"/></svg> My List</button>
      <button data-sources-menu="true"><svg aria-hidden="true"><use href="#i-info"/></svg> Sources &amp; licenses</button>
    `;
    document.body.appendChild(menu);
  }
  state.menuOpen = true;
  $('#menuBtn').setAttribute('aria-expanded', 'true');
  setActiveNav(state.view, state.browseKind);
  menu.classList.add('is-open');
  syncBodyLock();
}

function toggleMenu() {
  if (state.menuOpen) closeMenu();
  else openMenu();
}

function copyShareLink() {
  const title = state.currentDetail;
  if (!title) return;
  const url = `${location.origin}${location.pathname}#title=${encodeURIComponent(title.id)}`;
  const done = () => showToast('Link copied to clipboard');
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(done).catch(() => showToast(url, 4000));
  } else {
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    try { document.execCommand('copy'); done(); } catch { showToast(url, 4000); }
    input.remove();
  }
}

function handleInitialHash() {
  const hash = location.hash.replace('#', '');
  if (hash.startsWith('title=')) {
    const id = decodeURIComponent(hash.slice(6));
    if (findTitle(id)) {
      setTimeout(() => openDetail(id), 180);
    }
    setView('home', { updateHash: false });
    return;
  }
  if (['movies', 'shows', 'live', 'mylist'].includes(hash)) {
    setView(hash);
  } else {
    setView('home');
  }
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    if (state.menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('#menuBtn')) closeMenu();
    const viewLink = event.target.closest('[data-view-link]');
    if (viewLink) {
      event.preventDefault();
      closeMenu();
      const target = viewLink.dataset.viewLink;
      if (target === 'home') setView('home');
      else if (target === 'movies') openBrowse('movies');
      else if (target === 'shows') openBrowse('shows');
      else if (target === 'live') setView('live');
      else if (target === 'mylist') openBrowse('mylist');
      return;
    }
    const searchChip = event.target.closest('[data-search]');
    if (searchChip) {
      const value = searchChip.dataset.search;
      $('#searchInput').value = value;
      renderSearch(value);
      $('#searchInput').focus();
      return;
    }
    if (event.target.closest('[data-sources-menu]')) {
      closeMenu();
      openSources();
    }
  });

  $('#heroPlay').addEventListener('click', () => {
    const id = $('#heroPlay').dataset.titleId;
    const title = findTitle(id);
    if (title?.episodes?.length) openPlayer(id, title.episodes[0].id);
    else openPlayer(id);
  });
  $('#heroInfo').addEventListener('click', () => openDetail($('#heroInfo').dataset.titleId));
  $('#heroSave').addEventListener('click', () => toggleMyList(state.heroId));

  $('#searchBtn').addEventListener('click', openSearch);
  $('#searchClose').addEventListener('click', closeSearch);
  $('#searchInput').addEventListener('input', (event) => renderSearch(event.target.value));
  $('#searchOverlay').addEventListener('click', (event) => {
    if (event.target === $('#searchOverlay')) closeSearch();
  });

  $('#sourcesBtn').addEventListener('click', openSources);
  $('#sourcesClose').addEventListener('click', () => $('#sourcesDialog').close());
  $('#sourcesDialog').addEventListener('click', (event) => {
    if (event.target === $('#sourcesDialog')) $('#sourcesDialog').close();
  });
  $('#sourcesDialog').addEventListener('close', syncBodyLock);

  $('#detailClose').addEventListener('click', closeDetail);
  $('#detailDialog').addEventListener('close', syncBodyLock);
  $('#detailDialog').addEventListener('click', (event) => {
    if (event.target === $('#detailDialog')) closeDetail();
  });
  $('#detailPlay').addEventListener('click', () => {
    const id = $('#detailPlay').dataset.titleId;
    const episodeId = $('#detailPlay').dataset.episodeId;
    if (episodeId) openPlayer(id, episodeId);
    else openPlayer(id);
  });
  $('#detailSave').addEventListener('click', () => {
    if (state.currentDetail) toggleMyList(state.currentDetail.id);
  });
  $('#shareBtn').addEventListener('click', copyShareLink);

  $('#signinBtn').addEventListener('click', () => showToast('Demo mode — no account needed. Enjoy the open movies.'));
  $('#profileBtn').addEventListener('click', () => showToast('You are browsing as a guest.'));

  $$('.genre-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      $$('.genre-pill').forEach((item) => item.classList.toggle('is-active', item === pill));
      const genre = pill.dataset.genre;
      if (genre === 'all') {
        setView('home');
      } else {
        openBrowse('movies', genre);
      }
    });
  });

  $('#menuBtn').addEventListener('click', toggleMenu);

  $('#playerBack').addEventListener('click', closePlayer);
  $('#playerBigPlay').addEventListener('click', togglePlayback);
  $('#playToggle').addEventListener('click', togglePlayback);
  $('#skipBack').addEventListener('click', () => {
    const video = $('#video');
    video.currentTime = Math.max(0, video.currentTime - 10);
    showPlayerStatus('−10 seconds', 900);
  });
  $('#skipForward').addEventListener('click', () => {
    const video = $('#video');
    if (Number.isFinite(video.duration)) video.currentTime = Math.min(video.duration, video.currentTime + 10);
    showPlayerStatus('+10 seconds', 900);
  });
  $('#muteToggle').addEventListener('click', () => {
    const video = $('#video');
    video.muted = !video.muted;
    updateMuteButton(video.muted);
  });
  $('#fullscreenToggle').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else $('#player').requestFullscreen?.().catch(() => {});
  });
  $('#playerPreviewBtn').addEventListener('click', () => {
    if (!tryPreviewFallback()) showPlayerError();
  });
  $('#player').addEventListener('mousemove', resetIdleTimer);
  $('#player').addEventListener('touchstart', resetIdleTimer, { passive: true });
  $('#video').addEventListener('click', () => {
    if ($('#player').classList.contains('is-idle')) {
      resetIdleTimer();
      return;
    }
    togglePlayback();
  });

  const track = $('#progressTrack');
  const seek = (event) => {
    const video = $('#video');
    if (!Number.isFinite(video.duration)) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
  };
  track.addEventListener('click', seek);
  track.addEventListener('keydown', (event) => {
    const video = $('#video');
    if (!Number.isFinite(video.duration)) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 5);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }
  });

  const video = $('#video');
  video.addEventListener('play', () => {
    updatePlayButton(true);
    resetIdleTimer();
  });
  video.addEventListener('pause', () => {
    updatePlayButton(false);
    $('#player').classList.remove('is-idle');
    clearTimeout(state.idleTimer);
  });
  video.addEventListener('timeupdate', () => {
    setProgress(video.currentTime, video.duration);
    $('#currentTime').textContent = formatTime(video.currentTime);
    saveProgress();
  });
  video.addEventListener('loadedmetadata', () => {
    $('#durationTime').textContent = formatTime(video.duration);
    setProgress(video.currentTime, video.duration);
    $('#playerError').hidden = true;
  });
  video.addEventListener('progress', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    const buffered = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
    $('#progressBuffer').style.width = `${Math.min(100, (buffered / video.duration) * 100)}%`;
  });
  video.addEventListener('waiting', () => showPlayerStatus('Buffering…', 2400));
  video.addEventListener('playing', () => {
    $('#playerError').hidden = true;
    $('#player').classList.add('is-playing');
    resetIdleTimer();
  });
  video.addEventListener('error', handleVideoError);
  video.addEventListener('ended', () => {
    updatePlayButton(false);
    if (state.playback) {
      const id = state.playback.media.id || state.playback.title.id;
      delete state.progress[id];
      writeStore('tubi:progress', state.progress);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.searchOpen) { closeSearch(); return; }
      if (state.playerOpen) { closePlayer(); return; }
      if (state.menuOpen) { closeMenu(); return; }
      return;
    }
    if (event.key === '/' && !state.searchOpen && !state.playerOpen && !isTyping(event.target)) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (!state.playerOpen) return;
    if (isTyping(event.target)) return;
    if (event.key === ' ' || event.key === 'k') {
      event.preventDefault();
      togglePlayback();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 10);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
    } else if (event.key === 'm') {
      video.muted = !video.muted;
      updateMuteButton(video.muted);
    } else if (event.key === 'f') {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else $('#player').requestFullscreen?.().catch(() => {});
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const use = $('#fullscreenToggle use');
    use.setAttribute('href', document.fullscreenElement ? '#i-exit-fullscreen' : '#i-fullscreen');
  });

  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('hashchange', handleInitialHash);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 940) closeMenu();
  });
}

function isTyping(target) {
  return target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

function init() {
  $('#footerYear').textContent = new Date().getFullYear();
  buildHeroPager();
  bindEvents();
  renderRows();
  handleInitialHash();
  syncHeader();
  if (state.view === 'home') restartHeroRotation();
  document.body.dataset.appReady = 'true';
}

init();
