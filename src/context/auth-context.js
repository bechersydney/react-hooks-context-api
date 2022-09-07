import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    //default values
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: (email, pass) => {},
});
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const userAuthInfo = localStorage.getItem("isLoggedIn");
        if (userAuthInfo === "1") setIsLoggedIn(true);
    }, []);

    return (
        // make the components listen from provider
        // you can just pick what component should listen
        // pls check index.js-> app.js
        <AuthContext.Provider
            value={{
                isLoggedIn,
                onLogOut: logoutHandler,
                onLogIn: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
