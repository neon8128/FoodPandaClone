import { Fragment,useContext } from 'react';
import AuthContext from '../../Context/auth-context';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
 
    return (
      <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
      </Fragment>
    );
 
  
};

export default Layout;
