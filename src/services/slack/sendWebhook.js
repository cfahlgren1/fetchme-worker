const axios = require("axios");

/**
 * Send message to Slack through Webhook
 * @param  {Object} message Contains options to send webhook
 * @param  {JSON} body JSON request to send
 */
const sendWebhook = (message) => {
  axios.post(message.response_url, {
    replace_original: true,
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "Hooray, you made a Request! 🎉",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*URL:*  \`${message.url}\``,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "\n",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Request Type: `GET`",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "_Options:_\n ```{ \n\tContent-Type: application/json \n}```",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "\n",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "View Response",
            emoji: true,
          },
          value: "click_me_123",
          url: "https://google.com",
          action_id: "button-action",
        },
      },
    ],
  });
  console.log("Sent Webhook!");
};

module.exports = { sendWebhook };
