import React, { useState } from 'react';

const UserCard = (props) => {
    const { age, email } = props;
    const [name, setName] = useState("Vini Daniele"); // ✅ top level of the component

    return (
        <div>
            <h3>Hello, {name}!</h3>
            <p>Age: {age} Email: {email}</p>
        </div>
    );
}

export default UserCard;
