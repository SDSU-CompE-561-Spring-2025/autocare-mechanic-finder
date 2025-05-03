export default function UpdateUserForm() {
    return(
        <div className="flex flex-col self-center justify-center items-center bg-zinc-950 h-screen w-screen">
        <div className="flex flex-col justify-center items-center p-5 bg-zinc-800 max-w-xl margin-auto rounded-xl">
        <h1 className="mb-5 text-2xl font-bold text-white">Update User</h1>
        <form>
            <div className="mb-5">
                <label htmlFor="state" className="text-white">US State: (Optional)</label>
                <input  type="text"
                        id="state"
                        name="state"
                        className="bg-slate-300 rounded-md w-full text-black"/>
            </div>
            <div className="peer mb-5 items-center flex flex-row">
                <label htmlFor="update_password" className="text-white">Update Password? (Optional)</label>
                <input  type="checkbox"
                        id="update_password"
                        name="update_password"
                        className="h-4 w-4 ml-3 cursor-pointer hover:accent-red-700 accent-red-500"/>
            </div>
            <div className="mb-5 not-peer-has-checked:hidden">
                <label htmlFor="new_password" className="text-white">New Password: </label>
                <input  type="password"
                        id="new_password"
                        name="new_password"
                        className="bg-slate-200 rounded-md w-full text-black"/>
            </div>
            <div className="mb-5">
                <label htmlFor="current_password" className="text-white">Current Password: </label>
                <input  type="password"
                        id="current_password"
                        name="current_password"
                        className="bg-slate-200 rounded-md w-full text-black"/>
            </div>
            <div className="flex justify-between w-full">
                <button type="submit"
                        className="py-3.5 px-10 bg-red-500 rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-red-400">
                        Update</button>
                <button className="py-3.5 px-10 bg-slate-500 rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-slate-400">
                        Cancel</button>
            </div>
        </form>
        </div>
        </div>
    )
}
