"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  CreditCardIcon,
  DownloadIcon,
  ShieldCheckIcon,
  EyeIcon,
  FileTextIcon,
} from "@/components/icons";

interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  programTitle: string;
  date: string;
  method: "Mada" | "Apple Pay" | "Visa";
  baseAmountSar: number;
  vatSar: number;
  feeSar: number;
  totalSar: number;
  status: "مدفوع ومحمي بالضمان" | "مسترد";
}

const INITIAL_INVOICES: PaymentInvoice[] = [
  {
    id: "inv-101",
    invoiceNumber: "RFQ-INV-2026-9042",
    programTitle: "جولة مدائن صالح والبلدة القديمة بالعلا",
    date: "2026-08-15",
    method: "Mada",
    baseAmountSar: 1450,
    vatSar: 217.5,
    feeSar: 32.5,
    totalSar: 1700,
    status: "مدفوع ومحمي بالضمان",
  },
  {
    id: "inv-100",
    invoiceNumber: "RFQ-INV-2026-8811",
    programTitle: "جولة تاريخية في حارة البلد بجدة",
    date: "2026-08-12",
    method: "Apple Pay",
    baseAmountSar: 250,
    vatSar: 37.5,
    feeSar: 12.5,
    totalSar: 300,
    status: "مدفوع ومحمي بالضمان",
  },
];

export default function ClientPaymentsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success } = useToast();

  const [invoices] = useState<PaymentInvoice[]>(INITIAL_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentInvoice | null>(null);

  const handleDownloadPdf = (inv: PaymentInvoice) => {
    success(`جاري تحميل الفاتورة الضريبية رقم (${inv.invoiceNumber}) بتنسيق PDF.`);
  };

  const columns: DataTableColumn<PaymentInvoice>[] = [
    {
      key: "invoiceNumber",
      headerAr: "رقم الفاتورة والبرنامج",
      headerEn: "Invoice & Tour",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "12px", color: "var(--color-gold-heading)", fontFamily: "monospace" }}>
            {row.invoiceNumber}
          </span>
          <h4 style={{ fontSize: "13px", fontWeight: 800, margin: "2px 0 0 0" }}>{row.programTitle}</h4>
        </div>
      ),
    },
    {
      key: "date",
      headerAr: "تاريخ الدفع",
      headerEn: "Payment Date",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{row.date}</span>,
    },
    {
      key: "method",
      headerAr: "طريقة الدفع",
      headerEn: "Payment Method",
      render: (row) => (
        <span
          style={{
            background: "rgba(200, 169, 110, 0.12)",
            color: "var(--color-gold-heading)",
            border: "1px solid rgba(200, 169, 110, 0.3)",
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.method}
        </span>
      ),
    },
    {
      key: "total",
      headerAr: "المبلغ الإجمالي (SAR)",
      headerEn: "Total Amount",
      render: (row) => (
        <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
          {row.totalSar.toLocaleString("en-US")} ر.س
        </span>
      ),
    },
    {
      key: "status",
      headerAr: "حالة الدفع والضمان",
      headerEn: "Escrow Status",
      render: (row) => (
        <span style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10B981", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <ShieldCheckIcon size={13} />
          <span>{row.status}</span>
        </span>
      ),
    },
    {
      key: "actions",
      headerAr: "الفاتورة",
      headerEn: "Invoice PDF",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(row)}>
            <EyeIcon size={14} />
            <span>عرض</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleDownloadPdf(row)}>
            <DownloadIcon size={14} />
            <span>PDF</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          سجل المدفوعات والفواتير الضريبية
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          استعراض الفواتير الضريبية المعتمدة (ZATCA)، تفاصيل حساب الضمان Escrow، وتحميل مستندات الدفع
        </p>
      </div>

      {/* DataTable */}
      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="بحث برقم الفاتورة، أو اسم البرنامج..."
        searchFilter={(row, query) =>
          row.invoiceNumber.toLowerCase().includes(query) ||
          row.programTitle.toLowerCase().includes(query)
        }
      />

      {/* Modal: View Tax Invoice */}
      <Modal isOpen={Boolean(selectedInvoice)} onClose={() => setSelectedInvoice(null)} title="الفاتورة الضريبية الإلكترونية المعتمدة" maxWidth="560px">
        {selectedInvoice && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Invoice Header */}
            <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 900, margin: 0, color: "var(--color-gold-heading)" }}>منصة رفيق للسياحة</h3>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>الرقم الضريبي: 310984210900003</span>
              </div>
              <div style={{ textAlign: "end" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, fontFamily: "monospace" }}>{selectedInvoice.invoiceNumber}</span>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)", display: "block" }}>التاريخ: {selectedInvoice.date}</span>
              </div>
            </div>

            {/* Tour & Client Breakdown */}
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "13px" }}>
              <div style={{ fontWeight: 800, marginBottom: "8px" }}>{selectedInvoice.programTitle}</div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "var(--color-text-secondary)" }}>
                <span>قيمة البرنامج الأساسية:</span>
                <span>{selectedInvoice.baseAmountSar} ر.س</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "var(--color-text-secondary)" }}>
                <span>ضريبة القيمة المضافة (15%):</span>
                <span>{selectedInvoice.vatSar} ر.س</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "var(--color-text-secondary)" }}>
                <span>رسوم الخدمة والتشغيل:</span>
                <span>{selectedInvoice.feeSar} ر.س</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", marginTop: "6px", borderTop: "1px solid var(--color-border)", fontSize: "16px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                <span>المبلغ الإجمالي المدفوع:</span>
                <span>{selectedInvoice.totalSar} ر.س</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>
                مدفوعة بالكامل ومحفوظة في حساب الضمان البنكي Escrow
              </span>
              <Button variant="primary" size="md" onClick={() => handleDownloadPdf(selectedInvoice)}>
                <DownloadIcon size={16} />
                <span>تحميل PDF</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
