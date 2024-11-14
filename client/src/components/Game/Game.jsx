import { useState, useEffect } from 'react';
import './Game.css';
import { motion, useAnimationControls} from "framer-motion";
import { getRandomPrompt, voteInPrompt } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import FinishModal from './FinishModal/FinishModal';

function Game() {
  const [finishOpen, setFinishOpen] = useState(false)
  const dispatch = useDispatch()
  const prompt = useSelector(state => state.selectedPrompt)

  useEffect(() => {
    dispatch(getRandomPrompt());
  }, [dispatch]);

  useEffect(() => {
    setDone(false)
  }, [prompt]);

  const controls = useAnimationControls()
  const [done, setDone] = useState(false)

  const handleSelect1 = async () => {
    if (!done) {
      dispatch(voteInPrompt(prompt.id, 1))
      controls.start("select1")
      controls.set("initial")
      setDone(true)
      setFinishOpen(true)
    }
  }
  const handleSelect2 = async () => {
    if (!done) {
      dispatch(voteInPrompt(prompt.id, 2))
      controls.start("select2")
      controls.set("initial")
      setDone(true)
      setFinishOpen(true)
    }
  }

  return (
    <div class={"GameContent"}>
      <motion.div className='Option Option1'
      variants={{
        initial: {rotate: 0},
        select1: {rotate: 360}
      }}
      transition={{
        duration: 2,
        type: "spring"
      }}
      initial={"initial"}
      animate={controls}
      onClick={handleSelect1}
      >
        <h2>{prompt.opt1}</h2>
        <p>{done ? "Votes: " + prompt.votesOpt1 : null}</p>
      </motion.div>

      <motion.div className='Option Option2'
      variants={{
        initial: {rotate: 0},
        select2: {rotate: 360}
      }}
      transition={{
        duration: 2,
        type: "spring"
      }}
      initial={"initial"}
      animate={controls}
      onClick={handleSelect2}
      >
        <h2>{prompt.opt2}</h2>
        <p>{done ? "Votes: " + prompt.votesOpt2 : null}</p>

        {finishOpen && <FinishModal setFinished={setFinishOpen} data={prompt}/>}
      </motion.div>
    </div>
  )
}

export default Game;
