"use client"

import { signOut, signIn, useSession } from "next-auth/react"
import Button from "./Button"

const SignIn = () => {

    const { data : session} = useSession()
    if(session && session.user){
        return(
            <>
                <Button
                 onClick={() => signOut()}
                 >Logout</Button>
            </>
        )
    }
  return (
    <Button
    ClassName="w-5/6 px-4 py-3 font-bold text-center"
    onClick={() => signIn()}
    >Sign In with Google</Button>
  )
}
export default SignIn