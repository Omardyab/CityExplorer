import React from 'react'
import axios from 'axios'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      locData:'',
      err:'',
      disErr: false,
      disMap: false, 
    }
  }
 
  getlocresult=async()=>{
 
   let url=`https://eu1.locationiq.com/v1/search.php?key=pk.69fbe9b91e039f3c21705cb4442c99ef&q=amman&format=json`
    // console.log(url,city)
    
    let Result=await axios.get(url) ;
    console.log(Result.data);
    this.setState({
      locData:Result.data[0]
    })
  }

  getloc=async(event)=>{
  event.preventDefault(); 
    let city=event.target.cityname.value;
    let url=`https://eu1.locationiq.com/v1/search.php?key=pk.69fbe9b91e039f3c21705cb4442c99ef&q=${city}&format=json`
    // console.log(url,city)
    try{
    let Result=await axios.get(url) ;
    console.log(url) 
    console.log(Result.data[0].lat);
    this.setState({
      locData:Result.data[0],
      disMap:true,
      disErr:false,
    })
  } 
  catch{
    this.setState({
      locData:'',
      err: 'This is a bad response, your input could be the reason',
      disErr:true,
      disMap:false,
    
    })
  }
  }
  render(){
    return (
      <div>
      <h1> Hello from React Axios app </h1>
      <h2>Enter the city you would like to get the data from </h2>
      <form onSubmit={this.getloc}>
          <input type='text' placeholder='cityname' name='cityname' />
          <input type='submit' value='Search' />
        </form>
      {/* <form onSubmit={this.getloc}>
       <input type='text' placeholder='City Name' name='cityName'/>
       <input type='submit' value='Search'/>
      </form > */}
      {/* <button onClick={this.getlocresult}>This will show data realted to Amman only </button> */}
      <h3>City is : {this.state.locData.display_name}</h3>
      {/* <h2>Icon : {this.state.locData.icon}</h2> */}
      <h3>lat is : {this.state.locData.lat}</h3>
      <h3>long is : {this.state.locData.lon}</h3>
      <p>{this.state.disErr && this.state.err}</p>
       {/* <img src={'https://maps.locationiq.com/v3/staticmap?key=pk.69fbe9b91e039f3c21705cb4442c99ef&center=31.9515694,35.9239625'} alt='map'/> */}
      
       {this.state.disMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.69fbe9b91e039f3c21705cb4442c99ef&center=${this.state.locData.lat},${this.state.locData.lon}`} alt='map'/>}
      
      </div>
    )
  }
}
export default App;