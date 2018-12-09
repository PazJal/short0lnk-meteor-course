//Libs:
import React from 'react';

//Project imports:
import LinksList from '../ui/LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links From Link"/>
      <div className="page-content">  
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
      
    </div>
  );
};