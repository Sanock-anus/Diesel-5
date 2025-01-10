import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { api } from '../utils/api';

const AuthForm = ({isRegister = false, onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

     const handleSubmit = async (event) => {
       event.preventDefault();
       setError("")

       try{
            let response;
           if (isRegister) {
               response = await api.post('/auth/register', {
                   username,
                   password,
                   email,
               });
           } else {
               response = await api.post('/auth/login', {
                   username,
                   password,
               });
           }
           const {token, user} = response.data;
           localStorage.setItem("token", token);
           onLogin(user);
           history.push("/")
        } catch(error) {
            setError(error.response?.data?.message || 'Failed to authenticate');
        }
    }

    return (
         <form onSubmit={handleSubmit} className="auth-form">
             <h2>{isRegister ? 'Register' : 'Login'}</h2>
                {isRegister && (
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                         <input type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         required
                         />
                     </div>
                )}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            {error && <div className="error-message">{error}</div>}
          </form>
    )
}

export default AuthForm;
