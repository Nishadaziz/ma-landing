import { jsPDF } from "jspdf";
import logo from "../../../assets/logo-cropped.png";
import watermark from "../../../assets/logo-icon-only.png";

const CONTACT_EMAIL = "info@duomatebd.com";
const CONTACT_PHONE = "+88 01300 153 200";

function loadImageAsDataUrl(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      resolve({
        dataUrl: canvas.toDataURL("image/png"),
        ratio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

function money(amount) {
  return `${Number(amount || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}/-`;
}

/**
 * Draws the traditional DuoMate invoice layout onto an A4 jsPDF document
 * and triggers a browser download. All fields come from the manual entry
 * form — nothing here reads from any database table.
 */
export async function generateInvoicePdf(fields) {
  const { dataUrl: logoDataUrl, ratio: logoRatio } = await loadImageAsDataUrl(logo);
  const { dataUrl: watermarkDataUrl, ratio: watermarkRatio } =
    await loadImageAsDataUrl(watermark);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 15;
  const contentRight = pageWidth - marginX;
  const contentWidth = contentRight - marginX;

  // ---- Watermark ----
  const wmWidth = 110;
  const wmHeight = wmWidth / watermarkRatio;
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.07 }));
  doc.addImage(
    watermarkDataUrl,
    "PNG",
    pageWidth / 2 - wmWidth / 2,
    pageHeight / 2 - wmHeight / 2 - 20,
    wmWidth,
    wmHeight
  );
  doc.restoreGraphicsState();

  // ---- Header ----
  const logoWidth = 38;
  const logoHeight = logoWidth / logoRatio;
  doc.addImage(logoDataUrl, "PNG", marginX, 14, logoWidth, logoHeight);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(30, 41, 59);
  doc.text("I N V O I C E", contentRight, 26, { align: "right" });

  // ---- Two-tone diagonal bar ----
  const barY = 34;
  const barHeight = 3;
  const greenWidth = contentWidth * 0.45;
  const slant = 4;

  doc.setFillColor(245, 158, 11);
  doc.rect(marginX, barY, contentWidth, barHeight, "F");

  doc.setFillColor(16, 185, 129);
  doc.lines(
    [
      [greenWidth + slant, 0],
      [-2 * slant, barHeight],
      [-(greenWidth - slant), 0],
    ],
    marginX,
    barY,
    [1, 1],
    "F",
    true
  );

  // ---- Bill to (left) ----
  let leftY = barY + 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`SL. NO ${fields.serial || "—"}`, marginX, leftY);

  leftY += 6;
  doc.text("BILL TO:", marginX, leftY);

  leftY += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(fields.studentName || "—", marginX, leftY);

  if (fields.studentPhone) {
    leftY += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Mobile: ${fields.studentPhone}`, marginX, leftY);
  }

  if (fields.studentAddress) {
    leftY += 5.5;
    doc.text(fields.studentAddress, marginX, leftY);
  }

  // ---- Date + invoice number (right) ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(13, 148, 136);
  doc.text(fields.dateLabel || "—", contentRight, barY + 14, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(fields.invoiceNumber || "—", contentRight, barY + 19, { align: "right" });

  // ---- Line items table ----
  let tableY = Math.max(leftY + 20, barY + 40);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("Descriptions", marginX, tableY - 2.5);
  doc.text("Duration", marginX + contentWidth * 0.62, tableY - 2.5);
  doc.text("Total", contentRight, tableY - 2.5, { align: "right" });

  const rowHeight = 11;

  function row({ label, duration, amount, shaded }) {
    if (shaded) {
      doc.setFillColor(238, 242, 255);
      doc.rect(marginX, tableY, contentWidth, rowHeight, "F");
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(label, marginX + 2, tableY + rowHeight / 2 + 1.5);

    if (duration) {
      doc.setTextColor(100, 116, 139);
      doc.text(duration, marginX + contentWidth * 0.62, tableY + rowHeight / 2 + 1.5);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(money(amount), contentRight - 2, tableY + rowHeight / 2 + 1.5, {
      align: "right",
    });

    tableY += rowHeight;
  }

  row({ label: fields.description || "—", duration: "1", amount: fields.total, shaded: true });
  row({ label: "Paid", amount: fields.paid });
  row({ label: "Due", amount: fields.due, shaded: true });

  // ---- Signature ----
  const signatureY = tableY + 45;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("Office Signature", contentRight - 25, signatureY, { align: "center" });
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.3);
  doc.line(contentRight - 50, signatureY + 6, contentRight, signatureY + 6);

  // ---- Footer ----
  const footerY = signatureY + 25;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text("*The registration fee is non refundable.", marginX, footerY);

  doc.setFillColor(16, 185, 129);
  doc.rect(marginX, footerY + 4, contentWidth, 1, "F");

  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text("Thank You!", marginX, footerY + 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(CONTACT_EMAIL, contentRight, footerY + 13, { align: "right" });
  doc.text(CONTACT_PHONE, contentRight, footerY + 18, { align: "right" });

  const fileName = `${(fields.invoiceNumber || "invoice").replace(/[^\w-]/g, "")}.pdf`;
  doc.save(fileName);
}
