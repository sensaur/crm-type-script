import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 20;

function Paginator(props: any) {
  const {
    total, onPageChange, curPage,
  } = props;

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
