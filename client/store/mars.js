import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MARS='GET_MARS'
const GET_DATE='GET_DATE'
/**
 * ACTION CREATORS
 */
export const getMars = mars => ({
  type: GET_MARS,
  mars
})

export const gotDate = date => ({
  type: GET_DATE,
  date
})
/**
 * THUNK CREATORS
 */
export const fetchMars = () => {

  const API_KEY = 'MCvXjE2UpVjaYEsuCjFZX6RWsNUayOXqEdb43kvH';
  const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key='

  return async dispatch => {
    try{
      const {data} = await axios.get(END_POINT + API_KEY)
      dispatch(getMars(data))
    }catch(err){
      console.error(err)
    }
  }
}

export const fetchByDate = date => {

  const API_KEY= 'MCvXjE2UpVjaYEsuCjFZX6RWsNUayOXqEdb43kvH';
  const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/'
  // const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key='

  /** Convert date to the right format YYYY-MM-DD */
  let dd = date.getDate();
  let mm = date.getMonth()+1;
  let yyyy = date.getFullYear();
  if (dd<10){
    dd ='0' + dd;
  }
  if(mm<10){
    mm='0'+mm
  }
  let selectedDate = yyyy + '-' + mm + '-' +dd;

  return async dispatch => {
    try{
      const {data} = await axios.get(`${END_POINT}/photos?earch_date=${selectedDate}&api_key=${API_KEY}`)
      // const {data} = await axios.get(END_POINT + API_KEY)
      dispatch(gotDate(data))
    }catch(err){
      console.error(err)
    }
  }
}


const initialState = {};
export default function marsReducer(state = initialState, action){
  switch(action.type){
    case GET_MARS:
      return action.mars
    case GET_DATE:
    // return {...state, mars: action.mars}
    return action.date
    default:
      return state
  }
}
