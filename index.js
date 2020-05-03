require('dotenv').config();
const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// // Listens to incoming messages that contain "hello"
// app.message('hello', async ({ message, say }) => {
//     console.log(">>>Message received");
//     // say() sends a message to the channel where the event was triggered
//     await say(`Hey there <@${message.user}>!`);
// });


// Listens to incoming messages that contain "hello"
app.message(':medal:', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log(">>>Message", message);
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `<@${message.user}>, you have been honored!`
                },
            }
        ]
    });
});

/* Algo to get users withing a message.

let re = /<@[A-Za-z0-9]+>/g;
let s = '<@UE7830F0W> and <@UE7830A0W> gets a :medal:';
let m;
let u = [];
m = [...s.matchAll(re)];
for(let i = 0; i < m.length; i++) {
  u.push(m[i][0]);
}
console.log(u);

*/


app.error((error) => {
    // Check the details of the error to handle special cases (such as stopping the app or retrying the sending of a message)
    console.error(error);
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();