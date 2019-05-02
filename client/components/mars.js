import React from 'react';
import { connect } from 'react-redux';
import {fetchMars} from '../store';
//import MarsByDate from './marsByDate';

class Mars extends React.Component {

  componentDidMount(){
    this.props.fetchMars();
  }


  render(){
    const {mars} = this.props;

    if(!mars.photos){
      return <div>Loading...</div>
    }

    return(
      <div>
        <h2>Welcome to Mars</h2>
        {/* <MarsByDate /> */}
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
  return{
    mars: state.mars
  }
}

const mapDispatchToProps = dispatch=> ({
  fetchMars: () => dispatch(fetchMars()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mars)
