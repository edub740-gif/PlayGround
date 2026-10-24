const CATALOG = [
  {
    id: 'sintel',
    title: 'Sintel',
    type: 'movie',
    year: 2010,
    rating: 'TV-PG',
    runtime: '15m',
    genres: ['Fantasy', 'Adventure', 'Animation'],
    description: 'A lone warrior crosses a harsh, mythical world searching for the baby dragon she once saved. Her quest leads her to the edge of loss — and to the truth about what she is willing to sacrifice.',
    image: 'assets/img/hero-sintel.jpg',
    poster: 'assets/img/poster-sintel.jpg',
    video: 'https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4',
    source: {
      name: 'Internet Archive',
      item: 'Sintel',
      url: 'https://archive.org/details/Sintel',
      license: 'CC BY 3.0',
      licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
    },
    accent: '#7c5cff',
    featured: true,
    heroKicker: 'A Blender open movie'
  },
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    type: 'movie',
    year: 2008,
    rating: 'TV-G',
    runtime: '10m',
    genres: ['Animation', 'Comedy', 'Kids'],
    description: 'A giant, gentle rabbit wakes to a perfect morning — until three rascally rodents interrupt it. What follows is lush, wordless slapstick revenge in the Blender Foundation’s landmark open movie.',
    image: 'assets/img/hero-bbb.jpg',
    video: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
    preview: 'assets/video/Big_Buck_Bunny_720_10s_2MB.webm',
    source: {
      name: 'Internet Archive',
      item: 'BigBuckBunny_124',
      url: 'https://archive.org/details/BigBuckBunny_124',
      license: 'CC BY 3.0',
      licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
    },
    accent: '#a3e635',
    featured: true,
    heroKicker: 'The original open movie'
  },
  {
    id: 'tears-of-steel',
    title: 'Tears of Steel',
    type: 'movie',
    year: 2012,
    rating: 'TV-14',
    runtime: '12m',
    genres: ['Sci-Fi', 'Action', 'Drama'],
    description: 'In a future Amsterdam overrun by machines, a team of warriors tries to rewrite the past by recreating a lost moment of love. A live-action sci-fi short with groundbreaking open VFX.',
    image: 'assets/img/hero-tears-of-steel.jpg',
    poster: 'assets/img/poster-tears-of-steel.jpg',
    video: 'https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4',
    source: {
      name: 'Internet Archive',
      item: 'Tears-of-Steel',
      url: 'https://archive.org/details/Tears-of-Steel',
      license: 'CC BY 3.0',
      licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
    },
    accent: '#38bdf8',
    featured: true,
    heroKicker: 'Open VFX, live action'
  },
  {
    id: 'elephants-dream',
    title: 'Elephants Dream',
    type: 'movie',
    year: 2006,
    rating: 'TV-14',
    runtime: '11m',
    genres: ['Sci-Fi', 'Animation', 'Mystery'],
    description: 'Two strangers navigate a vast, impossible machine. One searches for meaning; the other warns of a danger only he can see. The world’s first open movie.',
    image: 'assets/img/card-elephants-dream.jpg',
    video: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    source: {
      name: 'Internet Archive',
      item: 'ElephantsDream',
      url: 'https://archive.org/details/ElephantsDream',
      license: 'CC BY 3.0 US',
      licenseUrl: 'http://creativecommons.org/licenses/by/3.0/us/'
    },
    accent: '#f59e0b'
  },
  {
    id: 'spring',
    title: 'Spring',
    type: 'movie',
    year: 2019,
    rating: 'TV-G',
    runtime: '8m',
    genres: ['Fantasy', 'Animation', 'Kids'],
    description: 'A young shepherd and her dog encounter the ancient spirit that turns winter into spring. A hand-drawn-feeling fable about balance and renewal.',
    image: 'assets/img/card-spring.jpg',
    video: 'https://archive.org/download/spring_blenderopenmovie/Spring%20-%20Blender%20Open%20Movie%20-%20YouTube.mp4',
    source: {
      name: 'Internet Archive',
      item: 'spring_blenderopenmovie',
      url: 'https://archive.org/details/spring_blenderopenmovie',
      license: 'Public domain mark',
      licenseUrl: 'http://creativecommons.org/publicdomain/mark/1.0/'
    },
    accent: '#22c55e'
  },
  {
    id: 'sprite-fright',
    title: 'Sprite Fright',
    type: 'movie',
    year: 2021,
    rating: 'TV-14',
    runtime: '8m',
    genres: ['Horror', 'Comedy', 'Animation'],
    description: 'A pack of rowdy teens trespass into a forest full of vengeful sprites. A gleefully gruesome animated horror-comedy from Blender Studio.',
    image: 'assets/img/card-sprite-fright.jpg',
    video: 'https://archive.org/download/sprite-fright-blender-open-movie/Sprite%20Fright%20-%20Blender%20Open%20Movie.mp4',
    source: {
      name: 'Internet Archive',
      item: 'sprite-fright-blender-open-movie',
      url: 'https://archive.org/details/sprite-fright-blender-open-movie',
      license: 'Openly licensed',
      licenseUrl: 'https://studio.blender.org/films/sprite-fright/'
    },
    accent: '#ef4444'
  },
  {
    id: 'hero',
    title: 'Hero',
    type: 'movie',
    year: 2018,
    rating: 'TV-PG',
    runtime: '4m',
    genres: ['Animation', 'Action', 'Fantasy'],
    description: 'A playful blend of 2D and 3D animation follows a restless imagination through a city of ink, color, and light.',
    image: 'assets/img/card-hero.jpg',
    video: 'https://archive.org/download/hero_20260106/hero.mp4',
    source: {
      name: 'Internet Archive',
      item: 'hero_20260106',
      url: 'https://archive.org/details/hero_20260106',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
    },
    accent: '#e879f9'
  },
  {
    id: 'wing-it',
    title: 'Wing It!',
    type: 'movie',
    year: 2023,
    rating: 'TV-G',
    runtime: '3m',
    genres: ['Animation', 'Comedy', 'Kids'],
    description: 'A fledgling bird with more enthusiasm than skill takes a daring first flight. A bright, wordless animated comedy.',
    image: 'assets/img/card-wing-it.jpg',
    video: 'https://archive.org/download/wing_it/wing_it.mp4',
    source: {
      name: 'Internet Archive',
      item: 'wing_it',
      url: 'https://archive.org/details/wing_it',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
    },
    accent: '#fb923c'
  },
  {
    id: 'charge',
    title: 'Charge',
    type: 'movie',
    year: 2022,
    rating: 'TV-14',
    runtime: '4m',
    genres: ['Sci-Fi', 'Action', 'Animation'],
    description: 'A lone soldier and a mysterious machine face off in a rain-soaked, neon-lit wasteland. A punchy sci-fi action short.',
    image: 'assets/img/card-charge.jpg',
    video: 'https://archive.org/download/charge-blender-open-movie-1608p/Charge%20-%20Blender%20Open%20Movie%201608p.mp4',
    source: {
      name: 'Internet Archive',
      item: 'charge-blender-open-movie-1608p',
      url: 'https://archive.org/details/charge-blender-open-movie-1608p',
      license: 'Openly licensed',
      licenseUrl: 'https://studio.blender.org/films/charge/'
    },
    accent: '#f43f5e'
  },
  {
    id: 'cosmos-laundromat',
    title: 'Cosmos Laundromat',
    type: 'movie',
    year: 2015,
    rating: 'TV-PG',
    runtime: '12m',
    genres: ['Fantasy', 'Animation', 'Comedy'],
    description: 'A suicidal sheep meets a mysterious salesman who offers him a new life on a strange island. The first chapter of an ambitious animated feature.',
    image: 'assets/img/card-cosmos-laundromat.jpg',
    video: 'https://archive.org/download/cosmos-laundromat-first-cycle/Cosmos%20Laundromat%20-%20First%20Cycle.mp4',
    source: {
      name: 'Internet Archive',
      item: 'cosmos-laundromat-first-cycle',
      url: 'https://archive.org/details/cosmos-laundromat-first-cycle',
      license: 'Openly licensed',
      licenseUrl: 'https://studio.blender.org/films/cosmos-laundromat/'
    },
    accent: '#14b8a6'
  },
  {
    id: 'agent-327',
    title: 'Agent 327',
    type: 'movie',
    year: 2017,
    rating: 'TV-PG',
    runtime: '4m',
    genres: ['Action', 'Comedy', 'Animation'],
    description: 'Dutch secret agent Agent 327 walks into a barbershop expecting a trim — and finds a nest of villains. A stylish animated spy caper.',
    image: 'assets/img/card-agent-327.jpg',
    video: 'https://archive.org/download/agent327operationbarbershop/agent327-1080.mp4',
    source: {
      name: 'Internet Archive',
      item: 'agent327operationbarbershop',
      url: 'https://archive.org/details/agent327operationbarbershop',
      license: 'CC BY-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nd/4.0/'
    },
    accent: '#eab308'
  },
  {
    id: 'glass-half',
    title: 'Glass Half',
    type: 'movie',
    year: 2015,
    rating: 'TV-PG',
    runtime: '4m',
    genres: ['Comedy', 'Animation'],
    description: 'Two art critics argue over a single painting, each convinced the other is missing the point. A sharp animated comedy about perspective.',
    image: 'assets/img/card-glass-half.jpg',
    video: 'https://archive.org/download/GlassHalf1080p/Glass%20Half-1080p.mp4',
    source: {
      name: 'Internet Archive',
      item: 'GlassHalf1080p',
      url: 'https://archive.org/details/GlassHalf1080p',
      license: 'Openly licensed',
      licenseUrl: 'https://studio.blender.org/films/glass-half/'
    },
    accent: '#818cf8'
  },
  {
    id: 'coffee-run',
    title: 'Coffee Run',
    type: 'movie',
    year: 2020,
    rating: 'TV-PG',
    runtime: '4m',
    genres: ['Comedy', 'Animation'],
    description: 'A caffeine-starved woman races across town for her morning coffee, and reality starts to unravel. A playful animated short.',
    image: 'assets/img/card-coffee-run.jpg',
    video: 'https://archive.org/download/youtube--JwSyUzv6WA/-JwSyUzv6WA.mp4',
    source: {
      name: 'Internet Archive',
      item: 'youtube--JwSyUzv6WA',
      url: 'https://archive.org/details/youtube--JwSyUzv6WA',
      license: 'Openly licensed',
      licenseUrl: 'https://studio.blender.org/films/coffee-run/'
    },
    accent: '#d97706'
  },
  {
    id: 'jellyfish',
    title: 'Jellyfish',
    type: 'movie',
    year: 2024,
    rating: 'TV-G',
    runtime: '10s',
    genres: ['Nature', 'Ambient'],
    description: 'A mesmerizing open-license nature loop of jellyfish drifting through deep blue water. A calm, ambient short.',
    image: 'assets/img/card-jellyfish.jpg',
    video: 'assets/video/Jellyfish_720_10s_2MB.webm',
    source: {
      name: 'Test Videos',
      item: 'Jellyfish',
      url: 'https://test-videos.co.uk/jellyfish/webm-vp9',
      license: 'Free to download and use',
      licenseUrl: 'https://test-videos.co.uk/'
    },
    accent: '#06b6d4'
  },
  {
    id: 'caminandes',
    title: 'Caminandes',
    type: 'show',
    year: '2013–2016',
    rating: 'TV-G',
    runtime: '3 episodes',
    genres: ['Animation', 'Comedy', 'Kids'],
    description: 'A plucky Patagonian llama tries to cross the road, reach a juicy bush, and survive the wilds of Patagonia. Three wordless animated shorts from Blender Studio.',
    image: 'assets/img/hero-caminandes.jpg',
    video: 'https://archive.org/download/Caminandes1LlamaDrama/01_llama_drama_1080p.mp4',
    source: {
      name: 'Internet Archive',
      item: 'Caminandes1LlamaDrama',
      url: 'https://archive.org/details/Caminandes1LlamaDrama',
      license: 'CC BY 3.0',
      licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
    },
    accent: '#84cc16',
    featured: true,
    heroKicker: 'A tubi kids collection',
    episodes: [
      {
        id: 'caminandes-1',
        title: 'Llama Drama',
        runtime: '1m',
        description: 'Koro the llama spots a tempting bush on the other side of a busy Patagonian road.',
        image: 'assets/img/card-caminandes-1.jpg',
        video: 'https://archive.org/download/Caminandes1LlamaDrama/01_llama_drama_1080p.mp4',
        source: {
          name: 'Internet Archive',
          item: 'Caminandes1LlamaDrama',
          url: 'https://archive.org/details/Caminandes1LlamaDrama',
          license: 'CC BY 3.0',
          licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
        }
      },
      {
        id: 'caminandes-2',
        title: 'Gran Dillama',
        runtime: '2m',
        description: 'A fence stands between Koro and the greenest grass in Patagonia. Surely there is a way through.',
        image: 'assets/img/card-caminandes-2.jpg',
        video: 'https://archive.org/download/Caminandes2GranDillama/02_gran_dillama_1080p.mp4',
        source: {
          name: 'Internet Archive',
          item: 'Caminandes2GranDillama',
          url: 'https://archive.org/details/Caminandes2GranDillama',
          license: 'CC BY 3.0',
          licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
        }
      },
      {
        id: 'caminandes-3',
        title: 'Llamigos',
        runtime: '3m',
        description: 'A long winter and a tiny red fruit push Koro and a new friend to the edge of patience.',
        image: 'assets/img/card-caminandes-3.jpg',
        video: 'https://archive.org/download/CaminandesLlamigos/Caminandes_%20Llamigos-1080p.webm',
        source: {
          name: 'Internet Archive',
          item: 'CaminandesLlamigos',
          url: 'https://archive.org/details/CaminandesLlamigos',
          license: 'CC BY 3.0',
          licenseUrl: 'http://creativecommons.org/licenses/by/3.0/'
        }
      }
    ]
  },
  {
    id: 'blender-studio-shorts',
    title: 'Blender Studio Shorts',
    type: 'show',
    year: '2018–2023',
    rating: 'TV-PG',
    runtime: '6 episodes',
    genres: ['Animation', 'Comedy', 'Sci-Fi'],
    description: 'A rotating showcase of bold, independent animation from the Blender Studio. New worlds, strange creatures, and impossibly good hair — all made with open tools.',
    image: 'assets/img/card-sprite-fright.jpg',
    video: 'https://archive.org/download/hero_20260106/hero.mp4',
    source: {
      name: 'Internet Archive',
      item: 'hero_20260106',
      url: 'https://archive.org/details/hero_20260106',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
    },
    accent: '#f472b6',
    episodes: [
      {
        id: 'shorts-hero',
        title: 'Hero',
        runtime: '4m',
        description: 'A restless imagination escapes into a city of ink and light.',
        image: 'assets/img/card-hero.jpg',
        video: 'https://archive.org/download/hero_20260106/hero.mp4',
        source: {
          name: 'Internet Archive',
          item: 'hero_20260106',
          url: 'https://archive.org/details/hero_20260106',
          license: 'CC BY 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
        }
      },
      {
        id: 'shorts-wing-it',
        title: 'Wing It!',
        runtime: '3m',
        description: 'A tiny bird attempts a very big first flight.',
        image: 'assets/img/card-wing-it.jpg',
        video: 'https://archive.org/download/wing_it/wing_it.mp4',
        source: {
          name: 'Internet Archive',
          item: 'wing_it',
          url: 'https://archive.org/details/wing_it',
          license: 'CC BY 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
        }
      },
      {
        id: 'shorts-charge',
        title: 'Charge',
        runtime: '4m',
        description: 'A soldier and a machine face off in a neon wasteland.',
        image: 'assets/img/card-charge.jpg',
        video: 'https://archive.org/download/charge-blender-open-movie-1608p/Charge%20-%20Blender%20Open%20Movie%201608p.mp4',
        source: {
          name: 'Internet Archive',
          item: 'charge-blender-open-movie-1608p',
          url: 'https://archive.org/details/charge-blender-open-movie-1608p',
          license: 'Openly licensed',
          licenseUrl: 'https://studio.blender.org/films/charge/'
        }
      },
      {
        id: 'shorts-sprite-fright',
        title: 'Sprite Fright',
        runtime: '8m',
        description: 'Teens trespass in a forest and meet the locals.',
        image: 'assets/img/card-sprite-fright.jpg',
        video: 'https://archive.org/download/sprite-fright-blender-open-movie/Sprite%20Fright%20-%20Blender%20Open%20Movie.mp4',
        source: {
          name: 'Internet Archive',
          item: 'sprite-fright-blender-open-movie',
          url: 'https://archive.org/details/sprite-fright-blender-open-movie',
          license: 'Openly licensed',
          licenseUrl: 'https://studio.blender.org/films/sprite-fright/'
        }
      },
      {
        id: 'shorts-coffee-run',
        title: 'Coffee Run',
        runtime: '4m',
        description: 'A morning coffee run spirals into animated chaos.',
        image: 'assets/img/card-coffee-run.jpg',
        video: 'https://archive.org/download/youtube--JwSyUzv6WA/-JwSyUzv6WA.mp4',
        source: {
          name: 'Internet Archive',
          item: 'youtube--JwSyUzv6WA',
          url: 'https://archive.org/details/youtube--JwSyUzv6WA',
          license: 'Openly licensed',
          licenseUrl: 'https://studio.blender.org/films/coffee-run/'
        }
      },
      {
        id: 'shorts-agent-327',
        title: 'Agent 327',
        runtime: '4m',
        description: 'A secret agent gets the most dangerous haircut of his life.',
        image: 'assets/img/card-agent-327.jpg',
        video: 'https://archive.org/download/agent327operationbarbershop/agent327-1080.mp4',
        source: {
          name: 'Internet Archive',
          item: 'agent327operationbarbershop',
          url: 'https://archive.org/details/agent327operationbarbershop',
          license: 'CC BY-ND 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-nd/4.0/'
        }
      }
    ]
  }
];

