// In a real production environment, this should be stored securely
const YOUTUBE_API_KEY = 'AIzaSyCg6f38_RPUR9uOvnfUsybjqxuVuV1yBx0';

// Add rate limiting
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 100; // milliseconds between requests

// Mood categories and their associated songs
const moodDatabase = {
    // Happy Moods
    joyful: ['happy upbeat music', 'feel good songs', 'cheerful hits'],
    excited: ['energetic music', 'party hits', 'dance music 2024'],
    cheerful: ['positive music', 'fun music', 'cheerful songs'],
    content: ['relaxing happy music', 'content mood music', 'peaceful happy songs'],
    optimistic: ['optimistic music', 'uplifting songs', 'positive vibes music'],
    playful: ['playful music', 'fun upbeat songs', 'happy dance music'],
    energetic: ['high energy music', 'workout hits', 'energetic songs'],
    proud: ['triumphant music', 'victory songs', 'proud moment music'],
    amused: ['funny music', 'humorous songs', 'light hearted music'],
    blissful: ['blissful music', 'happy peaceful songs', 'joyful ambient'],
    triumphant: ['victory music', 'triumphant orchestral', 'success music'],
    peaceful: ['peaceful music', 'tranquil songs', 'serene melodies'],

    // Love & Romance
    romantic: ['romantic love songs', 'romantic ballads', 'love music'],
    passionate: ['passionate love songs', 'romantic classics', 'deep love songs'],
    affectionate: ['sweet love songs', 'tender romantic music', 'affectionate ballads'],
    tender: ['tender love songs', 'gentle romantic music', 'soft love ballads'],
    intimate: ['intimate love songs', 'romantic evening music', 'close moments songs'],
    sentimental: ['sentimental love songs', 'emotional romantic music', 'heartfelt ballads'],
    loving: ['loving songs', 'romance music', 'love ballads'],
    warm: ['warm romantic music', 'cozy love songs', 'intimate ballads'],
    flirtatious: ['flirty music', 'playful love songs', 'flirtatious pop'],
    sensual: ['sensual music', 'romantic evening songs', 'intimate moments music'],

    // Calm & Relaxed
    serene: ['serene music', 'peaceful ambient', 'calming instrumental'],
    tranquil: ['tranquil music', 'peaceful sounds', 'calming ambient'],
    calm: ['calming music', 'relaxing sounds', 'peaceful melodies'],
    relaxed: ['relaxing music', 'chill sounds', 'laid back songs'],
    meditative: ['meditation music', 'mindfulness sounds', 'zen ambient'],
    gentle: ['gentle music', 'soft melodies', 'tender songs'],
    soothing: ['soothing music', 'calming sounds', 'relaxing melodies'],
    comfortable: ['comfortable music', 'cozy songs', 'relaxing ambient'],
    cozy: ['cozy music', 'comfortable sounds', 'warm ambient'],
    refreshed: ['refreshing music', 'revitalizing sounds', 'energizing calm'],
    mindful: ['mindfulness music', 'meditation sounds', 'conscious ambient'],

    // Sad Moods
    melancholic: ['melancholic music', 'sad piano songs', 'emotional ballads'],
    lonely: ['lonely music', 'solitude songs', 'alone time playlist'],
    heartbroken: ['heartbreak songs', 'sad breakup music', 'emotional pain songs'],
    nostalgic: ['nostalgic music', 'memories songs', 'reminiscent melodies'],
    gloomy: ['gloomy music', 'dark mood songs', 'sad atmosphere'],
    disappointed: ['disappointment songs', 'sad emotional music', 'letdown playlist'],
    regretful: ['regret songs', 'remorse music', 'sorry playlist'],
    hurt: ['hurt feelings music', 'pain songs', 'emotional wounds'],
    depressed: ['depression music', 'very sad songs', 'dark emotions'],
    grieving: ['grief songs', 'loss music', 'mourning playlist'],
    yearning: ['yearning songs', 'longing music', 'desire playlist'],
    hopeless: ['hopeless music', 'despair songs', 'lost hope playlist'],

    // Energetic Category
    motivated: ['workout motivation music', 'inspirational songs', 'pump up music'],
    confident: ['confidence boost songs', 'empowering music', 'powerful anthems'],
    
    // Focus Category
    focused: ['study music', 'concentration music', 'focus beats'],
    productive: ['work focus music', 'productivity playlist', 'concentration beats'],
    
    // Party Category
    party: ['party hits 2024', 'dance party mix', 'celebration music'],
    celebratory: ['celebration songs', 'party anthems', 'festive hits'],

    // Chill & Mellow Category
    mellow: ['mellow music', 'chill relaxing songs', 'laid back music'],
    lazy: ['lazy day music', 'relaxing chill songs', 'easy listening'],
    dreamy: ['dreamy ambient music', 'dream pop songs', 'ethereal music'],
    casual: ['casual listening music', 'easy going songs', 'background music'],
    easygoing: ['easy going music', 'relaxed vibes', 'chill mood songs'],
    'laid-back': ['laid back music', 'chill out songs', 'relaxing beats'],
    chilled: ['chilled music', 'lofi beats', 'chill atmosphere'],
    floating: ['floating music', 'ambient atmosphere', 'weightless songs'],
    drifting: ['drifting music', 'ambient flow', 'floating melodies'],

    // Power & Confidence Category
    powerful: ['powerful music', 'strong anthems', 'empowering songs'],
    strong: ['strong motivational music', 'powerful anthems', 'strength songs'],
    unstoppable: ['unstoppable music', 'motivational anthems', 'powerful beats'],
    fierce: ['fierce music', 'intense powerful songs', 'strong beats'],
    bold: ['bold music', 'confident songs', 'empowering anthems'],
    ambitious: ['ambitious music', 'success motivation', 'achievement songs'],
    empowered: ['empowering music', 'confidence boost', 'powerful motivation'],

    // Add any other missing moods here...
};

