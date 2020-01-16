const genres = [
    {label: "acoustic", checked: false},
    {label: "afrobeat", checked: false},
    {label: "alt-rock", checked: false},
    {label: "alternative", checked: false},
    {label: "ambient", checked: false},
    {label: "anime", checked: false},
    {label: "black-metal", checked: false},
    {label: "bluegrass", checked: false},
    {label: "blues", checked: false},
    {label: "bossanova", checked: false},
    {label: "brazil", checked: false},
    {label: "breakbeat", checked: false},
    {label: "british", checked: false},
    {label: "cantopop", checked: false},
    {label: "chicago-house", checked: false},
    {label: "children", checked: false},
    {label: "chill", checked: false},
    {label: "classical", checked: false},
    {label: "club", checked: false},
    {label: "comedy", checked: false},
    {label: "country", checked: false},
    {label: "dance", checked: false},
    {label: "dancehall", checked: false},
    {label: "death-metal", checked: false},
    {label: "deep-house", checked: false},
    {label: "detroit-techno", checked: false},
    {label: "disco", checked: false},
    {label: "disney", checked: false},
    {label: "drum-and-bass", checked: false},
    {label: "dub", checked: false},
    {label: "dubstep", checked: false},
    {label: "edm", checked: false},
    {label: "electro", checked: false},
    {label: "electronic", checked: false},
    {label: "emo", checked: false},
    {label: "folk", checked: false},
    {label: "forro", checked: false},
    {label: "french", checked: false},
    {label: "funk", checked: false},
    {label: "garage", checked: false},
    {label: "german", checked: false},
    {label: "gospel", checked: false},
    {label: "goth", checked: false},
    {label: "grindcore", checked: false},
    {label: "groove", checked: false},
    {label: "grunge", checked: false},
    {label: "guitar", checked: false},
    {label: "happy", checked: false},
    {label: "hard-rock", checked: false},
    {label: "hardcore", checked: false},
    {label: "hardstyle", checked: false},
    {label: "heavy-metal", checked: false},
    {label: "hip-hop", checked: false},
    {label: "holidays", checked: false},
    {label: "honky-tonk", checked: false},
    {label: "house", checked: false},
    {label: "idm", checked: false},
    {label: "indian", checked: false},
    {label: "indie", checked: false},
    {label: "indie-pop", checked: false},
    {label: "industrial", checked: false},
    {label: "iranian", checked: false},
    {label: "j-dance", checked: false},
    {label: "j-idol", checked: false},
    {label: "j-pop", checked: false},
    {label: "j-rock", checked: false},
    {label: "jazz", checked: false},
    {label: "k-pop", checked: false},
    {label: "kids", checked: false},
    {label: "latin", checked: false},
    {label: "latino", checked: false},
    {label: "malay", checked: false},
    {label: "mandopop", checked: false},
    {label: "metal", checked: false},
    {label: "metal-misc", checked: false},
    {label: "metalcore", checked: false},
    {label: "minimal-techno", checked: false},
    {label: "movies", checked: false},
    {label: "mpb", checked: false},
    {label: "new-age", checked: false},
    {label: "new-release", checked: false},
    {label: "opera", checked: false},
    {label: "pagode", checked: false},
    {label: "party", checked: false},
    {label: "philippines-opm", checked: false},
    {label: "piano", checked: false},
    {label: "pop", checked: false},
    {label: "pop-film", checked: false},
    {label: "post-dubstep", checked: false},
    {label: "power-pop", checked: false},
    {label: "progressive-house", checked: false},
    {label: "psych-rock", checked: false},
    {label: "punk", checked: false},
    {label: "punk-rock", checked: false},
    {label: "r-n-b", checked: false},
    {label: "rainy-day", checked: false},
    {label: "reggae", checked: false},
    {label: "reggaeton", checked: false},
    {label: "road-trip", checked: false},
    {label: "rock", checked: false},
    {label: "rock-n-roll", checked: false},
    {label: "rockabilly", checked: false},
    {label: "romance", checked: false},
    {label: "sad", checked: false},
    {label: "salsa", checked: false},
    {label: "samba", checked: false},
    {label: "sertanejo", checked: false},
    {label: "show-tunes", checked: false},
    {label: "singer-songwriter", checked: false},
    {label: "ska", checked: false},
    {label: "sleep", checked: false},
    {label: "songwriter", checked: false},
    {label: "soul", checked: false},
    {label: "soundtracks", checked: false},
    {label: "spanish", checked: false},
    {label: "study", checked: false},
    {label: "summer", checked: false},
    {label: "swedish", checked: false},
    {label: "synth-pop", checked: false},
    {label: "tango", checked: false},
    {label: "techno", checked: false},
    {label: "trance", checked: false},
    {label: "trip-hop", checked: false},
    {label: "turkish", checked: false},
    {label: "work-out", checked: false},
    {label: "world-music", checked: false}
]

export default genres