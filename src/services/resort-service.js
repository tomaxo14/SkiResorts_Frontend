import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class ResortService {

    getAllResorts(){
        return axios.get(API_URL + 'resorts');
    }

    getResortById(id){
        return axios.get(API_URL + 'resortDetails?resortId=' + id);
    }
}

export default new ResortService;