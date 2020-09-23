import React, { useState } from "react"
import styles from './Footer.module.css';


const Footer = (props) => {
    const [isActive, setActive] = useState(false)

    /*  Collapsible About button */
    const handleAboutBtn = () => {
        setActive(!isActive)
    }

    return (
        <div className={styles.footer}>
            {isActive ?
                <div className={styles.aboutcontent}>
                    <div className={styles.aboutContent}>
                        <i className={styles.arrowCollapse} onClick={() => handleAboutBtn()} > </i>
                        <h6>Created by Judit</h6>
                    </div>
                </div> : <div></div>
            }
            <h5 className={styles.btnAbout} onClick={() => handleAboutBtn()}>About </h5>
        </div>
    )
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
