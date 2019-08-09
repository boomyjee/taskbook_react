import React, {PureComponent} from 'react';
import Table from 'components/Table/Table';
import AddTask from 'components/AddTask/AddTask';
import style from './Home.module.scss';
import Pagination from 'components/Pagination/Pagination';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTasksAction} from 'actions/tasks';

class Home extends PureComponent{

  async componentDidMount() {
    await this.props.getTasksAction();
  }

  render() {
    return (
        <div className={style.homePage}>
          <AddTask />
          <Table />
          <Pagination />
        </div>
    )
  }
}


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          getTasksAction
        },
        dispatch,
    );



export default compose(
    connect(null, mapDispatchToProps)
)(Home);
