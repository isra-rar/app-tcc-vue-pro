import axios from 'axios';

export const getCep = (cep) => {
    return axios.get("https://viacep.com.br/ws/" + cep + "/json")
}