export function trackPageView() {
  if (!window.fbq) return;
  window.fbq("track", "PageView");
}

export function trackLead(data = {}) {
  if (!window.fbq) return;
  window.fbq("track", "Lead", data);
}

export function trackViewContent(data = {}) {
  if (!window.fbq) return;
  window.fbq("track", "ViewContent", data);
}

export function trackInitiateCheckout(data = {}) {
  if (!window.fbq) return;
  window.fbq("track", "InitiateCheckout", data);
}

export function trackCompleteRegistration(data = {}) {
  if (!window.fbq) return;
  window.fbq("track", "CompleteRegistration", data);
}

export function trackCustomEvent(eventName, data = {}) {
  if (!window.fbq) return;
  window.fbq("trackCustom", eventName, data);
}