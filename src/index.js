const dogBar = document.querySelector('#dog-bar')
const url = 'http://localhost:3000/pups'
const dogInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
goodDogFilter.addEventListener('click', () =>{
    dogBar.innerHTML = ''
    if (goodDogFilter.innerText == 'Filter good dogs: OFF'){
        goodDogFilter.innerText = 'Filter good dogs: ON'
    } else{
        goodDogFilter.innerText = 'Filter good dogs: OFF'
    }
    fetchDogs()
})
function fetchDogs() {
    fetch(url)
    .then(res => res.json())
    .then(dogs => {
        if (goodDogFilter.innerText == 'Filter good dogs: ON'){
            let goodDogs = dogs.filter(dog => dog.isGoodDog)
            goodDogs.forEach(dog => buildDog(dog))
        }else {
            dogs.forEach(dog => buildDog(dog))
        }
    })
}
function patchDog(dog) {
    fetch(`http://localhost:3000/pups/${dog.id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type":"application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dog) 
    })
    .then(res => res.json)
    .then(console.log)
}
fetchDogs()
function buildDog(dog) {
    let span = document.createElement('span')
    span.innerText = dog.name
    span.style="text-align:center"
    dogBar.appendChild(span)
    span.addEventListener('click', () => displayDog(dog))
}
function buildGoodDog(dog) {
    let span = document.createElement('span')
    span.innerText = dog.name
    span.style="text-align:center"
    dogBar.appendChild(span)
    span.addEventListener('click', () => displayDog(dog))
}
function displayDog(dog) {
    dogInfo.innerHTML = ''
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let btn = document.createElement('button')
    img.src = dog.image
    h2.innerText = dog.name
    if (dog.isGoodDog){
        btn.innerText = 'Good Dog!'
    } else {
        btn.innerText = 'Bad Dog!'
    }
    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(btn)
    btn.addEventListener('click', () => changeDogStatus(dog))
}
function changeDogStatus(dog) {
    if (dog.isGoodDog){
        dog.isGoodDog = false
    } else{
        dog.isGoodDog = true
    }
    displayDog(dog)
    patchDog(dog)
}