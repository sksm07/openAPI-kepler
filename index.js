const catInfo = document.querySelector(".cat-info");
const fetchACat = document.querySelector(".fetch_cat_btn");

fetchACat.addEventListener("click", () => {

fetch("https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=1&api_key=ddf4d0ec-c0dc-46f0-a44c-953076bee7a8")
  .then((res) =>{
    if(!res.ok){
        throw new Error("Invalid request")
    }
    return res.json();
  })
  .then((data) => {
    //clear previous content
    catInfo.innerHTML = "";

    // getting the breed name from the data

    let breedName = data[0].breeds[0].name;  
    const catBreedTitle = document.createElement("h2");
    catBreedTitle.innerText = breedName;
    
    //cat image
    let catImgUrl = data[0].url;
    const catImg = document.createElement("img");
    catImg.src = catImgUrl;
    catImg.alt = breedName;
    catImg.style.maxWidth = "400px";

   // getting cat's description

    const breedDescription = document.createElement("p");
    breedDescription.innerText =data[0].breeds[0].description;

    catInfo.appendChild(catBreedTitle);
    catInfo.appendChild(catImg);
    catInfo.appendChild(breedDescription);
    
  })
  .catch((err) => {
    window.alert(err)
  })

});