import UpdateCarForm from "@/components/UpdateCarForm";
import NavigationSidebar from "@/components/NavigationSidebar";

export default function CarUpdatePage() {
    return(
        <div className="flex flex-col self-center justify-center items-center h-screen w-screen bg-[url('/images/RoadSurface.jpg')] bg-cover bg-repeat bg-size-[30%]">
            <div className="p-5 flex flex-col bg-[#C4C4C4] text-black rounded-xl">
                <b className="self-center pb-5 text-xl">Update Car Information</b>
                <UpdateCarForm/>
            </div>
        </div>
    )
}
