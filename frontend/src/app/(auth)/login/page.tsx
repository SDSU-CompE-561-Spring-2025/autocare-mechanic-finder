import Login from "@/components/Login"

export default function SignInPage() {
	return (
		<div className="flex flex-col self-center justify-center items-center h-screen w-screen">
			<div className="p-5 flex flex-col justify-evenly bg-[#C4C4C4] text-black rounded-xl min-w-75 w-22/100 min-h-120 2xl:min-h-105 h-1/3 ">
				<b className="self-center pb-5 text-3xl">Sign In</b>
				<Login/>
			</div>
		</div>
	);
}