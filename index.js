require('dotenv').config();
const { App } = require('@slack/bolt');
const mongoose = require('mongoose');

// MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!  🎉'))
    .catch(err => console.log(err));


// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(':medal:', async ({ message, say }) => {
    let honoredUserIds = getUsers(message);

    if (honoredUserIds.length > 0) {
        let honoredUsers = honoredUserIds.join(', ');

        // say() sends a message to the channel where the event was triggered
        await say({
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${honoredUsers}, you have been honored!`
                    },
                }
            ]
        });
    }
});

// Gets users mentioned in message
getUsers = (message) => {
    console.log(">>>Message", message);
    let messengerId = `<@${message.user}>`;
    let userIdRegex = /<@[A-Za-z0-9]+>/g;
    let userMatches = [...message.text.matchAll(userIdRegex)];
    let userIds = [];
    for (let i = 0; i < userMatches.length; i++) {
        if (userMatches[i][0] !== messengerId) {
            userIds.push(userMatches[i][0]);
        }
    }
    console.log(userIds);
    return userIds;
}

app.error((error) => {
    // Check the details of the error to handle special cases (such as stopping the app or retrying the sending of a message)
    console.error(error);
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();