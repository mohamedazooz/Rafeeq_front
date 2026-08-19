export interface GuideProfile {
  id: string;
  fullName: string;
  licenseNo: string;
  licenseExpiry: string;
  city: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  languages: string[];
  avatarUrl?: string;
  bio: string;
  isVerified: boolean;
  pricePerDay: number;
}

export interface BecomeGuideApplication {
  fullName: string;
  nationalId: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: string;
  licenseNo: string;
  licenseExpiry: string;
  firstAidCertNo: string;
  city: string;
  vehicleType: string;
  specialties: string[];
  languages: string[];
  bio: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}
