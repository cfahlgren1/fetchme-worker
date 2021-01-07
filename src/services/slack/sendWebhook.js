const axios = require("axios");

/**
 * Send message to Slack through Webhook
 * @param  {Object} message Contains options to send webhook
 * @param  {JSON} body JSON request to send
 */
const sendWebhook = (fetchRequest, response_url) => {
  axios.post(response_url, {
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
          text: `*URL:*  \`${fetchRequest.url}\``,
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
          text: `Status: \`${fetchRequest.status}\``,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Request Type: \`${fetchRequest.method}\``,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `_Options:_\n \`\`\`${fetchRequest.options}\`\`\``,
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
          url: `http://localhost:3000/api/v1/requests/${fetchRequest.hash}`,
          action_id: "button-action",
        },
      },
    ],
  });
  console.log("Sent Webhook!");
};

/**
 * Send error message to Slack through Webhook
 * @param  {Object} message Contains options to send webhook
 * @param  {JSON} body JSON request to send
 */
const sendErrorWebhook = (response_url, userArgs) => {
  axios.post(response_url, {
    replace_original: true,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "There seems to have been an error making the request! 😔",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Check to make sure you didn't pass incorrect arguments...",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`${userArgs}\``,
        },
      },
    ],
  });
  console.log("Sent Webhook!");
};

module.exports = { sendWebhook, sendErrorWebhook };
