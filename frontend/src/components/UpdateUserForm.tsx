export default function UpdateUserForm() {
    return(
        <div className="flex flex-col self-center justify-center items-center bg-zinc-950 h-screen w-screen">
        <div className="flex flex-col justify-center items-center p-5 bg-zinc-800 max-w-xl margin-auto rounded-xl">
        <h1 className="mb-5 text-2xl font-bold">Update User</h1>
        <form>
            <div className="mb-5">
                <label htmlFor="state">US State: (Optional)</label>
                <input  type="text"
                        id="state"
                        name="state"
                        className="bg-slate-200 rounded-md w-full text-black"/>
            </div>
            <div className="mb-5 items-center flex flex-row">
                <label htmlFor="update_password">Update Password? (Optional)</label>
                <input  type="checkbox"
                        id="update_password"
                        name="update_password"
                        className="h-4 w-4 ml-3 cursor-pointer accent-red-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="new_password">New Password: </label>
                <input  type="password"
                        id="new_password"
                        name="new_password"
                        className="bg-slate-200 rounded-md w-full text-black"/>
            </div>
            <div className="mb-5">
                <label htmlFor="current_password">Current Password: </label>
                <input  type="password"
                        id="current_password"
                        name="current_password"
                        className="bg-slate-200 rounded-md w-full text-black"/>
            </div>
            <div className="text-center w-full">
                <button type="submit"
                        className="py-3.5 px-10 bg-red-500 rounded-xl cursor-pointer text-xl font-bold">
                        Update</button>
                <button type="submit"
                        className="py-3.5 px-10 ml-6 bg-slate-500 rounded-xl cursor-pointer text-xl font-bold">
                        Cancel</button>
            </div>
        </form>
        </div>
        </div>
    )
}
