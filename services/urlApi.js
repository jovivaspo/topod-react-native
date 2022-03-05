import {VARIABLES} from '../config/env'

const {REACT_APP_URL_API, REACT_APP_URL_API_LOCAL, REACT_APP_MOOD} = VARIABLES

export const urls = () =>{

    if(REACT_APP_MOOD === 'dev'){
        return {
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
            PODCASTS_ALL : '/api/podcasts/all/',
            LOGIN : `/api/user/login`,
            REGISTER : `/api/user/register`,
            SEARCH_VIDEOS : `/api/videos/`,
            DONACIONES : `/donaciones`,
            DOWNLOAD : `/api/podcasts/download/`,
            DELETE : `/api/podcasts/delete/`,
            CONVERT : `/api/videos`,
            PLAYER: `/api/podcasts/single/`,

        }
    }

}