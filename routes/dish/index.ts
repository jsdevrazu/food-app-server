import { Router } from "express";
import { createDish } from "../../controllers/dish";
import { adminRole, isAuthenticated } from "../../middleware/auth";
import { createValidator } from "express-joi-validation";
import Joi from "joi";

const router = Router();
const validator = createValidator({});

const dishSchema = Joi.object({
  name: Joi.string().min(20).max(100).required(),
  short_description: Joi.string().min(50).max(250).required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
});

router.post(
  "/create",
  validator.body(dishSchema),
  isAuthenticated,
  adminRole("admin"),
  createDish
);

export default router;
