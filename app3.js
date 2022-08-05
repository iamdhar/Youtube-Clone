const videoCardContainer = document.querySelector('.videos__container')
let api_key = "AIzaSyCkDGyVOJ9wHm5PMDiaPpQF1WDixEiPoS0";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20, 
    
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
 
}


const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    
    
    <div class="video" onclick = "location.href = 'https://youtube.com/watch?v=${data.id}'">
            <div class="video__thumbnail">
                <img src="${data.snippet.thumbnails.high.url}" alt="" />
                </div>
                    <div class="video__details">
                    <div class="author">
                        <img src="${data.channelThumbnail}" alt="" />
                    </div>
                    <div class="title">
                        <h3>${data.snippet.title}</h3>
                        <a href="">${data.snippet.channelTitle}</a>
                        <span>${data.snippet.publishedAt}</span>       
                </div>
            </div>
    </div>

    `;  
}


var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var filters = document.querySelector(".filters");
var videos = document.querySelector(".videos");

menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
    filters.classList.toggle("filters-two");
    videos.classList.toggle("videos-two");
}


$.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=Qq7mpb-hCBY&key={{AIzaSyCkDGyVOJ9wHm5PMDiaPpQF1WDixEiPoS0}}',
    function(data) {
    alert("viewCount: " + data.items[0].statistics.viewCount);
  });