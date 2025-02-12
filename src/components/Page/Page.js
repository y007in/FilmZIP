import React from 'react';

const Page = ({ header, children, footer }) => {
  return (
    <div className="Page">
      <header>{header}</header>
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default Page;
