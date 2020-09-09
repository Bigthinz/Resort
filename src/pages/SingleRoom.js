import React, { Component } from 'react'
import Hero from '../components/Hero'
import DefaultBcg from '../images/defaultBcg.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../Context'
import StyledHero from '../components/StyledHero'

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

        const domImg =images.slice(1,4)

        return (
            <>
            <StyledHero img={images[0] || this.state.DefaultBcg}>
                <Banner title={`${name} rooms`}>
                    <Link to='/rooms' className='btn-primary'>back to rooms</Link>
                </Banner>
            </StyledHero>

            <section className='single-room'>
                <div className='single-room-images'>
                    {images.map((image,index)=>(
                    <img key={index} src={image} alt={name}/>
                    ))}
                </div>

            </section>
            </>
            
        )
    }
}