// Mood categories for organization
const moodCategories = {
    "Happy Moods": [
        "joyful", "excited", "cheerful", "content", "optimistic", "playful", 
        "energetic", "proud", "amused", "blissful", "triumphant", "peaceful"
    ],
    "Love & Romance": [
        "romantic", "passionate", "affectionate", "tender", "intimate", 
        "sentimental", "loving", "warm", "flirtatious", "sensual"
    ],
    "Calm & Relaxed": [
        "serene", "tranquil", "calm", "relaxed", "meditative", "gentle", 
        "soothing", "comfortable", "cozy", "refreshed", "mindful"
    ],
    "Sad Moods": [
        "melancholic", "lonely", "heartbroken", "nostalgic", "gloomy", 
        "disappointed", "regretful", "hurt", "depressed", "grieving", 
        "yearning", "hopeless"
    ],
    "Power & Confidence": [
        "confident", "powerful", "motivated", "determined", "strong", 
        "unstoppable", "fierce", "bold", "ambitious", "empowered"
    ],
    "Party & Fun": [
        "party", "celebratory", "festive", "wild", "carefree", "fun", 
        "groovy", "dancing", "upbeat", "silly"
    ],
    "Focus & Work": [
        "focused", "productive", "studious", "creative", "inspired", 
        "determined", "concentrated", "driven", "analytical"
    ],
    "Dark & Intense": [
        "angry", "intense", "rebellious", "dark", "brooding", "vengeful", 
        "frustrated", "aggressive", "defiant", "fierce"
    ],
    "Anxious & Stressed": [
        "anxious", "stressed", "nervous", "overwhelmed", "restless", 
        "worried", "uneasy", "tense", "pressured"
    ],
    "Chill & Mellow": [
        "mellow", "lazy", "dreamy", "casual", "easygoing", "laid-back", 
        "chilled", "floating", "drifting"
    ]
};

// Initialize the mood tags
function initializeMoodTags() {
    const moodTagsContainer = document.getElementById('moodTags');
    
    // Create two columns of categories
    const categories = Object.entries(moodCategories);
    const midpoint = Math.ceil(categories.length / 2);
    
    categories.forEach(([category, moods]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mood-category';
        categoryDiv.dataset.category = category;
        
        // Add category title
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        // Create mood tags container
        const moodTagsDiv = document.createElement('div');
        moodTagsDiv.className = 'mood-tags';
        
        moods.forEach(mood => {
            const tag = document.createElement('div');
            tag.className = 'mood-tag';
            tag.textContent = mood;
            tag.dataset.mood = mood;
            tag.addEventListener('click', toggleMoodSelection);
            moodTagsDiv.appendChild(tag);
        });
        
        categoryDiv.appendChild(moodTagsDiv);
        moodTagsContainer.appendChild(categoryDiv);
    });
}

// Toggle mood selection
function toggleMoodSelection(event) {
    const tag = event.target;
    const category = tag.closest('.mood-category');
    const maxSelectionsPerCategory = 3;
    
    if (tag.classList.contains('selected')) {
        tag.classList.remove('selected');
    } else {
        const selectedInCategory = category.querySelectorAll('.mood-tag.selected').length;
        if (selectedInCategory < maxSelectionsPerCategory) {
            tag.classList.add('selected');
            updateColorScheme(tag.dataset.mood);
        } else {
            alert(`You can only select up to ${maxSelectionsPerCategory} moods per category`);
        }
    }
}

