import React from 'react'
import RoomList from './RoomList'
import RoomFilter from './RoomFilter'
import {WithRoomConsumer} from '../Context'
import Loading from './Loading'

function RoomConsumer({context}){
    const {loading, sortedRooms, rooms} = context

    if(loading){
        return <Loading/>
    }
    return(                  
        <>  
            <RoomFilter rooms={rooms}/>
            <RoomList rooms={sortedRooms}/>
        </>
    )

}


export default WithRoomConsumer(RoomConsumer)









// import React from 'react'
// import RoomList from './RoomList'
// import RoomFilter from './RoomFilter'
// import {RoomConsumer} from '../Context'
// import Loading from './Loading'

// export default function RoomContainer() {
//     return (

//     <RoomConsumer>
//         {
//             (value)=>{
//                 const {loading, sortedRooms, rooms} = value

//                 if(loading){
//                     return <Loading/>
//                 }

//                 return(
                                
//                 <div>
//                 hello form room RoomContainer
//                 <RoomFilter rooms={rooms}/>
//                 <RoomList rooms={sortedRooms}/>
//                 </div>
//                 )
//             }
//         }
//     </RoomConsumer>

//     )
// }
