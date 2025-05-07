import React from 'react';

export default function CarProfile() {
    return(
        <div>
            
                <div className="box-border w-[80%]"><b className="ml-1 text-black text-xl">Car Name</b></div>
                <div className="flex flex-col px-3 py-3 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[70%] min-h-35">
                    <div className="px-1 pb-2 flex justify-between items-center"><b className="text-lg">Garage</b></div>
                    <div className="bg-white rounded-xl p-40 mb-2 flex-1 overflow-auto">

                    </div>
                </div>
                <footer className= "px-1">
                    <p>Footer content goes here</p>
                </footer>
        </div>
    )
}