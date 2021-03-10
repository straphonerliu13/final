let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    //console.log('signed in')

    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    let response = await fetch( `/.netlify/functions/get_triggers?range=90`)
    let triggers = await response.json()
    
    renderTriggers(triggers)

  document.querySelector('.sign-in-or-sign-out').insertAdjacentHTML('beforebegin',`
    <h1 class="w-1/6 text-m text-black">Hello, ${user.displayName}!</h1>
  `)

  document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <a href = "#" class = "sign-out-button text-blue-400 underline"> Sign Out </a>`

  document.querySelector('.sign-out-button').addEventListener('click', function(event){
    event.preventDefault()
    firebase.auth().signOut()
    document.location.href = 'index.html'
    
  })

  document.querySelector('.rangeSevenTriggers').addEventListener('click', async function(event){
    event.preventDefault()
    document.querySelector('.myTriggers').innerHTML = ""
    let response = await fetch( `/.netlify/functions/get_triggers?range=7`)
    let triggers = await response.json()
    renderTriggers(triggers)
  })

  document.querySelector('.rangeThirtyDayTriggers').addEventListener('click', async function(event){
    event.preventDefault()
    document.querySelector('.myTriggers').innerHTML = ""
    let response = await fetch( `/.netlify/functions/get_triggers?range=30`)
    let triggers = await response.json()
    renderTriggers(triggers)
  })

  document.querySelector('.rangeNinetyDayTriggers').addEventListener('click', async function(event){
    event.preventDefault()
    document.querySelector('.myTriggers').innerHTML = ""
    let response = await fetch( `/.netlify/functions/get_triggers?range=90`)
    let triggers = await response.json()
    renderTriggers(triggers)
  })

  } else {
    // Signed out
    console.log('signed out')

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

  function renderTriggers(triggers){
    for(let i = 0; i < triggers.length; i++){
      let trigger = triggers[i]
      //console.log(trigger.triggerDate)
      document.querySelector('.myTriggers').insertAdjacentHTML('afterbegin',`
        <div class="${trigger.id}">
          <span class="date">${trigger.month}/${trigger.date}/${trigger.year} | </span>
          <span class="trigger">${trigger.emotion}</span>
        </div>
        
      `)
    }
  }
})
