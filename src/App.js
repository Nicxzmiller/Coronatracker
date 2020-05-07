import React from "react";
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { Button } from "@material-ui/core";
import  {Alert, AlertTitle}  from '@material-ui/lab';
import { fetchData } from "./api";

import coronaImage from './images/image.png';

class App extends React.Component{

    state = {
        data: {},
        country: '',
};
    async componentDidMount() {
        const fetchedData = await fetchData()
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) =>{
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    };

    render() {
        const {data, country} = this.state;
        return(

            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Alert role="link" severity="warning" >
                    <AlertTitle>COVID-19</AlertTitle>
                    <Button variant="contained" color="secondary" role="link" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"> Advisory Information</Button>
                </Alert> <br/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Button variant="contained" color="Primary" role="link" href="https://covid19responsefund.org/">Donate</Button>
                <Chart  data={data} country={country}/>

            </div>
        )
    }
}

export default App;