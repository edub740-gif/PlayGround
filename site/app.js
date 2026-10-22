(() => {
  "use strict";

  const archive = (id, file) =>
    `https://archive.org/download/${id}/${file.split("/").map(encodeURIComponent).join("/")}`;
  const details = (id) => `https://archive.org/details/${id}`;

  const MOVIES = [
    {
      id: "sintel",
      title: "Sintel",
      year: "2010",
      runtime: "15 min",
      runtimeShort: "15m",
      genres: ["Fantasy", "Adventure", "Animation"],
      license: "CC BY 3.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Foundation",
      card: "assets/backdrops/sintel-wide.jpg",
      art: "assets/backdrops/sintel-poster.jpg",
      source: archive("Sintel", "sintel-2048-stereo_512kb.mp4"),
      page: details("Sintel"),
      preview: "assets/previews/sintel.mp4",
      synopsis:
        "A lone warrior named Sintel crosses a frozen world in search of the dragon she once raised. Along the way, her resolve is tested by a landscape that gives nothing back — and a bond that refuses to disappear.",
      credit: "Directed by Colin Levy",
    },
    {
      id: "tears-of-steel",
      title: "Tears of Steel",
      year: "2012",
      runtime: "12 min",
      runtimeShort: "12m",
      genres: ["Sci-Fi", "Drama", "Animation"],
      license: "CC BY 3.0",
      licenseShort: "CC BY",
      quality: "720p",
      studio: "Blender Foundation",
      card: "assets/backdrops/tears-poster.jpg",
      art: "assets/backdrops/tears-poster.jpg",
      source: archive("Tears-of-Steel", "tears_of_steel_720p.mp4"),
      page: details("Tears-of-Steel"),
      preview: "assets/previews/jellyfish.mp4",
      synopsis:
        "In a future Amsterdam, a team of warriors and scientists attempts to rewrite a moment from the past. A cinematic proof that open tools can build a convincing, wounded world.",
      credit: "Directed by Ian Hubert",
    },
    {
      id: "big-buck-bunny",
      title: "Big Buck Bunny",
      year: "2008",
      runtime: "10 min",
      runtimeShort: "10m",
      genres: ["Animation", "Comedy"],
      license: "CC BY 3.0",
      licenseShort: "CC BY",
      quality: "720p",
      studio: "Blender Foundation",
      card: "assets/backdrops/big-buck-bunny.jpg",
      art: "assets/backdrops/big-buck-bunny.jpg",
      source: archive("BigBuckBunny_124", "Content/big_buck_bunny_720p_surround.mp4"),
      page: details("BigBuckBunny_124"),
      preview: "assets/previews/big-buck-bunny.mp4",
      synopsis:
        "A gentle giant of a rabbit is pushed too far by three woodland bullies. What follows is a beautifully timed, wordless comedy of revenge — and one of the founding films of the open movie movement.",
      credit: "Directed by Sacha Goedegebure",
    },
    {
      id: "elephants-dream",
      title: "Elephants Dream",
      year: "2006",
      runtime: "11 min",
      runtimeShort: "11m",
      genres: ["Sci-Fi", "Surreal", "Animation"],
      license: "CC BY 3.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Foundation",
      card: "assets/backdrops/elephants-dream.jpg",
      art: "assets/backdrops/elephants-dream.jpg",
      source: archive("ElephantsDream", "ed_1024_512kb.mp4"),
      page: details("ElephantsDream"),
      preview: "assets/previews/sintel.mp4",
      synopsis:
        "Two strangers wander a vast mechanical world that shifts around them. The first open movie ever made is still a strange, singular trip — part machine dream, part parable.",
      credit: "Directed by Bassam Kurdali",
    },
    {
      id: "spring",
      title: "Spring",
      year: "2019",
      runtime: "8 min",
      runtimeShort: "8m",
      genres: ["Fantasy", "Animation"],
      license: "Public domain",
      licenseShort: "PD",
      quality: "1080p",
      studio: "Blender Animation Studio",
      card: "assets/backdrops/spring.jpg",
      art: "assets/backdrops/spring.jpg",
      source: archive("spring_blenderopenmovie", "Spring - Blender Open Movie - YouTube.mp4"),
      page: details("spring_blenderopenmovie"),
      preview: "assets/previews/sintel.mp4",
      synopsis:
        "A young shepherd girl and her dog face the ancient spirits of the mountain to bring spring back to the world. A lush, wordless reminder of what animation can do with weather and wonder.",
      credit: "Directed by Andy Goralczyk",
    },
    {
      id: "sprite-fright",
      title: "Sprite Fright",
      year: "2021",
      runtime: "8 min",
      runtimeShort: "8m",
      genres: ["Horror", "Comedy", "Animation"],
      license: "CC BY 4.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Studio",
      card: "assets/backdrops/sprite-fright.jpg",
      art: "assets/backdrops/sprite-fright.jpg",
      source: archive("sprite-fright-blender-open-movie", "Sprite Fright - Blender Open Movie.mp4"),
      page: details("sprite-fright-blender-open-movie"),
      preview: "assets/previews/big-buck-bunny.mp4",
      synopsis:
        "A group of teenagers on a weekend trip discover that the forest is not as empty as it looks. A gleefully gruesome animated horror comedy with a very sharp sense of humour.",
      credit: "Directed by Matthew Luhn & Hjalti Hjálmarsson",
    },
    {
      id: "charge",
      title: "Charge",
      year: "2022",
      runtime: "4 min",
      runtimeShort: "4m",
      genres: ["Sci-Fi", "Action", "Animation"],
      license: "CC BY 4.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Studio",
      card: "assets/backdrops/charge.jpg",
      art: "assets/backdrops/charge.jpg",
      source: archive("charge-blender-open-movie-1608p", "Charge - Blender Open Movie 1608p.mp4"),
      page: details("charge-blender-open-movie-1608p"),
      preview: "assets/previews/jellyfish.mp4",
      synopsis:
        "A salvage crew in a broken future wakes something that should have stayed asleep. Dense with atmosphere, practical-feeling light and a very large gun.",
      credit: "Directed by Blender Studio",
    },
    {
      id: "hero",
      title: "Hero",
      year: "2018",
      runtime: "4 min",
      runtimeShort: "4m",
      genres: ["Animation", "Adventure"],
      license: "CC BY 4.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Animation Studio",
      card: "assets/backdrops/hero.jpg",
      art: "assets/backdrops/hero.jpg",
      source: archive("hero_20260106", "hero.mp4"),
      page: details("hero_20260106"),
      preview: "assets/previews/sintel.mp4",
      synopsis:
        "A tiny hero with a big imagination takes on a city that is much larger than she is. An energetic ink-and-paint experiment drawn directly in Blender's grease pencil.",
      credit: "Directed by Daniel Martínez Lara",
    },
    {
      id: "wing-it",
      title: "Wing It!",
      year: "2023",
      runtime: "4 min",
      runtimeShort: "4m",
      genres: ["Animation", "Comedy", "Adventure"],
      license: "CC BY 4.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Studio",
      card: "assets/backdrops/wing-it.jpg",
      art: "assets/backdrops/wing-it.jpg",
      source: archive("wing_it", "wing_it.mp4"),
      page: details("wing_it"),
      preview: "assets/previews/big-buck-bunny.mp4",
      synopsis:
        "A dog with a dream and absolutely no flight plan attempts the impossible. A bright, tactile animated short about refusing to stay on the ground.",
      credit: "Directed by Blender Studio",
    },
  ];

  const SERIES = [
    {
      id: "caminandes",
      title: "Caminandes",
      year: "2013–2016",
      runtime: "3 episodes",
      runtimeShort: "3 eps",
      genres: ["Animation", "Comedy", "Family"],
      license: "CC BY 3.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Institute",
      card: "assets/backdrops/caminandes.jpg",
      art: "assets/backdrops/caminandes.jpg",
      page: details("CaminandesLlamigos"),
      synopsis:
        "Koro the llama just wants to get to the other side of the fence. The world, the weather and a very determined penguin have other plans. Three wordless, perfectly timed short adventures.",
      credit: "Directed by Pablo Vazquez",
      episodes: [
        {
          title: "Llama Drama",
          runtime: "1 min",
          year: "2013",
          source: archive("Caminandes1LlamaDrama", "01_llama_drama_1080p.mp4"),
          page: details("Caminandes1LlamaDrama"),
          preview: "assets/previews/big-buck-bunny.mp4",
        },
        {
          title: "Gran Dillama",
          runtime: "2 min",
          year: "2013",
          source: archive("Caminandes2GranDillama", "02_gran_dillama_1080p.mp4"),
          page: details("Caminandes2GranDillama"),
          preview: "assets/previews/sintel.mp4",
        },
        {
          title: "Llamigos",
          runtime: "2 min",
          year: "2016",
          source: archive("CaminandesLlamigos", "Caminandes_ Llamigos-1080p.mp4"),
          page: details("CaminandesLlamigos"),
          preview: "assets/previews/big-buck-bunny.mp4",
        },
      ],
    },
    {
      id: "open-movie-anthology",
      title: "Open Movie Anthology",
      year: "2018–2023",
      runtime: "5 episodes",
      runtimeShort: "5 eps",
      genres: ["Animation", "Anthology", "Adventure"],
      license: "CC BY 4.0",
      licenseShort: "CC BY",
      quality: "1080p",
      studio: "Blender Studio",
      card: "assets/backdrops/spring.jpg",
      art: "assets/backdrops/sprite-fright.jpg",
      page: details("spring_blenderopenmovie"),
      synopsis:
        "Five self-contained worlds from the Blender Studio: a mountain spirit, a forest full of teeth, a city of tiny heroes, a salvage crew and one very ambitious dog.",
      credit: "A Blender Studio anthology",
      episodes: [
        {
          title: "Spring",
          runtime: "8 min",
          year: "2019",
          source: archive("spring_blenderopenmovie", "Spring - Blender Open Movie - YouTube.mp4"),
          page: details("spring_blenderopenmovie"),
          preview: "assets/previews/sintel.mp4",
        },
        {
          title: "Sprite Fright",
          runtime: "8 min",
          year: "2021",
          source: archive("sprite-fright-blender-open-movie", "Sprite Fright - Blender Open Movie.mp4"),
          page: details("sprite-fright-blender-open-movie"),
          preview: "assets/previews/big-buck-bunny.mp4",
        },
        {
          title: "Hero",
          runtime: "4 min",
          year: "2018",
          source: archive("hero_20260106", "hero.mp4"),
          page: details("hero_20260106"),
          preview: "assets/previews/jellyfish.mp4",
        },
        {
          title: "Charge",
          runtime: "4 min",
          year: "2022",
          source: archive("charge-blender-open-movie-1608p", "Charge - Blender Open Movie 1608p.mp4"),
          page: details("charge-blender-open-movie-1608p"),
          preview: "assets/previews/jellyfish.mp4",
        },
        {
          title: "Wing It!",
          runtime: "4 min",
          year: "2023",
          source: archive("wing_it", "wing_it.mp4"),
          page: details("wing_it"),
          preview: "assets/previews/big-buck-bunny.mp4",
        },
      ],
    },
  ];

  MOVIES.forEach((item) => (item.type = "movie"));
  SERIES.forEach((item) => (item.type = "series"));
  const ALL = [...MOVIES, ...SERIES];
  const FEATURED = MOVIES[0];

  const KEYS = {
    list: "openreel:list",
    progress: "openreel:progress",
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 5.8v12.4L19 12z" fill="currentColor" stroke="none"/></svg>';
  const checkIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5.5 12.5 4.2 4.2L18.5 8"/></svg>';

  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* browsing privately */
    }
  }

  function getList() {
    const list = readStore(KEYS.list, []);
    return Array.isArray(list) ? list : [];
  }

  function isSaved(id) {
    return getList().includes(id);
  }

  function getProgress() {
    const progress = readStore(KEYS.progress, null);
    if (progress && typeof progress === "object") return progress;
    const seeded = {
      sintel: { pct: 0.42, at: Date.now() },
      spring: { pct: 0.23, at: Date.now() },
      "tears-of-steel": { pct: 0.71, at: Date.now() },
    };
    writeStore(KEYS.progress, seeded);
    return seeded;
  }

  function saveProgress(id, video) {
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const progress = readStore(KEYS.progress, {});
    const pct = Math.min(0.995, Math.max(0.01, video.currentTime / video.duration));
    progress[id] = { pct, at: Date.now(), time: video.currentTime };
    writeStore(KEYS.progress, progress);
  }

  function findItem(id) {
    return ALL.find((item) => item.id === id) || null;
  }

  function saveButtonMarkup(id) {
    const saved = isSaved(id);
    return `
      <button class="card-save${saved ? " is-saved" : ""}" type="button" data-save-id="${id}" aria-label="${saved ? "Remove from" : "Add to"} my list" aria-pressed="${saved}">
        ${saved ? checkIcon : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.5v13M5.5 12h13"/></svg>'}
      </button>`;
  }

  function cardMarkup(item, { progress = null, number = null } = {}) {
    const isSeries = item.type === "series";
    const pct = progress ? Math.max(0.015, Math.min(progress.pct || 0, 1)) : 0;
    return `
      <article class="card" data-open-id="${item.id}" tabindex="0" role="button" aria-label="Open ${esc(item.title)}">
        <div class="card-art">
          <img src="${esc(item.card)}" alt="" loading="lazy" decoding="async" />
          <span class="card-badge${isSeries ? " series" : ""}">${isSeries ? "Series" : "Film"}</span>
          <span class="card-license">${esc(item.licenseShort)}</span>
          ${number ? `<span class="card-number">${number}</span>` : ""}
          <button class="card-play" type="button" data-play-id="${item.id}" aria-label="Play ${esc(item.title)}">${playIcon}</button>
          ${saveButtonMarkup(item.id)}
          ${pct ? `<div class="card-progress" aria-hidden="true"><span style="width:${(pct * 100).toFixed(1)}%"></span></div>` : ""}
        </div>
        <div class="card-info">
          <div class="card-title-row">
            <h3 class="card-title">${esc(item.title)}</h3>
            <span class="card-year">${esc(item.year)}</span>
          </div>
          <div class="card-meta">
            <span>${esc(item.runtimeShort)}</span><span class="dot"></span><span>${esc(item.genres[0])}</span>
            ${isSeries ? '<span class="dot"></span><span>Series</span>' : ""}
          </div>
        </div>
      </article>`;
  }

  function renderRail(el, items, options = {}) {
    if (!el) return;
    el.innerHTML = items.map((item, index) => cardMarkup(item, { ...options, number: options.numbered ? index + 1 : null })).join("");
  }

  function renderRails() {
    const progress = getProgress();
    const continueItems = Object.entries(progress)
      .sort((a, b) => (b[1].at || 0) - (a[1].at || 0))
      .map(([id, value]) => ({ item: findItem(id), progress: value }))
      .filter((entry) => entry.item)
      .slice(0, 7);

    const continueSection = $("#continueSection");
    const continueRail = $("#continueRail");
    if (continueSection && continueRail) {
      if (continueItems.length) {
        continueSection.hidden = false;
        continueRail.innerHTML = continueItems
          .map((entry) => cardMarkup(entry.item, { progress: entry.progress }))
          .join("");
      } else {
        continueSection.hidden = true;
      }
    }

    renderRail($("#trendingRail"), [
      findItem("tears-of-steel"),
      findItem("sintel"),
      findItem("big-buck-bunny"),
      findItem("sprite-fright"),
      findItem("spring"),
      findItem("charge"),
      findItem("hero"),
    ]);
    renderRail($("#seriesRail"), SERIES);
    renderRail($("#newRail"), [
      findItem("wing-it"),
      findItem("hero"),
      findItem("charge"),
      findItem("sprite-fright"),
      findItem("spring"),
    ]);
  }

  /* ---------- Views ---------- */
  const state = {
    view: "discover",
    genre: "All",
    searchTerm: "",
    currentDetail: null,
    player: null,
  };

  const viewCopy = {
    movies: {
      title: "Movies",
      subtitle: "Open films, from hand-drawn experiments to cinematic proof-of-concepts.",
      items: () => MOVIES,
    },
    series: {
      title: "Series",
      subtitle: "Small universes with more than one story to tell.",
      items: () => SERIES,
    },
    list: {
      title: "My List",
      subtitle: "The films and series you have saved for later.",
      items: () => getList().map(findItem).filter(Boolean),
    },
  };

  function setView(view, { scroll = true } = {}) {
    if (!viewCopy[view]) view = "discover";
    state.view = view;
    state.genre = "All";

    const hero = $("#hero");
    const discoverView = $("#discoverView");
    const browseView = $("#browseView");

    if (view === "discover") {
      hero.hidden = false;
      discoverView.hidden = false;
      browseView.hidden = true;
    } else {
      hero.hidden = true;
      discoverView.hidden = true;
      browseView.hidden = false;
    }

    $$("[data-view-link]").forEach((button) => {
      const active = button.dataset.viewLink === view;
      button.classList.toggle("is-active", active && (button.classList.contains("nav-link") || button.classList.contains("mobile-link")));
    });

    if (view !== "discover") renderBrowse();
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", view === "discover" ? "#discover" : `#${view}`);
    updateHeader();
  }

  function filterByGenre(items) {
    if (state.genre === "All") return items;
    return items.filter((item) => item.genres.some((genre) => genre.toLowerCase() === state.genre.toLowerCase()));
  }

  function renderFilterChips(items) {
    const chips = $("#filterChips");
    if (!chips) return;
    const genres = ["All", ...new Set(items.flatMap((item) => item.genres))].slice(0, 9);
    chips.innerHTML = genres
      .map(
        (genre) =>
          `<button class="chip${genre === state.genre ? " is-active" : ""}" type="button" data-genre="${esc(genre)}">${esc(genre)}</button>`
      )
      .join("");
  }

  function renderBrowse() {
    if (state.view === "discover") return;
    const copy = viewCopy[state.view];
    const baseItems = copy.items();
    const items = filterByGenre(baseItems);
    $("#browseTitle").textContent = copy.title;
    $("#browseSubtitle").textContent = copy.subtitle;
    $("#browseGrid").innerHTML = items.map((item) => cardMarkup(item)).join("");
    renderFilterChips(baseItems);
    $("#filterChips").hidden = state.view === "list" || baseItems.length === 0;
    const empty = $("#emptyState");
    empty.hidden = items.length > 0;
    $("#browseGrid").hidden = items.length === 0;
    if (!items.length && state.view !== "list") {
      empty.querySelector("h2").textContent = "No matches yet";
      empty.querySelector("p").textContent = "Try a different genre — the library is small and deliberately curious.";
      const button = empty.querySelector("button");
      button.textContent = "Clear filter";
      button.dataset.viewLink = "";
      button.dataset.action = "clear-filter";
    } else if (!items.length && state.view === "list") {
      empty.querySelector("h2").textContent = "Your list is waiting";
      empty.querySelector("p").textContent = "Save films and series with the + button and they will appear here.";
      const button = empty.querySelector("button");
      button.textContent = "Discover something new";
      button.dataset.action = "";
      button.dataset.viewLink = "discover";
    }
  }

  /* ---------- Header / scroll ---------- */
  function updateHeader() {
    const header = $("#siteHeader");
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    header.classList.toggle("is-solid", state.view !== "discover");
  }

  /* ---------- Detail ---------- */
  function openDetail(id) {
    const item = findItem(id);
    if (!item) return;
    state.currentDetail = item;
    const isSeries = item.type === "series";

    $("#detailArt").style.backgroundImage = `url("${item.art}")`;
    $("#detailArt").style.backgroundPosition = isSeries ? "center 34%" : "center 24%";
    $("#detailEyebrow").innerHTML = `<span class="eyebrow-line"></span>${isSeries ? "Open series" : "Open film"}`;
    $("#detailTitle").textContent = item.title;
    $("#detailMeta").innerHTML = `
      <span>${esc(item.year)}</span><span class="meta-dot"></span>
      <span>${esc(item.runtime)}</span><span class="meta-dot"></span>
      <span>${esc(item.genres.slice(0, 3).join(" · "))}</span><span class="meta-dot"></span>
      <span class="meta-license">${esc(item.license)}</span>`;
    $("#detailSynopsis").textContent = item.synopsis;
    $("#detailFacts").innerHTML = [
      item.license,
      item.quality,
      item.studio,
      isSeries ? `${item.episodes.length} episodes` : "Single film",
    ]
      .map((fact) => `<span class="fact-pill">${esc(fact)}</span>`)
      .join("");

    const playButton = $("#detailPlay");
    playButton.innerHTML = `${playIcon} ${isSeries ? "Play episode 1" : "Play film"}`;
    playButton.onclick = () => openPlayer(item, 0);

    const listButton = $("#detailList");
    const syncDetailListButton = () => {
      const saved = isSaved(item.id);
      listButton.classList.toggle("is-saved", saved);
      listButton.setAttribute("aria-pressed", String(saved));
      listButton.setAttribute("aria-label", saved ? "Remove from my list" : "Add to my list");
      listButton.innerHTML = saved ? checkIcon : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.5v13M5.5 12h13"/></svg>';
    };
    syncDetailListButton();
    listButton.onclick = () => {
      toggleSave(item.id);
      syncDetailListButton();
    };

    const source = $("#detailSource");
    source.href = item.page;
    source.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8"/><path d="M19 13v5.5H5.5V5H11"/></svg> Source';

    const episodes = $("#detailEpisodes");
    if (isSeries) {
      episodes.hidden = false;
      $("#episodeCount").textContent = `${item.episodes.length} episodes · 1 season`;
      $("#episodeList").innerHTML = item.episodes
        .map(
          (episode, index) => `
            <button class="episode-row" type="button" data-play-episode="${index}">
              <span class="episode-num">${String(index + 1).padStart(2, "0")}</span>
              <span class="episode-info"><strong>${esc(episode.title)}</strong><span>${esc(episode.year)} · ${esc(episode.runtime)}</span></span>
              <span class="episode-play">Play →</span>
            </button>`
        )
        .join("");
      $("#episodeList").onclick = (event) => {
        const row = event.target.closest("[data-play-episode]");
        if (row) openPlayer(item, Number(row.dataset.playEpisode));
      };
    } else {
      episodes.hidden = true;
      $("#episodeList").innerHTML = "";
    }

    $("#detailListFacts").innerHTML = `
      <div><dt>Type</dt><dd>${isSeries ? "Animated series" : "Animated film"}</dd></div>
      <div><dt>Year</dt><dd>${esc(item.year)}</dd></div>
      <div><dt>Runtime</dt><dd>${esc(item.runtime)}</dd></div>
      <div><dt>Studio</dt><dd>${esc(item.studio)}</dd></div>
      <div><dt>License</dt><dd>${esc(item.license)}</dd></div>
      <div><dt>Credit</dt><dd>${esc(item.credit || "Open culture")}</dd></div>`;

    const related = ALL.filter((candidate) => candidate.id !== item.id && candidate.genres.some((g) => item.genres.includes(g))).slice(0, 3);
    $("#detailRelated").innerHTML = related
      .map(
        (candidate) => `
          <button class="related-item" type="button" data-open-id="${candidate.id}">
            <img src="${esc(candidate.card)}" alt="" loading="lazy" />
            <span>${esc(candidate.title)}<br /><span style="color:var(--text-dim);font-weight:500">${esc(candidate.year)}</span></span>
          </button>`
      )
      .join("");

    const modal = $("#detailModal");
    modal.hidden = false;
    document.body.classList.add("has-modal");
    $(".detail-sheet", modal).scrollTop = 0;
    setTimeout(() => $(".modal-close", modal)?.focus(), 60);
  }

  function closeDetail() {
    $("#detailModal").hidden = true;
    state.currentDetail = null;
    if ($("#playerModal").hidden) document.body.classList.remove("has-modal");
  }

  /* ---------- Search ---------- */
  const suggestionTerms = ["Animation", "Fantasy", "Sci-Fi", "Comedy", "Adventure", "Horror", "Blender", "Short"];

  function openSearch() {
    const overlay = $("#searchOverlay");
    overlay.hidden = false;
    document.body.classList.add("has-modal");
    renderSearchSuggestions();
    if (state.searchTerm) {
      $("#searchInput").value = state.searchTerm;
      runSearch(state.searchTerm);
    }
    setTimeout(() => $("#searchInput").focus(), 80);
  }

  function closeSearch() {
    $("#searchOverlay").hidden = true;
    if ($("#playerModal").hidden && $("#detailModal").hidden) document.body.classList.remove("has-modal");
  }

  function renderSearchSuggestions() {
    $("#searchSuggestions").innerHTML = suggestionTerms
      .map((term) => `<button class="suggestion" type="button" data-suggest="${esc(term)}">${esc(term)}</button>`)
      .join("");
  }

  function runSearch(term) {
    state.searchTerm = term;
    const normalized = term.trim().toLowerCase();
    $("#searchHint").hidden = Boolean(normalized);
    $("#searchResults").hidden = !normalized;
    $("#searchEmpty").hidden = true;
    $("#searchGrid").hidden = false;
    const field = $(".search-field");
    field.classList.toggle("has-value", Boolean(term));

    if (!normalized) return;

    const matches = ALL.filter((item) => {
      const haystack = [item.title, item.year, item.synopsis, item.studio, ...item.genres, ...(item.episodes || []).map((episode) => episode.title)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });

    $("#searchCount").textContent = `${matches.length} ${matches.length === 1 ? "title" : "titles"} found`;
    $("#searchGrid").innerHTML = matches.map((item) => cardMarkup(item)).join("");
    if (!matches.length) {
      $("#searchGrid").hidden = true;
      $("#searchEmpty").hidden = false;
    }
  }

  /* ---------- Player ---------- */
  const video = $("#video");
  const shell = $("#playerShell");
  let progressWriteTimer = 0;
  let noticeTimer = 0;

  function openPlayer(item, episodeIndex = 0) {
    if (!item) return;
    const isSeries = item.type === "series";
    const episode = isSeries ? item.episodes[episodeIndex] : null;
    state.player = { item, episodeIndex, episode, usingPreview: false };
    $("#playerTitle").textContent = isSeries ? `${item.title} — ${episode.title}` : item.title;
    $("#playerLicense").textContent = item.license;
    $("#playerQuality").textContent = item.quality || "1080p";
    $("#playerModal").hidden = false;
    document.body.classList.add("has-modal");
    $("#detailModal").hidden = true;
    $("#playerError").hidden = true;
    $("#playerNotice").hidden = true;
    $("#playerLoading").classList.remove("is-hidden");
    $("#playerSourceLink").href = episode ? episode.page : item.page;
    video.poster = item.art;

    if (isSeries) {
      $("#playerEpisodes").hidden = false;
      $("#playerSeriesName").textContent = item.title;
      $("#playerEpisodeList").innerHTML = item.episodes
        .map(
          (entry, index) => `
            <button class="player-episode-row${index === episodeIndex ? " is-current" : ""}" type="button" data-player-episode="${index}">
              <span class="num">${String(index + 1).padStart(2, "0")}</span>
              <span class="info"><strong>${esc(entry.title)}</strong><span>${esc(entry.runtime)}</span></span>
            </button>`
        )
        .join("");
    } else {
      $("#playerEpisodes").hidden = true;
      $("#playerEpisodeList").innerHTML = "";
    }

    setSource(episode ? episode.source : item.source, true);
  }

  function setSource(src, autoplay) {
    const player = state.player;
    if (!player) return;
    $("#playerError").hidden = true;
    $("#playerLoading").classList.remove("is-hidden");
    shell.classList.remove("is-playing");
    shell.classList.add("is-paused");
    video.src = src;
    video.load();
    if (autoplay) {
      const promise = video.play();
      if (promise && promise.catch) promise.catch(() => shell.classList.add("is-paused"));
    }
  }

  function closePlayer() {
    if (!state.player) return;
    saveProgress(state.player.item.id, video);
    video.pause();
    video.removeAttribute("src");
    video.load();
    $("#playerModal").hidden = true;
    state.player = null;
    if ($("#detailModal").hidden && $("#searchOverlay").hidden) document.body.classList.remove("has-modal");
  }

  function showPlayerError() {
    $("#playerLoading").classList.add("is-hidden");
    $("#playerError").hidden = false;
    shell.classList.remove("is-playing");
    shell.classList.add("is-paused");
  }

  function playPreview() {
    const player = state.player;
    if (!player) return;
    player.usingPreview = true;
    const source = player.episode ? player.episode.preview : player.item.preview;
    setSource(source || "assets/previews/sintel.mp4", true);
    notify("Playing a short offline preview", 3200);
  }

  function notify(message, duration = 2400) {
    clearTimeout(noticeTimer);
    const notice = $("#playerNotice");
    if (notice) {
      notice.textContent = message;
      notice.hidden = false;
    }
    noticeTimer = setTimeout(() => {
      if (notice) notice.hidden = true;
    }, duration);
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const total = Math.floor(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = String(total % 60).padStart(2, "0");
    return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${secs}` : `${minutes}:${secs}`;
  }

  function syncPlayIcon() {
    const playing = !video.paused && !video.ended;
    const icon = playing
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5h3v13H8zM13 5.5h3v13h-3z" fill="currentColor" stroke="none"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.8v12.4l10-6.2z" fill="currentColor" stroke="none"/></svg>';
    $("#playToggle").innerHTML = icon;
    $("#playToggle").setAttribute("aria-label", playing ? "Pause" : "Play");
    shell.classList.toggle("is-playing", playing);
    shell.classList.toggle("is-paused", !playing);
  }

  function updateProgressUI() {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    const pct = video.currentTime / video.duration;
    const range = $("#playerProgress");
    range.value = String(Math.round(pct * 1000));
    range.style.background = `linear-gradient(90deg, var(--amber) ${(pct * 100).toFixed(2)}%, rgba(255,255,255,.24) ${(pct * 100).toFixed(2)}%)`;
    $("#currentTime").textContent = formatTime(video.currentTime);
    try {
      if (video.buffered.length) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        $("#playerBuffer").style.width = `${Math.min(100, (bufferedEnd / video.duration) * 100)}%`;
      }
    } catch {
      /* buffered ranges can be unavailable */
    }
  }

  /* ---------- My list ---------- */
  function toggleSave(id) {
    const item = findItem(id);
    if (!item) return;
    const list = getList();
    const index = list.indexOf(id);
    const saving = index === -1;
    if (saving) list.push(id);
    else list.splice(index, 1);
    writeStore(KEYS.list, list);
    refreshSaveButtons();
    if (state.view === "list") renderBrowse();
    notify(saving ? `${item.title} added to My List` : `${item.title} removed from My List`);
  }

  function refreshSaveButtons() {
    $$("[data-save-id]").forEach((button) => {
      const saved = isSaved(button.dataset.saveId);
      button.classList.toggle("is-saved", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", `${saved ? "Remove from" : "Add to"} my list`);
      button.innerHTML = saved ? checkIcon : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.5v13M5.5 12h13"/></svg>';
    });
    const heroAdd = $("[data-action='toggle-featured-list']");
    if (heroAdd) {
      const saved = isSaved(FEATURED.id);
      heroAdd.classList.toggle("is-saved", saved);
      heroAdd.setAttribute("aria-pressed", String(saved));
      heroAdd.innerHTML = saved ? checkIcon : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.5v13M5.5 12h13"/></svg>';
    }
  }

  /* ---------- Toast ---------- */
  let toastTimer = 0;
  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    clearTimeout(toastTimer);
    el.textContent = message;
    el.classList.add("is-visible");
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-link]");
    if (viewButton && viewButton.dataset.viewLink) {
      event.preventDefault();
      if (!$("#searchOverlay").hidden) closeSearch();
      closeDetail();
      closePlayer();
      setView(viewButton.dataset.viewLink);
      return;
    }

    const saveButton = event.target.closest("[data-save-id]");
    if (saveButton) {
      event.preventDefault();
      event.stopPropagation();
      toggleSave(saveButton.dataset.saveId);
      return;
    }

    const playButton = event.target.closest("[data-play-id]");
    if (playButton) {
      event.preventDefault();
      event.stopPropagation();
      const item = findItem(playButton.dataset.playId);
      if (item) openPlayer(item, 0);
      return;
    }

    const openButton = event.target.closest("[data-open-id]");
    if (openButton) {
      event.preventDefault();
      if (event.target.closest("#searchOverlay") && !$("#searchOverlay").hidden) closeSearch();
      openDetail(openButton.dataset.openId);
      return;
    }

    const genreButton = event.target.closest("[data-genre]");
    if (genreButton) {
      state.genre = genreButton.dataset.genre;
      renderBrowse();
      return;
    }

    const suggestion = event.target.closest("[data-suggest]");
    if (suggestion) {
      const input = $("#searchInput");
      input.value = suggestion.dataset.suggest;
      runSearch(input.value);
      input.focus();
      return;
    }

    const railButton = event.target.closest("[data-rail]");
    if (railButton) {
      const rail = document.getElementById(railButton.dataset.rail);
      if (rail) {
        const amount = Math.max(320, rail.clientWidth * 0.72);
        rail.scrollBy({ left: Number(railButton.dataset.dir) * amount, behavior: "smooth" });
      }
      return;
    }

    const action = event.target.closest("[data-action]");
    if (!action) return;
    const name = action.dataset.action;

    if (name === "open-search") openSearch();
    if (name === "close-search") closeSearch();
    if (name === "clear-search") {
      $("#searchInput").value = "";
      runSearch("");
      $("#searchInput").focus();
    }
    if (name === "close-detail") closeDetail();
    if (name === "play-featured") openPlayer(FEATURED, 0);
    if (name === "open-featured") openDetail(FEATURED.id);
    if (name === "toggle-featured-list") toggleSave(FEATURED.id);
    if (name === "clear-progress") {
      writeStore(KEYS.progress, {});
      renderRails();
      toast("Watch history cleared");
    }
    if (name === "clear-filter") {
      state.genre = "All";
      renderBrowse();
    }
    if (name === "close-player") closePlayer();
    if (name === "toggle-play") {
      if (video.paused || video.ended) video.play().catch(() => {});
      else video.pause();
    }
    if (name === "skip-back") video.currentTime = Math.max(0, video.currentTime - 10);
    if (name === "skip-forward") video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
    if (name === "toggle-mute") video.muted = !video.muted;
    if (name === "toggle-fullscreen") {
      if (!document.fullscreenElement) shell.requestFullscreen?.().catch(() => {});
      else document.exitFullscreen?.();
    }
    if (name === "retry-stream") {
      const player = state.player;
      if (player) setSource(player.episode ? player.episode.source : player.item.source, true);
    }
    if (name === "play-preview") playPreview();
    if (name === "toggle-captions") {
      const button = $("#captionsToggle");
      const on = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(on));
      button.classList.toggle("is-on", on);
      notify(on ? "Captions are not available for this open print" : "Captions off");
    }
  });

  $("#searchInput").addEventListener("input", (event) => runSearch(event.target.value));

  $("#playerEpisodeList").addEventListener("click", (event) => {
    const row = event.target.closest("[data-player-episode]");
    if (!row || !state.player) return;
    const index = Number(row.dataset.playerEpisode);
    const item = state.player.item;
    const episode = item.episodes[index];
    state.player.episodeIndex = index;
    state.player.episode = episode;
    state.player.usingPreview = false;
    $("#playerTitle").textContent = `${item.title} — ${episode.title}`;
    $("#playerSourceLink").href = episode.page;
    $$("[data-player-episode]").forEach((button) => button.classList.toggle("is-current", Number(button.dataset.playerEpisode) === index));
    setSource(episode.source, true);
  });

  $("#playerProgress").addEventListener("input", (event) => {
    if (!Number.isFinite(video.duration)) return;
    video.currentTime = (Number(event.target.value) / 1000) * video.duration;
    updateProgressUI();
  });

  $("#volumeSlider").addEventListener("input", (event) => {
    video.volume = Number(event.target.value);
    video.muted = video.volume === 0;
  });

  video.addEventListener("loadedmetadata", () => {
    $("#duration").textContent = formatTime(video.duration);
    updateProgressUI();
  });
  video.addEventListener("canplay", () => {
    $("#playerLoading").classList.add("is-hidden");
    $("#playerError").hidden = true;
  });
  video.addEventListener("play", syncPlayIcon);
  video.addEventListener("pause", () => {
    syncPlayIcon();
    if (state.player) saveProgress(state.player.item.id, video);
  });
  video.addEventListener("volumechange", () => {
    $("#volumeSlider").value = String(video.muted ? 0 : video.volume);
    $("#muteToggle").classList.toggle("is-muted", video.muted || video.volume === 0);
    $("#muteToggle").innerHTML = video.muted || video.volume === 0
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9.5h3l4-3.5v12l-4-3.5H5z"/><path d="m15.5 9.5 5 5M20.5 9.5l-5 5"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9.5h3l4-3.5v12l-4-3.5H5z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6M18 7a7 7 0 0 1 0 10"/></svg>';
  });
  video.addEventListener("timeupdate", () => {
    updateProgressUI();
    const player = state.player;
    if (player && !player.usingPreview) {
      clearTimeout(progressWriteTimer);
      progressWriteTimer = setTimeout(() => saveProgress(player.item.id, video), 900);
    }
  });
  video.addEventListener("progress", updateProgressUI);
  video.addEventListener("error", () => {
    if (!state.player) return;
    $("#playerLoading").classList.add("is-hidden");
    showPlayerError();
  });
  video.addEventListener("ended", () => {
    const player = state.player;
    syncPlayIcon();
    if (player) {
      const progress = readStore(KEYS.progress, {});
      progress[player.item.id] = { pct: 0.995, at: Date.now(), time: video.duration };
      writeStore(KEYS.progress, progress);
      if (player.item.type === "series" && player.episodeIndex < player.item.episodes.length - 1) {
        notify("Up next — choose another episode", 3200);
      }
    }
  });

  const progressSource = readStore(KEYS.progress, null);
  if (!progressSource) getProgress();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!$("#playerModal").hidden) closePlayer();
      else if (!$("#detailModal").hidden) closeDetail();
      else if (!$("#searchOverlay").hidden) closeSearch();
      return;
    }
    if (!$("#playerModal").hidden) {
      const target = event.target;
      const isTyping = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (isTyping) return;
      if (event.code === "Space") {
        event.preventDefault();
        if (video.paused) video.play().catch(() => {});
        else video.pause();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
      }
      if (event.key.toLowerCase() === "m") video.muted = !video.muted;
      if (event.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) shell.requestFullscreen?.().catch(() => {});
        else document.exitFullscreen?.();
      }
    }
    if (!$("#searchOverlay").hidden && event.key === "Enter" && event.target === $("#searchInput")) {
      event.preventDefault();
    }
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader, { passive: true });

  /* ---------- Boot ---------- */
  document.addEventListener("keydown", (event) => {
    const card = event.target.closest?.(".card");
    if (!card || event.target !== card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail(card.dataset.openId);
    }
  });

  const hash = location.hash.replace("#", "");
  renderRails();
  if (["movies", "series", "list"].includes(hash)) setView(hash, { scroll: false });
  else setView("discover", { scroll: false });
  refreshSaveButtons();
  $("#year").textContent = new Date().getFullYear();
  requestAnimationFrame(() => {
    document.body.dataset.appReady = "true";
  });
})();
