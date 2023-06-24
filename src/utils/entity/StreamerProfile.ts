export interface StreamerProfileSocials {
  youtube?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tikTok?: string;
}

export interface WhereTipsGoes {
  name: string;
  limit: number;
  actualTipValue: number;
}

export type ColorRGB = {r: number, g: number, b: number};

export interface StreamerProfile {
  userColor?: ColorRGB;
  name: string;
  description: string;
  avatarUrl?: string;
  backgroundImageUrl?: string;
  isVerified?: boolean;
  socials?: StreamerProfileSocials;
  hasTips?: boolean;
  whereTipsGoes?: WhereTipsGoes[];
  allowRecord?: boolean;
  predefinedPrices?: number[];
}