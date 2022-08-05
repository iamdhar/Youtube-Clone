const videoCardContainer = document.querySelector('.videos__container')
let api_key = "AIzaSyCkDGyVOJ9wHm5PMDiaPpQF1WDixEiPoS0";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 30, 
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
                         
                         
                </div>
            </div>
    </div>

    `;  
}






//seach bar

const searchInput = document.querySelector('.search_box');
const searchBtn = document.querySelector('.search_btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value; 
    }
})

//upload button
const form = document.querySelector("form"),
fileInput = form.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () =>{
    fileInput.click();
}); 











//size restriction
let input = document.querySelector('.file-input');
let span = document.querySelector('.mess');

input.addEventListener('change', () => {
    let files = input.files;
    if(files.length > 0) {
        if(files[0].size > 200 * 1000000){
            span.innerText = 'File size exceeds limit';  
            return;
        } 
    }
    span.innerText = '';
});


//upload restriction
function fileValidation(){
    var fileInp = document.getElementsByClassName(".file-input");
    var filePath = fileInp.value;
    var allowedExt = /(\.mp4|\.jpg)$/i; 
    if(allowedExt.exec(filePath)){
        alert('Please Upload a mp4 file.');
        fileInp.value = '';
        return false;
    }

}
    
//file type validation
function fileValidation() {
    var fileInput =
        document.getElementById('file_get');
     
    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.mp4|\.mkv|\.avi|\.gif)$/i;

    if (!allowedExtensions.exec(filePath)) {
            alert('Invalid file type, please upload a video file');
            fileInput.value = '';
            return false;
    }
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

