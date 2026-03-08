import React, { useState } from 'react';

const UserCard = (props) => {
    const { age, email } = props;
    const [name, setName,] = useState("Vini Daniele")
    const [showingName, showName] = useState(true);
    const resetName = () => { setName("");}

    const showNametoggle = () => {
        showName(!showingName);

    };



    return (
        <div>
            <h3>Hello, {name}!</h3>
            <p>Age: {age} Email: {email}</p>
            <button onClick={showNametoggle}>{showingName ? "Hide Name" : "Show Name"}</button>
            <h4>{showingName ? name : null}</h4>
            <button onClick={resetName}>Reset Name</button>
        </div>
    );
}

export default UserCard;
