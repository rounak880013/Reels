import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithGoogle, auth } from "../firebase";
import { authContext } from "../AuthProvider";
let Login=()=>{
    let user = useContext(authContext);
    return (
        <div>
        <button
            onClick={() => {
                console.log("qwert");
                signInWithGoogle();
            }}
            className="btn btn-primary m-4"
        >
            Login With Google
        </button>

        <button onClick={()=>{
            auth.signOut();
        }}>
            Logout;
        </button>
        </div>
    );
};
export default Login;