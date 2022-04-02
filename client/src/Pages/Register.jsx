import '../App.css';
import { useState,useRef } from "react";

function Register() {
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

    response_area.current.innerHTML = data.status
    response_area.current.style.fontWeight = "bold";
        
  }

  return (
    <div>
      <form onSubmit={register_user}>
        <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)} />
        <br />
        <input type="text" placeholder="email" onChange={(e) => setemail(e.target.value)} />
        <br />
        <input type="text" placeholder="password" onChange={(e) => setpassword(e.target.value)} />
        <br />
        <input type="text" placeholder="quote" onChange={(e) => setquote(e.target.value)} />
        <br />
        <button type="submit">submit</button>
      </form>
      <h1>Response</h1>
      <hr />
      <p ref={response_area}></p>
    </div>
  );
}

export default Register;
