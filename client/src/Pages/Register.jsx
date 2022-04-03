import '../App.css';
import { useState,useRef } from "react";
import { useHistory } from 'react-router-dom';

function Register() {

  const history = useHistory();

  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [quote, setquote] = useState(null)

  const response_area = useRef(null);
  async function register_user(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        quote: quote
      })
    }).catch((e) => {
      console.log(e);
    })
    const data = await response.json();
    console.log(data);
    if(data.status === "ok"){
      localStorage.setItem('auth_token',data.token);
      history.push("/dashboard");
    }
    else{
      response_area.current.innerHTML = data.status;
      response_area.current.style.fontWeight = "bold";
    }
        
  }

  return (
    <div>
      <form onSubmit={register_user}>
        <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)} data-testid="name"/>
        <br />
        <input type="text" placeholder="email" onChange={(e) => setemail(e.target.value)} data-testid="email"/>
        <br />
        <input type="text" placeholder="password" onChange={(e) => setpassword(e.target.value)} data-testid="password"/>
        <br />
        <input type="text" placeholder="quote" onChange={(e) => setquote(e.target.value)} data-testid="quote"/>
        <br />
        <button type="submit" data-testid="submit">submit</button>
      </form>
      <h1>Response</h1>
      <hr />
      <p ref={response_area}></p>
    </div>
  );
}

export default Register;
