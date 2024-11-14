const { Prompt } = require('../db')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

const listPrompts = async (req,res,next) => {
  try {
    const getPrompts = await Prompt.findAll()

    if (!getPrompts) {
      return res.status(400).send("No prompts registered in the DB")
    }

    return res.status(200).json(getPrompts)
  } catch (error) {
    next(error)
  }
}

const getPrompt = async (req, res, next) => {
  try {
    const {id} = req.params
    const getPrompt = await Prompt.findByPk(id)
    if (getPrompt) {
      res.status(200).json(getPrompt)
    } else {
      return res.status(404).send("There is no registered prompt with that id")
    }
  } catch (error) {
    next(error)
  }
}

const getRandomPrompt = async (req, res, next) => {
  try {
    const allPrompts = await Prompt.findAll()
    if (!allPrompts || allPrompts.length === 0) {
      return res.status(400).send("No prompts registered in the DB")
    }
    let selectedPrompt
    let pass = false
    while (!pass) {
      const randomIndex = Math.floor(Math.random() * allPrompts.length)
      selectedPrompt = allPrompts[randomIndex]
      if (selectedPrompt && selectedPrompt.active) {
        pass = true
      }
    }
    res.status(200).json(selectedPrompt)
  } catch (error) {
    next(error)
  }
};


const createPrompt = async (req, res, next) => {
  try {
    const {opt1, opt2, context} = req.body;
    if (!opt1 && !opt2 && !context) {
      return res.status(400).send('You must fill out all the required fields')
    }
    const createPrompt = await Prompt.create({
      opt1,
      opt2,
      context,
      votesOpt1: 0,
      votesOpt2: 0
    })
    res.status(201).json({msg: 'Prompt created successfully', prompt: createPrompt})
  } catch (error) {
    next(error)
  }
}

const createMultiplePrompts = async (req, res, next) => {
  try {
    const {prompts} = req.body
    prompts.forEach(async (element) => {
      if (!element.opt1 && !element.opt2 && !element.context) {
        return res.status(400).send('You must fill out all the required fields')
      }
      const createPrompt = await Prompt.create({
        opt1: element.opt1,
        opt2: element.opt2,
        context: element.context,
        votesOpt1: 0,
        votesOpt2: 0
      })
    });
    
    res.status(201).json({msg: 'Prompts created successfully'})
  } catch (error) {
    next(error)
  }
}

const updatePrompt = async (req, res, next) => {
  try {
    const {id} = req.params
    const {opt1,opt2,context,votesOpt1,votesOpt2,active} = req.body
    const getPrompt = await Prompt.findByPk(id)
    if (!getPrompt) {
      return res.status(404).send("There is no registered prompt with that id")
    }
    const updatePrompt = await getPrompt.update({
      opt1 : opt1 ? opt1 : getPrompt.opt1,
      opt2 : opt2 ? opt2 : getPrompt.opt2,
      context : context ? context : getPrompt.context,
      votesOpt1 : votesOpt1 ? votesOpt1 : getPrompt.votesOpt1,
      votesOpt2 : votesOpt2 ? votesOpt2 : getPrompt.votesOpt2,
      active : active !== undefined ? active : getPrompt.active
    })
    res.status(200).json({msg: "Prompt updated successfully!" , prompt: updatePrompt})
  } catch (error) {
    next(error)
  }
}

const deletePrompt = async (req, res, next) => {
  try {
    const {id} = req.params
    const findPrompt = await Prompt.findByPk(id)
    if (!findPrompt) {
      return res.status(404).send('There is no prompt registered in the database with that id')
    }
    await Prompt.destroy({ where: { id } })
    res.status(200).json({ destroy: true, msg: 'Prompt deleted from database successfully' });
  } catch (error) {
    next(error)
  }
}

const voteInPrompt = async (req, res, next) => {
  try {
    const {id , opt} = req.params
    const getPrompt = await Prompt.findByPk(id)
    if (!getPrompt) {
      return res.status(404).send("There is no registered prompt with that id")
    }
    const updatePrompt = await getPrompt.update({
      opt1 : getPrompt.opt1,
      opt2 : getPrompt.opt2,
      context : getPrompt.context,
      votesOpt1 : opt == 1 ? getPrompt.votesOpt1 + 1 : getPrompt.votesOpt1,
      votesOpt2 : opt == 2 ? getPrompt.votesOpt2 + 1  : getPrompt.votesOpt2,
      active : getPrompt.active
    })
    res.status(200).json({msg: "Prompt updated successfully!" , prompt: updatePrompt})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listPrompts,
  getPrompt,
  getRandomPrompt,
  createPrompt,
  createMultiplePrompts,
  updatePrompt,
  voteInPrompt,
  deletePrompt
}