const FEATURED_IDS = ['sintel', 'big-buck-bunny', 'tears-of-steel', 'caminandes'];

const HOME_ROWS = [
  {
    id: 'top10',
    title: 'Top 10 on tubi today',
    mode: 'top10',
    items: ['sintel', 'big-buck-bunny', 'tears-of-steel', 'sprite-fright', 'cosmos-laundromat', 'caminandes', 'hero', 'spring', 'agent-327', 'charge']
  },
  {
    id: 'trending',
    title: 'Trending now',
    items: ['tears-of-steel', 'sprite-fright', 'sintel', 'caminandes', 'charge', 'cosmos-laundromat', 'big-buck-bunny', 'hero']
  },
  {
    id: 'movies',
    title: 'Free movies',
    link: 'movies',
    items: ['sintel', 'big-buck-bunny', 'tears-of-steel', 'elephants-dream', 'spring', 'cosmos-laundromat', 'agent-327', 'glass-half', 'coffee-run', 'jellyfish']
  },
  {
    id: 'shows',
    title: 'Binge-worthy TV',
    link: 'shows',
    items: ['caminandes', 'blender-studio-shorts']
  },
  {
    id: 'because',
    title: 'Because you watched Sintel',
    items: ['tears-of-steel', 'elephants-dream', 'cosmos-laundromat', 'spring', 'sprite-fright', 'hero']
  },
  {
    id: 'animation',
    title: 'Animation station',
    items: ['big-buck-bunny', 'caminandes', 'spring', 'wing-it', 'coffee-run', 'agent-327', 'glass-half', 'sprite-fright']
  },
  {
    id: 'scifi',
    title: 'Sci-fi after dark',
    items: ['tears-of-steel', 'charge', 'elephants-dream', 'cosmos-laundromat', 'hero', 'agent-327']
  },
  {
    id: 'new',
    title: 'New to tubi',
    items: ['wing-it', 'charge', 'spring', 'coffee-run', 'hero', 'glass-half', 'jellyfish']
  }
];

