let firebase = require('./firebase')


exports.handler = async function(event) {
    // console.log('this be netlify!')
    console.log(event.queryStringParameters.userId)
    let db = firebase.firestore()             
    let queryStringuserId = event.queryStringParameters.userId                
    let moodsData = []
    
    let querySnapshot = await db.collection('moods')
                                .where('userId', '==', queryStringuserId)
                                .get()
    let moods = querySnapshot.docs

    for (let i=0; i<moods.length; i++) {
        let moodsId = moods[i].id
        let mood = moods[i].data()

    moodsData.push({
        id: moodsId,
        userId: mood.userId,
        moodDate: mood.moodDate,
        moodVeryBad: mood.moodVeryBad,
        moodBad: mood.moodBad,
        moodNeutral: mood.moodNeutral,
        moodGood: mood.moodGood,
        moodVeryGood: mood.moodVeryGood
    })


    
    // return an Object in the format that a Netlify lambda function expects
    return {
      statusCode: 200,
      body: JSON.stringify(moodsData)
    }
  }
}