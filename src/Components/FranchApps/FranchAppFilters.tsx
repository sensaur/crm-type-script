function FranchAppFilters(props: any) {
  const { isFiltersShown } = props;
  return (
    <div>{isFiltersShown ? 'Здеь будут фильтры жить' : ''}</div>
  );
}

export default FranchAppFilters;
