import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ModalWrapper from '../../app/cores/modal/ModalWrapper';
import InputText from '../../app/layout/InputText';
import { createOrderValidator } from '../../app/validators/order-validators';
import orderAPI from '../../app/api/orderAPI';
import useModal from '../../hooks/useModal';

const CreateOrderModal = () => {
  const [loading, setLoading] = useState(false);
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

  console.log(loading);

  return (
    <ModalWrapper
      title='Create Order'
      modalType='CreateOrderModal'
      closeable={true}
      actions={
        <Fragment>
          <Button variant='contained' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={submitForm}>
            Create Order
          </Button>
        </Fragment>
      }
    >
      <form style={{ width: '100%' }} onSubmit={submitForm}>
        <Grid container direction='column'>
          <Grid item>
            <InputText
              control={control}
              name='total'
              label='Total'
              isError={Boolean(errors?.total?.message)}
              errorMessage={errors?.total?.message}
            />
          </Grid>
        </Grid>
      </form>
    </ModalWrapper>
  );
};

export default CreateOrderModal;
