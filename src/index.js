window.addEventListener('DOMContentLoaded', () => {
    const dogBarDiv = document.getElementById('dog-bar');
    let filterOn = false;
    const filterBtn = document.getElementById('good-dog-filter')

    filterBtn.addEventListener('click', () => {
        filterOn = !filterOn;
        fetchDogs();
    })

    fetchDogs();

    function fetchDogs(){
        fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(dogs => filterDogs(dogs))
    }

    function filterDogs(dogs){
        let dogList = []
        if (filterOn) {
            dogs.forEach(dog => {
                if (dog.isGoodDog){
                    dogList.push(dog)
                }
            })
        } else {
            dogList = dogs
        }
        fillDogsBar(dogList)
    }

    function fillDogsBar(allDogs){
        dogBarDiv.innerHTML = ''
        allDogs.forEach(dog => {
            const dogSpan = document.createElement('span');
            dogSpan.innerText = dog.name;
            dogSpan.addEventListener('click', () => {
                displayDog(dog);
            });
            dogBarDiv.appendChild(dogSpan);
        })
    }

    function displayDog(dog){
        fetch(`http:localhost:3000/pups/${dog.id}`)
        .then(resp => resp.json())
        .then(dogç => {
            const dogInfoDiv = document.getElementById('dog-info');

            dogInfoDiv.innerHTML = '';

            const dogImg = document.createElement('img');
            const dogName = document.createElement('h2');
            const dogBtn = document.createElement('button');

            dogImg.src = dog.image;
            dogName.innerText = dog.name;
            dogBtn.type = 'button';
            dogBtn.id = 'good-bad-button';
            if (dog.isGoodDog){
                dogBtn.textContent = "Good Dog!";
            } else {
                dogBtn.textContent = "Bad Dog!";
            }
            dogBtn.addEventListener('click', () => {
                updateGoodBad(dog);
            })

            dogInfoDiv.appendChild(dogImg);
            dogInfoDiv.appendChild(dogName);
            dogInfoDiv.appendChild(dogBtn);
        })
    }

    function updateGoodBad(dog){
        fetch(`http:localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
        })
        .then(resp => resp.json())
        .then(updated => displayDog(updated))
    }
})