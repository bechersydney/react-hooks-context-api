import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT_PASS") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR_PASS") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
};
const Login = () => {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: null,
    });
    const emailRef = useRef();
    const passRef = useRef();
    // this is using the alias : afer the object key
    const { isValid: emailIsvalid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    // triggers when have changes on dependencies
    // mostly used in http request and listening to keystrokes
    useEffect(() => {
        console.log("Validity check");
        const timerIdentifier = setTimeout(() => {
            setFormIsValid(emailIsvalid && passwordIsValid);
        }, 500);

        // code clean up before next execution
        return () => {
            clearTimeout(timerIdentifier);
            console.log("CLEAN UP");
        };
    }, [emailIsvalid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
        // setFormIsValid(emailState.isValid && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT_PASS", val: event.target.value });
        // setFormIsValid(emailState.isValid && passwordState.isValid);
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR_PASS" });
    };

    const ctx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) ctx.onLogIn(emailState.value, passwordState.value);
        else if (!emailIsvalid) emailRef.current.activate();
        else passRef.current.activate();
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailRef}
                    type="email"
                    id="email"
                    label="E-mail"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    isValid={emailIsvalid}
                />

                <Input
                    ref={passRef}
                    type="password"
                    id="password"
                    label="Password"
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    isValid={passwordIsValid}
                />

                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
