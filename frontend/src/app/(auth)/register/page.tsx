import RegisterForm from "@/components/Register";

export default function Register() {
    return (
        <div className="flex flex-col self-center justify-center items-center h-screen w-screen">
            <div className="p-5 flex flex-col justify-evenly bg-[#C4C4C4] text-black rounded-xl min-w-75 w-22/100 min-h-120 2xl:min-h-fit h-1/3 ">
                <b className="self-center pb-5 text-3xl ">Register</b>
                <RegisterForm/>
            </div>
        </div>
    );
}
