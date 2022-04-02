import '../App.css';
import { useState,useRef } from "react";
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory()
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const response_area = useRef(null);
    async function register_user(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).catch((e) => {
            console.log(e);
        })
        const data = await response.json();
        if(data.token){
            localStorage.setItem('auth_token',data.token);
            history.replace("/dashboard");
        }
        console.log(data);        
    }

    return (
        <div>
            <form onSubmit={register_user}>
                <input type="text" placeholder="email" onChange={(e) => setemail(e.target.value)} />
                <br />
                <input type="text" placeholder="password" onChange={(e) => setpassword(e.target.value)} />
                <br />
                <button type="submit">submit</button>
            </form>
            <h1>Response</h1>
            <hr />
            <p ref={response_area}></p>
        </div>
    );
}

export default Login;
