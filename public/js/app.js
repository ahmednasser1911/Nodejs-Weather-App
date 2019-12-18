console.log('Client side javascript is loaded!')

const url = 'http://localhost:3000/weather'


const form = document.querySelector('form')
const searchAddress = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

form.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = searchAddress.value
    const fullAddress = `http://localhost:3000/weather?address=${location}`

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(fullAddress).then((res)=>{
    res.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.forcast
            messageTwo.textContent = data.location
        }
    })

})

})
