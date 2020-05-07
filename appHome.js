const User = require('./models/User');

const updateView = async () => {

    let result = await User.find({}).sort({ honorCount: -1 }).exec();

    let blocks = [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "*Welcome!* \nSee the top honors!"
            },
        },
        {
            type: "divider"
        },
    ];

    result.forEach((user) => {
        blocks.push(
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: user.slackName + "\t\t\t\t\t" + user.honorCount
                }
            }, {
            type: "divider"
        });
    });

    let view = {
        type: 'home',
        callback_id: 'home_view',
        title: {
            type: 'plain_text',
            text: 'Honor!'
        },
        blocks: blocks
    }

    return JSON.stringify(view);

};


/* Display App Home */

const createHome = async () => {

    const userView = await updateView();

    return userView;
};

module.exports = { createHome };