import CreateOrder from '../../features/order/CreateOrder';
import OrderDetails from '../../features/order/OrderDetails';
import OrderList from '../../features/order/OrderList';

import { AppRoute } from '../types/routes';

const routes: AppRoute[] = [
  {
    exact: true,
    private: true,
    component: CreateOrder,
    pageTitle: 'Create new Order',
    path: '/orders/create',
  },
  {
    exact: true,
    private: true,
    component: OrderDetails,
    pageTitle: 'Order Details',
    path: '/orders/:id',
  },
  {
    exact: true,
    private: true,
    component: OrderList,
    pageTitle: 'Order List',
    path: '/orders',
  },
];

export default routes;
