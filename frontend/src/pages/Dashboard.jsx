import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
function Dashboard() {
  return (
    <>
    <Appbar></Appbar>
    <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </>
  )
}

export default Dashboard