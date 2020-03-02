import {GET_PLAYLISTS} from '../actions/types';

const initialState = {
  playlists: [],
  loading: true,
};

const playlist = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_PLAYLISTS:
      console.log('get playlist dispatch');
      return {
        ...state,
        playlists: payload,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default playlist;
