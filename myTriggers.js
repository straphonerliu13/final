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

    let chartData = triggers[triggers.length-1]
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
  
      // The data for our dataset
      data: {
          labels: ['Anxious', 'Guilty', 'Happy', 'Sad', 'Shame', 'Other'],
          datasets: [{
              //label: 'My Trigger History',
              //backgroundColor: 'rgb(255, 99, 132)',
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
              borderColor: 'rgb(255, 99, 132)',
              data: []
          }]
      },
  
      // Configuration options go here
      options: {
        responsive: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'My Trigger History',
          fontSize: 28,
          position: 'bottom'
        },
        scales: {
          yAxes: [{
              ticks: {
                  display: true,
                  stepSize: 1
              }
          }]
        } 
      }
    });

    renderTriggers(triggers, chart)

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
    renderTriggers(triggers, chart)
  })

  document.querySelector('.rangeThirtyDayTriggers').addEventListener('click', async function(event){
    event.preventDefault()
    document.querySelector('.myTriggers').innerHTML = ""
    let response = await fetch( `/.netlify/functions/get_triggers?range=30`)
    let triggers = await response.json()
    renderTriggers(triggers, chart)
  })

  document.querySelector('.rangeNinetyDayTriggers').addEventListener('click', async function(event){
    event.preventDefault()
    document.querySelector('.myTriggers').innerHTML = ""
    let response = await fetch( `/.netlify/functions/get_triggers?range=90`)
    let triggers = await response.json()
    renderTriggers(triggers, chart)
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

  function renderTriggers(triggers, chart){
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

    let chartData = triggers[triggers.length-1]
    chart.data.datasets[0].data = [chartData.anxCount, chartData.guiltCount, chartData.happyCount, chartData.sadCount, chartData.shameCount, chartData.otherCount]
    chart.update()
  }
})
