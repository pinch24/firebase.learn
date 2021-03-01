const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.fb_trouble = functions.region('asia-northeast3')
  .https.onRequest((request, response) => {

  functions.logger.info("Hello IKEN!", { isAvailable: true});
  response.send("https://iken-767ce.web.app/fb_trouble/");
});

exports.ik_work = functions.region('asia-northeast3')
  .https.onRequest((request, response) => {

  functions.logger.info("Get IKEN Work Notice", { isAvailable: true});
  response.send("https://iken-767ce.web.app/ik_work/");
});

exports.ik_trouble = functions.region('asia-northeast3')
  .https.onRequest((request, response) => {

  functions.logger.info("Get IKEN Work Notice", { isAvailable: true});
  response.send("https://iken-767ce.web.app/ik_trouble/");
});

exports.ik_promo_content = functions.region('asia-northeast3')
  .https.onRequest((request, response) => {

  functions.logger.info("Get IKEN Promo Content", { isAvailable: true});
  response.send("https://iken-767ce.web.app/ik_promo_content/");
});

exports.ik_promo_link = functions.region('asia-northeast3')
  .https.onRequest((request, response) => {

  functions.logger.info("Get IKEN Promo Link", { isAvailable: true});
  response.send("https://iken-767ce.web.app/ik_promo_link/");
});

exports.addMessage = functions.region('asia-northeast3')
  .https.onRequest(async (req, res) => {

    const original = req.query.text;
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });

exports.makeUppercase = functions.region('asia-northeast3')
  .firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {

    const original = snap.data().original;

    functions.logger.log('Uppercasing', context.params.documentId, original);

    const uppercase = original.toUpperCase();

    return snap.ref.set({uppercase}, {merge: true});
  });
