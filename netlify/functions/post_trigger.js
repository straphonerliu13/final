let firebase = require('./firebase')

exports.handler = async function(event) {

    let db = firebase.firestore()


    console.log(event)
    let body = JSON.parse(event.body)
    let userId = body.userId
    let username = body.username
    let triggerDateString = body.triggerDate
    let triggerDetail = body.triggerDetail
    let triggerAngry = body.triggerAngry
    let triggerAnxious = body.triggerAnxious
    let triggerGuilt = body.triggerGuilt
    let triggerSad = body.triggerSad
    let triggerShame = body.triggerShame
    let triggerOther = body.triggerOther

    var dateParts = triggerDateString.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var triggerDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); 


    // console.log(`userId is ${userId}`)
    // console.log(`date is ${triggerDate}`)
    // console.log(`description is ${triggerDetail}`)
    // console.log(`angry -s ${triggerAngry}`)

    let newTriggerData = {
        userId: userId,
        username: username,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        triggerDate: triggerDate,
        triggerDetail: triggerDetail,
        triggerAngry: triggerAngry,
        triggerAnxious: triggerAnxious,
        triggerGuilt: triggerGuilt,
        triggerSad: triggerSad,
        triggerShame: triggerShame,
        triggerOther: triggerOther
    }

    let querySnapshot = await db.collection('triggerEvent')
    let newTriggerEvent = await db.collection('triggerEvent').add(newTriggerData)

    let newTriggerEventId = newTriggerEvent.id  
    newTriggerData.id = newTriggerEventId

    return {
        statusCode: 200,
        body: JSON.stringify({
            newTriggerData
        })
      }
}

