let firebase = require('./firebase')


exports.handler = async function(event) {
    let db = firebase.firestore()                             
    let triggerData = []
    
    let range = event.queryStringParameters.range  //Sets lower bound of trigger event query                          
    let d = new Date()
    d.setDate(d.getDate()-range)

    let triggerQuery = await db.collection('triggerEvent')      //Pull triggers from Firestore in reverse chrono order       
                             .where('triggerDate','>=', d)
                             .orderBy('triggerDate','desc')              
                             .get()
    let triggers = triggerQuery.docs                               

    for(let i = 0; i < triggers.length; i++){
        let id = triggers[i].id
        let trigger = triggers[i].data()

        let date = trigger.triggerDate.toDate()
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        let detail = trigger.triggerDetail
        let emotion = ""
        if(trigger.triggerAnxious){
            emotion = "Anxious"
        } else if (trigger.triggerGuilt) {
            emotion = "Guilt"
        } else if (trigger.triggerHappy){
            emotion = "Happy"
        } else if (trigger.triggerSad){
            emotion = "Sad"
        } else {
            emotion = "Shame"
        }

        triggerData.push({
            id: id,
            year: year,
            month: month,
            date: day,
            detail: detail,
            emotion: emotion
        })

    }
    
    // return an Object in the format that a Netlify lambda function expects
    return {
      statusCode: 200,
      body: JSON.stringify(triggerData)
    }
  }