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
} = require("../../controllers/auth");
const { authenticate } = require("../../middleware/authenticate");

const router = express.Router();

// singup

router.post("/register", validateBody(schemas.registerSchema), register);

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

module.exports = router;
