import React from 'react';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup'
// import Weather from './comp/Weather';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      err: '',
      searchQuery: '',
      disErr: false,
      disMap: false,
      maplink: '',
      WeatherData: [],
      disweather: false,
      descriptionWeather: '',
      dateWeather: ''
    }
  }

  getloc = async (event) => {
    event.preventDefault();
    let city = event.target.cityname.value;
    // console.log(url,city)
    try {
      let url = `https://eu1.locationiq.com/v1/search.php?key=pk.69fbe9b91e039f3c21705cb4442c99ef&q=${city}&format=json`
      let result = await axios.get(url);
      console.log(result.data[0]);

      this.setState({
        locData: result.data[0],
        disMap: true,
        disErr: false,

        searchQuery: city,
      })

    }
    catch {
      this.setState({
        locData: '',
        err: 'This is a bad response Error 404, your input could be the reason',
        disErr: true,
        disMap: false,

        weatherData: [],
      })

    }
    this.getweather();
  }
  getweather = async () => {
    try {
      let serverRoot = process.env.REACT_APP_SERVER;
      let newURL = `${serverRoot}/weather?cityname=${this.state.searchQuery}`;
      let renderWeather = await axios.get(newURL);
      this.setState({

        weatherData: renderWeather.data,
        disweather: true,
        diswErr: false,

      })
      console.log(this.state.weatherData);
    }
    catch {
      this.setState({
        err: 'This is a bad response Error 404',
        disErr: true,
        disweather: false,


      })
    }

  }
  render() {
    return (
      <div>
        <h1> Hello from React Axios app </h1>
        <h2>Enter the city you would like to get the data from </h2>
        <form onSubmit={this.getloc}>
          <input type='text' placeholder='cityname' name='cityname' />
          <input type='submit' value='Search' />
        </form>

        <h3>City is : {this.state.locData.display_name}</h3>
        {/* <h2>Icon : {this.state.locData.icon}</h2> */}
        <h3>lat is : {this.state.locData.lat}</h3>
        <h3>long is : {this.state.locData.lon}</h3>
        <p>{this.state.disErr && this.state.err}</p>

        {this.state.disweather &&
          this.state.weatherData.map(value => {
            return (<p>
              {value.date}
              <br />
              {value.description}
            </p>
            )
          })
        }

        {this.state.disMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.69fbe9b91e039f3c21705cb4442c99ef&center=${this.state.locData.lat},${this.state.locData.lon}`} alt='map' />}

      </div>
    )
  }
}
export default App;

// console.log(city);
// console.log(url) 
// console.log(Result.data[0].lat);
// console.log(Result.data[0].lon);
// console.log(Result.data[0]);
// let serverRoot=process.env.REACT_APP_SERVER || 3000;
// const weatherurl=`https://eu1.locationiq.com/v1/search.php?key=pk.69fbe9b91e039f3c21705cb4442c99ef&q=${city}&format=json`
// //`https://class-7-city-explorer.herokuapp.com/weather?cityname=${this.state.}`;
// const weatherDaily= await axios.get(weatherurl);


// getlocresult=async()=>{


//  let url=`https://eu1.locationiq.com/v1/search.php?key=pk.69fbe9b91e039f3c21705cb4442c99ef&q=amman&format=json`
//   // console.log(url,city)

//   let Result=await axios.get(url) ;
//   console.log(Result.data);
//   this.setState({
//     locData:Result.data[0]
//   })
// }

{/* <p>{this.props.weatherData.date}</p>
                        <p>{this.props.weatherData.description}</p> */}
{/* <Weather weather={this.state.weatherData}/>  */ }

{/* <img src={'https://maps.locationiq.com/v3/staticmap?key=pk.69fbe9b91e039f3c21705cb4442c99ef&center=31.9515694,35.9239625'} alt='map'/> */ }
{/* <Weather weatherData={this.state.weatherData} />
          {  */}
// eslint-disable-next-line no-lone-blocks
{/* <form onSubmit={this.getloc}>
       <input type='text' placeholder='City Name' name='cityName'/>
       <input type='submit' value='Search'/>
      </form > */}
{/* <button onClick={this.getlocresult}>This will show data realted to Amman only </button> */ }

