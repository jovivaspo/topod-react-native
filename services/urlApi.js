import {VARIABLES} from '../config/env'

const {REACT_APP_URL_API, REACT_APP_URL_API_LOCAL, REACT_APP_MOOD} = VARIABLES

export const urls = () =>{

    if(REACT_APP_MOOD === 'dev'){
        return {
            URI_API: REACT_APP_URL_API_LOCAL,
            PODCASTS_ALL : `${REACT_APP_URL_API_LOCAL}/api/podcasts/all/`,
            LOGIN : `${REACT_APP_URL_API_LOCAL}/api/user/login`,
            REGISTER : `${REACT_APP_URL_API_LOCAL}/api/user/register`,
            SEARCH_VIDEOS : `${REACT_APP_URL_API_LOCAL}/api/videos/`,
            DONACIONES : `${REACT_APP_URL_API_LOCAL}/donaciones`,
            DOWNLOAD : `${REACT_APP_URL_API_LOCAL}/api/podcasts/download/`,
            DELETE : `${REACT_APP_URL_API_LOCAL}/api/podcasts/delete/`,
            CONVERT : `${REACT_APP_URL_API_LOCAL}/api/videos`,
            PLAYER: `${REACT_APP_URL_API_LOCAL}/api/podcasts/single/`,
        }
    }else{
        return  {
            URI_API: REACT_APP_URL_API,
            PODCASTS_ALL : `${REACT_APP_URL_API}/api/podcasts/all/`,
            LOGIN : `${REACT_APP_URL_API}/api/user/login`,
            REGISTER : `${REACT_APP_URL_API}/api/user/register`,
            SEARCH_VIDEOS : `${REACT_APP_URL_API}/api/videos/`,
            DONACIONES : `${REACT_APP_URL_API}/donaciones`,
            DOWNLOAD : `${REACT_APP_URL_API}/api/podcasts/download/`,
            DELETE : `${REACT_APP_URL_API}/api/podcasts/delete/`,
            CONVERT : `${REACT_APP_URL_API}/api/videos`,
            PLAYER: `${REACT_APP_URL_API}/api/podcasts/single/`,

        }
    }

}