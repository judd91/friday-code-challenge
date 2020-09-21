import React, { Component } from "react";

// const { Provider, Consumer } = React.createContext();

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

    componentDidMount(){
        const url = "http://localhost:8080/api/makes";
        fetch(url).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            this.setState({makes: data, loading: false})
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

    }
    updateValue = (key, val) => {
        this.setState({[key]: val});
     }

    render() {
        return ( 
            <div>
                { !this.state.makes || this.state.loading ? (
                    <div>Loading...</div> 
                ) : (
                // <DataContext.Provider value={{makes: this.state.makes, makeselection: this.state.makeselection, vehicles: this.state.vehicles}}>
                <DataContext.Provider value={{state: this.state, updateValue: this.updateValue }}>
                {this.props.children}
                </DataContext.Provider>)}
                {
                    this.state.errorMessage ? (
                        <div>{this.state.errorMessage}</div>
                    ) : <a></a>
                }
            </div>
            )
        
      }
}

// export { DataContextProvider, Consumer as DataContextConsumer };
// export { DataContext }
// export default { DataContextProvider }