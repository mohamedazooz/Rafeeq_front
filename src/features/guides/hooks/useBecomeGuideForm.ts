"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GuidesService } from "../services/guides.service";
import { BecomeGuideApplication } from "../types/guides.types";

export function useBecomeGuideForm(isAr: boolean) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Step 2
  const [licenseNo, setLicenseNo] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [licenseFile, setLicenseFile] = useState<string | null>(null);
  const [firstAidCertNo, setFirstAidCertNo] = useState("");

  // Step 3
  const [city, setCity] = useState("الرياض — Riyadh");
  const [vehicleType, setVehicleType] = useState("سيارة دفع رباعي مجهزة للصحراء (4x4)");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(["تراث وتاريخ آثار", "مغامرات وتخييم وهايكنج"]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["العربية", "الإنجليزية (English)"]);
  const [bio, setBio] = useState("");

  // Step 4
  const [bankName, setBankName] = useState("Al Rajhi Bank — مصرف الراجحي");
  const [accountHolder, setAccountHolder] = useState("");
  const [iban, setIban] = useState("SA");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleSpecialty = (spec: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleLanguage = (l: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(l) ? prev.filter((item) => item !== l) : [...prev, l]
    );
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 400, behavior: "smooth" });
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const applicationData: BecomeGuideApplication = {
        fullName,
        nationalId,
        email,
        phone,
        dateOfBirth,
        emergencyContact,
        licenseNo,
        licenseExpiry,
        firstAidCertNo,
        city,
        vehicleType,
        specialties: selectedSpecialties,
        languages: selectedLanguages,
        bio,
        bankName,
        accountHolder: accountHolder || fullName,
        iban,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      await GuidesService.submitApplication(applicationData);
      router.push("/become-guide/pending");
    } catch {
      setIsLoading(false);
      setErrorMsg(isAr ? "حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى." : "An error occurred while saving your application.");
    }
  };

  return {
    step,
    setStep,
    fullName,
    setFullName,
    nationalId,
    setNationalId,
    email,
    setEmail,
    phone,
    setPhone,
    dateOfBirth,
    setDateOfBirth,
    emergencyContact,
    setEmergencyContact,
    licenseNo,
    setLicenseNo,
    licenseExpiry,
    setLicenseExpiry,
    licenseFile,
    setLicenseFile,
    firstAidCertNo,
    setFirstAidCertNo,
    city,
    setCity,
    vehicleType,
    setVehicleType,
    selectedSpecialties,
    toggleSpecialty,
    selectedLanguages,
    toggleLanguage,
    bio,
    setBio,
    bankName,
    setBankName,
    accountHolder,
    setAccountHolder,
    iban,
    setIban,
    isLoading,
    errorMsg,
    handleNextStep,
  };
}
