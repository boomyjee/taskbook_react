import React from 'react';
import style from './Pagination.module.scss';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setTaskEditId, getTasksAction} from 'actions/tasks';
import {handlePreloader} from 'actions/app';
import ReactPaginate from 'react-paginate';


const Pagination = ({page, total_task_count, handlePreloader, getTasksAction, sortBy, activeSort}) => {
  const pagesCount = Math.ceil(total_task_count / 3)
  const handlePage = async (data) => {
    handlePreloader(true);
    await getTasksAction( sortBy, activeSort, data.selected + 1);
    handlePreloader(false);
  }
  return (
      <div className={style.tablePagination}>
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageLinkClassName={style.pageClassName}
            pageCount={pagesCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePage}
            containerClassName={style.paginationContainer}
            subContainerClassName={'pages pagination'}
            activeLinkClassName={style.active}
            nextLinkClassName={style.nextButton}
            previousLinkClassName={style.prevButton}
            previousClassName={style.prev}
            nextClassName={style.next}
        />
      </div>
  )
};

function mapStateToProps(state) {
  const {page, total_task_count, sortBy, activeSort} = state.tasks;
  return {page, total_task_count, sortBy, activeSort};
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          setTaskEditId,
          handlePreloader,
          getTasksAction
        },
        dispatch,
    );

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Pagination);
