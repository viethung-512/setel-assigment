import React from 'react';
import Chip from '@material-ui/core/Chip';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { IOrderStatus } from '@setel-practical-assignment/common';

interface Props {
  status: IOrderStatus;
}

interface StatusProps {
  color: string;
  label: string;
  icon: any;
}

const OrderStatus: React.FC<Props> = ({ status }) => {
  const getStatusProps = (status: IOrderStatus): StatusProps => {
    switch (status) {
      case IOrderStatus.CREATED:
        return {
          icon: <NewReleasesIcon style={{ color: 'blue' }} />,
          label: 'Created',
          color: 'blue',
        };
      case IOrderStatus.CONFIRMED:
        return {
          icon: <ConfirmationNumberIcon style={{ color: 'orange' }} />,
          label: 'Confirmed',
          color: 'orange',
        };
      case IOrderStatus.CANCELLED:
        return {
          icon: <ClearIcon style={{ color: 'red' }} />,
          label: 'Cancelled',
          color: 'red',
        };
      case IOrderStatus.DELIVERED:
      default:
        return {
          icon: <DoneIcon style={{ color: 'green' }} />,
          label: 'Delivered',
          color: 'green',
        };
    }
  };

  const statusProps = getStatusProps(status);

  return (
    <Chip
      icon={statusProps.icon}
      label={statusProps.label}
      color='default'
      variant='outlined'
      style={{ color: statusProps.color, borderColor: statusProps.color }}
    />
  );
};

export default OrderStatus;
