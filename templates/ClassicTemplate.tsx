
import React from 'react';
import type { TemplateComponent, CVData } from '../types';

const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-3">
        <h3 className="text-sm font-bold uppercase border-b-2 border-gray-700 pb-1 mb-2 text-gray-800">{title}</h3>
        {children}
    </div>
);

const ClassicTemplate: TemplateComponent = ({ data, translations }) => {
    const { personalInfo, summary, experience, education, skills, languages, hobbies } = data;
    
    const renderDate = (start: string, end: string) => {
      if (!start) return '';
      const startYear = start ? new Date(start).getFullYear() : '';
      const endYear = end ? new Date(end).getFullYear() : translations.present;
      return `${startYear} - ${endYear}`;
    }

    return (
        <div className="p-6 bg-white text-gray-800 font-serif text-[8px] leading-relaxed">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-wider">{personalInfo.fullName || translations.fullName}</h1>
                <p className="text-xs mt-1">
                    {personalInfo.email} {personalInfo.email && personalInfo.phone && ' | '} {personalInfo.phone} {personalInfo.phone && personalInfo.address && ' | '} {personalInfo.address}
                </p>
            </header>

            {summary && (
                <Section title={translations.summary}>
                    <p className="text-xs">{summary}</p>
                </Section>
            )}

            {experience.length > 0 && (
                <Section title={translations.experience}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-xs font-bold">{exp.jobTitle || translations.jobTitle}</h4>
                                <p className="text-xs font-light">{renderDate(exp.startDate, exp.endDate)}</p>
                            </div>
                            <p className="text-xs italic">{exp.company || translations.company}</p>
                            <p className="text-xs mt-1">{exp.description}</p>
                        </div>
                    ))}
                </Section>
            )}
            
            {education.length > 0 && (
                <Section title={translations.education}>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-xs font-bold">{edu.degree || translations.degree}</h4>
                                <p className="text-xs font-light">{renderDate(edu.startDate, edu.endDate)}</p>
                            </div>
                            <p className="text-xs italic">{edu.institution || translations.institution}</p>
                        </div>
                    ))}
                </Section>
            )}

            <div className="grid grid-cols-3 gap-4">
                {skills.length > 0 && (
                    <Section title={translations.skills}>
                        <ul className="list-none">
                            {skills.map((skill, i) => <li key={i} className="text-xs">{skill}</li>)}
                        </ul>
                    </Section>
                )}
                
                {languages.length > 0 && (
                     <Section title={translations.languages}>
                        <ul className="list-none">
                            {languages.map((lang, i) => <li key={i} className="text-xs">{lang}</li>)}
                        </ul>
                    </Section>
                )}

                {hobbies.length > 0 && (
                     <Section title={translations.hobbies}>
                        <ul className="list-none">
                            {hobbies.map((hobby, i) => <li key={i} className="text-xs">{hobby}</li>)}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
    );
};

export default ClassicTemplate;
   