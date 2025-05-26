const catInfo = document.querySelector(".cat-info");
const fetchACat = document.querySelector(".fetch_cat_btn");
const toggleApiBtn = document.querySelector(".toggle_api_btn");

let useBreedEndPoint = true;

toggleApiBtn.addEventListener("click", () => {
  useBreedEndPoint = !useBreedEndPoint;
  toggleApiBtn.innerText = useBreedEndPoint ? "Toggle Breed Info (ON)" : "Toggle Breed Info (OFF)";
})

fetchACat.addEventListener("click", () => {

  const endPoint = useBreedEndPoint 
    ? "https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=1&api_key=ddf4d0ec-c0dc-46f0-a44c-953076bee7a8" 
    : "https://api.thecatapi.com/v1/images/search?has_breeds=0&limit=1&api_key=ddf4d0ec-c0dc-46f0-a44c-953076bee7a8";

fetch(endPoint)
  .then((res) =>{
    if(!res.ok){
        throw new Error("Failed to fetch cat")
    }
    return res.json();
  })
  .then((data) => {
    //clear previous content
    catInfo.innerHTML = "";

    
    //cat image
    let catImgUrl = data[0].url;
    const catImg = document.createElement("img");
    catImg.src = catImgUrl;
    catImg.alt = "Cute cat";
    catImg.style.maxWidth = "400px";
    catInfo.appendChild(catImg);

   // getting cat's info

    if (useBreedEndPoint && data[0].breeds && data[0].breeds.length > 0) {
      let breedName = data[0].breeds[0].name;  
      const catBreedTitle = document.createElement("h2");
      catBreedTitle.innerText = breedName;

      const breedDescription = document.createElement("p");
      breedDescription.innerText =data[0].breeds[0].description;
      console.log(breedDescription)

      catInfo.appendChild(catBreedTitle);    
      catInfo.appendChild(breedDescription);
    }
    
  })
  .catch((err) => {
    window.alert(err)
  })

});