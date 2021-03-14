let firebase = require('./firebase')

exports.handler = async function(event) {

    let db = firebase.firestore()
    console.log(event)
    let body = JSON.parse(event.body)
    let userId = ''
    let created = ''
    let triggerDate = ''
    let triggerDetail = ''
    let triggerAngry = ''
    let triggerAnxious = ''
    let triggerGuilt = ''
    let triggerSad = ''
    let triggerShame = ''
    let triggerOther = ''




    return {
        statusCode: 200,
        body: JSON.stringify({
            thingToKnow: 'This is working'
        })
      }
}

