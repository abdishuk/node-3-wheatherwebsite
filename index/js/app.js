
//const proxyurl = "https://cors-anywhere.herokuapp.com/";

const wheatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const message1=document.querySelector('#message-1')
message1.textContent=''

const message2=document.querySelector('#message-2')
message2.textContent=''
wheatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= searchElement.value
    const url='/wheather?address=' + location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
               message1.textContent='error: ' + data.error
           } else{
               message1.textContent='Current Wheather: ' + data.forecast
               message2.textContent='location: ' + data.location
           }
        })
    })
})