const LIVE_CHANNELS = [
  {
    id: 'tubi-cinema',
    name: 'Tubi Cinema',
    now: 'Tears of Steel',
    next: 'Sintel',
    itemId: 'tears-of-steel',
    image: 'assets/img/hero-tears-of-steel.jpg',
    accent: '#38bdf8',
    time: '12:14',
    progress: 42
  },
  {
    id: 'animation-nation',
    name: 'Animation Nation',
    now: 'Big Buck Bunny',
    next: 'Caminandes',
    itemId: 'big-buck-bunny',
    image: 'assets/img/hero-bbb.jpg',
    accent: '#a3e635',
    time: '9:56',
    progress: 68
  },
  {
    id: 'sci-fi-after-dark',
    name: 'Sci-Fi After Dark',
    now: 'Charge',
    next: 'Elephants Dream',
    itemId: 'charge',
    image: 'assets/img/card-charge.jpg',
    accent: '#f43f5e',
    time: '4:08',
    progress: 22
  },
  {
    id: 'family-movie-night',
    name: 'Family Movie Night',
    now: 'Spring',
    next: 'Wing It!',
    itemId: 'spring',
    image: 'assets/img/card-spring.jpg',
    accent: '#22c55e',
    time: '7:41',
    progress: 51
  },
  {
    id: 'cult-classics',
    name: 'Cult Classics',
    now: 'Sprite Fright',
    next: 'Agent 327',
    itemId: 'sprite-fright',
    image: 'assets/img/card-sprite-fright.jpg',
    accent: '#ef4444',
    time: '8:02',
    progress: 77
  }
];

const BROWSE_FILTERS = ['All', 'Action', 'Animation', 'Comedy', 'Fantasy', 'Horror', 'Kids', 'Sci-Fi'];
