const videoCard2 = document.querySelector('.right-sidebar')

let api_key = "AIzaSyCkDGyVOJ9wHm5PMDiaPpQF1WDixEiPoS0";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20, 
    regionCode: 'IN'
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
    videoCard2.innerHTML += `
    
    <div class="side-video-list" onclick = "location.href = 'https://youtube.com/watch?v=${data.id}'">
            <a href="" class="small-thumb">
            <img src="${data.snippet.thumbnails.high.url}" alt=""></a>
        <div class="vid-info title2">
              <a href=""><h3>${data.snippet.title}</a></h3>
              <p>${data.snippet.channelTitle}</p>
              <p>15K Views</p>
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
