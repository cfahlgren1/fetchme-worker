/**
 * Read and detect body type, parse as specified from content-type
 * @param  {Object} response
 */
const readBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  // check if is a json body
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json(), null, 4);
  }
  // check if text body
  else if (contentType.includes("application/text")) {
    return await response.text();
  }
  // check if html body
  else if (contentType.includes("text/html")) {
    return await response.text();
  }
  // else must be file, return file url
  else {
    const myBlob = await request.blob();
    const objectURL = URL.createObjectURL(myBlob);
    return objectURL;
  }
};

module.exports = { readBody };
