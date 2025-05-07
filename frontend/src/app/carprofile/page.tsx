import React from 'react';

export default function Dashboard() {
    return(
        <div>
            
                <div className="box-border w-[80%]"><b className="ml-1 text-black text-xl">Car Name</b></div>
                <div className="flex flex-col px-3 py-2 mt-1 mb-3 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[20%] min-h-21">
                    <div className="px-1 pb-1 h-fit"><b>Notifications</b></div>
                    <div className="bg-white rounded-xl p-2 mb-1 flex-1 overflow-auto">
                        
                    </div>
                </div>
                <div className="flex flex-col px-3 py-2 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[70%] min-h-35">
                    <div className="px-1 pb-2 flex justify-between items-center"><b className="text-lg">Garage</b></div>
                    <div className="bg-white rounded-xl p-5 mb-1 flex-1 overflow-auto">
                        
                    </div>
                </div>
        </div>
    )
}