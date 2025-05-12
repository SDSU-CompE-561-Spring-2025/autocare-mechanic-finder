import UpdateUserForm from "@/components/UpdateUserForm";

export default function UserUpdatePage() {
    return(
        <div className="flex flex-col self-center justify-center items-center h-screen w-screen">
        <div className="p-5 flex flex-col bg-[#C4C4C4] text-black rounded-xl">
            <b className="self-center pb-5 text-xl">Update User Information</b>
            <UpdateUserForm/>
        </div>
        </div>
    )
}
