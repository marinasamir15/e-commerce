import { createContext, useEffect, useState } from "react";

export let authContext = createContext();

export default function AuthContextProvider(myprops) {


    const [userId, setUserId] = useState(null);

    useEffect(() => {
      
        const localId = localStorage.getItem('id');
        if (localId) {
            setUserId(localId);
        }
    }, []);

    return (
        <authContext.Provider value={{ userId, setUserId }}>
            {myprops.children}
        </authContext.Provider>
    )
}

