exports.removeExtensionFromFile = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}

exports.handleError = (res, code, message) => {
  res.status(code).json({
    message: message
  })
}
