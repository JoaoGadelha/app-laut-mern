// used to send a POST message to the server
const postData = async (url, data) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // unavailable server
  if (response.status === 503) {
    return 503;
  }
  let jsonResponse = await response.json(); // parses JSON response into native JavaScript objects

  return jsonResponse;
};

export { postData };
