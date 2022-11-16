// fais bordel

import React, { createContext, useState } from 'react';

export const UserContext = createContext();


const user = {
    username: "clementD",
    mail: "clem5855895nt.",
}

export const UserProvider = (props) => {
    


    

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
};

