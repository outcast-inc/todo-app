import { Waypoints } from 'lucide-react'
import React from 'react'
import UserOptions from './dropdowns/UserOptions'

const HeaderIcon = () => {
  return (
    <div className="px-4 py-2 mb-4">
        <div className='flex justify-between items-center'>
            <div className='flex space-x-4'>
                <div className='bg-black rounded-lg p-2'>
                    <Waypoints 
                        className='h-8 w-8 text-white'
                    />
                </div>
                <div>
                    <h1 className='font-bold text-xl'>Planner</h1>
                    <span className='font-semibold text-gray-500 text-md'>User Name</span>
                </div>
            </div>
            <UserOptions />
        </div>
    </div>
  )
}

export default HeaderIcon