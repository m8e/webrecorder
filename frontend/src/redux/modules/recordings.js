import { apiPath } from 'config';

const RECS_LOAD = 'wr/recs/LOAD';
const RECS_LOAD_SUCCESS = 'wr/recs/LOAD_SUCCESS';
const RECS_LOAD_FAIL = 'wr/recs/LOAD_FAIL';
const REC_LOAD = 'wr/rec/LOAD';
const REC_LOAD_SUCCESS = 'wr/rec/LOAD_SUCCESS';
const REC_LOAD_FAIL = 'wr/rec/LOAD_FAIL';
const REC_DELETE = 'wr/rec/REC_DELETE';
const REC_DELETE_SUCCESS = 'wr/rec/REC_DELETE_SUCCESS';
const REC_DELETE_FAIL = 'wr/rec/REC_DELETE_FAIL';


const initialState = {
  loaded: false
};


export default function recordings(state = initialState, action = {}) {
  switch (action.type) {
    case RECS_LOAD:
      return {
        ...state,
        loading: true
      };
    case RECS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        recordings: action.result.recordings
      };
    case RECS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REC_LOAD:
      return {
        ...state,
        loading: true
      };
    case REC_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        recording: action.result.recording
      };
    case REC_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}


export function collRecordings(user, coll) {
  return {
    types: [RECS_LOAD, RECS_LOAD_SUCCESS, RECS_LOAD_FAIL],
    promise: client => client.get(`${apiPath}/recordings`, {
      params: { user, coll }
    })
  };
}


export function loadRecording(user, coll, rec) {
  return {
    types: [REC_LOAD, REC_LOAD_SUCCESS, REC_LOAD_FAIL],
    promise: client => client.get(`${apiPath}/recordings/${rec}`, {
      params: { user, coll }
    })
  };
}


export function deleteRecording(user, coll, rec) {
  return {
    types: [REC_DELETE, REC_DELETE_SUCCESS, REC_DELETE_FAIL],
    promise: client => client.del(`${apiPath}/recordings/${rec}`, {
      params: { user, coll }
    })
  };
}