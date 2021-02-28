import React, { useEffect } from 'react';
import MaterialTable, { Action, Column } from 'material-table';
import { useHistory } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DetailsIcon from '@material-ui/icons/Details';

import orderAPI from '../../app/api/orderAPI';
import { Order } from '../../app/types/order';
import OrderStatus from './OrderStatus';

interface RowData extends Order {}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    boxShadow: theme.shadows[2],
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const OrderList: React.FC = () => {
  const tableRef = React.createRef();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    setInterval(() => {
      if (tableRef && tableRef.current) {
        (tableRef.current as any).onQueryChange();
      }
    }, 5 * 1000);
  }, [tableRef]);

  const columns: Column<RowData>[] = [
    {
      title: 'Customer',
      field: 'userId',
      render: (rowData: RowData) => (
        <Grid container alignItems='center'>
          <Avatar
            style={{
              marginRight: theme.spacing(2),
              width: theme.spacing(6),
              height: theme.spacing(6),
            }}
          >
            M
          </Avatar>
          <Typography variant='body1'>John Doe</Typography>
        </Grid>
      ),
    },
    {
      title: 'Total',
      field: 'total',
      render: (rowData: RowData) => (
        <Typography variant='body2' style={{ textDecoration: 'none' }}>
          {rowData.total} $
        </Typography>
      ),
    },
    {
      title: 'Status',
      field: 'status',
      render: (rowData: RowData) => <OrderStatus status={rowData.status} />,
    },
  ];
  const actions: Action<RowData>[] = [
    {
      icon: () => <DetailsIcon />,
      tooltip: 'View',
      iconProps: {},
      position: 'row',
      onClick: (e: any, rowData: any) => {
        history.push(`/orders/${rowData.id}`);
      },
    },
    {
      icon: 'add',
      tooltip: 'Create new Order',
      isFreeAction: true,
      disabled: false,
      onClick: () => {
        history.push('/orders/create');
      },
    },
  ];

  return (
    <div className={classes.container}>
      <Typography variant='h3' className={classes.title}>
        All Order
      </Typography>
      <MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={query => {
          return new Promise((resolve, reject) => {
            orderAPI
              .getOrders({
                page: query.page + 1,
                limit: query.pageSize,
              })
              .then(res => {
                resolve({
                  data: res.docs,
                  page: res.page - 1,
                  totalCount: res.totalDocs,
                });
              })
              .catch(err => {
                reject(err);
              })
              .finally(() => {});
          });
        }}
        actions={actions}
        options={{
          actionsColumnIndex: -1,
          showTitle: false,
          rowStyle: {
            fontSize: '0.875rem',
          },
          debounceInterval: 500,
          search: false,
        }}
        isLoading={false}
      />
    </div>
  );
};

export default OrderList;
