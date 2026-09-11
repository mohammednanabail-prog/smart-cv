
import React, { useState } from 'react';
import type { CVData, Experience, Education, Template } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { generateSummary, generateSkills } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

interface CvFormProps {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
    templates: Template[];
    selectedTemplate: Template;
    setSelectedTemplate: (template: Template) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">{title}</h2>
        {children}
    </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea
        {...props}
        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        rows={4}
    />
);

const CvForm: React.FC<CvFormProps> = ({ cvData, setCvData, templates, selectedTemplate, setSelectedTemplate }) => {
    const { translations, language } = useLanguage();
    const [aiLoading, setAiLoading] = useState(false);

    const handleChange = <T,>(section: keyof CVData, field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCvData(prev => ({
            ...prev,
            [section]: {
                ...(prev[section] as object),
                [field]: e.target.value
            }
        }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCvData(prev => ({
                    ...prev,
                    personalInfo: {
                        ...prev.personalInfo,
                        photo: event.target?.result as string
                    }
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSuggestSummary = async () => {
        const jobTitle = cvData.experience[0]?.jobTitle || 'professional';
        setAiLoading(true);
        const summary = await generateSummary(jobTitle, language);
        setCvData(prev => ({...prev, summary}));
        setAiLoading(false);
    };
    
    // List management functions
    const addListItem = <T,>(section: 'experience' | 'education', newItem: T) => {
        setCvData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

    const updateListItem = <T extends {id: string}>(section: 'experience' | 'education', updatedItem: T) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].map(item => (item.id === updatedItem.id ? updatedItem : item))
        }));
    };
    
    const removeListItem = (section: 'experience' | 'education', id: string) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };
    
    // Generic list handlers
    const handleAddExperience = () => addListItem<Experience>('experience', {id: uuidv4(), jobTitle: '', company: '', startDate: '', endDate: '', description: ''});
    const handleAddEducation = () => addListItem<Education>('education', {id: uuidv4(), degree: '', institution: '', startDate: '', endDate: ''});
    
    const handleUpdateExperience = (item: Experience) => updateListItem<Experience>('experience', item);
    const handleUpdateEducation = (item: Education) => updateListItem<Education>('education', item);
    
    const handleRemoveExperience = (id: string) => removeListItem('experience', id);
    const handleRemoveEducation = (id: string) => removeListItem('education', id);

    // Tag list handlers (skills, languages, hobbies)
    const handleTagListChange = (section: 'skills' | 'languages' | 'hobbies') => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            setCvData(prev => ({
                ...prev,
                [section]: [...prev[section], value]
            }));
            e.currentTarget.value = '';
        }
    };
    
    const removeTag = (section: 'skills' | 'languages' | 'hobbies', index: number) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    return (
        <div>
            <Section title={translations.chooseTemplate}>
                <div className="grid grid-cols-3 gap-4">
                    {templates.map(template => (
                        <div key={template.key} onClick={() => setSelectedTemplate(template)} className={`cursor-pointer rounded-lg overflow-hidden border-4 ${selectedTemplate.key === template.key ? 'border-blue-500' : 'border-transparent hover:border-blue-200'}`}>
                            <img src={template.thumbnail} alt={template.name} className="w-full h-auto object-cover" />
                            <p className="text-center bg-slate-100 p-1 text-sm font-semibold">{template.name}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title={translations.personalInfo}>
                <div className="space-y-4">
                    <Input placeholder={translations.fullName} value={cvData.personalInfo.fullName} onChange={handleChange('personalInfo', 'fullName')} />
                    <Input type="email" placeholder={translations.email} value={cvData.personalInfo.email} onChange={handleChange('personalInfo', 'email')} />
                    <Input placeholder={translations.phone} value={cvData.personalInfo.phone} onChange={handleChange('personalInfo', 'phone')} />
                    <Input placeholder={translations.address} value={cvData.personalInfo.address} onChange={handleChange('personalInfo', 'address')} />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{translations.uploadPhoto}</label>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        <p className="text-xs text-slate-500 mt-1">{translations.photoRequirement}</p>
                    </div>
                </div>
            </Section>

            <Section title={translations.summary}>
                 <Textarea placeholder={translations.summaryPlaceholder} value={cvData.summary} onChange={e => setCvData(p => ({ ...p, summary: e.target.value }))} />
                 <button onClick={handleSuggestSummary} disabled={aiLoading} className="mt-2 w-full bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-md hover:bg-blue-200 transition disabled:opacity-50 flex items-center justify-center">
                    {aiLoading ? (
                        <>
                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         {translations.generating}
                        </>
                    ) : `🤖 ${translations.suggestWithAI}` }
                 </button>
            </Section>
            
            <Section title={translations.experience}>
                {cvData.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded-md mb-4 relative">
                        <button onClick={() => handleRemoveExperience(exp.id)} className="absolute top-2 end-2 text-red-500 hover:text-red-700">&times;</button>
                        <Input placeholder={translations.jobTitle} value={exp.jobTitle} onChange={e => handleUpdateExperience({...exp, jobTitle: e.target.value})} className="mb-2"/>
                        <Input placeholder={translations.company} value={exp.company} onChange={e => handleUpdateExperience({...exp, company: e.target.value})} className="mb-2"/>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input type="date" placeholder={translations.startDate} value={exp.startDate} onChange={e => handleUpdateExperience({...exp, startDate: e.target.value})}/>
                          <Input type="date" placeholder={translations.endDate} value={exp.endDate} onChange={e => handleUpdateExperience({...exp, endDate: e.target.value})}/>
                        </div>
                        <Textarea placeholder={translations.description} value={exp.description} onChange={e => handleUpdateExperience({...exp, description: e.target.value})}/>
                    </div>
                ))}
                <button onClick={handleAddExperience} className="w-full border-2 border-dashed border-slate-300 text-slate-500 py-2 rounded-md hover:bg-slate-50 transition">+ {translations.addExperience}</button>
            </Section>
            
            <Section title={translations.education}>
                 {cvData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-md mb-4 relative">
                        <button onClick={() => handleRemoveEducation(edu.id)} className="absolute top-2 end-2 text-red-500 hover:text-red-700">&times;</button>
                        <Input placeholder={translations.degree} value={edu.degree} onChange={e => handleUpdateEducation({...edu, degree: e.target.value})} className="mb-2"/>
                        <Input placeholder={translations.institution} value={edu.institution} onChange={e => handleUpdateEducation({...edu, institution: e.target.value})} className="mb-2"/>
                        <div className="grid grid-cols-2 gap-2">
                           <Input type="date" placeholder={translations.startDate} value={edu.startDate} onChange={e => handleUpdateEducation({...edu, startDate: e.target.value})}/>
                           <Input type="date" placeholder={translations.endDate} value={edu.endDate} onChange={e => handleUpdateEducation({...edu, endDate: e.target.value})}/>
                        </div>
                    </div>
                ))}
                <button onClick={handleAddEducation} className="w-full border-2 border-dashed border-slate-300 text-slate-500 py-2 rounded-md hover:bg-slate-50 transition">+ {translations.addEducation}</button>
            </Section>

            {['skills', 'languages', 'hobbies'].map(sectionKey => {
                const key = sectionKey as 'skills' | 'languages' | 'hobbies';
                return (
                    <Section key={key} title={translations[key]}>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {cvData[key].map((item, index) => (
                                <div key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full flex items-center">
                                    {item}
                                    <button onClick={() => removeTag(key, index)} className="ms-2 text-blue-600 hover:text-blue-800">&times;</button>
                                </div>
                            ))}
                        </div>
                        <Input placeholder={translations[`${key}Placeholder`]} onKeyDown={handleTagListChange(key)} />
                    </Section>
                );
            })}
        </div>
    );
};

export default CvForm;
   