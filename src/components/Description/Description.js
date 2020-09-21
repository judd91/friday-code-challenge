import React from "react"
import styles from './Description.module.css';


const Description = (props) => {
    return (
    <div className={styles.description}>
        <h4>This is a friday challenge</h4>
        <p>Please, select the make and the model to find your vehicle</p>
    </div>
    )
}

Description.propTypes = {};

Description.defaultProps = {};

export default Description;