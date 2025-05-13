'use client';

import React, { useState } from 'react';

export default function CarPartsPage() {
  return(
    <div className="flex flex-col justify-center items-center h-screen min-h-fit overflow-auto w-screen">
        <div className="w-[40%] min-w-fit">
            <div className="ml-1 mb-2 text-white font-bold text-xl w-auto flex justify-between items-end">
                Car Part Websites
            </div>
            <div className="p-2 bg-[#C4C4C4] rounded-xl w-full h-fit">
                <div className="bg-white rounded-xl py-4 flex flex-col items-center justify-center">
                  <a href="https://shop.advanceautoparts.com/" className='my-3'>Advanced Auto Parts</a>
                  <a href="https://www.autozone.com/" className='mb-3'>Autozone</a>
                  <a href="https://www.carparts.com/" className='mb-3'>CarParts.com</a>
                  <a href="https://www.napaonline.com/" className='mb-3'>NAPA</a>
                  <a href="https://www.oreillyauto.com/" className='mb-3'>O'Reilly Auto Parts</a>
                  <a href="https://www.rockauto.com/" className='mb-3'>RockAuto</a>
                </div>
            </div>
      </div>
    </div>);
}
