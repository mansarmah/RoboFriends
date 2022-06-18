import React from "react";

const Scroll = (props) => {
    return (
        <div style={{ overflowY: 'scroll', height: '500px'}}>
            {/* above code shows to add css styling in jsx */}
            {props.children}
        </div>
    );
    //props.children wraps the objects available inside its tags
};

export default Scroll;