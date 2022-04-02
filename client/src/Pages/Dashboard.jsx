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
            console.log(quote)
        }
        else{
            setquote("No quote found")
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
    }, []);
    return (
        <>
            <h1>Your Quote</h1>
            <p>{quote}</p>
        </>
    )
}

