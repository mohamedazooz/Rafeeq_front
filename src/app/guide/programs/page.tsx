"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  FileTextIcon,
  PlusIcon,
  EditIcon,
  EyeIcon,
  StarIcon,
  CheckCircleIcon,
  CompassIcon,
} from "@/components/icons";

interface GuideProgramItem {
  id: string;
  title: string;
  category: string;
  priceSar: number;
  duration: string;
  bookingsCount: number;
  rating: number;
  status: "منشور بالكتالوج" | "قيد مراجعة الإدارة" | "مسودة";
  isActive: boolean;
}

const INITIAL_PROGRAMS: GuideProgramItem[] = [
  {
    id: "prog-1",
    title: "جولة مدائن صالح والبلدة القديمة بالعلا",
    category: "تراث وآثار",
    priceSar: 850,
    duration: "يومان (8 ساعات)",
    bookingsCount: 18,
    rating: 4.95,
    status: "منشور بالكتالوج",
    isActive: true,
  },
  {
    id: "prog-2",
    title: "مراقبة الفلك وتأمل النجوم في صحراء الغراميل",
    category: "سياحة فلكية وصحراوية",
    priceSar: 450,
    duration: "5 ساعات",
    bookingsCount: 0,
    rating: 0,
    status: "قيد مراجعة الإدارة",
    isActive: true,
  },
  {
    id: "prog-3",
    title: "جولة صخور جبل الفيل وسهرة الشاي التراثي",
    category: "طبيعة ومغامرات",
    priceSar: 300,
    duration: "3 ساعات",
    bookingsCount: 10,
    rating: 4.9,
    status: "منشور بالكتالوج",
    isActive: true,
  },
];

export default function GuideProgramsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success } = useToast();

  const [programs, setPrograms] = useState<GuideProgramItem[]>(INITIAL_PROGRAMS);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPrograms = programs.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );

  const toggleProgramStatus = (id: string) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    success("تم تحديث حالة تفعيل استقبال الحجوزات للبرنامج!");
  };

  const columns: DataTableColumn<GuideProgramItem>[] = [
    {
      key: "title",
      headerAr: "عنوان البرنامج والتصنيف",
      headerEn: "Tour Title & Category",
      render: (row) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CompassIcon size={16} color="var(--color-gold-heading)" />
            <h4 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>{row.title}</h4>
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.category} • {row.duration}</span>
        </div>
      ),
    },
    {
      key: "price",
      headerAr: "السعر للشخص",
      headerEn: "Price per Person",
      render: (row) => (
        <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
          {row.priceSar} ر.س
        </span>
      ),
    },
    {
      key: "performance",
      headerAr: "الحجوزات والتقييم",
      headerEn: "Bookings & Rating",
      render: (row) => (
        <div style={{ fontSize: "12px" }}>
          <div><strong style={{ color: "var(--color-gold-heading)" }}>{row.bookingsCount}</strong> رحلة محجوزة</div>
          <span style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>
            {row.rating > 0 ? `${row.rating} ⭐` : "برنامج جديد"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      headerAr: "حالة البرنامج",
      headerEn: "Status",
      render: (row) => {
        const isPublished = row.status === "منشور بالكتالوج";
        const isPending = row.status === "قيد مراجعة الإدارة";

        const bg = isPublished
          ? "rgba(16, 185, 129, 0.12)"
          : isPending
          ? "rgba(245, 158, 11, 0.12)"
          : "rgba(100, 116, 139, 0.12)";

        const color = isPublished ? "#10B981" : isPending ? "#F59E0B" : "var(--color-text-muted)";

        return (
          <span style={{ background: bg, color, padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>
            {row.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Link href={`/programs/${row.id}`}>
            <Button variant="ghost" size="sm">
              <EyeIcon size={14} />
              <span>معاينة</span>
            </Button>
          </Link>
          <Button variant={row.isActive ? "outline" : "primary"} size="sm" onClick={() => toggleProgramStatus(row.id)}>
            {row.isActive ? "إيقاف مؤقت" : "تفعيل الحجز"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            محفظة برامجي وجولاتي السياحية 📋
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            إدارة البرامج المنشورة، متابعة حالة مراجعة الإدارة للبرامج الجديدة، وتعديل خطط الأسعار
          </p>
        </div>

        <Link href="/guide/programs/create">
          <Button variant="primary" size="md">
            <PlusIcon size={16} />
            <span>إنشاء برنامج سياحي جديد</span>
          </Button>
        </Link>
      </div>

      {/* DataTable */}
      <DataTable
        data={filteredPrograms}
        columns={columns}
        searchPlaceholder="بحث في برامجي السياحية..."
        searchFilter={(row, query) =>
          row.title.toLowerCase().includes(query) ||
          row.category.toLowerCase().includes(query)
        }
        filtersSlot={
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant={statusFilter === "all" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("all")}>
              الكل ({programs.length})
            </Button>
            <Button variant={statusFilter === "منشور بالكتالوج" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("منشور بالكتالوج")}>
              منشور
            </Button>
            <Button variant={statusFilter === "قيد مراجعة الإدارة" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("قيد مراجعة الإدارة")}>
              قيد المراجعة
            </Button>
          </div>
        }
      />
    </div>
  );
}
