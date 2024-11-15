import { useState } from 'react';
import './Footer.css';
import { motion, useAnimationControls} from "framer-motion";
import { getRandomPrompt, setIsNewPrompt } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import InfoIcon from '@mui/icons-material/Info';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link } from 'react-router-dom'

function Footer() {
  const [focused, setFocused] = useState(false)
  const dispatch = useDispatch()
  const prompt = useSelector(state => state.selectedPrompt)

  const handleSkip = () => {
    dispatch(getRandomPrompt())
  }

  const handleShowContext = () => {
    prompt ? dispatch(setIsNewPrompt(true)) : null
  }

  return (
    <motion.div class={"Footer"} onHoverStart={() => setFocused(true)} onHoverEnd={() => setFocused(false)}>
      <motion.div
      className='IconsSelection'
      initial={{
        y: 50
      }}
      transition={{
        duration: 0.7,
        type: "spring"
      }}
      animate={focused ? {y:1} : {y:"7vh"}}
      >
        <Link to={'/admin'} style={{color: ' #1A1A1D', borderColor: "transparent"}}><SettingsIcon/></Link><InfoIcon onClick={handleShowContext}/><DoubleArrowIcon onClick={handleSkip}/>
      </motion.div>
    </motion.div>
  )
}

export default Footer;
