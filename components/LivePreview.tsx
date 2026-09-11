
import React, { useRef } from 'react';
import type { CVData, TemplateComponent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface LivePreviewProps {
  cvData: CVData;
  templateComponent: TemplateComponent;
}

const LivePreview: React.FC<LivePreviewProps> = ({ cvData, templateComponent: Template }) => {
  const { translations } = useLanguage();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    // Temporarily increase scale for better quality
    const originalScale = element.style.transform;
    element.style.transform = 'scale(3)';

    const canvas = await html2canvas(element, {
      scale: 3, // Use a higher scale for better resolution
      useCORS: true,
      logging: false,
    });
    
    element.style.transform = originalScale;

    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save(`${cvData.personalInfo.fullName || 'cv'}.pdf`);
  };

  return (
    <div className="sticky top-8">
      <h2 className="text-xl font-bold text-blue-600 mb-4">{translations.livePreview}</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div ref={previewRef} className="bg-white w-full cv-preview overflow-hidden transform origin-top-left">
           <Template data={cvData} translations={translations} />
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleDownloadPDF}
          className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          {translations.downloadPDF}
        </button>
        <button
          disabled
          title={translations.downloadWord}
          className="flex-1 bg-slate-400 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed"
        >
          {translations.downloadWord}
        </button>
      </div>
    </div>
  );
};

export default LivePreview;
   