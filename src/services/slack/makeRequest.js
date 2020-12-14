const fetch = require("node-fetch");
const { readBody } = require("../../utils/readResponseBody");
const { formatBytes } = require("../../utils/byteSizeConv");
/**
 * Send Request specified from Slack command with options
 * @param  {String} url
 * @param  {Object} options
 */
const makeRequest = async (url, options) => {
  // make http request with specified options
  const response = await fetch(url, options);

  // read body from response
  const body = await readBody(response);

  // retrieve status codes
  const status = response.status;
  const statusText = response.statusText;

  // calculate size of response
  const size = formatBytes(response.headers.get("content-length"));

  console.log({
    status: status,
    statusText: statusText,
    size: size,
    body: body,
  });
};

module.exports = makeRequest;
