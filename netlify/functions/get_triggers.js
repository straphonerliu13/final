let firebase = require('./firebase')


exports.handler = async function(event) {
    let db = firebase.firestore()                             
    let triggerData = []
    
    let range = event.queryStringParameters.range  //Sets lower bound of trigger event query
    let uid = event.queryStringParameters.uid                          
    let d = new Date()
    d.setDate(d.getDate()-range)

    if(range == null || uid == null){
        let triggerQuery = await db.collection('triggerEvent')      //Pull triggers from Firestore in reverse chrono order       
                                .orderBy('triggerDate','desc')              
                                .get()
    } else {
        let triggerQuery = await db.collection('triggerEvent')      //Pull triggers from Firestore in reverse chrono order       
                                .where('userId', '==', `${uid}`)    //TODO: Uncomment when done testing remaining functionality
                                .where('triggerDate','>=', d)
                                .orderBy('triggerDate','desc')              
                                .get()
    }
    let triggers = triggerQuery.docs                               

    //Data for chart
    let anxCount = 0
    let guiltCount = 0
    let happyCount = 0
    let sadCount = 0
    let shameCount = 0
    let otherCount = 0

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
            anxCount++
        } else if (trigger.triggerGuilt) {
            emotion = "Guilty"
            guiltCount++
        } else if (trigger.triggerHappy){
            emotion = "Happy"
            happyCount++
        } else if (trigger.triggerSad){
            emotion = "Sad"
            sadCount++
        } else if (trigger.triggerShame) {
            emotion = "Shame"
            shameCount++
        } else {
            emotion = trigger.triggerOther
            otherCount++
        }

        triggerData.push({
            id: id,
            year: year,
            month: month,
            date: day,
            detail: detail,
            emotion: emotion,
            anxCount: anxCount,
            guiltCount: guiltCount,
            happyCount: happyCount,
            sadCount: sadCount,
            shameCount: shameCount,
            otherCount: otherCount
        })

    }
    
    // return an Object in the format that a Netlify lambda function expects
    return {
      statusCode: 200,
      body: JSON.stringify(triggerData)
    }
  }