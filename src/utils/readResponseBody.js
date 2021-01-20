/**
 * Read and detect body type, parse as specified from content-type
 * @param  {Object} response
 */
const readBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  // check if is a json body
  if (contentType.includes("application/json")) {
    return {
      body: JSON.stringify(await response.json()),
      response_type: "application/json",
    };
  }
  // check if text body
  else if (contentType.includes("application/text")) {
    return await { body: response.text(), response: "application/text" };
  }
  // check if html body
  else if (contentType.includes("text/html")) {
    return await { body: response.text(), response_type: "text/html" };
  }
  // else must be file, return file url
  else {
    return {
      body: "Cannot respond with binary output!",
      response_type: "binary",
    };
  }
};

module.exports = { readBody };