// Function to fetch songs from YouTube with better error handling
async function fetchSongsForMood(mood, maxResults = 50) {
    // Check if mood exists in database
    if (!moodDatabase[mood]) {
        console.warn(`No search terms found for mood: ${mood}`);
        return [];
    }

    const searchTerms = moodDatabase[mood];
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(randomTerm + ' music')}&type=video&videoCategoryId=10&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&videoDuration=medium&relevanceLanguage=en`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                mode: 'cors'
            }
        );
        
        if (!response.ok) {
            const error = await response.json();
            console.error('YouTube API Error:', error);
            throw new Error(error.error?.message || 'Failed to fetch songs');
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            console.warn(`No results found for mood: ${mood}`);
            return [];
        }

        return data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url,
            description: item.snippet.description
        })).filter(song => song.videoId);
    } catch (error) {
        console.error('Error fetching songs for mood:', mood, error);
        return [];
    }
}

// Update the displaySongs function
function displaySongs(songs) {
    // Wait for DOM to be ready
    setTimeout(() => {
    const results = document.getElementById('results');
        if (!results) {
            console.error('Results container not found');
        return;
    }

        // Clear and prepare results section
    results.innerHTML = `
        <h3>Your Recommended Songs <span id="totalSongs" class="total-songs"></span></h3>
        <ul id="songList"></ul>
    `;
    
        const songList = document.getElementById('songList');
        if (!songList) {
            console.error('Song list container not found');
            return;
        }

        // Display songs
    songs.forEach((song, index) => {
            if (!song || !song.videoId) {
                console.warn('Invalid song data:', song);
                return;
            }

        const li = document.createElement('li');
        li.style.setProperty('--index', index);
        
        const songTitle = document.createElement('span');
            songTitle.textContent = song.title || 'Unknown Title';
        
        const linksContainer = document.createElement('div');
        linksContainer.className = 'song-links';
        
            // Create links only if we have a valid videoId
            if (song.videoId) {
        // YouTube Music link
        const youtubeMusicLink = document.createElement('a');
        youtubeMusicLink.href = `https://music.youtube.com/watch?v=${song.videoId}`;
        youtubeMusicLink.className = 'song-link music';
        youtubeMusicLink.target = '_blank';
        youtubeMusicLink.rel = 'noopener noreferrer';
        youtubeMusicLink.innerHTML = `<i class="fas fa-music"></i>`;
        youtubeMusicLink.title = 'Open in YouTube Music';
        
        // YouTube Video link
        const youtubeVideoLink = document.createElement('a');
        youtubeVideoLink.href = `https://www.youtube.com/watch?v=${song.videoId}`;
        youtubeVideoLink.className = 'song-link video';
        youtubeVideoLink.target = '_blank';
        youtubeVideoLink.rel = 'noopener noreferrer';
        youtubeVideoLink.innerHTML = `<i class="fab fa-youtube"></i>`;
        youtubeVideoLink.title = 'Watch on YouTube';
        
        linksContainer.appendChild(youtubeMusicLink);
        linksContainer.appendChild(youtubeVideoLink);
            }
        
        li.appendChild(songTitle);
        li.appendChild(linksContainer);
            songList.appendChild(li);
    });

        // Update song count and show results
    updateSongCountDisplay(songs.length);
    results.classList.add('show');
    }, 0);
}

// Update the song count display function
function updateSongCountDisplay(count) {
    const songCountDisplay = document.getElementById('totalSongs');
    if (songCountDisplay) {
        songCountDisplay.textContent = `(${count} songs)`;
    }
}

// Add a variable to store accumulated songs
let accumulatedSongs = new Set();

// Update the getSongs event listener with better error handling
document.getElementById('getSongs').addEventListener('click', async (e) => {
    const button = e.target;
    button.classList.add('loading');
    
    try {
        const selectedMoods = Array.from(document.getElementsByClassName('mood-tag selected'))
            .map(tag => tag.dataset.mood);
        
        if (selectedMoods.length === 0) {
            alert('Please select at least one mood!');
            return;
        }

        const songCount = parseInt(document.getElementById('songCount').value);
        const results = document.getElementById('results');
        
        // Show loading state
        results.classList.add('show');
        results.innerHTML = '<div class="loading-message">Fetching songs...</div>';

        // Fetch songs for each selected mood
        const songPromises = selectedMoods.map(mood => fetchSongsForMood(mood));
        const songResults = await Promise.all(songPromises);
        
        // Combine and filter results
        const allSongs = songResults.flat().filter(Boolean);
        
        if (allSongs.length === 0) {
            results.innerHTML = '<div class="error-message">No songs found. Please try different moods.</div>';
            return;
        }

        // Shuffle and select requested number of songs
        const shuffledSongs = [...new Set(allSongs.map(JSON.stringify))]
            .map(JSON.parse)
            .sort(() => Math.random() - 0.5)
            .slice(0, songCount);

        // Update display with animation
        results.style.opacity = '0';
        results.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            displaySongs(shuffledSongs);
            results.style.opacity = '1';
            results.style.transform = 'translateY(0)';
        }, 300);

    } catch (error) {
        console.error('Error getting songs:', error);
        const results = document.getElementById('results');
        results.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
    } finally {
        button.classList.remove('loading');
    }
});

