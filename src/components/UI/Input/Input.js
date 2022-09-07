import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";
// ref is like a props that can directly access as parameter
// this is like giving dynamic focus of the input field
// ref is forward from the calling component
const Input = React.forwardRef((props, ref) => {
    const { label, type, id, val, onChange, onBlur, isValid } = props;
    const userInputRef = useRef();
    const activate = () => {
        userInputRef.current.focus();
    };
    // this is to access method from this method to the parent
    // see login.js how this is being handled
    // most uses in focusing, scrolls
    useImperativeHandle(ref, () => {
        return {
            activate,
        };
    });
    return (
        <div
            className={`${classes.control} ${
                isValid === false ? classes.invalid : ""
            }`}
        >
            <label>{label}</label>
            <input
                ref={userInputRef}
                type={type}
                id={id}
                value={val}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
});
export default Input;
