const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  // If running in browser and on localhost/dev
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }
  // Production relative URL if deployed together or proxied
  return '';
};

export const API_BASE_URL = getBaseUrl();

export const api = {
  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE_URL}/api/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings) {
    const res = await fetch(`${API_BASE_URL}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  // Courses
  async getCourses() {
    const res = await fetch(`${API_BASE_URL}/api/courses`);
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  },

  // IT Repair Services
  async getServices() {
    const res = await fetch(`${API_BASE_URL}/api/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  // Online Services (Digital center)
  async getOnlineServices() {
    const res = await fetch(`${API_BASE_URL}/api/services/online`);
    if (!res.ok) throw new Error('Failed to fetch online services');
    return res.json();
  },

  // Submissions
  async submitContact(data) {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit contact inquiry');
    return res.json();
  },

  async submitServiceRequest(data) {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/service_requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit service request');
    return res.json();
  },

  async submitEnrollment(data) {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit course enrollment inquiry');
    return res.json();
  },

  // Admin Inquiries Fetching
  async getContacts() {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/contacts`);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  },

  async getServiceRequests() {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/service_requests`);
    if (!res.ok) throw new Error('Failed to fetch service requests');
    return res.json();
  },

  async getEnrollments() {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/enrollments`);
    if (!res.ok) throw new Error('Failed to fetch enrollments');
    return res.json();
  }
};
