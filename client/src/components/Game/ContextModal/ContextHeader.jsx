import { useEffect, useState } from 'react';
import './ContextHeader.css';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewPrompt } from '../../../redux/actions';

import TypewriterText from '../TypewriterText/TypewriterText';

function ContextHeader() {
  const dispatch = useDispatch();
  const prompt = useSelector(state => state.selectedPrompt);
  const isNewPrompt = useSelector(state => state.isNewPrompt);

  useEffect(() => {
    if (isNewPrompt) {
      const timer = setTimeout(() => {
        dispatch(setIsNewPrompt(false));
      }, 10000);

      const handleClickOutside = (e) => {
        if (!e.target.closest('.ContextHeader')) {
          dispatch(setIsNewPrompt(false));
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isNewPrompt, dispatch]);

  return (
    <AnimatePresence>
      {isNewPrompt && (
        <motion.div
          className="ContextHeader"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div className='Context'>
            <TypewriterText text={prompt.context.length > 0 ? prompt.context : "Would you rather..."}/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContextHeader;
