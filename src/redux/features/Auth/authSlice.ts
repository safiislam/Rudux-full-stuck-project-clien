import { createSlice } from "@reduxjs/toolkit";


type TUser = {
    email: string
    userId: string
    role: string
    iat: string
    exp: string
}
type TInitialState = {
    user: null | TUser,
    token: null | string
}

const initialState: TInitialState = {
    user: null,
    token: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload
            console.log(user);
            state.user = user
            state.token = token
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    }
})


export const { logOut, setUser } = authSlice.actions
export default authSlice.reducer