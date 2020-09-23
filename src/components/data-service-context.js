import React, { Component } from "react";

export const DataContext = React.createContext();

export default class DataContextProvider extends Component {
    state = {
        loading: true,
        makes: null,
        models: null,
        vehicles: null,
        errorMessage: null,
        vehiclesToShow: null
    }

    /**
     * Make first data car model load 
     */
    async componentDidMount() {
        try {

            const url = "http://localhost:8080/api/makes";
            const response = await fetch(url);
            if (!response.ok) {
                throw await response
            }
            const data = await response.json();

            this.setState({ makes: data, loading: false })
        } catch (error) {
            this.setState({ makes: null, loading: false })
            this.setState({ errorMessage: [error.statusText, error.status] });
        }
    }

    updateValue = (key, val) => {
        this.setState({ [key]: val });
    }

    render() {
        return (
            <div>
                {!this.state.makes || this.state.loading ? (
                    <div>Loading...</div>
                ) : (
                        <DataContext.Provider value={{ state: this.state, updateValue: this.updateValue }}>
                            {this.props.children}
                        </DataContext.Provider>)}
                {
                    this.state.errorMessage ? (
                        <div style={{ color: "red" }}>
                            <div style={{ color: "red" }}><b>ERROR! </b></div>
                            <div> Something went wrong! :( </div>
                            <div>
                                Code: {this.state.errorMessage[1]},
                                Error: {this.state.errorMessage[0]}
                            </div>
                        </div>

                    ) : <a></a>
                }
            </div>
        )

    }
}
