import React, {Fragment} from 'react';

const SortTh = (
  {
    id,
    label,
    width,
    sort,
    tableSort,
    sortColumn,
    asc,
    isSorting
  }) => {
  return (
    <Fragment>
      {
        isSorting
          ?
          (
            <th width={width} onClick={() => tableSort(sort)}>
              <span className="mr-2">{label}</span>
              <i
                className={'fas ' + (sortColumn === sort && !asc ? 'fa-sort-amount-up ' : 'fa-sort-amount-down ') + (sortColumn === sort ? '' : 'd-none')}/>
            </th>
          ) : (id === 0 && label === "Select")
          ?<th className="text-center" width={width}><input type="checkbox" /></th>
          :(
            <th width={width}>{label}</th>
          )
      }
    </Fragment>

  );
};

export default SortTh;
