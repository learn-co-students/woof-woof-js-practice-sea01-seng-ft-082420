document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/pups'
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')

    getPups(url) 

    function getPups(url) {
        fetch(url)
        .then(resp => resp.json())
        .then(pups => pups.forEach(pup => buildDogBar(pup)))
    }

    function buildDogBar(pup) {
        let span = document.createElement('span')
        span.innerText = pup.name
        dogBar.appendChild(span)

        span.addEventListener('click', () => buildDog(pup))
    }
    
    function buildDog(pup) {
        dogInfo.innerHTML = ''
        let h2 = document.createElement('h2')
        let img = document.createElement('img')
        let button = document.createElement('button')

        h2.textContent = pup.name
        img.src = pup.image

        dogInfo.appendChild(h2)
        dogInfo.appendChild(img)
        dogInfo.appendChild(button)

        if (pup.isGoodDog === true) {
            button.innerText = 'Good Dog!'
        } else {
            button.innerText = 'Bad Dog!'
        }

        button.addEventListener('click', () => {
            if (button.innerText === 'Good Dog!') {
                button.innerText = 'Bad Dog!'
                pup.isGoodDog = true
            } else {
                button.innerText = 'Good Dog!'
                pup.isGoodDog = false
            }
            const configObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pup)
            }

            fetch(url + `/${pup.id}`, configObj)
            .then(resp => resp.json())
            .then(pup => console.log(pup))
        })
    }

})