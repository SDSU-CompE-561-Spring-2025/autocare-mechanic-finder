import UserNotifications from "@/components/UserNotifications";
import UserGarage from "@/components/UserGarage";
import AddCarButton from "@/components/AddCarButton";

export default function Dashboard() {
    return(
        <div>
            <div className="flex flex-col justify-center items-center h-screen w-screen bg-[url('/images/RoadSurface.jpg')] bg-cover bg-repeat bg-size-[30%] min-h-fit overflow-auto min-w-105">
                <div className="box-border w-[80%]"><b className="ml-1 text-white text-xl">User Dashboard</b></div>
                <div className="flex flex-col px-3 py-2 mt-1 mb-3 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[20%] min-h-21">
                    <div className="px-1 pb-1 h-fit"><b>Notifications</b></div>
                    <div className="bg-white rounded-xl p-2 mb-1 flex-1 overflow-auto">
                        <UserNotifications/>
                    </div>
                </div>
                <div className="flex flex-col px-3 py-2 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[40%] min-h-35">
                    <div className="px-1 pb-2 flex justify-between items-center"><b className="text-lg">Garage</b><AddCarButton/></div>
                    <div className="bg-white rounded-xl p-5 mb-1 flex-1 overflow-auto">
                        <UserGarage/>
                    </div>
                </div>
            </div>
        </div>
    )
}
