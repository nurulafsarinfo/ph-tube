
// function loadCatagories(){

//     // fetch the data
//     fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

//     //2. convert promise to json
//     .then((res) => res.json())
//     // 3. send data to display
//     .then(data => displayCategories(data.categories));
// }

// function displayCategories(categories){
//     // get the container
//     const categoryContainer = document.getElementById("category-container");

//     //loop operation on Array of object
//     for(let cat of categories){
//         console.log(cat);
//         //Create Element 
//         const categoryDiv = document.createElement("div");

//         categoryDiv.innerHTML = `
//         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
//         `;

//         // Append the element
//         categoryContainer.append(categoryDiv);
//     }
// }

// loadCatagories();


// show loader 



function loadCategories (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayAllCatag(data.categories))
}

// Nav bar categories section Showing
function displayAllCatag (allCategories){
    const catContainer = document.getElementById("category-container");

    for(let cat of allCategories){
        // console.log(cat);
        const catagDiv = document.createElement("div");
        catagDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        catContainer.append(catagDiv)
    }
}


// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }

// Load videos
function loadVideos(searchText = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(response => response.json())
    .then(data => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    })
}

const displayVideos = (videos) => {
    console.log(videos);
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = '';

    if(videos.length == 0){
        videoContainer.innerHTML = `
        <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">
                Oops!! Sorry, There is no content here 
            <h2>
        </div>
        `;

        return;
    }

    videos.forEach((video) => {
        console.log(video);

        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
             <div class="card bg-base-100">
        <figure class="relative">
            <img class="w-full h-[150px] object-cover"
            src="${video.thumbnail}" />
            <span class="absolute bottom-2 right-2 text-white text-sm rounded bg-slate-600 px-3 py-1">3hrs 56 min ago</span>
        </figure>
        
        <!-- profile  -->
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
            </div>

            <div class="intro">
                <h2 class="text-sm font-semibold" >${video.title}</h2>
                <p class="flex gap-2 text-sm text-gray-400">${video.authors[0].profile_name} 
                ${video.authors[0].verified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=60&id=lalayI2ulYNt&format=png" alt=""></p>` : ``}

                <p class="text-sm text-gray-400">${video.others.views}</p>
            </div>
        </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>
        `;


        videoContainer.append(videoCard);
    });
    
}

// load Categories Videos

const loadCategoriesVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickedButton = document.getElementById(`btn-${id}`);
        
        removeActiveClass();

        clickedButton.classList.add('active');
        console.log("clicked button is: ",clickedButton);
        displayVideos(data.category)
    })
    
}

// Active class
function removeActiveClass(){
    const activeButton = document.getElementsByClassName("active");

    for(let btn of activeButton){
         btn.classList.remove("active");
    }

}

// load video Details
const loadVideoDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video))
}

// display video contant 
const displayVideoDetails = (video) => {
    console.log(video);

    // access the video data properly
    
    const { thumbnail, title, authors, others, description } = video;

    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details_container");

    detailsContainer.innerHTML = `
    <div class="card bg-base-100  shadow-sm">
    <figure>
        <img
        src="${thumbnail}" alt="video thumbnail" />
     </figure>
     <div class="card-body">
        <h2 class="card-title text-xl">${title}</h2>
        <p>${description}</p>
        <div class="pt-5 flex justify-center items-center gap-3"> 
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
                </div>
            </div>
            <p class="text-xl">${video.authors[0].profile_name}</p>

     </div>
     </div>
    </div>
    `
}


document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
})


loadCategories();