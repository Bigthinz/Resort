import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Services extends Component {
    state = {
        services:[
            {
                icon:<FaCocktail/>,
                title: 'free Cocktail',
                info: "Here comes the boy from the village. He likes to talk more over thing."    
            },
            {
                icon:<FaHiking/>,
                title: 'unlimited Hiking',
                info: "Here comes the boy from the village. He likes to talk more over thing."    
            },
            {
                icon:<FaShuttleVan/>,
                title: 'Ride any where',
                info: "Here comes the boy from the village. He likes to talk more over thing."    
            },
            {
                icon:<FaBeer/>,
                title: 'Drink fullest',
                info: "Here comes the boy from the village. He likes to talk more over thing."    
            }
        ]
    } 

    render() {
        return (
            <div className="services">
                <Title title="services"/>
                <div className="services-center">
                    {this.state.services.map((item, index)=>{
                        return(
                            <article key={index} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        )
                    })}
                </div>
                 
            </div>
        )
    }
}
