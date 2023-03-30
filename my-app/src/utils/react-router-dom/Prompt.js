import React, { useCallback, useContext } from 'react';
import LifeCycle from './LifeCycle';
import RouterContext from './RouterContext';

function Prompt({ message, when = false }) {
  const context = useContext(RouterContext);
  const method = context.history.block;

  const onMount = useCallback(
    (self) => {
      self.release = method(message);
    },
    [method, message]
  );

  const onUnmount = useCallback((self) => {
    self.release();
  }, []);

  if (!when) {
    return null;
  }

  return <LifeCycle onMount={onMount} onUnmount={onUnmount} />;
}

export default React.memo(Prompt);
