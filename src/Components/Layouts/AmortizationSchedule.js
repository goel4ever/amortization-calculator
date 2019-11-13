import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './AmortizationSchedule.css';

export default props => (
  <section className="app-table">
    <ReactTable
      data={props.data}
      columns={props.columns}
      showPagination={props.showPagination}
      defaultPageSize={props.defaultPageSize}
    />
  </section>
);
