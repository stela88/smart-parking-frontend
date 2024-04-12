import axios from 'axios';

const TRANSACTION_API_BASE_URL = 'http://localhost:8082/transactions';

class TransactionService {
  postTransaction(transactionData) {
    return axios.post(TRANSACTION_API_BASE_URL, transactionData);
  }
}

export default new TransactionService();