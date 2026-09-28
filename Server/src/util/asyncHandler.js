const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log("Error:", error.message);
      return res.status(500).json({
        message: "Internal server error",
        errors: [
          {
            type: "field",
            msg: error.message,
          },
        ],
      });
    });
  };
};

export default asyncHandler;
