import  { useEffect , useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
    const [quote, setquote] = useState(null);
    async function populateQuote(){
        const data = await fetch('http://localhost:1337/api/quote', {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('auth_token')
            }
        })
        const res = await data.json();

        if (res.status === "ok") {
            setquote(res.quote)
            // console.log(quote) it will give null as quote is not set yet as setquote take some time to set the value of quote 
        }
        return res;
    }


    async function updateQuote(){
        const data = await fetch('http://localhost:1337/api/quote', {
            method: 'PUT',
            headers: {
                "x-access-token": localStorage.getItem('auth_token'),
                // needed paramters otherwise undefined will be sent to server
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote: quote
            })
        })
        const res = await data.json();
        if (res.status === "ok") {
            setquote(res.quote)
            alert("Updated!")
            // console.log(quote) it will give null as quote is not set yet as setquote take some time to set the value of quote 
        }
        return res;
    }

    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            // const user = JSON.parse(atob(token.split(".")[1]));
            const user = jwt_decode(token);
            if (!user) {
                localStorage.removeItem("auth_token");
                history.replace("/login")
            }
            else {
                populateQuote();
            }
        }
        else{
            alert("Some thing went wrong and jwt token is not found")
            history.replace("/login")
        }
    }, []);
    return (
        <>
            <h1>Your Quote</h1>
            <p data-testid="updated_quote">{quote || "No quote found"}</p>
            <div>
                <input type="text" placeholder="Enter to update the quote" onChange={(e) => setquote(e.target.value)} data-testid="update_quote_field"/>
                <button type="button" onClick={updateQuote} data-testid="update_quote_button">Update Quote</button>
            </div>
        </>
    )
}

