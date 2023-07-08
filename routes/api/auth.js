const express = require("express");
const { validateBody } = require("../../middleware/validateBody");
const { schemas } = require("../../models/user");
const { upload } = require("../../middleware/upload");
const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
	updateAvatar,
	verifyEmail,
	resendVerifyEmail,
} = require("../../controllers/auth");
const { authenticate } = require("../../middleware/authenticate");

const router = express.Router();

// singup

router.post("/register", validateBody(schemas.registerSchema), register);

router.post(
	"/verify",
	validateBody(schemas.verifyEmailSchema),
	resendVerifyEmail
);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
	"/:id/subscription",
	authenticate,
	validateBody(schemas.updateSubscriptionSchema),
	updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

router.get("/verify/:verificationToken", verifyEmail);

module.exports = router;
