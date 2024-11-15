
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Outlet } from 'react-router';
import { getPrompts, deletePrompt } from '../../redux/actions';
import { Link } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { DataGrid} from '@mui/x-data-grid';
import { GridToolbarContainer } from '@mui/x-data-grid';

import './AdminPanel.css'
import ModalCreatePrompt from './ModalPrompt/ModalCreatePrompt';
import ModalEditPrompt from './ModalPrompt/ModalEditPrompt';
import FinishModal from '../Game/FinishModal/FinishModal';


function AdminPanel() {

  const dispatch = useDispatch();
  const prompts = useSelector(state => state.prompts)
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    dispatch(getPrompts()).then(setLoader(false))
  },[dispatch])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(-1)

  const handleOpenStats = (id) => {
    setSelectedId(id)
    setIsStatsModalOpen(true)
  }

  const handleOpenCreate = () => {
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (id) => {
    setSelectedId(id)
    setIsEditModalOpen(true)
  }

  const dropUser = (id) => {
    if (confirm("When deleted, the information cannot be recovered. Are you sure you want to continue with the action?")) {
      dispatch(deletePrompt(id))
    }
  }

  const paginationModel = { page: 0, pageSize: 10 };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 50, headerClassName: 'custom-header'},
    { field: 'context', headerName: 'Context', flex: 0.5, minWidth: 850, headerClassName: 'custom-header'},
    { field: 'opt1', headerName: 'Option 1', flex: 0.5, minWidth: 150, headerClassName: 'custom-header'},
    { field: 'opt2', headerName: 'Option 2', flex: 0.5, minWidth: 150, headerClassName: 'custom-header'},
    { field: 'active', headerName: 'Active', flex: 0.5, minWidth: 50, headerClassName: 'custom-header'},
    { field: 'actions', sortable: false, headerName: 'Actions' , flex: 1, minWidth: 50, headerClassName: 'custom-header',renderCell: (params) => (
      <div>
        <StyledTableCell align="center">
          <EditIcon sx={{ cursor: 'pointer', fontSize: 20, marginRight: 1, bgcolor: "black" }} title='Edit' onClick={() => handleOpenEdit(params.row.id)} />
          <EqualizerIcon sx={{ cursor: 'pointer', fontSize: 20, marginRight: 1, bgcolor: "black" }} title='Edit' onClick={() => handleOpenStats(params.row.id)} />
          <DeleteIcon sx={{ cursor: 'pointer', fontSize: 20, bgcolor: "black" }} title='Delete' onClick={() => dropUser(params.row.id)}/>
        </StyledTableCell>
      </div>
    )}
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', padding: '8px', backgroundColor: "#424242" }}>
        <div style={{display: "flex",gap: "15px"}}>
          <Button variant="contained" onClick={handleOpenCreate}>ADD PROMPT</Button>
          <Link to={'/'}><Button variant="contained">Back</Button></Link>
        </div>
      </GridToolbarContainer>
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))
  

  if (loader) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div class={"AdminPanelContent"}>
      <Paper sx={{ height: '87.5vh', width: '100%' }}>
          <DataGrid
            rows={prompts}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 15, 20, 25, 30]}
            disableRowSelectionOnClick
            slots={{
              toolbar: CustomToolbar,
            }}
            sx={{ 
              border: 0, 
              '.MuiDataGrid-footerContainer': {
              backgroundColor: '#424242', color: "#F8F8FF"
              },
              '.MuiTablePagination-root, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                color: '#F8F8FF'
              },
              '.MuiSvgIcon-root': {
                color: '#F8F8FF'
              }
            }}
          />
        </Paper>

        <ModalCreatePrompt IsOpen={isCreateModalOpen} SetIsOpen={setIsCreateModalOpen}/>
        <ModalEditPrompt IsOpen={isEditModalOpen} SetIsOpen={setIsEditModalOpen} CurrentPrompt={prompts.filter((prompt) => prompt.id == selectedId)}/>
        {isStatsModalOpen && <FinishModal data={prompts.filter((prompt) => prompt.id == selectedId)} setFinished={setIsStatsModalOpen} isAdminPanel={true}/>}
    </div>
    

  )
}

export default AdminPanel;
