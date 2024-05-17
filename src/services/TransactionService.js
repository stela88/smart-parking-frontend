import axios from 'axios';

const TRANSACTION_API_BASE_URL = 'http://172.16.1.18:8083/api/transactions';

class TransactionService {
  postTransaction(transactionData) {
    return axios.post(TRANSACTION_API_BASE_URL, transactionData);
  }
}

export default new TransactionService();