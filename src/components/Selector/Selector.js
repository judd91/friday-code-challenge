import React, { useState, useContext } from "react"
import styles from './Selector.module.css';
import { DataContext } from '../data-service-context'

const Selector = (props) => {
    let context = useContext(DataContext);
    const completeMakesData = context.state.makes
    /* Manage dropdown */
    const [isOpen, setOpen] = useState(false);
    /* Select Make */
    const [makeSel, setMake] = useState("Select Car Make..")
    /* Show models */
    const [isModels, setModels] = useState(false)
    const [isOpenModels, setOpensModels] = useState(false)
    const [modelSelection, setModel] = useState("Select Model..")

    /* Show Make Options Data */
    var [datashowed, setDatashowed] = useState(completeMakesData);

    /* Show Vehicle Data */
    var [dataModelshowed, setDataModelshowed] = useState();
    var [allDataModelshowed, setallDataModelshowed] = useState(dataModelshowed);

    
    // const [isFilters, setFilters] = useState(false)
    // const [isOpenFilters, setOpenFilters] = useState(false)

    /**
     * runFetch() :
     *  - make API requests given the parameters
     *  - hadle errors
     * @param {*} make 
     * @param {*} model 
     */
    async function runFetch(make, model) {
        var p = make.toLowerCase()

        if (model == null) {
            const url = "http://localhost:8080/api/models?make=" + p
            console.log("url makes", url)

            fetch(url).then(async response => {

                if (!response.ok) {
                    throw await response
                }
                const data = await response.json();
                if (data.length != 0) {
                    context.updateValue("models", data)
                    setDataModelshowed(data)
                    setallDataModelshowed(data)
                    context.updateValue("loading", false)
                }
            })
                .catch(error => {
                    console.error('There was an error!', error.status, " ", error.statusText)
                    const message = [error.statusText, error.status]
                    context.updateValue("errorMessage", message)
                });

        } else if (model != null && dataModelshowed) {

            const url = "http://localhost:8080/api/vehicles?make=" + model.toLowerCase() + "&model=" + p
            console.log("url models", url)

            fetch(url).then(async response => {
                const data = await response.json();
                console.log(response.status)
                if (!response.ok) {
                    throw await response
                }
                if (data.length != 0) {
                    console.log("data hm", data, data.length)
                    context.updateValue("vehicles", data)
                    context.updateValue("vehiclesToShow", data.slice(0, 10))
                }
                context.updateValue("loading", false)
            }
            ).catch(error => {
                console.error('There was an error!', error.status, " ", error.statusText)
                const message = [error.statusText, error.status]
                context.updateValue("errorMessage", message)
            });
        }
    }


   /**
    * selectMake() : 
       - Select Make and get the models from API gieven a car make
    * @param {*} carMake 
    */
    function selectMake(carMake) {
        setOpen(!isOpen)
        setMake(carMake)
        setModels(true)
        setDatashowed(completeMakesData)
        context.state.makeselection = null
        runFetch(carMake, null)
        setModel("Select Model..")
        context.updateValue("vehicles", null)
        setDataModelshowed(null)
        setOpensModels(false)
        context.updateValue("errorMessage", null)
        context.updateValue("vehiclesToShow", null)
    }

   /**
    * selectModel() : 
    *  - Select Model and get the vehicles from API gieven a previous selected car make and model
    * @param {*} carMake 
    * @param {*} model 
    */
    function selectModel(carMake, model) {
        setDataModelshowed(allDataModelshowed)
        setOpensModels(!isOpenModels)
        setModel(carMake)
        runFetch(carMake, model)
        context.updateValue("vehicles", null)
        // setFilters(true)
        context.updateValue("vehiclesToShow", null)
        context.updateValue("errorMessage", null)

    }

    function reset(){
        setOpen(false)
        setMake(null)
        setModels(false)
        setDatashowed(completeMakesData)
        context.state.makeselection = null
        // runFetch(carMake, null)
        setModel("Select Model..")
        setMake("Select Car Make..")
        context.updateValue("vehicles", null)
        setDataModelshowed(null)
        setOpensModels(false)
        // context.updateValue("errorMessage", null)
        context.updateValue("vehiclesToShow", null)
    }

    function handleChange(e, value) {
        if (value == "make") {
            datashowed = completeMakesData.filter(item => {
                return item.indexOf(e.target.value.toUpperCase()) != -1;
            });
            setDatashowed(datashowed)
        }
        else if (value == "model" && allDataModelshowed) {
            datashowed = allDataModelshowed.filter(item => {
                return item.toUpperCase().indexOf(e.target.value.toUpperCase()) != -1;
            });
            setDataModelshowed(datashowed)
        }

    }

    return (
        <DataContext.Consumer>{context => (
            <div className={styles.selectbox}>
                <button className={styles.selectbox1} onClick={() => setOpen(!isOpen)}>{makeSel}</button>
                {isOpen ?
                    <div id="myDropdown" className={styles.optionscontainer} >
                        <input
                            className={styles.makessearchbar}
                            placeholder="- Search -"
                            onChange={(event) => handleChange(event, "make")}
                        />
                        {datashowed.map((item) =>
                            <div className={styles.option} key={item} onClick={() => selectMake(item)}>
                                {item}
                            </div>
                        )
                        }
                    </div> : <div></div>}
                {isModels ?
                    <button className={styles.selectbox1} onClick={() => setOpensModels(!isOpenModels)}>{modelSelection}</button> : <div></div>
                
                }
                {isOpenModels ?
                    <div id="myDropdown" className={styles.optionscontainer}>
                        <input
                            className={styles.makessearchbar}
                            placeholder="- Search -"
                            onChange={(event) => handleChange(event, "model")}
                        />
                        {dataModelshowed ? dataModelshowed.map((item) =>
                            <div className={styles.option} key={item} onClick={() => selectModel(item.toUpperCase(), makeSel)}>
                                {item.toUpperCase()}
                            </div>
                        ) : <p>No Models found</p>
                        }
                    </div> : <div></div>}

                {isModels ?
                    <button className={styles.resetbtn} onClick={() => reset()}>Reset Values</button> : <div></div>
                }
                {/* {isFilters ? <button className={styles.filterbox} onClick={() => setOpenFilters(!isOpenFilters)}> Filters </button> 
                    : <div></div>
                } */}
                {/* {isOpenFilters ?
                    <div id="myDropdown" className={styles.optionscontainer}>
                       
                       <form>
                       <div className={styles.formRow}>
                            <div className={styles.col1}>
                                <label>Engine Power PS:</label>
                            </div>
                            <div className={styles.col2}>
                                <input type="text" id="fname" name="EnginePowerPS" placeholder="Your Engine Power PS ..."/>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <input type="submit" value="Submit"/>
                        </div>
                       </form>
                    </div>  : <div></div>}  */}
            </div>
        )}
        </DataContext.Consumer>
    )
}

Selector.propTypes = {};

Selector.defaultProps = {};

export default Selector;