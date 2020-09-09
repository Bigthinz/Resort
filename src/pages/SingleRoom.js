import React, { Component } from 'react'
import Hero from '../components/Hero'
import DefaultBcg from '../images/defaultBcg.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../Context'

export default class SingleRoom extends Component {
    constructor(props){
        super(props)
        // console.log(prop)
    this.state= {
        slug:this.props.match.params.slug,
        DefaultBcg

        }
    }

    static contextType = RoomContext

    render() {

        const {getRoom} = this.context
        const room = getRoom(this.state.slug)

        if(!room){
            return <div className='error'>
                <h3>No such room available</h3>
                <Link to='/rooms' className='btn-primary'>back to rooms</Link>
            </div>  
        }

        const {name,description, capacity, size , price, extras, breakfast, pest, images} = room

        return (
         
            <Hero hero='roomsHero'>
                <Banner title={`${name} rooms`}>
                    <Link to='/rooms' className='btn-primary'>back to rooms</Link>
                </Banner>
            </Hero>
            
        )
    }
}
