const API_BASE_URL = 'http://localhost:9999/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Patient endpoints
  async getPatients(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/patients${queryString ? `?${queryString}` : ''}`);
  }

  async getPatient(id) {
    return this.request(`/patients/${id}`);
  }

  async createPatient(patientData) {
    return this.request('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async updatePatient(id, patientData) {
    return this.request(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  }

  async deletePatient(id) {
    return this.request(`/patients/${id}`, {
      method: 'DELETE',
    });
  }

  // Appointment endpoints
  async getAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/appointments${queryString ? `?${queryString}` : ''}`);
  }

  async getAppointment(id) {
    return this.request(`/appointments/${id}`);
  }

  async createAppointment(appointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id, appointmentData) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  }

  async deleteAppointment(id) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // Staff endpoints
  async getStaff(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/staff${queryString ? `?${queryString}` : ''}`);
  }

  async getStaffMember(id) {
    return this.request(`/staff/${id}`);
  }

  async createStaff(staffData) {
    return this.request('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    });
  }

  async updateStaff(id, staffData) {
    return this.request(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData),
    });
  }

  // Branch endpoints
  async getBranches(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/branches${queryString ? `?${queryString}` : ''}`);
  }

  async getBranch(id) {
    return this.request(`/branches/${id}`);
  }

  async createBranch(branchData) {
    return this.request('/branches', {
      method: 'POST',
      body: JSON.stringify(branchData),
    });
  }

  async updateBranch(id, branchData) {
    return this.request(`/branches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(branchData),
    });
  }

  // Organization endpoints
  async getOrganizations() {
    return this.request('/organizations');
  }

  async getOrganization(id) {
    return this.request(`/organizations/${id}`);
  }

  async updateOrganization(id, orgData) {
    return this.request(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orgData),
    });
  }

  // Dashboard endpoints
  async getDashboardData() {
    return this.request('/dashboard');
  }

  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  // Inventory endpoints
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/inventory/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.request(`/inventory/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/inventory/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/inventory/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async getStock(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/inventory/stock${queryString ? `?${queryString}` : ''}`);
  }

  async updateStock(id, stockData) {
    return this.request(`/inventory/stock/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stockData),
    });
  }

  // Financial endpoints
  async getTransactions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/finance/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async createTransaction(transactionData) {
    return this.request('/finance/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  }

  async getFinancialReports(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/finance/reports${queryString ? `?${queryString}` : ''}`);
  }

  // Loans endpoints
  async getLoans(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/loans${queryString ? `?${queryString}` : ''}`);
  }

  async getLoan(id) {
    return this.request(`/loans/${id}`);
  }

  async createLoan(loanData) {
    return this.request('/loans', {
      method: 'POST',
      body: JSON.stringify(loanData),
    });
  }

  async updateLoan(id, loanData) {
    return this.request(`/loans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(loanData),
    });
  }

  // Community endpoints
  async getCommunityPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/community${queryString ? `?${queryString}` : ''}`);
  }

  async getCommunityPost(id) {
    return this.request(`/community/${id}`);
  }

  async createCommunityPost(postData) {
    return this.request('/community', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updateCommunityPost(id, postData) {
    return this.request(`/community/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;