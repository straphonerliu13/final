window.addEventListener('DOMContentLoaded',function () {

    console.log('loaded')

    let outputElement = document.querySelector('.mood')

    let img1 = document.queryselector('#icon1')
    img1.addEventListener('click', function(event) {
        console.log('image 1 clicked')
        event.preventDefault()

        outputElement.innerHTML = `
        <img src="../finalproject-ankur/icons/1unselected.svg" id="icon1">
        <img src="../finalproject-ankur/icons/2unselected.svg" id="icon2">
        <img src="../finalproject-ankur/icons/3unselected.svg" id="icon3">
        <img src="../finalproject-ankur/icons/4unselected.svg" id="icon4">
        <img src="../finalproject-ankur/icons/5unselected.svg" id="icon5">
        `
    
        document.querySelector('.mood-log').insertAdjacentHTML('beforeend',`
            <div class="py-4 text-xl">
                <li> ${Today()} 
                <img src="../finalproject-ankur/icons/1unselected.svg" id="icon1">
                <img src="../finalproject-ankur/icons/2unselected.svg" id="icon2">
                <img src="../finalproject-ankur/icons/3unselected.svg" id="icon3">
                <img src="../finalproject-ankur/icons/4unselected.svg" id="icon4">
                <img src="../finalproject-ankur/icons/5unselected.svg" id="icon5">
                </li>
            </div>
        `) 
    })



//     outputElement.innerHTML = `
//     <img src="../finalproject-ankur/icons/1unselected.svg" id="1unselected">
//     <img src="../finalproject-ankur/icons/2unselected.svg" id="2unselected">
//     <img src="../finalproject-ankur/icons/3unselected.svg" id="3unselected">
//     <img src="../finalproject-ankur/icons/4unselected.svg" id="4unselected">
//     <img src="../finalproject-ankur/icons/5unselected.svg" id="5unselected">
// `
})