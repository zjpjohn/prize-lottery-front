import storage from 'good-storage'

const TOKEN_KEY = 'Access-Token';
const USER_KEY = 'User-Info';
const REDIRECT_URI = 'Redirect-Uri';

// 获取token
export function loadToken() {
  return storage.get(TOKEN_KEY, '');
}

// 保存token
export function saveToken(token) {
  storage.set(TOKEN_KEY, token);
  return token
}

// 删除token
export function removeToken() {
  storage.remove(TOKEN_KEY);
  return ''
}

export function loadUser() {
  return storage.get(USER_KEY) || {name: null, role: null};
}

export function saveUser(user) {
  storage.set(USER_KEY, user);
  return user;
}

export function removeUser() {
  storage.remove(USER_KEY);
  return null;
}

export function saveRedirectUri(uri) {
  storage.set(REDIRECT_URI, uri);
  return uri;
}

export function removeRedirectUri() {
  storage.remove(REDIRECT_URI);
  return '';
}

export function loadRedirectUri() {
  return storage.get(REDIRECT_URI);
}
