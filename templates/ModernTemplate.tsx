
import React from 'react';
import type { TemplateComponent } from '../types';

const ModernTemplate: TemplateComponent = ({ data, translations }) => {
    const { personalInfo, summary, experience, education, skills, languages, hobbies } = data;
    
    const renderDate = (start: string, end: string) => {
        if (!start) return '';
        return `${start} / ${end || translations.present}`;
    }

    const Section: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({ title, children, className }) => (
        <div className={`mb-3 ${className}`}>
            <h3 className="text-sm font-bold uppercase text-blue-700 tracking-wider mb-2">{title}</h3>
            {children}
        </div>
    );

    return (
        <div className="flex font-sans text-[8px] leading-relaxed h-full bg-white">
            {/* Sidebar */}
            <aside className="w-1/3 bg-slate-100 p-4 text-slate-800 flex flex-col">
                {personalInfo.photo && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold text-slate-900">{personalInfo.fullName || translations.fullName}</h1>
                </div>
                
                <div className="space-y-3">
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-1">{translations.email}</h4>
                        <p className="text-xs break-all">{personalInfo.email}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-1">{translations.phone}</h4>
                        <p className="text-xs">{personalInfo.phone}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-1">{translations.address}</h4>
                        <p className="text-xs">{personalInfo.address}</p>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                     {skills.length > 0 && (
                        <div>
                            <h3 className="font-bold text-xs uppercase mb-1">{translations.skills}</h3>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, i) => <span key={i} className="bg-blue-200 text-blue-800 text-[7px] px-2 py-1 rounded-full">{skill}</span>)}
                            </div>
                        </div>
                    )}
                     {languages.length > 0 && (
                        <div>
                            <h3 className="font-bold text-xs uppercase mb-1">{translations.languages}</h3>
                            <ul className="list-none">
                                {languages.map((lang, i) => <li key={i} className="text-xs">{lang}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="w-2/3 p-5">
                {summary && (
                    <Section title={translations.summary}>
                        <p className="text-xs">{summary}</p>
                    </Section>
                )}
                {experience.length > 0 && (
                    <Section title={translations.experience}>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-2">
                                <h4 className="text-xs font-bold">{exp.jobTitle || translations.jobTitle}</h4>
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>{exp.company || translations.company}</span>
                                    <span>{renderDate(exp.startDate, exp.endDate)}</span>
                                </div>
                                <p className="text-xs">{exp.description}</p>
                            </div>
                        ))}
                    </Section>
                )}
                {education.length > 0 && (
                    <Section title={translations.education}>
                        {education.map(edu => (
                           <div key={edu.id} className="mb-2">
                                <h4 className="text-xs font-bold">{edu.degree || translations.degree}</h4>
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>{edu.institution || translations.institution}</span>
                                    <span>{renderDate(edu.startDate, edu.endDate)}</span>
                                </div>
                            </div>
                        ))}
                    </Section>
                )}
                 {hobbies.length > 0 && (
                     <Section title={translations.hobbies}>
                        <p className="text-xs">{hobbies.join(', ')}</p>
                    </Section>
                )}
            </main>
        </div>
    );
};

export default ModernTemplate;
   