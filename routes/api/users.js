const express = require("express")

const { authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/usersCtrl");
const { route } = require("express/lib/application");
const { User } = require("../../models/user");
const createError = require("http-errors");

const router = express.Router()

router.post('/signup', ctrl.signup)

router.post("/login", ctrl.login)

router.get('/current', authenticate, ctrl.current)

router.get('/ logout', authenticate, ctrl.logout)

router.patch("/subscription", authenticate, ctrl.subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.avatars)

router.get("verify/:verificationToken", ctrl.verification)

router.post("verify", ctrl.verify)

module.exports = router;