// Add a reset button to clear accumulated songs
const resetButton = document.createElement('button');
resetButton.id = 'resetSongs';
resetButton.textContent = 'Reset Song Pool';
resetButton.className = 'reset-button';
resetButton.onclick = () => {
    accumulatedSongs.clear();
    const results = document.getElementById('results');
    results.classList.remove('show');
    document.querySelectorAll('.mood-tag.selected').forEach(tag => {
        tag.classList.remove('selected');
    });
};
document.querySelector('.mood-selector').appendChild(resetButton);

// Input validation for song count
document.getElementById('songCount').addEventListener('change', (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) e.target.value = 1;
    if (value > 50) e.target.value = 50;
});

// Add a resize handler to adjust layout on window resize
window.addEventListener('resize', () => {
    const moodTags = document.querySelectorAll('.mood-tag');
    moodTags.forEach(tag => {
        // Reset any inline styles that might affect layout
        tag.style.width = '';
    });
});

// Initialize the page
initializeMoodTags();

// Add this to your existing script.js
function updateColorScheme(mood) {
    const colorSchemes = {
        // Happy Moods - Bright, warm, and uplifting colors
        joyful: ['--color-33', '--color-34', '--color-13', '--color-48'],
        excited: ['--color-5', '--color-6', '--color-37', '--color-45'],
        cheerful: ['--color-40', '--color-33', '--color-24', '--color-13'],
        content: ['--color-10', '--color-38', '--color-32', '--color-49'],
        optimistic: ['--color-22', '--color-33', '--color-48', '--color-13'],
        playful: ['--color-7', '--color-35', '--color-3', '--color-14'],
        energetic: ['--color-21', '--color-37', '--color-41', '--color-45'],
        proud: ['--color-18', '--color-20', '--color-48', '--color-34'],
        amused: ['--color-7', '--color-8', '--color-35', '--color-13'],
        blissful: ['--color-39', '--color-42', '--color-31', '--color-27'],
        triumphant: ['--color-18', '--color-33', '--color-48', '--color-20'],
        peaceful: ['--color-27', '--color-30', '--color-31', '--color-32'],
        
        // Love & Romance - Passionate and warm tones
        romantic: ['--color-14', '--color-35', '--color-44', '--color-3'],
        passionate: ['--color-5', '--color-45', '--color-51', '--color-37'],
        affectionate: ['--color-8', '--color-14', '--color-35', '--color-44'],
        tender: ['--color-30', '--color-31', '--color-39', '--color-49'],
        intimate: ['--color-44', '--color-14', '--color-3', '--color-35'],
        sentimental: ['--color-6', '--color-14', '--color-44', '--color-51'],
        loving: ['--color-3', '--color-35', '--color-44', '--color-14'],
        warm: ['--color-13', '--color-34', '--color-45', '--color-6'],
        flirtatious: ['--color-3', '--color-8', '--color-35', '--color-14'],
        sensual: ['--color-44', '--color-35', '--color-3', '--color-14'],

        // Calm & Relaxed - Cool and soothing colors
        serene: ['--color-9', '--color-11', '--color-42', '--color-52'],
        tranquil: ['--color-27', '--color-30', '--color-31', '--color-32'],
        calm: ['--color-39', '--color-31', '--color-27', '--color-49'],
        relaxed: ['--color-30', '--color-32', '--color-49', '--color-27'],
        meditative: ['--color-27', '--color-39', '--color-31', '--color-30'],
        gentle: ['--color-32', '--color-39', '--color-31', '--color-49'],
        soothing: ['--color-27', '--color-30', '--color-39', '--color-31'],
        comfortable: ['--color-32', '--color-27', '--color-49', '--color-30'],
        cozy: ['--color-13', '--color-32', '--color-30', '--color-27'],
        refreshed: ['--color-39', '--color-42', '--color-31', '--color-27'],
        mindful: ['--color-27', '--color-31', '--color-39', '--color-30'],

        // Sad Moods - Deep and muted colors
        melancholic: ['--color-25', '--color-26', '--color-43', '--color-50'],
        lonely: ['--color-26', '--color-43', '--color-25', '--color-7'],
        heartbroken: ['--color-51', '--color-44', '--color-45', '--color-37'],
        nostalgic: ['--color-7', '--color-50', '--color-25', '--color-43'],
        gloomy: ['--color-25', '--color-43', '--color-26', '--color-50'],
        disappointed: ['--color-26', '--color-25', '--color-50', '--color-43'],
        regretful: ['--color-43', '--color-25', '--color-26', '--color-50'],
        hurt: ['--color-51', '--color-37', '--color-45', '--color-44'],
        depressed: ['--color-25', '--color-43', '--color-26', '--color-50'],
        grieving: ['--color-26', '--color-25', '--color-50', '--color-43'],
        yearning: ['--color-7', '--color-43', '--color-25', '--color-50'],
        hopeless: ['--color-25', '--color-26', '--color-43', '--color-50'],

        // Power & Confidence - Strong and bold colors
        confident: ['--color-16', '--color-41', '--color-34', '--color-45'],
        powerful: ['--color-17', '--color-25', '--color-43', '--color-50'],
        motivated: ['--color-22', '--color-46', '--color-10', '--color-28'],
        determined: ['--color-45', '--color-46', '--color-47', '--color-48'],
        strong: ['--color-41', '--color-17', '--color-25', '--color-43'],
        unstoppable: ['--color-5', '--color-37', '--color-41', '--color-45'],
        fierce: ['--color-51', '--color-37', '--color-41', '--color-5'],
        bold: ['--color-41', '--color-5', '--color-37', '--color-45'],
        ambitious: ['--color-18', '--color-19', '--color-20', '--color-44'],
        empowered: ['--color-17', '--color-41', '--color-5', '--color-37'],

        // Party & Fun - Vibrant and energetic colors
        party: ['--color-3', '--color-6', '--color-35', '--color-37'],
        celebratory: ['--color-18', '--color-20', '--color-40', '--color-48'],
        festive: ['--color-33', '--color-34', '--color-40', '--color-13'],
        wild: ['--color-5', '--color-37', '--color-41', '--color-35'],
        carefree: ['--color-8', '--color-35', '--color-3', '--color-13'],
        fun: ['--color-7', '--color-8', '--color-14', '--color-35'],
        groovy: ['--color-3', '--color-35', '--color-7', '--color-8'],
        dancing: ['--color-6', '--color-35', '--color-3', '--color-37'],
        upbeat: ['--color-33', '--color-40', '--color-13', '--color-34'],
        silly: ['--color-7', '--color-8', '--color-35', '--color-3'],

        // Focus & Work - Professional and productive colors
        focused: ['--color-2', '--color-4', '--color-9', '--color-11'],
        productive: ['--color-10', '--color-22', '--color-28', '--color-46'],
        studious: ['--color-11', '--color-2', '--color-4', '--color-9'],
        creative: ['--color-3', '--color-7', '--color-35', '--color-8'],
        inspired: ['--color-7', '--color-3', '--color-35', '--color-14'],
        concentrated: ['--color-4', '--color-9', '--color-11', '--color-2'],
        driven: ['--color-22', '--color-46', '--color-28', '--color-10'],
        analytical: ['--color-9', '--color-11', '--color-2', '--color-4'],

        // Default - balanced engagement
        default: ['--color-1', '--color-11', '--color-23', '--color-47']
    };

    const selectedColors = colorSchemes[mood] || colorSchemes.default;
    
    // Apply new colors with smoother transition
    document.body.style.transition = 'background 2s ease';
    document.body.style.background = `
        linear-gradient(
            -45deg,
            var(${selectedColors[0]}),
            var(${selectedColors[1]}),
            var(${selectedColors[2]}),
            var(${selectedColors[3]})
        )
    `;
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradientFlow 15s ease infinite';

    // Update mood selector colors
    const moodSelector = document.querySelector('.mood-selector');
    moodSelector.style.setProperty('--current-color-1', selectedColors[0].replace('--', ''));
    moodSelector.style.setProperty('--current-color-2', selectedColors[1].replace('--', ''));
    moodSelector.style.setProperty('--current-color-3', selectedColors[2].replace('--', ''));

    // Update container glow with smoother transition
    const container = document.querySelector('.container');
    container.style.transition = 'box-shadow 2s ease';
    container.style.boxShadow = `0 0 30px var(${selectedColors[0]})`;
}
