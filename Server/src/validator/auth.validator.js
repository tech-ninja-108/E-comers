import { body, header, validationResult, cookie } from "express-validator";

const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("enter valid e-mail address"),
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 4, max: 50 })
    .withMessage("Name must be 4 to 50 character"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must be 6 to 12 character"),
  body("conformpassword")
    .exists()
    .withMessage("conformpassword is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 6, max: 12 })
    .withMessage("conformpassword must be 6 to 12 character"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array(),
      });
    }
    next();
  },
];

const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Not a valid e-mail address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must b 6 to 12 character"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invilad data",
        errors: errors.array(),
      });
    }
    next();
  },
];

const meValidator = [
  header("authorization")
    .exists()
    .withMessage("AccessToken is required")
    .bail()
    .trim()
    .isString()
    .isLength({ min: 10 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        message: "AccessToken is missing or invalid",
        errors: errors.array(),
      });
    }
    next();
  },
];
export { registerValidator, loginValidator, meValidator };
