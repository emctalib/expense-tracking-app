import React, { useEffect, useLayoutEffect } from 'react';
import { Kid } from './Kid';

export const Parent = () => {
  useEffect(() => {
    console.log("→ Parent Component rendered (useEffect).");
  }, []);
  useLayoutEffect(() => {
    console.log("→ Parent Component rendered (useLayoutEffect).");
  }, []);
  return (
    <React.Fragment>
      → Parent Component rendered.<br></br>
      <Kid></Kid>
    </React.Fragment>
  );
};
