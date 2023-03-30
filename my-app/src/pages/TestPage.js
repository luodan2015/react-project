import React, { useEffect, useState } from 'react';

export default function TestPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('fresh');

    return () => {
      console.log('unmount');
    };
  }, [count]);

  return (
    <>
      <div>TestPage</div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </>
  );
}
