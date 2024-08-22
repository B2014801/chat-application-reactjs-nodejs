const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/sendMessage", addMessage);
router.post("/getAllMessage", getMessages);

module.exports = router;
