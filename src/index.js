document.addEventListener('DOMContentLoaded', function(){
    // Variable Assignments
    const fullUrl = 'http://localhost:3000/pups'
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')

    // Stand-Alone Event Listeners

    // Function Calls
    getPups(fullUrl)

    // Fetch Functions
    function getPups(url) {
        fetch(url)
        .then(resp => resp.json())
        .then(pups => pups.forEach(pup => fillDogBar(pup)))
    }

    // Functions
    function fillDogBar(pup) {
        let span = document.createElement('span')
        span.innerText = pup.name
        dogBar.appendChild(span)

        span.addEventListener('click', () => buildDogInfo(pup))
    }

    function buildDogInfo(pup) {
        dogInfo.innerHTML = ''
        let h2 = document.createElement('h2')
        let img = document.createElement('img')
        let button = document.createElement('button')

        h2.innerText = pup.name
        img.src = pup.image

        if (pup.isGoodDog === true) {
            button.innerText = 'Good Dog!'
        } else {
            button.innerText = 'Bad Dog!'
        }

        dogInfo.appendChild(h2)
        dogInfo.appendChild(img)
        dogInfo.appendChild(button)

        button.addEventListener('click', () => {
            if (button.innerText === 'Good Dog!') {
                button.innerText = 'Bad Dog!'
            } else {
                button.innerText = 'Good Dog!'
            }
            
            const btnData = {
                isGoodDog: !pup.isGoodDog
            }

            const configObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(btnData)
            }

            fetch(fullUrl + `/${pup.id}`, configObj)
            .then(resp => resp.json())
            .then(pup => console.log(pup))
        })
    }
})