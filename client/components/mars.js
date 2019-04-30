import React from 'react';
import { connect } from 'react-redux'
import {fetchMars} from '../store'

class Mars extends React.Component {

  componentDidMount(){
    this.props.fetchMars()
  }

  render(){
    console.log('this.props=', this.props)
    //const {mars} = this.state
    const {mars} = this.props;
    if(!mars.photos){
      return <div>Loading...</div>
    }
    return(
      <div>
        <h2>Welcome to Mars</h2>
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

const mapStateToProps= function(state){
  console.log('state.mars.photos=', state.mars.photos)
  return{
    mars: state.mars
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMars: () => dispatch(fetchMars())
})

export default connect(mapStateToProps, mapDispatchToProps)(Mars)
