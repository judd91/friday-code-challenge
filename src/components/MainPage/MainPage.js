import React from "react"
import styles from './MainPage.module.css';
import Description from '../Description/Description'
import Selector from '../Selector/Selector'
import Vehicles from '../Vehicles/Vehicles'

const MainPage = (props) => {
    return (
    
        <div id="maincontainer" className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.row1}>
                        <Description></Description>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles.column1}>
                        <Selector></Selector>
                        </div>
                        <div className={styles.column2}>
                        <Vehicles></Vehicles>
                        </div>
                    </div>
                </div>
        </div>
    )
}

MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;