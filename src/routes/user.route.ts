import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controller/user.controller";
import { userLogin, userUpdatePassword } from "../controller/auth.controller";
import { validateBody } from "../middlewares/validate";
import {
  userLoginShema,
  userSignUpSchema,
  userUpdatePasswordSchema,
} from "../validations/auth.validation";
import { protect, specifyRole } from "../middlewares/authMiddleware";
import { userUpdateData } from "../validations/user.validation";

router
  .route("/")
  .get(getAllUsers)
  .patch(validateBody(userUpdateData), protect, updateUser);
router.route("/:id").delete(protect, specifyRole(["admin"]), deleteUser);
router.route("/signup").post(validateBody(userSignUpSchema), createUser);
router.route("/login").post(validateBody(userLoginShema), userLogin);
router
  .route("/update-password")
  .post(validateBody(userUpdatePasswordSchema), protect, userUpdatePassword);

export default router;
