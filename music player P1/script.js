const songs = [
    { title: "Aap_Ki_Nazron_Ne_Samjha",src: "songs/song1.m4a" },
    { title: "ANIMAL_Pehle_Bhi_Main",src: "songs/song2.m4a" },
    { title: "Ashakya_Hi_Shakya_Kartil_Swami",src: "songs/song3.m4a" },
    { title: "Baatein_Ye_Kabhi_Na",src: "songs/song4.m4a" },
    { title: "Besharam_Rang_Song",src: "songs/song5.m4a" },
    { title: "Chori_Kiya_Re_Jiya", src: "songs/song6.m4a" },
    { title: "Chuttamalle",src: "songs/song7.m4a" },
    { title: "Dagabaaz_Re",src: "songs/song8.m4a" },
    { title: "Dekha_Hazaro_Dafaa",src: "songs/song9.m4a" },
    { title: "Dil_Ibaadatg",src: "songs/song510.m4a" },
    { title: "Ek_Din_Aap", src: "songs/song11.m4a" },
    { title: "Haan_Ke_Haan", src: "songs/song12.m4a" },
    { title: "Hasi_Ban_Gaye", src: "songs/song13.m4a" },
    { title: "Haule_Haule", src: "songs/song14.m4a" },
    { title: "Hey_Minnale", src: "songs/song15.m4a" },
    { title: "Ik_Mulaqaat", src: "songs/song16.m4a" },
    { title: "Ishq_Hai", src: "songs/song17.m4a" },
    { title: "Jaan_Nisaar", src: "songs/song18.m4a" }
    
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    audio.play();
}

function togglePlay() {
    audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    audio.currentTime = (e.offsetX / width) * audio.duration;
});

function setVolume(value) {
    audio.volume = value;
}

audio.addEventListener("ended", nextSong); // Autoplay next song

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
        currentSongIndex = index;
        loadSong(index);
    };
    playlist.appendChild(li);
});

// Load first song
loadSong(currentSongIndex);
