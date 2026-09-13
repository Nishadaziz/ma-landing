/**
 * The invoice serial number keeps counting up from 2026102. There is no
 * database backing this feature, so the running counter lives in the admin's
 * own browser storage — each generated invoice advances it by one.
 */
const STORAGE_KEY = "duomate-admin-invoice-serial";
const STARTING_SERIAL = 2026102;

export function getNextSerial() {
  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : STARTING_SERIAL;
  } catch {
    return STARTING_SERIAL;
  }
}

export function commitSerial(usedSerial) {
  try {
    const numeric = Number(usedSerial);
    const next = Number.isFinite(numeric) && numeric > 0 ? numeric + 1 : getNextSerial() + 1;
    window.localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // localStorage unavailable (private browsing, quota) — the counter just won't persist.
  }
}
