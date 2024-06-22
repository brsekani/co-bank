import { useAuth } from "../Context/AuthProvider";

const TestComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <p>Is Authenticated: {isAuthenticated.toString()}</p>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default TestComponent;
