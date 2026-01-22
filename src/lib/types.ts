export interface NavigationItem {
  sys: { id: string };
  fields: {
    label: string;
    url: string;
    isExternal?: boolean;
    order: number;
  };
}

export interface Navigation {
  sys: { id: string };
  fields: {
    name: string;
    menuItems: NavigationItem[];
  };
}

export interface HeroSectionData {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface HeroSection {
  sys: { id: string };
  fields: {
    title: string;
    subtitle: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

export interface InfoCard {
  sys: { id: string };
  fields: {
    title: string;
    icon: string;
    content: string;
    order: number;
  };
}

export interface Event {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    description: string;
    eventType: 'main-event' | 'side-event' | 'qualifier';
    day: 'friday' | 'saturday' | 'sunday';
    date: string;
    startTime: string;
    format: string;
    location: string;
    entryFee: number;
    rules?: string;
    schedule?: string;
    isFeatured?: boolean;
  };
}

export interface Vendor {
  sys: { id: string };
  fields: {
    name: string;
    slug: string;
    icon: string;
    description: string;
    products: string;
    website?: string;
    email?: string;
    order: number;
  };
}

export interface Location {
  sys: { id: string };
  fields: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    transportInfo: any;
    parkingInfo: any;
  };
}

export interface InfoSection {
  sys: { id: string };
  fields: {
    title: string;
    icon?: string;
    content: any;
    order: number;
  };
}

export interface PracticalInfoItem {
  sys: { id: string };
  fields: {
    title: string;
    icon?: string;
    content: any;
    order: number;
  };
}

export interface ByeTournamentInfoSection {
  sys: { id: string };
  fields: {
    title: string;
    icon?: string;
    description: any;
    order: number;
  };
}

export interface FAQItem {
  sys: { id: string };
  fields: {
    question: string;
    answer: any;
    category: 'general' | 'registration' | 'rules' | 'bye';
    order: number;
  };
}

export interface CountdownData {
  sys: { id: string };
  fields: {
    label: string;
    targetDate: string;
    description?: string;
  };
}

export interface Page {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    description: string;
    heroSection: HeroSection;
    order: number;
  };
}