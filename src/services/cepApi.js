// import axios from 'axios';
import cep from 'cep-promise'

// export const getCep = (cep) => {
//     return axios.get("https://viacep.com.br/ws/" + cep + "/json")
// }

export const getCep = (nCep) => {
    return cep(nCep).then()
    // eslint-disable-next-line
    .catch(console.log)
} 