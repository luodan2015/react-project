import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../utils/reactRedux';

export default function ReactReduxHooksPage() {
  const count = useSelector((count) => count);
  const dispatch = useDispatch();

  const handle = useCallback(() => {
    dispatch({ type: 'ADD' });
  }, [dispatch]);

  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      <button onClick={handle}>{count}</button>
    </div>
  );
}
