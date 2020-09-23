import React, { useState, useContext, useRef, useEffect } from "react"
import styles from './Error.module.css';
import { DataContext } from '../data-service-context'

const Error = (props) => {
    let context = useContext(DataContext);
    return (
        <div className={styles.errorAlert}>
            {
                context.state.loading ? <div>Loading...</div> :
                    <div>
                        <div className={styles.errorAlert1}><b>ERROR! </b></div>
                        <div className={styles.errorAlert2}> Something went wrong! :( </div>
                        <div className={styles.errorAlert3}>
                            Code: {context.state.errorMessage[1]},
                            Error: {context.state.errorMessage[0]}
                        </div>
                    </div>
            }
        </div>
    )

}


Error.propTypes = {};

Error.defaultProps = {};

export default Error;