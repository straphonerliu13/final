let firebase = require('./firebase')


exports.handler = async function(event) {
    let db = firebase.firestore()                             

    let body = JSON.parse(event.body)
    let id = body.id

    await db.collection('triggerEvent').doc(`${id}`).delete()

    return {
      statusCode: 200,
      body: ''
    }
  }