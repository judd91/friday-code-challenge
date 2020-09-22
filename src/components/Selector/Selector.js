import React, { useState, useContext } from "react"
import styles from './Selector.module.css';
import { DataContext } from '../data-service-context'



const Selector = (props) => {
    let context = useContext(DataContext);
    const completeMakesData = context.state.makes
    //Manage dropdown
    const [isOpen, setOpen] = useState(false);
    //Selections
    const [makeSel, setMake] = useState("Select Make..")
    //Show models
    const [isModels, setModels] = useState(false)
    const [isOpenModels, setOpensModels] = useState(false)
    const [modelSelection, setModel] = useState("Select Model..")

    const [isFilters, setFilters] = useState(false)
    const [isOpenFilters, setOpenFilters] = useState(false)


    var [datashowed, setDatashowed] = useState(completeMakesData);
    var [dataModelshowed, setDataModelshowed] = useState();
    var [allDataModelshowed, setallDataModelshowed] = useState(dataModelshowed);


    // const [vehicles, setVehicles] = useState(null)

    
    async function runFetch(make, model) {
        var p = make.toLowerCase()

        if (model == null) {
            // context.updateValue("loading", true)
            const url = "http://localhost:8080/api/models?make=" + p
            console.log("url makes", url)

            fetch(url).then(async response => {

                if (!response.ok) {
                    throw await response

                    // const error = {
                    //     type: 'Error',
                    //     message: response.message || 'Something went wrong',
                    //     data: response.status || '',
                    //     code: response.statusText || '',
                    //   };
                    // console.log("e", error)
                    // context.updateValue("errorMessage", response.message )
                    // throw new Error('Something went wrong', error )
                    // return Promise.reject(error);
                }
                const data = await response.json();
                if( data.length != 0 ) {
                    context.updateValue("models", data)
                    setDataModelshowed(data)
                    setallDataModelshowed(data)
    
                    
                    context.updateValue("loading", false)
                }
               

               
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() })
                console.error('There was an error!', error.status, " ", error.statusText)
                const message = [error.statusText, error.status ]
                context.updateValue("errorMessage", message )

            });

            } else if( model != null && dataModelshowed ){
                // context.updateValue("loading", true)

            const url = "http://localhost:8080/api/vehicles?make=" + model.toLowerCase() + "&model=" + p
            console.log("url models", url)

            fetch(url).then(async response => {
                const data = await response.json();
                console.log(response.status)
                if (!response.ok) {
                    throw await response
                    // const error = (data && data.message) || response.statusText;
                    // return Promise.reject(error);
                }
                if( data.length != 0 ) {
                    console.log("data hm", data, data.length)
                    context.updateValue("vehicles", data)
                    context.updateValue("vehiclesToShow", data.slice(0,10))
                }
                context.updateValue("loading", false)
            }
    //         , error => {
    //             this.setState({ errorMessage: error.toString() })
    //             console.error('There was an error2!', error)
    //    })
            ).catch( error => {
                    // this.setState({ errorMessage: error })
                    console.error('There was an error!', error)
                    console.log(error)
                    const message = [error.statusText, error.status ]
                    context.updateValue("errorMessage", message )
            });
        } 
    }

    function selectMake(item) {
        setOpen(!isOpen)
        setMake(item)
        setModels(true)
        setDatashowed(completeMakesData)
        context.state.makeselection = item
        runFetch(item, null)
        setModel("Select Model..")
        context.updateValue("vehicles", null)
        setDataModelshowed(null)
        setOpensModels(false)
        context.updateValue("errorMessage", null )
        context.updateValue("vehiclesToShow", null)

    }

    function selectModel(item1, item2) {
        setDataModelshowed(allDataModelshowed)
        setOpensModels(!isOpenModels)
        setModel(item1)
        runFetch(item1, item2)
        context.updateValue("vehicles", null)
        // setOpenFilters(true)
        setFilters(true)
        // context.updateValue("loading", true)
        context.updateValue("vehiclesToShow", null)
        context.updateValue("errorMessage", null )

    }

    function handleChange(e, value) {
        if (value == "make") {
            datashowed = completeMakesData.filter(item => {
                return item.indexOf(e.target.value.toUpperCase()) != -1;
            });
            setDatashowed(datashowed)
        }
        else if (value == "model") {
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
                    <button className={styles.selectbox1} onClick={() => setOpensModels(!isOpenModels)}>{ modelSelection }</button> : <div></div>
                }
                {isOpenModels ?
                    <div id="myDropdown" className={styles.optionscontainer}>
                        <input
                            className={styles.makessearchbar}
                            placeholder="- Search -"
                            onChange={(event) => handleChange(event, "model")}
                        />
                        { dataModelshowed ? dataModelshowed.map((item) =>
                            <div className={styles.option} key={item} onClick={() => selectModel(item.toUpperCase(), makeSel)}>
                                {item.toUpperCase()}
                            </div>
                        ) : <p>No Models found</p>
                        }
                     </div> : <div></div>}
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