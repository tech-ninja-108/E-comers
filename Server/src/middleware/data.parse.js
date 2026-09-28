const dataParse = (req, res, next) => {
  try {
    if (req.body.variants) {
      req.body.variants = JSON.parse(req.body.variants);
    }
    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    } else if (req.body.images) {
      req.body.images = JSON.parse(req.body.images);
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid JSON format in form-data",
      error: error.message,
    });
  }
};

export default dataParse;
