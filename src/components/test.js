import React, { useState } from "react";

function Test() {
    const [inputVal, setinputVal] = useState();
    const submitName = () => {
        console.log("it wrks");
    };
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={inputVal}
                    onclick={(e) => setinputVal(e.target.value)}
                />
                <button type="submit" onClick={submitName}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Test;
