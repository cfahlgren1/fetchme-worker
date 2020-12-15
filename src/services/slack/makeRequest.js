const fetch = require("node-fetch");
const { readBody } = require("../../utils/readResponseBody");
const { formatBytes } = require("../../utils/byteSizeConv");
const AbortController = require("abort-controller");

/**
 * Send Request specified from Slack command with options
 * @param  {String} url
 * @param  {Object} options
 */
const makeRequest = async (url, options) => {
  const controller = new AbortController();

  // set abort controller timeout to 3s
  setTimeout(() => controller.abort(), 3000);

  reqOptions = options;
  reqOptions.signal = controller.signal;

  try {
    // make http request with specified options
    const response = await fetch(url, reqOptions);

    // read body from response
    const body = await readBody(response);

    // retrieve status codes
    const status = response.status;
    const statusText = response.statusText;

    // calculate size of response
    const size = formatBytes(response.headers.get("content-length"));

    const fetchData = {
      status: status,
      statusText: statusText,
      size: size,
      body: body,
    };
    console.log(fetchData);
    return fetchData;
  } catch (err) {
    // if request took longer than 3s abort
    if (err.name === "AbortError") {
      // send webhook that says request took too long to process
      console.log("Request took too long to process!");
    } else {
      throw err;
    }
  }
};

module.exports = makeRequest;
