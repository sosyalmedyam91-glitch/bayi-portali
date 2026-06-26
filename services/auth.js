const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.projen.com.tr';

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/api/User/login`, { // API'nizdeki tam giriş endpoint'i
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }

    const data = await response.json();
    
    // API'den dönen JWT Token'ı saklama (Örn: data.token veya data.jwtToken)
    if (data && data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    throw error;
  }
}