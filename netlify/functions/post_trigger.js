let firebase = require('./firebase')

exports.handler = async function(event) {

    let db = firebase.firestore()


    console.log(event)
    let body = JSON.parse(event.body)
    let userId = body.userId
    let triggerDate = body.triggerDate
    let triggerDetail = body.triggerDetail
    let triggerAngry = body.triggerAngry
    let triggerAnxious = body.triggerAnxious
    let triggerGuilt = body.triggerGuilt
    let triggerSad = body.triggerSad
    let triggerShame = body.triggerShame
    let triggerOther = body.triggerOther

    var parts = triggerDate.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 


    // console.log(`userId is ${userId}`)
    // console.log(`date is ${triggerDate}`)
    // console.log(`description is ${triggerDetail}`)
    // console.log(`angry -s ${triggerAngry}`)

    let newTriggerData = {
        userId: userId,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        triggerDate: mydate,
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

