import axios from 'axios';
import {BASE_API} from "./Constants";

const TRANSACTION_API_BASE_URL = `${BASE_API}/transactions`;

class TransactionService {
  postTransaction(transactionData) {
    return axios.post(TRANSACTION_API_BASE_URL, transactionData);
  }
}

export default new TransactionService();
