import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {

    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms: [],
        loading: true,
        type:'all',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pet:false
    }

    getRoom = (slug)=>{
        const tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room)=> room.slug === slug)

        return room
    }

    //Get Data

    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map((item)=> item.price))
        let maxSize = Math.max(...rooms.map((item)=> item.size))
        
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false,
            price: maxPrice,
            maxPrice,
            maxSize
        })

        
        
    }

    formatData(items){
        let tempItem = items.map((item)=>{
            let id = item.sys.id
            let images = item.fields.images.map((images)=>{
                return images.fields.file.url
            })
            let rooms = {...item.fields,images,id}
            
            return rooms
        })
        return tempItem
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom: this.getRoom}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

export function WithRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return( 
        <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
        )
    } 
}

export {RoomProvider, RoomConsumer, RoomContext }