function FranchAppFilterButton(props: any) {
  const { handleShowFilters, isFiltersShown } = props;
  return (
    <div className="container-fluid">
      <button type="button" className="btn btn-outline-warning" onClick={handleShowFilters}>
        {isFiltersShown ? 'Показать фильтры' : 'Скрыть фильтры'}
      </button>
    </div>
  );
}

export default FranchAppFilterButton;
