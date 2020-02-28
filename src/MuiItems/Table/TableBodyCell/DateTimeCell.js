import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TableCell, Typography} from '@material-ui/core';
import moment from 'moment';

const DateTimeCell = ({datetimeFormat, padLeft, padRight, value, wrapBodyText}) => {
  const tableCellProps = useMemo(() => ({
    style: {padding: '5px'},
  }), []);
  const typoProps = useMemo(() => ({
    style: {whiteSpace: wrapBodyText || 'nowrap'},
    variant: 'body2',
  }), [wrapBodyText]);

  return (
    <TableCell {...tableCellProps}>
      <div style={{display: 'flex'}}>
        <span style={{paddingLeft: padLeft}} />
        <Typography {...typoProps}>{moment(value).format(datetimeFormat || 'MM/DD/YYYY')}</Typography>
        <span style={{paddingRight: padRight}} />
      </div>
    </TableCell>
  );
};

DateTimeCell.propTypes = {
  padLeft: PropTypes.string.isRequired,
  padRight: PropTypes.string.isRequired,
  datetimeFormat: PropTypes.string,
  value: PropTypes.string.isRequired,
  wrapBodyText: PropTypes.bool,
};
export default React.memo(DateTimeCell);
