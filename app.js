const input = document.getElementById("input-field");
const search = document.getElementById("search-btn");

const searchResult = async () => {
    const url = `https://api.lyrics.ovh/suggest/${input.value}`
    console.log(url);
    // load data..
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);
    }
    catch (error) {
        displayError("Sorry, something went wrong!! Please try again later.");
    }

}

const displaySongs = (songs) => {

    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    document.getElementById("lyrics").innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls src="${song.preview}"></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onClick= "getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
    

}

const getLyrics = async (artist, title) => {
    
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    console.log(url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError("Sorry, something went wrong!! Please try again later.");
    }

}

const displayLyrics = (lyrics) => {
    const lyricsDiv = document.getElementById("lyrics");
    lyricsDiv.innerText = lyrics;
}

const displayError = (error) => {
    document.getElementById("error-message").innerText = error;
}