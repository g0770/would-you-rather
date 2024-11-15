
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { motion, useAnimationControls} from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { getRandomPrompt } from '../../../redux/actions';

import {
  VictoryPie,
  VictoryTheme
} from "victory";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FinishModal({data,setFinished, isAdminPanel = false}) {
  const dispatch = useDispatch()
  const prompt = useSelector(state => state.selectedPrompt)

  const handleNext = () => {
    dispatch(getRandomPrompt())
    setFinished(false)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setFinished(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <VictoryPie
            data={[
              { x: "Red", y: data?.votesOpt1 || data[0]?.votesOpt1 },
              { x: "Blue", y: data?.votesOpt2 || data[0]?.votesOpt2 }
            ]}
            theme={VictoryTheme.clean}
            colorScale={["red", "blue"]}
          />

          {isAdminPanel && (
            <>
              <h3>Red (Right, Option 1): {data?.votesOpt1 || data[0]?.votesOpt1}</h3>
              <h3>Blue (Right, Option 2): {data?.votesOpt2 || data[0]?.votesOpt2}</h3>
            </>
          )}

          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <button style={isAdminPanel ? {display: "none"} : null} onClick={isAdminPanel ? null : handleNext }>Continue</button> <button onClick={() => setFinished(false)}>Back</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}