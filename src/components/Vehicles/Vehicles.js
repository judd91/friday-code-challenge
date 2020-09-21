import React, { useState, useContext } from "react"
import styles from './Vehicles.module.css';
import { DataContext } from '../data-service-context'

const Vehicles = (props) => { 
    let context = useContext(DataContext);
    return (
        <DataContext.Consumer>{context => (
            
            <div >
            {context.state.vehicles ? 
                    // <p>Vehicles: {context.state.vehicles[0].make} {context.state.vehicles[0].model.toUpperCase()}</p>
                    <div className={styles.row}>
                        {context.state.vehicles.map((item) =>
                            <div className={styles.column}>
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
            
            : <a></a>}
        </div>
        )}
        </DataContext.Consumer>
    )
}


Vehicles.propTypes = {};

Vehicles.defaultProps = {};

export default Vehicles;