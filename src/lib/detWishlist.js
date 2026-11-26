export const WISHLIST_BATCHES = {
  next: "Next available batch",
  later: "A later batch",
  undecided: "I'm still deciding",
};

export function getWishlistWhatsAppUrl({ name, contact_number: contactNumber }) {
  let number = contactNumber;
  if (/^01\d{9}$/.test(number)) number = `+88${number}`;
  if (/^8801\d{9}$/.test(number)) number = `+${number}`;
  if (number.startsWith("00")) number = `+${number.slice(2)}`;
  if (!/^\+[1-9]\d{6,14}$/.test(number)) return null;

  const message = `Hi ${name.trim()}, this is DuoMate. Thanks for joining the wishlist for our 15-day DET Crash Course. Are you still interested? We'd be happy to share the upcoming batch dates and answer any questions.`;
  return `https://wa.me/${number.slice(1)}?text=${encodeURIComponent(message)}`;
}
