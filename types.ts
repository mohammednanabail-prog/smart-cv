
export type Language = 'ar' | 'en' | 'fr';

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    photo: string | null;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  hobbies: string[];
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export type TemplateComponent = React.FC<{ data: CVData; translations: any; }>;

export type TemplateKey = 'classic' | 'modern' | 'creative';

export interface Template {
  key: TemplateKey;
  name: string;
  component: TemplateComponent;
  thumbnail: string;
}
   