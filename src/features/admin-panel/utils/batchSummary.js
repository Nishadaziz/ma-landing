export function batchStudentKey(row) {
  return row.user_id || row.student_email?.trim().toLowerCase() ||
    row.student_phone?.replace(/\D/g, "") || row.id;
}

export function summarizeBatch(rows) {
  const approved = rows.filter((row) => row.status === "approved");
  return {
    students: new Set(approved.map(batchStudentKey)).size,
    registrations: rows.length,
    pending: rows.filter((row) => row.status === "pending").length,
    paid: approved.reduce((sum, row) => sum + Number(row.payment_amount || 0), 0),
    due: approved.reduce((sum, row) => sum + (row.course_fee == null ? 0 :
      Math.max(Number(row.course_fee) - Number(row.payment_amount || 0), 0)), 0),
    unknownFees: approved.filter((row) => row.course_fee == null).length,
  };
}
