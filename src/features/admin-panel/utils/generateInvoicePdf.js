import { jsPDF } from "jspdf";
import logo from "../../../assets/logo-cropped.png";
import watermark from "../../../assets/logo-icon-only.png";

const CONTACT_EMAIL = "info@duomatebd.com";
const CONTACT_PHONE = "+88 01300 153 200";

const SLATE_900 = [15, 23, 42];
const SLATE_700 = [51, 65, 85];
const SLATE_500 = [100, 116, 139];
const SLATE_400 = [148, 163, 184];
const SLATE_200 = [226, 232, 240];
const SLATE_100 = [241, 245, 249];
const SLATE_50 = [248, 250, 252];
const AMBER_500 = [245, 158, 11];
const AMBER_700 = [180, 83, 9];
const AMBER_50 = [255, 251, 235];
const EMERALD_500 = [16, 185, 129];
const EMERALD_700 = [4, 120, 87];
const EMERALD_50 = [236, 253, 245];
const TEAL_600 = [13, 148, 136];

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
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export function money(amount) {
  return `${Number(amount || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}/-`;
}

function drawText(doc, str, x, y, { font = "normal", size, color, align } = {}) {
  doc.setFont("helvetica", font);
  if (size) doc.setFontSize(size);
  if (color) doc.setTextColor(...color);
  doc.text(str, x, y, align ? { align } : undefined);
}

/**
 * Draws the DuoMate invoice layout onto an A4 jsPDF document and triggers a
 * browser download. All fields come from the manual entry form — nothing
 * here reads from any database table.
 */
