import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OrderStatus from './OrderStatus';
import { Order } from '../../app/types/order';
import orderAPI from '../../app/api/orderAPI';
import useAlert from '../../hooks/useAlert';
import { IOrderStatus } from '@setel-practical-assignment/common';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    boxShadow: theme.shadows[2],
    borderRadius: theme.spacing(0.5),
  },
  backBtn: {
    boxShadow: theme.shadows[2],
  },
  header: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  content: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
}));

const OrderDetails: React.FC = () => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const confirm = useConfirm();
  const { alertSuccess } = useAlert();

  useEffect(() => {
    const fetchOrder = async (id: string) => {
      setLoading(true);
      orderAPI
        .getOrder(id)
        .then(fetchedOrder => {
          console.log(fetchedOrder);
          setOrder(fetchedOrder);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchOrder(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => history.push('/orders');

  const handleCancelOrder = (id: string) => {
    confirm()
      .then(() => {
        setLoading(true);
        return orderAPI
          .cancelledOrder(id)
          .then(() => {
            alertSuccess('Order has been cancelled successful');
            history.push('/orders');
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })

      .catch();
  };

  return (
    <div className={classes.root}>
      <Grid container direction='column' className={classes.container}>
        <Grid
          item
          container
          justify='space-between'
          alignItems='center'
          className={classes.header}
        >
          <Grid item>
            <Grid item container alignItems='center'>
              <IconButton onClick={handleGoBack} className={classes.backBtn}>
                <ArrowBackIcon />
              </IconButton>

              <Typography variant='h6' style={{ marginLeft: theme.spacing(2) }}>
                Order #{id}
              </Typography>
            </Grid>
          </Grid>

          {!loading ? (
            order && order.status && <OrderStatus status={order!.status} />
          ) : (
            <Skeleton variant='rect' width={100} height={32} />
          )}
        </Grid>

        <Grid item container className={classes.content}>
          <Grid item style={{ flex: 1 }}>
            <Typography variant='body1'>
              Total: {`${order?.total} $`}
            </Typography>
            <Typography variant='body1'>Customer: John Doe</Typography>
          </Grid>

          {order && order.status !== IOrderStatus.CANCELLED && (
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleCancelOrder(id)}
              >
                Canceled Order
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetails;
