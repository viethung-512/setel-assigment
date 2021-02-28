import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';

interface Props {
  title?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[100],
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const PageLayout: React.FC<Props> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header title={title} />

      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default PageLayout;
