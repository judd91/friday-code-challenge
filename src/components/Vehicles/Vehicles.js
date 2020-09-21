import React, { useState, useContext, useRef, useEffect } from "react"
import styles from './Vehicles.module.css';
import { DataContext } from '../data-service-context'

const Vehicles = (props) => { 
    let context = useContext(DataContext);
    const postsPerPage = 10
    const [start, setStart] = useState(10)
    let arrayForHoldingPosts = []
    
    const handleShowMorePosts = (start) => {
        // console.log("vehicles", context.state.vehicles)
        const slicedPosts = context.state.vehicles.slice(start, start + postsPerPage)
        // console.log("slicedPosts", slicedPosts)
        // console.log("context.state.vehiclesToShow", context.state.vehiclesToShow)
        arrayForHoldingPosts = context.state.vehiclesToShow.concat(slicedPosts)
        setStart(start + postsPerPage)
        context.updateValue("vehiclesToShow", arrayForHoldingPosts)
    }

    return (
        <DataContext.Consumer>{context => (
            <div >
                
            {context.state.vehiclesToShow ? 
                    // <p>Vehicles: {context.state.vehicles[0].make} {context.state.vehicles[0].model.toUpperCase()}</p>
                    <div className={styles.vehicleContainer} >
                    <div className={styles.row}>
                        {context.state.vehiclesToShow.map((item, i) =>
                            <div key={i} className={styles.column}>
                                <div className={styles.card} key={item.enginePowerPS} onClick={() => console.log(item)}>
                                    <img src={require('../../assets/car-icon.svg')}></img>
                                    <ul>
                                        <li>Engine Power PS:  {item.enginePowerPS}</li>
                                        <li>Engine Power KW:  {item.enginePowerKW}</li>
                                        <li>Fuel Type: {item.fuelType}</li>
                                        <li>Body Type: {item.bodyType}</li>
                                        <li>Engine Capacity: {item.engineCapacity}</li>
                                    </ul>
                                </div>
                            </div>
                            )                            
                            }
                    </div>
                    <div>
                        <div className={styles.btnContainer}>
                            <button className={styles.btnMore} onClick={()=> handleShowMorePosts(start)}>+</button>
                        </div>
                    </div>
                    </div>
            : <a></a>}
        </div>
        )}
        </DataContext.Consumer>
    )
}


Vehicles.propTypes = {};

Vehicles.defaultProps = {};

export default Vehicles;