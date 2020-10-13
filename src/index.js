document.addEventListener('DOMContentLoaded', function(){

    let dogBar = document.querySelector('#dog-bar')
    let isGoodDog = true
    let filterDog = document.querySelector('#good-dog-filter')

    filterDog.addEventListener('click', ()=> filterDogs())

    fetchDogs()

    function fetchDogs () {
      fetch('http://localhost:3000/pups')
      .then (resp => resp.json())
      .then(dogs => {
        if (filterDog.innerText == 'Filter good dogs: ON'){
          let goodDogs = dogs.filter(dog => dog.isGoodDog== true)
          console.log(goodDogs)
          goodDogs.forEach(dog => buildBar(dog))
        }else{
        dogs.forEach(dog => buildBar(dog))
        }
      })
    }

    function patchDog(dog){
      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dog)
      })
      .then(resp => resp.json())
      .then (console.log)
    }

    function buildBar(dog){
        let span = document.createElement('span')
        span.id = 'dog_span'
        span.innerText = dog.name
        dogBar.appendChild(span)

        span.addEventListener('click', ()=> displayDog(dog))
    }

    
   

      function displayDog(dog){
      let dogInfo = document.querySelector('#dog-info')
      dogInfo.innerHTML =''
      let image = document.createElement('img')
      let h2 = document.createElement('h2')
      let btn = document.createElement('button')

      image.src = dog.image
      h2.innerText = dog.name 
      if (dog.isGoodDog){
        btn.innerText ='Good Dog'
      }else {
        btn.innerText = "Bad Dog"
      }
     

      dogInfo.appendChild(image)
      dogInfo.appendChild(h2)
      dogInfo.appendChild(btn)
      console.log(dogInfo)

      btn.addEventListener ('click', () => changeDogBehavior(dog))

    }

    function changeDogBehavior(dog){
      if (dog.isGoodDog == false){
        dog.isGoodDog =true
      }else {
        dog.isGoodDog = false
      }
      displayDog(dog)
      patchDog(dog)
    }

    function filterDogs(){
      
      if (filterDog.innerText = 'Filter good dogs: OFF'){
        filterDog.innerText = 'Filter good dogs: ON'
      }else {
        filterDog.innerText ='Filter good dogs: OFF'
      }
      fetchDogs()
    }


      
    })



