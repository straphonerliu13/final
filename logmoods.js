window.addEventListener('DOMContentLoaded',function() {

    console.log('loaded')

    let outputElement = document.querySelector('.mood')

    let img1 = document.querySelector('#icon1')
    let img2 = document.querySelector('#icon2')
    let img3 = document.querySelector('#icon3')
    let img4 = document.querySelector('#icon4')
    let img5 = document.querySelector('#icon5')

// Adding Event Listener to First Icon
    img1.addEventListener('click', function(event) {
        console.log('icon 1 clicked')
        event.preventDefault()

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../final/assets/icons/1selected.svg">
        <img src="../final/assets/icons/2unselected.svg">
        <img src="../final/assets/icons/3unselected.svg">
        <img src="../final/assets/icons/4unselected.svg">
        <img src="../final/assets/icons/5unselected.svg">
        `
    })

    // Adding Event Listener to Second Icon
    img2.addEventListener('click', function(event) {
        console.log('icon 2 clicked')
        event.preventDefault()

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../final/assets/icons/1unselected.svg">
        <img src="../final/assets/icons/2selected.svg">
        <img src="../final/assets/icons/3unselected.svg">
        <img src="../final/assets/icons/4unselected.svg">
        <img src="../final/assets/icons/5unselected.svg">
        `
    })

    // Adding Event Listener to Third Icon
    img3.addEventListener('click', function(event) {
        console.log('icon 3 clicked')
        event.preventDefault()

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../final/assets/icons/1unselected.svg">
        <img src="../final/assets/icons/2unselected.svg">
        <img src="../final/assets/icons/3selected.svg">
        <img src="../final/assets/icons/4unselected.svg">
        <img src="../final/assets/icons/5unselected.svg">
        `
    })

    // Adding Event Listener to Fourth Icon
    img4.addEventListener('click', function(event) {
        console.log('icon 4 clicked')
        event.preventDefault()

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../final/assets/icons/1unselected.svg">
        <img src="../final/assets/icons/2unselected.svg">
        <img src="../final/assets/icons/3unselected.svg">
        <img src="../final/assets/icons/4selected.svg">
        <img src="../final/assets/icons/5unselected.svg">
        `
    })

    // Adding Event Listener to Fifth Icon
    img5.addEventListener('click', function(event) {
        console.log('icon 5 clicked')
        event.preventDefault()

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../final/assets/icons/1unselected.svg">
        <img src="../final/assets/icons/2unselected.svg">
        <img src="../final/assets/icons/3unselected.svg">
        <img src="../final/assets/icons/4unselected.svg">
        <img src="../final/assets/icons/5selected.svg">
        `
    })

// Test
    

})

// let test = document.querySelector('.log-mood')
//     test.addEventListener('click', function(event) {
//         console.log('test button clicked')
//         event.preventDefault()

//         // If an icon is clicked, change it to selected and others to unselected 
//         outputElement.innerHTML = `
//         <img src="../final/assets/icons/1unselected.svg">
//         <img src="../final/assets/icons/2unselected.svg">
//         <img src="../final/assets/icons/3unselected.svg">
//         <img src="../final/assets/icons/4unselected.svg">
//         <img src="../final/assets/icons/5unselected.svg">
//         `
//         // If Log mood button is clicked, 'set' the document (save / update) in Firebase - moods collection 
//         document.querySelector('.mood').insertAdjacentHTML('beforeend',`
//             <div class="py-4 text-xl">
//                 <li> ${Today()} 
//                 <img src="../final/assets/icons/1unselected.svg">
//                 <img src="../final/assets/icons/2unselected.svg">
//                 <img src="../final/assets/icons/3unselected.svg">
//                 <img src="../final/assets/icons/4unselected.svg">
//                 <img src="../final/assets/icons/5unselected.svg">
//                 </li>
//             </div>
//         `) 
//     })
