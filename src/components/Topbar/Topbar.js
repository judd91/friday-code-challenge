import React from "react"
import styles from './Topbar.module.css';


const Topbar = (props) => {
    return (
        <div className={styles.topnav}>
            <h3>Friday Challenge</h3>
        </div>
    )
}

Topbar.propTypes = {};

Topbar.defaultProps = {};

export default Topbar;
