import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {handlePreloader, triggerSnackBar} from 'actions/app';
import {logout} from 'actions/user';
import classNames from 'classnames';
import {setTaskEditId, editTaskAction, setCurrentSorting, getTasksAction} from 'actions/tasks';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 25,
    position: 'relative',
    overflow: 'auto'
  },
  table: {
    minWidth: 650,
  },
  closeButton: {
    marginLeft: 10
  },
  actions: {
    width: 228
  },
  status: {
    width: 106
  },
  description: {
    width: 450
  }

});


const TableWithTasks = ({login, logout, triggerSnackBar, taskEditId, page, getTasksAction, setTaskEditId, tasksList, editTaskAction, handlePreloader, sortBy, activeSort, setCurrentSorting}) => {
  const classes = useStyles();
  const [status, setStatus] = React.useState(0);
  const [description, setDescription] = React.useState('');

  const handleEditButton = (id, status, description) => {
    setTaskEditId(id);
    setDescription(description);
    setStatus(status);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value)
  };
  const handleCheckbox = (e) => {
    setStatus(e.target.checked ? 10 : 0);
  };

  const handleSorting = async (type, sortBy) => {
    let currentSortDirection = sortBy;
    if (!currentSortDirection || currentSortDirection === 'asc') {
      currentSortDirection = 'desc'
    } else {
      currentSortDirection = 'asc'
    }
    handlePreloader(true)
    await getTasksAction(type, currentSortDirection, page);
    handlePreloader(false);
    setCurrentSorting(type, currentSortDirection);
  };

  let editedByAdmin = JSON.parse(localStorage.getItem('editedByAdmin'));
  if (!editedByAdmin) {
    editedByAdmin = [];
  }

  const handleSubmit = async (id, status, description, isEdited) => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      triggerSnackBar(true, 'Something is wrong, please try logging in again');
      setTaskEditId(null);
      return
    }
    handlePreloader(true);
    await editTaskAction(id, description, status);
    await getTasksAction(activeSort, sortBy, page);
    if (isEdited) {
      if (!editedByAdmin.length) {
        localStorage.setItem('editedByAdmin', JSON.stringify([id]));
      } else {
        editedByAdmin.push(id);
        localStorage.setItem('editedByAdmin', JSON.stringify(editedByAdmin));
      }
    }
    setTaskEditId(null);
    handlePreloader(false);
  };

  return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                  onClick={() => handleSorting('username', sortBy)}
              >
                <TableSortLabel
                    active={activeSort === 'username'}
                    direction={sortBy}
                >
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell
                  onClick={() => handleSorting('email', sortBy)}
              >
                <TableSortLabel
                    active={activeSort === 'email'}
                    direction={sortBy}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.description}>Description</TableCell>
              <TableCell
                  className={classes.status}
                  onClick={() => handleSorting('status', sortBy)}
              >
                <TableSortLabel
                    active={activeSort === 'status'}
                    direction={sortBy}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              {login ?
                  <TableCell align="right" className={classes.actions}>Actions</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksList.map(row => (
                <TableRow key={row.name}>
                  <TableCell scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className={classes.description}>
                    {taskEditId === row.id ?
                        <Input value={description}
                               multiline
                               onChange={handleDescription}
                               fullWidth/> :
                        <span>
                          <span
                              className={classNames('editedText', {displayNone: !editedByAdmin.includes(row.id)})}>(Edited by admin)</span>
                          {row.text}
                        </span>}
                  </TableCell>
                  <TableCell>
                    {taskEditId === row.id ? <Checkbox
                        checked={status === 10}
                        onChange={handleCheckbox}
                        inputProps={{
                          'aria-label': 'edited checkbox',
                        }}
                    /> : <Checkbox
                        disabled
                        checked={row.status === 10}
                        inputProps={{
                          'aria-label': 'checkbox',
                        }}
                    />}


                  </TableCell>
                  {login ? <TableCell align="right" className={classes.actions}>
                    {taskEditId === row.id ?
                        <Fragment>
                          <Fab color="primary" aria-label="edit"
                               onClick={() => handleSubmit(row.id, status, description, row.text.trim() !== description)}>
                            <Check/>
                          </Fab>
                          <Fab className={classes.closeButton} color="secondary" aria-label="edit"
                               onClick={() => setTaskEditId(null)}>
                            <Close/>
                          </Fab>
                        </Fragment>
                        :
                        <Fab color="primary" aria-label="edit"
                             onClick={() => handleEditButton(row.id, row.status, row.text)}>
                          <EditIcon/>
                        </Fab>}
                  </TableCell> : null}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
  );
}

function mapStateToProps(state) {
  const {login} = state.user;
  const {taskEditId, tasksList, sortBy, activeSort, page} = state.tasks;
  return {login, taskEditId, tasksList, sortBy, activeSort, page};
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          setTaskEditId,
          handlePreloader,
          editTaskAction,
          setCurrentSorting,
          getTasksAction,
          logout,
          triggerSnackBar
        },
        dispatch,
    );

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TableWithTasks);
