import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import InputText from '../../app/layout/InputText';
import { createOrderValidator } from '../../app/validators/order-validators';
import orderAPI from '../../app/api/orderAPI';
import useModal from '../../hooks/useModal';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[2],
    backgroundColor: '#fff',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  formItem: {
    marginBottom: theme.spacing(2),
  },
  backBtn: {
    boxShadow: theme.shadows[2],
    marginRight: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
}));

const CreateOrder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { closeModal } = useModal();
  const history = useHistory();
  const { control, errors, handleSubmit } = useForm<{ total: number }>({
    mode: 'onChange',
    defaultValues: { total: 0 },
    resolver: yupResolver(createOrderValidator),
  });

  const submitForm = handleSubmit(async values => {
    const { total } = values;

    setLoading(true);
    orderAPI
      .createOrder(total)
      .then(createdOrder => {
        closeModal();
        history.push('/orders');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const handleGoBack = () => history.push('/orders');

  console.log(loading);
  return (
    <div className={classes.container}>
      <form style={{ width: '100%' }} onSubmit={submitForm}>
        <Grid container alignItems='center' className={classes.header}>
          <IconButton onClick={handleGoBack} className={classes.backBtn}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h3'>Order info</Typography>
        </Grid>
        <Grid container direction='column' className={classes.form}>
          <Grid item className={classes.formItem}>
            <InputText
              control={control}
              name='total'
              label='Total'
              isError={Boolean(errors?.total?.message)}
              errorMessage={errors?.total?.message}
            />
          </Grid>
          <Grid item className={classes.formItem}>
            <Button variant='contained' color='primary' type='submit'>
              Create Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateOrder;
