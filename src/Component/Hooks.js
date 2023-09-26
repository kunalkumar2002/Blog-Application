import { useState } from "react";

export function useFormInput(initialValue){
    const [value , setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value);
    }

    // after submission reseting input bar to initial value

    

    return {
        value,
        onChange: handleChange, // Corrected the typo in the function name
        
    };
}