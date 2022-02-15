const express = require("express")

const { authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/usersCtrl")

const router = express.Router()

router.post('/signup', ctrl.signup)

router.post("/login", ctrl.login)

router.get('/current', authenticate, ctrl.current)

router.get('/ logout', authenticate, ctrl.logout)

router.patch("/subscription", authenticate, ctrl.subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.avatars)

module.exports = router;
