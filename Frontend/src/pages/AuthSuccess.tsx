import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 AuthSuccess page loaded");
    
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    
    console.log("Token received:", token ? "Yes" : "No");
    console.log("Error received:", error);
    
    if (error) {
      alert(`Login failed: ${error}`);
      navigate('/login');
      return;
    }

    if (token) {
      console.log("✅ Saving token to localStorage");
      localStorage.setItem('token', token);
      
      console.log("✅ Redirecting to /chat");
      navigate('/chat');
    } else {
      console.error("❌ No token found, redirecting to login");
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Completing login...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;