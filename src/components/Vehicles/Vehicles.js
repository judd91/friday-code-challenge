import React, { useState, useContext, useRef, useEffect } from "react"
import styles from './Vehicles.module.css';
import { DataContext } from '../data-service-context'

const Vehicles = (props) => {
    let context = useContext(DataContext);
    const postsPerPage = 10
    const [start, setStart] = useState(10)
    const [currentNumberOfVehicles, setcurrentNumberOfVehicles] = useState(postsPerPage)
    let arrayForHoldingPosts = []

    const handleShowMorePosts = (start) => {
        // console.log("vehicles", context.state.vehicles)
        const slicedPosts = context.state.vehicles.slice(start, start + postsPerPage)
        // console.log("slicedPosts", slicedPosts)
        // console.log("context.state.vehiclesToShow", context.state.vehiclesToShow)
        arrayForHoldingPosts = context.state.vehiclesToShow.concat(slicedPosts)
        setStart(start + postsPerPage)
        setcurrentNumberOfVehicles(arrayForHoldingPosts.length)
        context.updateValue("vehiclesToShow", arrayForHoldingPosts)
    }

    const handleScrollTop = () => {
        document.getElementById("maincontainer").scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <DataContext.Consumer>{context => (
            <div className={styles.vehicleContainer}>
                {/* <p>Vehicles: {context.state.vehicles[0].make} {context.state.vehicles[0].model.toUpperCase()}</p> */}
                <div className={styles.row}>
                    {context.state.loading || context.state.errorMessage ? (
                        <div className={styles.errorAlert}>
                            {
                                context.state.loading ? <div>Loading...</div> :
                                    <div>
                                        <div className={styles.errorAlert1}><b>ERROR! </b></div>
                                        <div className={styles.errorAlert2}> Something went wrong! :( </div>
                                        <div className={styles.errorAlert3}>
                                            Code: {context.state.errorMessage[1]}
                                            ,
                                            Error: {context.state.errorMessage[0]}
                                        </div>
                                        {/* { 
                                        alert("Something went wrong! :( Code:" +
                                        context.state.errorMessage[1] +
                                        "Error:" + context.state.errorMessage[0])
                                      } */}
                                    </div>
                            }
                        </div>

                    ) : <div>
                            {context.state.vehiclesToShow ?
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
                                            <div><button>Select</button></div>
                                        </div>
                                    )
                                    }
                                </div> : <div></div>
                            } 

                            </div>
                    }
                </div>
                <div>
                    {context.state.vehicles ?
                        <div className={styles.btnContainer}>
                            <p>Showing {currentNumberOfVehicles} of {context.state.vehicles.length} vehicles</p>
                            <button className={styles.btnMore} onClick={() => handleShowMorePosts(start)}>
                                <span className={styles.plusicon}>+</span>
                                <span className={styles.buttonText}>Show more</span>
                            </button>
                                              <div className={styles.btnGoTop} onClick={() => handleScrollTop()} ><i className={styles.arrowUp}> </i>
                                              </div>
                    
                        </div>
                        : <div></div>
                    }
                </div>
            </div>

        )}
        </DataContext.Consumer>
    )
}


Vehicles.propTypes = {};

Vehicles.defaultProps = {};

export default Vehicles;