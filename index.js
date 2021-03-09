firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

  document.querySelector('.sign-in-or-sign-out').insertAdjacentHTML('beforebegin',`
    <h1 class="w-1/6 text-m text-black">Hello, ${user.displayName}!</h1>
  `)

  document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <a href = "#" class = "sign-out-button text-blue-400 underline"> Sign Out </a>`

  document.querySelector('.sign-out-button').addEventListener('click', function(event){
    event.preventDefault()
    firebase.auth().signOut()
    document.location.href = 'index.html'

  // Unsure below
    let db = firebase.firestore()
    db.collection('users').doc(user.uid).set({
      userId: user.uid,
      userFirstName: user.FirstName, 
      userLastName: user.LastName,
      userEmail: user.email 
    })

  // document.querySelector('.my-triggers').insertAdjacentHTML('beforeend', `
  //   <div class="w-1/2 p-4">
  //   <a href="#" class="my-mood-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">My Mood</a>
  //   </div>
  // `)

  // document.querySelector('.my-triggers').addEventListener('click', function(event){
  //   event.preventDefault()
  //   document.location.href = 'logevent.html'
  //   })

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
})
