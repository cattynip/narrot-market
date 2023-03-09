import { useEffect } from 'react';

console.log('Outside');

const Bs = () => {
  useEffect(() => {
    console.log('Inside');
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default Bs;
