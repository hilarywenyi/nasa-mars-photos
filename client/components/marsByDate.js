import React from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { fetchByDate } from '../store';
import Flatpickr from 'react-flatpickr';

class MarsByDate extends React.Component {
  constructor(){
    super();
    this.state = {
      date: new Date(2015, 4, 30),
      mars: {},
    }
    this.handleChange= this.handleChange.bind(this)
    this.fetchDate = this.fetchDate.bind(this);
  }

  componentDidMount(){
   this.fetchDate(this.state.date)
  }

  componentDidUpdate(prevProps, prevState){
    const latestDate = this.state.date
    const prevDate = prevState.date

    if(latestDate !== prevDate){
      this.fetchDate(latestDate)
    }

  }

  async fetchDate(date){
    let selectedDate = new Date(date).toISOString().split('T')[0]

    const API_KEY= 'MCvXjE2UpVjaYEsuCjFZX6RWsNUayOXqEdb43kvH'
    const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/'
    let destination= `${END_POINT}photos?earth_date=${selectedDate}&api_key=${API_KEY}`

    console.log('if destination changes in fetchDate',destination )
    await axios.get(destination)
        .then(res=>{
          this.setState({
            mars:res.data
          })
          console.log('I got the updated response that I wanted!!!!!!!=', res.data)
        })
        .catch(error=>{
          console.log(error, 'failed to fetch data')
        })

  }

  handleChange(date){
    this.setState({date})
  }

  // handleSubmit(){
  //   this.fetchDate()
  //   // this.props.fetchByDate({...this.state})
  // }

  render(){
    const {date} = this.state;
    console.log('date in render and check it is updating=', date)
    const {mars} = this.state
    console.log('mars in render from API=', mars)
    if(!mars.photos){
      return <div>Loading...</div>
    }
    return(
      <div>

        {/* <form onSubmit = {this.handleSubmit()}> */}
        <form>
        <Flatpickr
          value={date}
          options={{
            maxDate: '2015-5-30',
            allowInput: true,
            dateFormat: "Y-m-d",
          }}
          onChange = {this.handleChange}
          />
          <button type = "submit" className="btn-btn-default">Explore</button>
          </form>
          {
          mars.photos.map(item => (
            <div key = {item.id}>
            <img src = {item.img_src} alt='image'/>
            </div>
          )
          )
          }

      </div>
    )
  }
}


export default MarsByDate

// const mapStateToProps= function(state){
//   return{
//     mars: state.mars
//   }
// }
// const mapDispatchToProps = dispatch => ({
//   fetchByDate: date => dispatch(fetchByDate(date))
//   // fetchByDate: () => dispatch(fetchByDate())
// })


// export default connect(mapStateToProps, mapDispatchToProps)(MarsByDate)
