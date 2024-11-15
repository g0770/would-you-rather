import * as React from 'react'
import { useState } from 'react'
import { updatePrompt } from '../../../redux/actions'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useDispatch } from 'react-redux'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'

import '../AdminPanel.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  color: "black"
}

export default function ModalEditPrompt({ IsOpen, SetIsOpen, CurrentPrompt = []}) {
  const handleClose = () => SetIsOpen(false)
  const dispatch = useDispatch()

  const clearInput = {
    opt1: '',
    opt2: '',
    context: '',
    active: ''
  }
  const [input, setInput] = useState(clearInput)
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmitCreate = async () => {
    SetIsOpen(false);
    dispatch(updatePrompt(CurrentPrompt[0].id, input))
  }

  return (
    <div>
      {IsOpen ? (
        <Modal
          open={IsOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit
            </Typography>
            <form onChange={handleChangeInput} className='ModalPromptContainer'>
                <TextField id="standard-basic" defaultValue={CurrentPrompt[0].context} label="Context" name='context' variant="standard" />
                <TextField id="standard-basic" defaultValue={CurrentPrompt[0].opt1} label="Option 1" name='opt1' variant="standard"/>
                <TextField id="standard-basic" defaultValue={CurrentPrompt[0].opt2} label="Option 2" name='opt2' variant="standard" />
                <NativeSelect
                  defaultValue={CurrentPrompt[0].active}
                  inputProps={{
                    name: 'active',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </NativeSelect>
                <br/>
            </form>

            <div className='ButtonContainer'>
              <button onClick={handleSubmitCreate}>UPDATE</button>
              <button onClick={handleClose}>EXIT</button>
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
