firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
  
    } else {
      // Signed out
      console.log('signed out')

      window.location = 'index.html'

    }
  })