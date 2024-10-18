// category btn fetch function
const category = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const petCategory = await response.json()
    displayCategoriesBtn(petCategory.categories);
}
category()

// show categories all pet
const showCategoriesPets=async(id,btn)=>{
    console.log(id);
    const buttons = document.querySelectorAll('.myBtn');
    console.log(buttons);
    buttons.forEach(button => {
        button.classList.remove('active')
});
    btn.classList.add('active');
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}
    `)
    const showPets = await response.json()
    displayAllPets(showPets.data)
}

// Create display fetch categories button
const displayCategoriesBtn = (categoriesData) => {
    const categoryContainer = document.getElementById('category-container')
    categoriesData.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <button onclick="showCategoriesPets('${element.category}',this)" class="border gap-2 lg:flex items-center px-16 py-5 rounded-xl myBtn">
        <div><img src="${element.category_icon}" alt=""></div>
        <div class="text-xl font-bold">${element.category}</div>
        </button>
        `
        categoryContainer.appendChild(div);
    });
}


// all pets function fetch
const allPets = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const allData = await response.json()
    displayAllPets(allData.pets);
}
allPets()

// allPets display
const displayAllPets=(Pets)=>{
    const allPetsContainer = document.getElementById('allPets-container');
    allPetsContainer.innerHTML= '';
    if(Pets==0){
        allPetsContainer.classList.remove("grid");
        allPetsContainer.innerHTML = `
        <div class="space-y-4 text-center bg-[#13131308] p-20 rounded-xl">
        <img class="mx-auto" src="images/error.webp" alt="">
        <h1 class="text-3xl font-extrabold">No Information Available</h1>
        <p class="text-xl font-medium text-[#131313B3]">
        Sorry, no pets match your search at the moment. But don’t worry, new pets are added regularly! Please check back soon or adjust your search filters to explore other wonderful pets waiting for their forever home.</p>
        </div>
        `
        return;
    }
    else{
        allPetsContainer.classList.add("grid");
    }
    Pets.forEach(pet=>{
        const {petId} = pet
        const petsCard = document.createElement("div");
        petsCard.classList= "card card-compact border p-3"
        petsCard.innerHTML= `
        <figure>
        <img
        src="${pet.image}"
        alt="Pets" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${pet?.pet_name || 'N/A'}</h2>
        <p><i class="fa-solid fa-border-all"></i> Breed: ${pet?.breed || 'N/A'}</p>
        <p><i class="fa-regular fa-calendar-days"></i> Birth: ${pet?.date_of_birth || 'N/A'}</p>
        <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet?.gender || 'N/A'}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet?.price || 'N/A'} $</p>
        <div class="flex justify-between gap-2 text-[#0E7A81] text-sm font-semibold">
        <button onclick="petsCard('${pet.image}')" class="border rounded-lg px-3 py-2 hover:bg-[#0E7A81] hover:text-white">Like</button>
        <button id="adoptBtn" onclick="adoptModal()" class="border rounded-lg px-3 py-2 hover:bg-[#0E7A81] hover:text-white">Adopt</button>
        <button onclick="showModalDetails('${petId}')" class="border rounded-lg px-3 py-2 hover:bg-[#0E7A81] hover:text-white">Details</button>
        </div>
        </div>
        `
        allPetsContainer.appendChild(petsCard);
        // console.log(adoptBtn);
    })
};


// card right Side grid 
const petsCard=(cardShow)=>{
    const petsShowCard = document.getElementById("pets-show-card");
    const div = document.createElement("div")
    div.innerHTML=`
    <img class="rounded-2xl p-2" src="${cardShow}" alt=""></img>
    `
    petsShowCard.appendChild(div);
}


// button modal details
const showModalDetails=async(petId)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const detailsData =await res.json()
    const petDetails = (detailsData.petData);
    const {image,breed,date_of_birth,price,gender,pet_details,vaccinated_status,pet_name} = petDetails
    const modalContainer = document.getElementById("modalContainer")
    modalContainer.innerHTML = ''
    const div = document.createElement('div')
        div.innerHTML = `
<div class="">
        <img class="w-full" src="${image || 'N/A'}" alt="">
    <div class="my-5">
        <h1 class="text-3xl font-bold">${pet_name || 'N/A'}</h1>
    </div>

<div class="flex gap-10 border-b-2 space-y-4">
        <div>
            <p><i class="fa-solid fa-border-all"></i> Breed: ${breed || 'N/A'}</p>
            <p><i class="fa-solid fa-mars-and-venus"></i> Gender: ${gender || 'N/A'}</p>
            <p><i class="fa-solid fa-mars-and-venus"></i> Vaccinated Status: ${vaccinated_status || 'N/A'}</p>
        </div>
        <div>
            <p><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth || 'N/A'}</p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price || 'N/A'} $</p>
        </div>
</div>
        <div class="my-5">
                <h1 class="font-bold text-xl">Details Information</h1>
                <p class="text-[#131313B3] text-lg">${pet_details || 'N/A'}</p>
        </div>
</div>
        `
        modalContainer.appendChild(div)
        my_modal_4.showModal()
};


// countdown adopt modal
let countdownInterval;
const adoptModal = () =>{
    const modal = document.getElementById('my_modal_1');
    const countDownNumber = document.getElementById('count-number');
    let countdown = 3;

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countDownNumber.textContent = countdown;
    modal.showModal();

    countdownInterval = setInterval(() => {
        countdown -= 1;
        countDownNumber.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            modal.close();
        }
    }, 1000);
    setTimeout(() => {
        clearInterval(countdownInterval);
        modal.close();
    }, 3000); 
    const btn =document.getElementById('adoptBtn')
};
