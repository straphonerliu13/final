firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
      console.log(user.displayName)

      document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault()
        console.log('submit button clicked')
        let userId = user.uid
        let username = user.displayName
        let triggerDate = document.querySelector('#event-date').value
        let triggerDetail = document.querySelector('#event-description').value
        let triggerHappy
        let triggerAnxious
        let triggerGuilt
        let triggerSad
        let triggerShame
        let triggerOther


        if (document.getElementById('trigger-happy').checked) {
            triggerHappy = true
        } else {triggerHappy = false}

        if (document.getElementById('trigger-anxious').checked) {
            triggerAnxious = true
        } else {triggerAnxious = false}

        if (document.getElementById('trigger-guilt').checked) {
            triggerGuilt = true
        } else {triggerGuilt = false}

        if (document.getElementById('trigger-sad').checked) {
            triggerSad = true
        } else {triggerSad = false}

        if (document.getElementById('trigger-shame').checked) {
            triggerShame = true
        } else {triggerShame = false}

        if (document.getElementById('trigger-other').checked) {
            triggerOther = document.querySelector('#trigger-other-text').value
        } else {triggerOther = ''}

        console.log(userId)
        console.log(username)
        console.log(triggerDate)
        console.log(triggerDetail)
        console.log(`happy is ${triggerHappy}`)
        console.log(`anxious is ${triggerAnxious}`)
        console.log(`guilty is ${triggerGuilt}`)
        console.log(`sad is ${triggerSad}`)
        console.log(`shame is ${triggerShame}`)
        console.log(`other is ${triggerOther}`)
        
        let response = await fetch('/.netlify/functions/post_trigger', {
            method: 'POST',
            body: JSON.stringify({
               userId: user.uid,
               username: username,
               triggerDate: triggerDate,
               triggerDetail: triggerDetail,
               triggerHappy: triggerHappy,
               triggerAnxious: triggerAnxious,
               triggerGuilt: triggerGuilt,
               triggerSad: triggerSad,
               triggerShame: triggerShame,
               triggerOther: triggerOther
            })
        })

        let triggerEvent = await response.json()
        console.log(triggerEvent)

        window.location = 'myTriggers.html'
    
      })
  
    } else {
      // Signed out
      console.log('signed out')

      window.location = 'index.html'

    }
  })

    // let feelings = [angry,anxious,guilt,sad,shame]
// for (i=0; i<feelings.length; i++) {
//     let feeling = feelings[i]
//     checkFeeling(feeling)
//     console.log(`trigger-${feeling}`)
// }

// async function checkFeeling(feeling) {
//     if (document.getElementById(`trigger-${feeling}`).checked) {
//         `trigger-${feeling}` = true
//     } else {`trigger-${feeling}` = false}
// }