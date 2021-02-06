import React from 'react';
import T from 'prop-types';

import Header from './Header';
import './Layout.css';

function Layout({ children, title, ...props }) {
  return (
    <div>
      <Header {...props} />
      <main>
        <h2>{title}</h2>
        <section>{children}</section>
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: T.node,
  title: T.string.isRequired,
};

export default Layout;
