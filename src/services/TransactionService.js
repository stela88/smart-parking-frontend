import axios from 'axios';

const TRANSACTION_API_BASE_URL = 'http://192.168.137.253:8083/api/transactions';

class TransactionService {
  postTransaction(transactionData) {
    return axios.post(TRANSACTION_API_BASE_URL, transactionData);
  }
}

export default new TransactionService();