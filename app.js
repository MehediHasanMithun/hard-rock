
document.getElementById("search-button").addEventListener("click", function () {
    const keyWord = document.getElementById("input-keyword").value;
    searchResultShow(keyWord);
});


function searchResultShow(keyWord) {
    const url = `https://api.lyrics.ovh/suggest/${keyWord}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const searchResult = document.getElementById("search");
            searchResult.innerHTML = "";
            const newResult = data.data;
            // console.log(data);
            const result = newResult.slice(0, 10);
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                const songTitle = result[i].title;
                const albumTitle = result[i].album.title;
                const artistName = result[i].artist.name;
                const songPreview = result[i].preview;
                searchResult.innerHTML += `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${songTitle}</h3>
                    <p class="author lead">Album  <span class="text-font">${albumTitle}</span>  by  <span class="text-font">${artistName}</span></p>
                    <audio controls>
                        <source src="${songPreview}" type="audio/mpeg">
                     </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick="showLyrics('${artistName}','${songTitle}')">Get Lyrics</button>
                </div>
            </div>
            `;
            }
        })
        .catch(error => displayError('Something Went Wrong!! Please try again later!'));
}

const showLyrics = async (artistName, songTitle) => {
    const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`;
    try {
        const res = await fetch(url)
        const data = await res.json();
        const songHeader = document.getElementById("song-header");
        songHeader.innerHTML = `<h3>${songTitle} by ${artistName}</h3>`;
        const songLyrics = document.getElementById('single');
        songLyrics.innerText = data.lyrics;

    } catch (error) {
        displayError('Something Went Wrong!! Please try again later!');
    }
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}
