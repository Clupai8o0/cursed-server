const response = (status = false, response = undefined) => {
  if (typeof status !== "boolean")
    throw new Error("Status for a response must be a boolean");
  
  if (status === false) {
    return {
      'status': 'error',
      'response': (response === undefined || response === null) ? '' : response
    }
  } else if (status === true) {
    return {
      'status': 'success',
      'response': (response === undefined || response === null) ? '' : response
    }
  }
};

module.exports = response;