export async function generateInvoicePdf(fields) {
  const [
    { dataUrl: logoDataUrl, ratio: logoRatio },
    { dataUrl: watermarkDataUrl, ratio: watermarkRatio },
  ] = await Promise.all([loadImageAsDataUrl(logo), loadImageAsDataUrl(watermark)]);

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
  doc.setGState(new doc.GState({ opacity: 0.06 }));
  doc.addImage(
    watermarkDataUrl,
    "PNG",
    pageWidth / 2 - wmWidth / 2,
    140 - wmHeight / 2,
    wmWidth,
    wmHeight
  );
  doc.restoreGraphicsState();

  // ---- Header ----
  const logoWidth = 40;
  const logoHeight = logoWidth / logoRatio;
  doc.addImage(logoDataUrl, "PNG", marginX, 13, logoWidth, logoHeight);

  drawText(doc, "INVOICE", contentRight, 24, {
    font: "bold",
    size: 22,
    color: SLATE_900,
    align: "right",
  });

  // ---- Two-tone diagonal bar ----
  const barY = 35;
  const barHeight = 2.4;
  const greenWidth = contentWidth * 0.45;
  const slant = 4;

  doc.setFillColor(...AMBER_500);
  doc.rect(marginX, barY, contentWidth, barHeight, "F");

  doc.setFillColor(...EMERALD_500);
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

  // ---- Meta panel: billed-to + invoice details ----
  const panelY = barY + 8;
  const panelHeight = 34;
  doc.setFillColor(...SLATE_50);
  doc.setDrawColor(...SLATE_200);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, panelY, contentWidth, panelHeight, 3, 3, "FD");

  const leftX = marginX + 7;
  let leftY = panelY + 9;
  drawText(doc, "BILLED TO", leftX, leftY, { font: "bold", size: 8, color: SLATE_400 });

  leftY += 7;
  drawText(doc, fields.studentName || "—", leftX, leftY, {
    font: "bold",
    size: 13,
    color: SLATE_900,
  });

  if (fields.studentPhone) {
    leftY += 5.5;
    drawText(doc, `Mobile: ${fields.studentPhone}`, leftX, leftY, { size: 9, color: SLATE_500 });
  }

  if (fields.studentAddress) {
    leftY += 5;
    drawText(doc, fields.studentAddress, leftX, leftY, { size: 9, color: SLATE_500 });
  }

  const rightX = contentRight - 7;
  let rightY = panelY + 10;
  drawText(doc, `Serial No: ${fields.serial || "—"}`, rightX, rightY, {
    font: "bold",
    size: 8.5,
    color: SLATE_500,
    align: "right",
  });

  rightY += 8;
  drawText(doc, fields.dateLabel || "—", rightX, rightY, {
    font: "bold",
    size: 13,
    color: TEAL_600,
    align: "right",
  });

  rightY += 6;
  drawText(doc, fields.invoiceNumber || "—", rightX, rightY, {
    size: 8.5,
    color: SLATE_400,
    align: "right",
  });

  // ---- Course details table ----
  let tableY = panelY + panelHeight + 12;
  drawText(doc, "COURSE DETAILS", marginX, tableY, { font: "bold", size: 8, color: SLATE_400 });

  tableY += 6;
  doc.setDrawColor(...SLATE_200);
  doc.line(marginX, tableY, contentRight, tableY);

  tableY += 6;
  drawText(doc, "DESCRIPTION", marginX, tableY, { font: "bold", size: 9.5, color: SLATE_900 });
  drawText(doc, "DURATION", marginX + contentWidth * 0.62, tableY, {
    font: "bold",
    size: 9.5,
    color: SLATE_900,
  });
  drawText(doc, "AMOUNT", contentRight, tableY, {
    font: "bold",
    size: 9.5,
    color: SLATE_900,
    align: "right",
  });

  tableY += 3;
  doc.line(marginX, tableY, contentRight, tableY);

  tableY += 9;
  drawText(doc, fields.description || "—", marginX, tableY, { size: 10.5, color: SLATE_700 });
  drawText(doc, "1", marginX + contentWidth * 0.62, tableY, { size: 10.5, color: SLATE_500 });
  drawText(doc, money(fields.total), contentRight, tableY, {
    font: "bold",
    size: 12,
    color: SLATE_900,
    align: "right",
  });

  tableY += 5;
  doc.setDrawColor(...SLATE_100);
  doc.line(marginX, tableY, contentRight, tableY);

  // ---- Payment summary ----
  const boxWidth = 78;
  const boxX = contentRight - boxWidth;
  let boxY = tableY + 10;

  function summaryRow(label, amount) {
    drawText(doc, label, boxX, boxY, { size: 10, color: SLATE_500 });
    drawText(doc, money(amount), contentRight, boxY, {
      font: "bold",
      size: 10,
      color: SLATE_900,
      align: "right",
    });
    boxY += 7;
  }

  summaryRow("Subtotal", fields.total);
  summaryRow("Paid", fields.paid);

  doc.setDrawColor(...SLATE_200);
  doc.line(boxX, boxY - 2, contentRight, boxY - 2);
  boxY += 4;

  const dueIsZero = Number(fields.due) <= 0;
  const dueBg = dueIsZero ? EMERALD_50 : AMBER_50;
  const dueTextColor = dueIsZero ? EMERALD_700 : AMBER_700;
  const dueBoxHeight = 13;

  doc.setFillColor(...dueBg);
  doc.roundedRect(boxX, boxY, boxWidth, dueBoxHeight, 2, 2, "F");
  drawText(doc, dueIsZero ? "PAID IN FULL" : "AMOUNT DUE", boxX + 4, boxY + 5, {
    font: "bold",
    size: 8.5,
    color: dueTextColor,
  });
  drawText(doc, money(fields.due), contentRight - 4, boxY + 10, {
    font: "bold",
    size: 13,
    color: dueTextColor,
    align: "right",
  });

  // ---- Signature + footer, anchored to the bottom of the page ----
  const footerY = pageHeight - 34;
  const signatureY = footerY - 26;

  drawText(doc, "Office Signature", contentRight - 25, signatureY, {
    size: 10,
    color: SLATE_500,
    align: "center",
  });
  doc.setDrawColor(...SLATE_400);
  doc.setLineWidth(0.3);
  doc.line(contentRight - 50, signatureY + 6, contentRight, signatureY + 6);

  drawText(doc, "*The registration fee is non refundable.", marginX, footerY, {
    font: "italic",
    size: 8.5,
    color: SLATE_500,
  });

  doc.setFillColor(...EMERALD_500);
  doc.rect(marginX, footerY + 4, contentWidth, 1, "F");

  drawText(doc, "Thank You!", marginX, footerY + 16, {
    font: "bolditalic",
    size: 18,
    color: SLATE_900,
  });
  drawText(doc, CONTACT_EMAIL, contentRight, footerY + 13, { size: 9.5, color: SLATE_700, align: "right" });
  drawText(doc, CONTACT_PHONE, contentRight, footerY + 18, { size: 9.5, color: SLATE_700, align: "right" });

  const fileName = `${(fields.invoiceNumber || "invoice").replace(/[^\w-]/g, "")}.pdf`;
  doc.save(fileName);
}
