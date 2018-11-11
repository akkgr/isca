exports.removeExtensionFromFile = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}

exports.handleError = (res, err) => {
  res.status(err.code).json({
    errors: {
      msg: err.message
    }
  })
}
