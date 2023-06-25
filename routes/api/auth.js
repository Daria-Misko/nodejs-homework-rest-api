const express = require("express");
const { validateBody } = require("../../middleware/validateBody");
const { schemas } = require("../../models/user");
const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
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

module.exports = router;
