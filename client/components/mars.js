import React from 'react';
import { connect } from 'react-redux';
import {fetchMars} from '../store';

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
      <div className = 'mars-container'>
        <h2>Welcome to Mars</h2>
        <h2>Total {mars.photos.length} Photos</h2>
        <div className='mars-photo-container'>
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

const mapStateToProps= function(state){
  return{
    mars: state.mars
  }
}

const mapDispatchToProps = dispatch=> ({
  fetchMars: () => dispatch(fetchMars()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mars)
