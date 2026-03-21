import { useReducer }  from 'react'

function counterReducer(state, action) {
    switch (action.type) {
        case "increment" :
            return { count: state.count + 1 };
        case "decrement" :
            return { count: state.count - 1 };
        case "reset" :
            return { count: 0 };
        case "double" :
            return {count: state.count * 2 };
        case "square" :
            return {count: state.count * state.count };
        case "squareRoot" :
            return {count: Math.sqrt(state.count) };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({type: "increment"})}
            >Increment</button>

            <button onClick={() => dispatch({type: "decrement"})}
            >Decrement</button>

            <button onClick={() => dispatch({type: "reset"})}
            >Reset</button>

            <button onClick={() => dispatch({type: "double"})}
            >Double</button>

            <button onClick={() => dispatch({type: "square"})}
            >Square</button>

            <button onClick={() => dispatch({type: "squareRoot"})}
            >Square Root</button>
        </div>
    );
}

export default Counter;