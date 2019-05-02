import React from 'react';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';

class MarsByDate extends React.Component {
  constructor(){
    super();
    this.state = {
      date: new Date(2015, 2, 30),
      mars: {},
    }
    this.handleChange= this.handleChange.bind(this)
    this.fetchDate = this.fetchDate.bind(this);
  }

  componentDidMount(){
   this.fetchDate(this.state.date)
  }

  componentDidUpdate(prevState){
    const latestDate = this.state.date
    const prevDate = prevState.date

    if(latestDate !== prevDate){
      this.fetchDate(latestDate)
    }

  }

  async fetchDate(date){
    let selectedDate = new Date(date).toISOString().split('T')[0]

    // const API_KEY= 'MCvXjE2UpVjaYEsuCjFZX6RWsNUayOXqEdb43kvH'
    const API_KEY='1lasQWTl31wLvke0ZO6G0RfebtUaQYXl1kB7B4AA'
    const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/'
    let destination= `${END_POINT}photos?earth_date=${selectedDate}&api_key=${API_KEY}`

    await axios.get(destination)
        .then(res=>{
          this.setState({
            mars:res.data
          })
        })
        .catch(error=>{
          console.log(error, 'failed to fetch data')
        })

  }

  handleChange(date){
    this.setState({date})
  }

  render(){
    const {date, mars} = this.state;

    if(!mars.photos){
      return <div>Loading...</div>
    }
    return(
      <div className ='mars-by-date-container'>
        <Flatpickr
          value={date}
          options={{
            maxDate: '2015-5-30',
            allowInput: true,
            dateFormat: "Y-m-d",
          }}
          onChange = {this.handleChange}
          />
          <h2>You Found {mars.photos.length} Photos</h2>
          <div className='mars-by-date-photo-container'>
          {
          mars.photos.map(item => (
            <img key = {item.id} src = {item.img_src} alt='image'/>
          )
          )
          }
          </div>
      </div>
    )
  }
}


export default MarsByDate
