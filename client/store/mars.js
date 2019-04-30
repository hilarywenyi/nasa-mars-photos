import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MARS='GET_MARS'

/**
 * ACTION CREATORS
 */
export const getMars = mars => ({
  type: GET_MARS,
  mars
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


const initialState = {};
export default function marsReducer(state = initialState, action){
  switch(action.type){
    case GET_MARS:
      return action.mars
    default:
      return state
  }
}
