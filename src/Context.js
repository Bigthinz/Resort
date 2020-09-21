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
        pets:false
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


    handleChange = (event)=>{
        // const type = event.target.type
        // const name = event.target.name
        // const value = event.target.value
        // console.log(`this is type: ${type}, this is name: ${name},this is value: ${value}`)


        const target = event.target
        const value = target.type ===  'checkbox' ? target.checked : target.value
        const name = event.target.name
        
        this.setState({
            [name]:value
        },this.filterRoom)
    }

    filterRoom = ()=>{
        let {rooms,type,price, capacity, minSize, maxSize, pets, breakfast} = this.state

        //ALL ROOMS
        let tempRooms = [...rooms]

        //TRANSFORM VALUE
        capacity = parseInt(capacity)
        price = parseInt(price)

        //FILTER BY TYPE
        if(type !== 'all'){
            tempRooms = tempRooms.filter((room)=> room.type === type)
        }

        //FILTER BY CAPACITY
        if(capacity !== 1){
            tempRooms = tempRooms.filter((room)=> room.capacity >= capacity)
        }

        //FILTER BY PRICE
        tempRooms = tempRooms.filter((rooms)=> rooms.price <= price)

        //FILTER BY SIZE
        tempRooms = tempRooms.filter(room=> room.size >= minSize && room.size <= maxSize)

        //FILTER BY BREAKFAST
        if(breakfast){
            tempRooms = tempRooms.filter(room=> room.breakfast === true)
        }

        //FILTER BY PETS
        if(pets){
            tempRooms = tempRooms.filter(room=> room.pets === true)
        }

        //CHANGE STATE
        this.setState({
            sortedRooms :tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom: this.getRoom, handleChange: this.handleChange}}>
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