const url = 'http://localhost:3000/pups'
const dogBar = document.getElementById("dog-bar")
const dogInfo = document.getElementById("dog-info")
const filterBtn = document.getElementById("good-dog-filter")

function getDogs() {
    fetch(url)
    .then(res => res.json())
    .then(dogs => {

        addDogs(dogs)
    })
}

getDogs()

function addDogs(dogs) {
    dogs.forEach(dog => {
        let span = document.createElement('span')
        span.innerHTML = dog.name
        span.addEventListener("click", function(e) {
            displayDog(dog)
        })

        dogBar.appendChild(span)
    })
}

function displayDog(dog) {
    // let img = document.createElement("image")
    // img.setAttribute( "src", dog.image)
    // img.setAttribute('class', 'dog-info')
    // console.log(img)

    // let h3 = document.createAttribute('h3')

    // let dogDiv = document.createElement('div')
    // dogDiv.setAttribute('class', 'dog-summary-container')
    // dogDiv.append(img)
    // console.log(dogDiv)
    // dogInfo.append(dogDiv)

    dogInfo.innerHTML = 
    `
    <h2> ${dog.name} </h2>
    <img src="${dog.image}"> 
    </br>
    <button id=${dog.id}g>Good Dog!</button>
    `
    let btn = document.getElementById(dog.id + "g")
    if (dog.isGoodDog === true) {
        btn.innerHTML = "Good Dog!"
    } else {
        btn.innerHTML = "Bad Dog!"
    }
    btn.addEventListener('click', (e) => {
        toggleDog(dog)
        if (dog.isGoodDog === true) {
            btn.innerHTML = "Good Dog!"
            if (filterBtn.innerHTML === "Filter good dogs: ON") {
                addGoodDogs()
            }
        } else {
            btn.innerHTML = "Bad Dog!"
            if (filterBtn.innerHTML === "Filter good dogs: ON") {
                addGoodDogs()
            }
        }
        // console.log(dog.isGoodDog)
        // if (dog.isGoodDog === true) {
        //     dog.isGoodDog = false
        //     btn.innerHTML = "Bad Dog!"
        // }   else {
        //     dog.isGoodDog = true
        //     btn.innerHTML = "Good Dog!"
        // }
        // console.log(dog.isGoodDog)
    })
}

function toggleDog(dog) {
    dog.isGoodDog = !dog.isGoodDog
    fetch((url +"/"+ dog.id), {
        method: "PATCH",
        headers: {"Content-Type" : "application/json",
                "Accept" : "application/json"
        },
        body: JSON.stringify({ 
            isGoodDog : dog.isGoodDog
        }),
        }) 
        .then(res => res.json)
        // .then(data => console.log(data))
}

filterBtn.addEventListener("click", (e) => {
    filterDogs()
})

function filterDogs() {
    if (filterBtn.innerHTML === "Filter good dogs: OFF") {
        filterBtn.innerHTML = "Filter good dogs: ON"
        addGoodDogs()
    } else {
        filterBtn.innerHTML = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
        getDogs()
    }

}

function addGoodDogs() {
    fetch(url)
    .then(res => res.json())
    .then(dogs => {
        let goodDogs = dogs.filter(dog => dog.isGoodDog === true)
        dogBar.innerHTML = ""
        addDogs(goodDogs)
    })
}