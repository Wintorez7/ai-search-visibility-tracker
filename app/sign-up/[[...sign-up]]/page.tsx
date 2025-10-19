import { SignUp } from "@clerk/nextjs"


export default function Signup(){
    return (
        <div className="w-full h-full flex p-5 mt-2 justify-center items-center">
            <SignUp/>
        </div>
    )
}
