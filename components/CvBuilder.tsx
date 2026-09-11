
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { CVData, Template, TemplateKey } from '../types';
import CvForm from './CvForm';
import LivePreview from './LivePreview';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const CvBuilder: React.FC = () => {
    const { translations } = useLanguage();
  
    const initialCVData: CVData = useMemo(() => ({
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        photo: null,
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      languages: [],
      hobbies: [],
    }), []);

    const [cvData, setCvData] = useState<CVData>(initialCVData);

    const templates: Template[] = useMemo(() => [
        { key: 'classic', name: translations.classic, component: ClassicTemplate, thumbnail: 'https://picsum.photos/seed/classic/200/282' },
        { key: 'modern', name: translations.modern, component: ModernTemplate, thumbnail: 'https://picsum.photos/seed/modern/200/282' },
        { key: 'creative', name: translations.creative, component: CreativeTemplate, thumbnail: 'https://picsum.photos/seed/creative/200/282' },
    ], [translations]);

    const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
                <CvForm 
                    cvData={cvData} 
                    setCvData={setCvData} 
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                />
            </div>
            <div className="lg:col-span-1">
                <LivePreview cvData={cvData} templateComponent={selectedTemplate.component} />
            </div>
        </div>
    );
};

export default CvBuilder;
   