import UpdateUserForm from "@/components/UpdateUserForm";

export default function UserUpdatePage() {
    return(
        <div className="flex flex-col self-center justify-center items-center bg-zinc-950 h-screen w-screen">
        <div className="p-5 flex flex-col bg-zinc-800 text-white rounded-xl">
            <b className="self-center pb-5 text-xl">Update User Information</b>
            <UpdateUserForm/>
        </div>
        </div>
    )
}
