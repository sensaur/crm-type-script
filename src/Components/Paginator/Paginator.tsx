import ReactPaginate from 'react-paginate';
// import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 20;
// const itemsPerPage = 20;

function Paginator(props: any) {
  // console.log('props===>', props);
  // console.log('ReactPaginate==>', ReactPaginate);
  const {
    perPage, total, onPageChange, curPage,
  } = props;
  // console.log('initialPage==>', initialPage);
  // const perPage2 = Number.isInteger(perPage) ? perPage : ITEMS_PER_PAGE;
  // const initialPage2 = Number.isInteger(initialPage) ? initialPage : 1;
  // console.log('perPage2==>', perPage2);
  // console.log('initialPage2=>>', initialPage2);
  if (total < perPage) {
    return null;
  }
  // console.log('total=>', total);
  return (
    <>
      <div className="">{`стр ${curPage} из ${Math.ceil(total / ITEMS_PER_PAGE)}`}</div>
      <ReactPaginate
        previousLabel="<"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        nextLabel=">"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        pageCount={total === 0 ? 1 : Math.ceil(total / ITEMS_PER_PAGE)}
        containerClassName="pagination my-1"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        onPageChange={onPageChange}
        activeClassName="active"
      />
    </>
  );
}

export default Paginator;

// export default class Paginator extends Component {
//   render() {
//     const perPage = Number.isInteger(this.props.perPage) ? this.props.perPage : PER_PAGE;
//     const initialPage = Number.isInteger(this.props.initialPage)
//       ? this.props.initialPage
//       : 0;
//
//     if (this.props.total < perPage) {
//       return null;
//     }
//     return (
//       <ReactPaginate
//         initialPage={initialPage}
//         previousLabel={<i className="fa fa-chevron-left" />}
//         nextLabel={<i className="fa fa-chevron-right" />}
//         breakLabel={<a href="">...</a>}
//         breakClassName="break-me"
//         pageCount={Math.ceil(this.props.total / perPage)}
//         marginPagesDisplayed={1}
//         pageRangeDisplayed={2}
//         onPageChange={this.props.onPageChange}
//         containerClassName="pagination"
//         subContainerClassName="pages pagination"
//         activeClassName="active"
//         forcePage={this.props.forcePage}
//         disableInitialCallback
//       />
//     );
//   }
// }
