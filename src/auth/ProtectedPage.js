import { useEffect, useState } from 'react';

export default function ProtectedPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    fetch('http://localhost:3000/api/secure-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
