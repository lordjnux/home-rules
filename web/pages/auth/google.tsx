import { useEffect } from 'react';

const GoogleAuth = () => {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      window.location.href = `${apiUrl}/auth/google`;
    } else {
      console.error('API URL not configured');
    }
  }, []);

  return <div>Redirecting to Google authentication...</div>;
};

export default GoogleAuth;