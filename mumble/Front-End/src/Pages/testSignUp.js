import { useEffect, useState } from "react";
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function SignUp (){
    const [ users, setUsers ] = useState({});
    const [ newUser, setNewUser ] = useState({ Username: '', Password: '' });


    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
            const response = await axios.post(`${API_URL}/add-user`, newUser);
            setUsers([...users, response.data]);
            setNewUser({ Username: '', Password: ''});

        } catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        axios.get(`${API_URL}/users`)
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
    })
    return (
        <div className='signUp-Container'>
            <form>
                <input
                    type="text"
                    name="Username"
                    placeholder="Username"
                    autoComplete="username"
                    value={newUser.Username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={newUser.Password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" onSubmit={handleSubmit} >Submit</button>
            </form>
        </div>
    );
}

export default SignUp;