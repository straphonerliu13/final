

// 2 Lambda functions - one for read and one for write

let db = firebase.firestore()

// window.addEventListener('DOMContentLoaded',async function() {
firebase.auth().onAuthStateChanged(async function(user) {

    if (user) {

    console.log('loaded')

    db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
    })

    // let querySnapshot = await db.collection('moods')
    //                             .where('userId', '==', user.uid)
    //                             .get()
    // let moods = querySnapshot.docs
    // console.log(moods)
    let response = await fetch(`/.netlify/functions/get_moods?userId=${user.uid}`)
    let moods = await response.json()

    // Step 1: On page Load, loop through the moods collection and populate the dates + moods in the 'Past Moods' section
    for (let i=0; i<moods.length; i++) {
        let mood = moods[i]
        let moodsId = mood.id
        let moodDate = mood.moodDate
        if (mood.moodVeryBad) {moodVeryBad = 1} else {moodVeryBad = 0}
        if (mood.moodBad) {moodBad = 1} else {moodBad = 0}
        if (mood.moodNeutral) {moodNeutral = 1} else {moodNeutral = 0}
        if (mood.moodGood) {moodGood = 1} else {moodGood = 0}
        if (mood.moodVeryGood) {moodVeryGood = 1} else {moodVeryGood = 0}

        // console.log(moodDate.toDate().getDate())
        // console.log(moodVeryBad)
        // console.log(moodBad)
        // console.log(moodNeutral)
        // console.log(moodGood)
        // console.log(moodVeryGood)

        document.querySelector('.past-moods').insertAdjacentHTML('beforeend', `
        <div class="flex py-1 text-xl">
            <div> ${moodsId} </div>
            <img src="../assets/icons/icon1-${moodVeryBad}.svg">
            <img src="../assets/icons/icon2-${moodBad}.svg">
            <img src="../assets/icons/icon3-${moodNeutral}.svg">
            <img src="../assets/icons/icon4-${moodGood}.svg">
            <img src="../assets/icons/icon5-${moodVeryGood}.svg">
        </div>
        `)

        // Step 2: On page Load, check if TODAY'S document is available in firebase in the moods collection
            // Step 2a: If document is available, fetch values against each icon (0 or 1) and populate the 'Log Today's mood' section
            // Step 2b: If document is unavailable, do nothing (ensure all icons are set to 0 by default)

        let today = new Date();
        let dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // console.log(dt)

        // if ((moodDate.toDate().getFullYear() == today.getFullYear()) && (moodDate.toDate().getMonth() == today.getMonth()) && (moodDate.toDate().getDate() == today.getDate())) {
        if (dt == moodsId) {
            document.querySelector('.mood').innerHTML = `
                <div class="mood flex justify-left space-x-8 border-blue-400">
                    <img src="../assets/icons/icon1-${moodVeryBad}.svg" id="icon1">
                    <img src="../assets/icons/icon2-${moodBad}.svg" id="icon2">
                    <img src="../assets/icons/icon3-${moodNeutral}.svg" id="icon3">
                    <img src="../assets/icons/icon4-${moodGood}.svg" id="icon4">
                    <img src="../assets/icons/icon5-${moodVeryGood}.svg" id="icon5">
                 </div>
                `
        }

    }

    // Step 3: If user selects a mood icon in 'Today's mood', change that to 'selected' icon and reset the others
    let outputElement = document.querySelector('.mood')

    let img1 = document.querySelector('#icon1')
    let img2 = document.querySelector('#icon2')
    let img3 = document.querySelector('#icon3')
    let img4 = document.querySelector('#icon4')
    let img5 = document.querySelector('#icon5')

    let icon1value = 0
    let icon2value = 0
    let icon3value = 0
    let icon4value = 0
    let icon5value = 0


// Adding Event Listener to First Icon
    img1.addEventListener('click', async function(event) {
        console.log('icon 1 clicked')
        event.preventDefault()

        icon1value = 1
        icon2value = 0
        icon3value = 0
        icon4value = 0
        icon5value = 0

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../assets/icons/icon1-${icon1value}.svg" id="icon1">
        <img src="../assets/icons/icon2-${icon2value}.svg" id="icon2">
        <img src="../assets/icons/icon3-${icon3value}.svg" id="icon3">
        <img src="../assets/icons/icon4-${icon4value}.svg" id="icon4">
        <img src="../assets/icons/icon5-${icon5value}.svg" id="icon5">
        `
    })

    // Adding Event Listener to Second Icon
    img2.addEventListener('click', async function(event) {
        console.log('icon 2 clicked')
        event.preventDefault()

        icon1value = 0
        icon2value = 1
        icon3value = 0
        icon4value = 0
        icon5value = 0

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../assets/icons/icon1-${icon1value}.svg" id="icon1">
        <img src="../assets/icons/icon2-${icon2value}.svg" id="icon2">
        <img src="../assets/icons/icon3-${icon3value}.svg" id="icon3">
        <img src="../assets/icons/icon4-${icon4value}.svg" id="icon4">
        <img src="../assets/icons/icon5-${icon5value}.svg" id="icon5">
        `
    })

    // Adding Event Listener to Third Icon
    img3.addEventListener('click', async function(event) {
        console.log('icon 3 clicked')
        event.preventDefault()

        icon1value = 0
        icon2value = 0
        icon3value = 1
        icon4value = 0
        icon5value = 0

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../assets/icons/icon1-${icon1value}.svg" id="icon1">
        <img src="../assets/icons/icon2-${icon2value}.svg" id="icon2">
        <img src="../assets/icons/icon3-${icon3value}.svg" id="icon3">
        <img src="../assets/icons/icon4-${icon4value}.svg" id="icon4">
        <img src="../assets/icons/icon5-${icon5value}.svg" id="icon5">
        `
    })

    // Adding Event Listener to Fourth Icon
    img4.addEventListener('click', async function(event) {
        console.log('icon 4 clicked')
        event.preventDefault()

        icon1value = 0
        icon2value = 0
        icon3value = 0
        icon4value = 1
        icon5value = 0

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../assets/icons/icon1-${icon1value}.svg" id="icon1">
        <img src="../assets/icons/icon2-${icon2value}.svg" id="icon2">
        <img src="../assets/icons/icon3-${icon3value}.svg" id="icon3">
        <img src="../assets/icons/icon4-${icon4value}.svg" id="icon4">
        <img src="../assets/icons/icon5-${icon5value}.svg" id="icon5">
        `
    })

    // Adding Event Listener to Fifth Icon
    img5.addEventListener('click', async function(event) {
        console.log('icon 5 clicked')
        event.preventDefault()

        icon1value = 0
        icon2value = 0
        icon3value = 0
        icon4value = 0
        icon5value = 1
        

        // If an icon is clicked, change it to selected and others to unselected 
        outputElement.innerHTML = `
        <img src="../assets/icons/icon1-${icon1value}.svg" id="icon1">
        <img src="../assets/icons/icon2-${icon2value}.svg" id="icon2">
        <img src="../assets/icons/icon3-${icon3value}.svg" id="icon3">
        <img src="../assets/icons/icon4-${icon4value}.svg" id="icon4">
        <img src="../assets/icons/icon5-${icon5value}.svg" id="icon5">
        `
    })

    // Step 4: If user clicks on the 'Log mood' button, update the moods collection in firebase with the updated values for each icon (0 or 1)
    let td = new Date();
    let dt = td.getFullYear()+'-'+(td.getMonth()+1)+'-'+td.getDate();






    document.querySelector('.log-mood').addEventListener('click',async function(event) {
        event.preventDefault()
        if (icon1value == 1) {icon1boolean = true} else {icon1boolean = false}
        if (icon2value == 1) {icon2boolean = true} else {icon2boolean = false}
        if (icon3value == 1) {icon3boolean = true} else {icon3boolean = false}
        if (icon4value == 1) {icon4boolean = true} else {icon4boolean = false}
        if (icon5value == 1) {icon5boolean = true} else {icon5boolean = false}

        console.log(icon1value + icon1boolean)
        console.log(icon2value + icon2boolean)
        console.log(icon3value + icon3boolean)
        console.log(icon4value + icon4boolean)
        console.log(icon5value + icon5boolean)
        
        let docRef = await db.collection('moods').doc(`${dt}`).set({
            id: dt,
            userId: user.uid,
            moodDate: firebase.firestore.FieldValue.serverTimestamp(),
            moodVeryBad: icon1boolean,
            moodBad: icon2boolean,
            moodNeutral: icon3boolean,
            moodGood: icon4boolean,
            moodVeryGood: icon5boolean
        })

        document.location.href = 'logmoods.html'
        
    })

} else {
    // Signed out
    console.log('signed out')

    // Hide stuff when signed out
    document.querySelector('.mood').classList.add('hidden')
    document.querySelector('.log-mood').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }


})
