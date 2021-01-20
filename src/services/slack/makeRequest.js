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

  // set abort controller timeout to 10s
  let timeout = false;
  setTimeout(() => {
    controller.abort();
    timeout = true;
  }, 10000);

  console.clear();
  console.log("\n", options, "\n");

  let reqOptions = options;
  reqOptions.signal = controller.signal;

  if (reqOptions.body) {
    reqOptions.body = JSON.stringify(options.body);
  }

  try {
    // make http request with specified options
    const response = await fetch(url, reqOptions);

    // read body from response
    const body = await readBody(response);
    const response_type = body.response_type;

    // retrieve status codes
    const status = response.status;
    const statusText = response.statusText;

    // calculate size of response
    const size = formatBytes(response.headers.get("content-length"));

    const fetchData = {
      status: status,
      statusText: statusText,
      size: size,
      response_type,
      body: body.body,
    };
    return fetchData;
  } catch (err) {
    console.log(err.name, err.message);
    // if request took longer than 10s abort
    if (err.name === "AbortError") {
      if (timeout) {
        console.log(`Request timeout for ${url}`);
        // send webhook that says request took too long to process
        return { body: "Request took too long to process!" };
      }
      console.log(`Error making request for options ${reqOptions}`);
      return { body: "There was an error making the request!" };
    } else {
      // send webhook that says request took too long to process
      return { body: "There was an error making the request!" };
    }
  }
};

module.exports = makeRequest;
