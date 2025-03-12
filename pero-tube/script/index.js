
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
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        catContainer.append(catagDiv)
    }
}

// Load videos
function loadVideos(){
    fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response => response.json())
    .then(data => displayVideos(data.videos))
}

const displayVideos = (videos) => {
    console.log(videos);
    const videoContainer = document.getElementById("video-container");

    videos.forEach((video) => {
        console.log(video);
    });
    
}

loadVideos();
loadCategories();