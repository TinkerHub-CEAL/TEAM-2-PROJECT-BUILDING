/**
 * Data Management for Digital Lost & Found System
 * Uses backend API (Flask + SQLite) for all data operations.
 */

const API_BASE = 'https://lostnfound-backend-pzcy.onrender.com/';
const CURRENT_USER = localStorage.getItem('user_email') || ''; // Read logged-in user

// ================================================
// API Helper
// ================================================
async function apiFetch(url, options = {}) {
    // Add JWT header if token exists
    const token = localStorage.getItem('access_token');
    const headers = options.headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    options.headers = headers;

    try {
        const res = await fetch(url, options);

        // Handle Token Expiry
        if (res.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_email');
            window.location.href = 'login.html';
            return;
        }

        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            throw new Error(err.detail || 'API error');
        }
        return await res.json();
    } catch (e) {
        console.error('API Error:', e);
        throw e;
    }
}

// ================================================
// GET Items (with optional filters)
// ================================================
async function getAllItems() {
    return await apiFetch(`${API_BASE}/items/`);
}

async function getItemsByType(type) {
    if (type === 'all') {
        return await apiFetch(`${API_BASE}/items/`);
    }
    return await apiFetch(`${API_BASE}/items/?type=${type}`);
}

async function getItemById(id) {
    try {
        return await apiFetch(`${API_BASE}/items/${id}`);
    } catch {
        return null;
    }
}

async function getItemsByUser(email) {
    return await apiFetch(`${API_BASE}/items/?user=${encodeURIComponent(email)}`);
}

// ================================================
// CREATE Item (with photo upload via FormData)
// ================================================
async function addItem(itemData, photoFile) {
    const formData = new FormData();
    formData.append('type', itemData.type);
    formData.append('title', itemData.title);
    formData.append('description', itemData.description);
    formData.append('location', itemData.location);
    formData.append('date', itemData.date);
    formData.append('contact', itemData.contact);
    formData.append('user', itemData.user || CURRENT_USER);

    if (photoFile) {
        formData.append('photo', photoFile);
    }

    return await apiFetch(`${API_BASE}/items/`, {
        method: 'POST',
        body: formData,
    });
}

// ================================================
// UPDATE Item Status
// ================================================
async function updateItemStatus(id, newStatus) {
    return await apiFetch(`${API_BASE}/items/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
    });
}

// ================================================
// DELETE Item
// ================================================
async function deleteItem(id) {
    return await apiFetch(`${API_BASE}/items/${id}`, {
        method: 'DELETE',
    });
}

// ================================================
// SEARCH Items (semantic search)
// ================================================
async function searchItems(query) {
    return await apiFetch(`${API_BASE}/search/?query=${encodeURIComponent(query)}`);
}

// ================================================
// SEED Database
// ================================================
async function seedDatabase() {
    return await apiFetch(`${API_BASE}/seed`, { method: 'POST' });
}

// ================================================
// Get photo URL (or placeholder)
// ================================================
function getPhotoUrl(item) {
    if (item.photo_url) return item.photo_url;
    return 'https://via.placeholder.com/400x300?text=No+Image';
}

// ================================================
// Dark Mode Handling
// ================================================
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Apply Dark Mode on Load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ================================================
// Auto-seed on first load
// ================================================
(async function () {
    try {
        await seedDatabase();
    } catch (e) {
        // Seed may fail if backend not running — that's ok
    }
})();
