export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

export const canUsePopups = () => {
  // Check if popups are likely to work
  try {
    // Test if we're in a secure context
    if (!window.isSecureContext) return false;
    
    // Check if we're in an iframe
    if (isInIframe()) return false;
    
    // Check if we have necessary permissions
    return true;
  } catch (e) {
    return false;
  }
};