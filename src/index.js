
    const div1 = document.querySelector("#dog-bar")
    const div2 = document.querySelector("#dog-info")

    fetchDogs()

    function fetchDogs(){
        fetch('http://localhost:3000/pups')
        .then (res => res.json())
        .then(dogs => buildDog(dogs))
    }

    function editDog(dog){
        fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        }),
        })
        .then(response => response.json())
        .then(dog => {
            dog;
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        }

    function buildDog(dogs){
        dogs.forEach(dog => {
        let span = document.createElement('span')
        span.textContent = dog.name
        div1.appendChild(span)
        span.addEventListener('click',() => makeDog(dog))
    })
    }

    function makeDog(dog){
        div2.innerHTML = ' '
        let img = document.createElement('img')
        let h2 = document.createElement('h2')
        let btn = document.createElement('button')

         img.src = dog.image
         h2.textContent = dog.name
         div2.append(img, h2)

         if (dog.isGoodDog === true){
            btn.textContent = "Good Dog!"
            div2.appendChild(btn)
        }else{
            btn.textContent = "Bad Dog!"
            div2.appendChild(btn)
        }

        btn.addEventListener('click',() => {
            if(dog.isGoodDog === true){
                btn.textContent = "Bad Dog!"
            }else{
                btn.textContent = "Good Dog!"
            }
            div2.appendChild(btn)
            editDog(dog)
        })

    }

 
