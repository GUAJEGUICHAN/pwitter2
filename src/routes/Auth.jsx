import React, { useState } from 'react';
import { authService } from '../fbInstance';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const onLogIn = async (event) => {
        let provider;
        if (event.currentTarget.textContent === "Google") {
            provider = new authService.GoogleAuthProvider();
        } else if (event.currentTarget.textContent === "Github") {
            provider = new authService.GithubAuthProvider();
        } else {
            console.log("치명적인 오류!")
        }
        await authService.signInWithPopup(authService.getAuth(), provider)
    }

    //이메일 비밀번호 값을 받는다.
    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else {
            console.log("치명적인 오류!")
        }
    }
    //authService.이메일로그인하기 에 넘긴다!
    const onSubmit = (event) => {
        event.preventDefault();
        if (newAccount === true) {
            authService.createUserWithEmailAndPassword(authService.getAuth(), email, password).catch(error => {
                console.log(error);
            })
        } else if (newAccount === false) {
            authService.signInWithEmailAndPassword(authService.getAuth(), email, password).catch(error => {
                console.log(error);
            })
        }

    }

    return (
        <div>
            <div>Auth</div>
            <div>로그인 화면입니다.</div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={onChange}
                    required
                    name="email" />
                <input
                    type="password"
                    placeholder="password"
                    onChange={onChange}
                    required
                    name="password" />
                <input
                    type="submit" value={newAccount ? "Create Account" : "Log In"} />
                <div onClick={() => { setNewAccount(!newAccount) }}>{newAccount ? "Log In" : "Create Account"}</div>
            </form>

            <div>
                <button onClick={onLogIn} >Google</button>
                <button onClick={onLogIn} >Github</button>
            </div>

        </div>
    );
};

export default Auth;