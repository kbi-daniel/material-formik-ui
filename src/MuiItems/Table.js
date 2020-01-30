import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useTable, useSortBy} from 'react-table';
import {Table as MuiTable, TableHead, TableBody} from '@material-ui/core';
import TableHeadRow from './Table/TableHeadRow';
import TableBodyRow from './Table/TableBodyRow';
import moment from 'moment';

const Table = (props) => {
  const data = useMemo(() => {
    return props.data;
  }, [props.data]);
  const columns = useMemo(() => {
    return props.columns.map(column => {
      return {
        ...column,
        sortType: column.type,
      };
    });
  }, [props.columns]);
  const sortTypes = useMemo(() => ({
    boolean: (rowA, rowB, columnID) => {
      if (rowA.values[columnID] === rowB.values[columnID]) return 0;
      if (!rowA.values[columnID]) return 1;
      if (rowA.values[columnID]) return -1;
    },
    currency: (rowA, rowB, columnID) => {
      if (rowA.values[columnID] === rowB.values[columnID]) return 0;
      if (rowA.values[columnID] > rowB.values[columnID]) return 1;
      if (rowA.values[columnID] < rowB.values[columnID]) return -1;
    },
    datetime: (rowA, rowB, columnID) => {
      const momentA = moment(rowA.values[columnID]);
      const momentB = moment(rowB.values[columnID]);
      if (momentA.isSame(momentB)) return 0;
      if (momentA.isAfter(momentB)) return 1;
      if (momentA.isBefore(momentB)) return -1;
    },
    numeric: (rowA, rowB, columnID) => {
      if (rowA.values[columnID] === rowB.values[columnID]) return 0;
      if (rowA.values[columnID] > rowB.values[columnID]) return 1;
      if (rowA.values[columnID] < rowB.values[columnID]) return -1;
    },
    string: (rowA, rowB, columnID) => {
      return rowA.values[columnID].localeCompare(rowB.values[columnID]);
    },
  }), []);
  const rtProps = useTable({columns, data, sortTypes}, useSortBy);
  console.log({rtProps});

  return (
    <MuiTable {...rtProps.getTableProps()}>
      <TableHead>
        {rtProps.headerGroups.map((headerGroup, headIndex) => <TableHeadRow key={headIndex} headerGroup={headerGroup} />)}
      </TableHead>
      <TableBody>
        {rtProps.rows.map((row, bodyIndex) => <TableBodyRow key={bodyIndex} rtProps={rtProps} row={row} />)}
      </TableBody>
    </MuiTable>
  );
};

Table.propTypes = {
  /** Property defines the columns that will be displayed in the table and the settings that should apply to each column. */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Property that controls the header and data to be displayed in each column. Will be used as the table header by default; but can be overwritten by more descriptive `Header` property. */
    accessor: PropTypes.string.isRequired,
    /** By default, 'datetime' column types display as `moment().format('MM/DD/YYYY')`. This property overrides that default format string. See <a href='https://momentjs.com/docs/#/displaying/' target='_blank'>moment.js display docs</a> for more details. */ //eslint-disable-line
    datetimeFormat: PropTypes.string,
    /** Overwrites default `accessor` title used in the table header. */
    Header: PropTypes.string,
    /** Data type: 'boolean', 'currency', 'datetime', 'numeric', 'string' */
    type: PropTypes.string,
  })).isRequired,
  /** The data to be shown by the table. Keys must match the 'accessor' of their coresponding column. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Table;
