import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Navigate, Redirect, useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const authenticatedUser = { username: 'asd', password: '123' };

const appContext = createContext(undefined);

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsLoggedIn(true);
  }, []);
  return (
    <appContext.Provider value={{ isLoggedIn }}>
      {children}
    </appContext.Provider>
  );
};

const useAppContext = () => useContext(appContext);
export { AppProvider, useAppContext };

const DashBoard = () => {
  const { isLoggedIn } = useAppContext();
  console.log(isLoggedIn);
  return (
    <>
      <h2>DashBoard</h2>
      <div>
        <div>User Info</div>
        <div>Anshul Raheja</div>
        <div>anshul.raheja97@gmail.com</div>
      </div>
    </>
  );
};

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formValues?.username && formValues?.password) {
      if (
        // authenticatedUser?.username === formValues?.username &&
        // authenticatedUser?.password === formValues?.password
        true
      ) {
        localStorage.setItem('user', formValues?.username);
        navigate('/dashboard');
      } else {
        toast('Invalid username or password');
      }
      console.log(formValues);
    } else {
      toast('Enter username and password ');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formValues?.username}
          onChange={(e) => handleFormFieldChange(e)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues?.password}
          onChange={(e) => handleFormFieldChange(e)}
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashBoard" element={<DashBoard />} />
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
          {/* <Redirect exact from="/" to="/login" /> */}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
