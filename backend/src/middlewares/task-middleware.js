const validateTitle = (request, response, next) => {
  const { body } = request;

  if (body.title === undefined || body.title === "") {
    return response
      .status(400)
      .json({ message: 'The "title" field is required and cannot be empty.' });
  }
  next();
};

const validateStatus = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined || body.status === "") {
    return response
      .status(400)
      .json({ message: 'The "status" field is required and cannot be empty.' });
  }
  next();
};

module.exports = {
  validateTitle,
  validateStatus,
};
