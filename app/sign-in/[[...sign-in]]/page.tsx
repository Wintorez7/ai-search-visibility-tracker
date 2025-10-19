import { SignIn } from "@clerk/nextjs"


export default function Signin(){
    return (
        <div className="w-full h-full flex p-8 mt-5 justify-center items-center">
            <SignIn/>
        </div>
    )
}
