const ADMIN_EMAILS = ["duomatebd@gmail.com"];

export function isAdminEmail(email) {
  if (!email) return false;

  return ADMIN_EMAILS.includes(email.toLowerCase());
}