const express = require('express');
const router = express.Router();
const PromptControllers = require('../controllers/Prompt')

router.get('/getall', PromptControllers.listPrompts)
router.get('/getrandom', PromptControllers.getRandomPrompt)
router.get('/get/:id', PromptControllers.getPrompt)
router.post('/create', PromptControllers.createPrompt)
router.post('/createMultiple', PromptControllers.createMultiplePrompts)
router.put('/update/:id', PromptControllers.updatePrompt)
router.put('/vote/:id/:opt', PromptControllers.voteInPrompt)
router.delete('/delete/:id', PromptControllers.deletePrompt)

module.exports = router;