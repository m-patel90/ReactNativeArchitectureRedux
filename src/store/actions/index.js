export function authentication(data) {
  return {
    type: 'Authentication',
    data,
  };
}

export function refreshToken(data) {
  return {
    type: 'RefreshToken',
    data,
  };
}

export function updateProfile(data) {
  return {
    type: 'UpdateProfile',
    data,
  };
}

export function setNotify(data) {
  return {
    type: 'SetNotify',
    data,
  };
}

export function setCustAddress(data) {
  return {
    type: 'SetCustAddress',
    data,
  };
}