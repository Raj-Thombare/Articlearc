import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";
import { authTokenState, currentUserState, isAuthenticatedState } from "../store/state";
import { BACKEND } from "../config";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [authToken, setAuthToken] = useRecoilState(authTokenState);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
    const resetAuthToken = useResetRecoilState(authTokenState);
    const resetCurrentUser = useResetRecoilState(currentUserState);
    const resetIsAuthenticated = useResetRecoilState(isAuthenticatedState);

    const navigate = useNavigate();

    const signin = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${BACKEND}/api/v1/user/signin`, { email, password });
            const { token, user } = response.data;

            setAuthToken(token);
            setCurrentUser(user);
            setIsAuthenticated(true);

            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error('Signin failed:', error);
            throw error;
        }
    };

    const signup = async (name: string | undefined, email: string, password: string) => {
        try {
            const response = await axios.post(`${BACKEND}/api/v1/user/signup`, { name, email, password });
            const { token, user } = response.data;

            setAuthToken(token);
            setCurrentUser(user);
            setIsAuthenticated(true);

            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const signout = () => {
        resetAuthToken();
        resetCurrentUser();
        resetIsAuthenticated();
        localStorage.removeItem('token');
        navigate('/signin');
    };

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // You might want to validate the token with the backend here
            setAuthToken(token);
            setIsAuthenticated(true);

            // Fetch user info if necessary
            // setCurrentUser(fetchedUser);
        } else {
            resetAuthToken();
            resetCurrentUser();
            resetIsAuthenticated();
        }
    };

    return { authToken, currentUser, isAuthenticated, signin, signup, signout, checkAuthStatus };
}


