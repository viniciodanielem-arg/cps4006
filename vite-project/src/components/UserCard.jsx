import React, { useState } from 'react';

const UserCard = (props) => {
    const { age, email } = props;
    const [name, setName] = useState("Vini Daniele");
    const resetName = () => {
        setName("");
    } 

    return (
        <div>
            <h3>Hello, {name}!</h3>
            <p>Age: {age} Email: {email}</p>
            <button onClick={resetName}>Reset Name</button>
        </div>
    );
}

export default UserCard;
