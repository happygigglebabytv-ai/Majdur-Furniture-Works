import {
  BusinessSettings,
  LogoSettings,
  Product,
  Category,
  GalleryItem,
  VideoItem,
  CustomerReview,
} from './types';

const API_BASE = '/api';

export async function fetchBusiness(): Promise<BusinessSettings> {
  const res = await fetch(`${API_BASE}/business`);
  if (!res.ok) throw new Error('Failed to fetch business settings');
  return res.json();
}

export async function updateBusiness(
  data: Partial<BusinessSettings>,
  token: string
): Promise<{ success: boolean; business: BusinessSettings }> {
  const res = await fetch(`${API_BASE}/business`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update' }));
    throw new Error(err.error || 'Failed to update business settings');
  }
  return res.json();
}

export async function fetchProducts(token?: string): Promise<Product[]> {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/products`, { headers });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createProduct(
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  token: string
): Promise<Product> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create product' }));
    throw new Error(err.error || 'Failed to create product');
  }
  return res.json();
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>,
  token: string
): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update product' }));
    throw new Error(err.error || 'Failed to update product');
  }
  return res.json();
}

export async function deleteProduct(id: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return true;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(
  category: { name: string; description?: string; subcategories?: string[] },
  token: string
): Promise<Category> {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create category' }));
    throw new Error(err.error || 'Failed to create category');
  }
  return res.json();
}

export async function editCategory(
  id: string,
  updates: Partial<Category>,
  token: string
): Promise<Category> {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update category' }));
    throw new Error(err.error || 'Failed to update category');
  }
  return res.json();
}

export async function deleteCategory(id: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to delete category' }));
    throw new Error(err.error || 'Failed to delete category');
  }
  return true;
}

export async function updateCategories(categories: Category[], token: string): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categories),
  });
  if (!res.ok) throw new Error('Failed to update categories');
  return res.json();
}

export async function fetchGallery(token?: string): Promise<GalleryItem[]> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/gallery`, { headers });
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function addGalleryItem(
  item: Omit<GalleryItem, 'id' | 'createdAt'>,
  token: string
): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add gallery item');
  return res.json();
}

export async function updateGalleryItem(
  id: string,
  updates: Partial<GalleryItem>,
  token: string
): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update gallery item');
  return res.json();
}

export async function deleteGalleryItem(id: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete gallery item');
  return true;
}

export async function fetchVideos(token?: string): Promise<VideoItem[]> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/videos`, { headers });
  if (!res.ok) throw new Error('Failed to fetch videos');
  return res.json();
}

export async function addVideo(
  video: Omit<VideoItem, 'id' | 'createdAt'>,
  token: string
): Promise<VideoItem> {
  const res = await fetch(`${API_BASE}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(video),
  });
  if (!res.ok) throw new Error('Failed to add video');
  return res.json();
}

export async function updateVideo(
  id: string,
  updates: Partial<VideoItem>,
  token: string
): Promise<VideoItem> {
  const res = await fetch(`${API_BASE}/videos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update video');
  return res.json();
}

export async function deleteVideo(id: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/videos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete video');
  return true;
}

export async function fetchReviews(token?: string): Promise<CustomerReview[]> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/reviews`, { headers });
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function addReview(
  review: Omit<CustomerReview, 'id' | 'createdAt'>,
  token: string
): Promise<CustomerReview> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error('Failed to add review');
  return res.json();
}

export async function updateReview(
  id: string,
  updates: Partial<CustomerReview>,
  token: string
): Promise<CustomerReview> {
  const res = await fetch(`${API_BASE}/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update review');
  return res.json();
}

export async function deleteReview(id: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/reviews/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return true;
}

export async function uploadMedia(file: File, token: string): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Failed to upload media file');
  }

  return res.json();
}

export async function adminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; token: string; username: string }> {
  const cleanUsername = String(username || '').trim();
  const cleanPassword = String(password || '').trim();

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(err.error || 'Invalid credentials');
  }

  return res.json();
}

export async function checkAuth(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
  token: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to change password' }));
    throw new Error(err.error || 'Password change failed');
  }

  return res.json();
}

export async function updateAdminCredentials(
  data: { currentPassword: string; newUsername?: string; newPassword?: string },
  token: string
): Promise<{ success: boolean; username: string; message: string }> {
  const res = await fetch(`${API_BASE}/auth/update-credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update credentials' }));
    throw new Error(err.error || 'Failed to update credentials');
  }

  return res.json();
}

export async function fetchLogo(): Promise<LogoSettings> {
  const res = await fetch(`${API_BASE}/logo`);
  if (!res.ok) throw new Error('Failed to fetch logo settings');
  return res.json();
}

export async function updateLogoSettings(
  data: Partial<LogoSettings>,
  token: string
): Promise<{ success: boolean; logo: LogoSettings }> {
  const res = await fetch(`${API_BASE}/logo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update logo' }));
    throw new Error(err.error || 'Failed to update logo settings');
  }
  return res.json();
}

export async function deleteLogo(token: string): Promise<{ success: boolean; logo: LogoSettings }> {
  const res = await fetch(`${API_BASE}/logo`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to remove logo' }));
    throw new Error(err.error || 'Failed to remove logo');
  }
  return res.json();
}

export async function uploadLogoFile(
  file: File,
  token: string
): Promise<{ success: boolean; url: string; logo: LogoSettings }> {
  const formData = new FormData();
  formData.append('logo', file);

  const res = await fetch(`${API_BASE}/logo/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Failed to upload logo image');
  }

  return res.json();
}

export const api = {
  getSettings: fetchBusiness,
  updateSettings: updateBusiness,
  getLogo: fetchLogo,
  updateLogo: updateLogoSettings,
  deleteLogo,
  uploadLogo: uploadLogoFile,
  getProducts: fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories: fetchCategories,
  createCategory,
  editCategory,
  deleteCategory,
  updateCategories,
  getGallery: fetchGallery,
  createGalleryItem: addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getVideos: fetchVideos,
  createVideo: addVideo,
  updateVideo,
  deleteVideo,
  getReviews: fetchReviews,
  createReview: addReview,
  updateReview,
  deleteReview,
  uploadMedia,
  login: adminLogin,
  checkAuth,
  changePassword: changeAdminPassword,
  updateCredentials: updateAdminCredentials,
};

