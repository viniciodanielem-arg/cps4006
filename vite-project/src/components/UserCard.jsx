import React from 'react';

const UserCard = (props) => {
    return (
        <div>
            <h3>Hello, {props.name}!</h3>
            <p>Age: {props.age} Email: {props.email}</p>
        </div>
    );
}

export default UserCard;