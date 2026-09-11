
import React from 'react';
import type { TemplateComponent } from '../types';

const CreativeTemplate: TemplateComponent = ({ data, translations }) => {
    const { personalInfo, summary, experience, education, skills, languages, hobbies } = data;

    const renderDate = (start: string, end: string) => {
        if (!start) return '';
        return `${start} - ${end || translations.present}`;
    }

    const Section: React.FC<{title: string, children: React.ReactNode, icon: string}> = ({ title, children, icon }) => (
        <div className="mb-4">
            <h3 className="text-sm font-bold flex items-center mb-2">
                <span className="text-blue-500 text-base me-2">{icon}</span>
                <span className="border-b-2 border-blue-500 pb-1">{title}</span>
            </h3>
            {children}
        </div>
    );
    
    return (
        <div className="bg-white text-gray-800 font-sans text-[8px] leading-relaxed p-5 h-full">
            <header className="flex items-center mb-5">
                {personalInfo.photo && (
                    <div className="w-24 h-24 me-4 rounded-full border-4 border-blue-500 p-1 overflow-hidden">
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-blue-600 tracking-tighter">{personalInfo.fullName || translations.fullName}</h1>
                    <p className="text-xs">{personalInfo.email}</p>
                    <p className="text-xs">{personalInfo.phone}</p>
                    <p className="text-xs">{personalInfo.address}</p>
                </div>
            </header>

            {summary && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-center text-xs italic text-blue-800">{summary}</p>
                </div>
            )}
            
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3">
                    {experience.length > 0 && (
                        <Section title={translations.experience} icon="💼">
                            {experience.map(exp => (
                                <div key={exp.id} className="mb-2">
                                    <h4 className="font-bold text-xs">{exp.jobTitle || translations.jobTitle} at {exp.company || translations.company}</h4>
                                    <p className="text-xs text-slate-500">{renderDate(exp.startDate, exp.endDate)}</p>
                                    <p className="text-xs mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </Section>
                    )}
                     {education.length > 0 && (
                        <Section title={translations.education} icon="🎓">
                            {education.map(edu => (
                                <div key={edu.id} className="mb-2">
                                    <h4 className="font-bold text-xs">{edu.degree || translations.degree}</h4>
                                    <p className="text-xs">{edu.institution || translations.institution}</p>
                                    <p className="text-xs text-slate-500">{renderDate(edu.startDate, edu.endDate)}</p>
                                </div>
                            ))}
                        </Section>
                    )}
                </div>

                <div className="col-span-2">
                    {skills.length > 0 && (
                        <Section title={translations.skills} icon="🛠️">
                            {skills.map((skill, i) => (
                                <div key={i} className="mb-1">
                                    <p className="text-xs">{skill}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-1"><div className="bg-blue-500 h-1 rounded-full" style={{width: `${Math.random() * 50 + 50}%`}}></div></div>
                                </div>
                            ))}
                        </Section>
                    )}
                    {languages.length > 0 && (
                         <Section title={translations.languages} icon="🌐">
                            <ul className="list-disc list-inside">
                                {languages.map((lang, i) => <li key={i} className="text-xs">{lang}</li>)}
                            </ul>
                        </Section>
                    )}
                    {hobbies.length > 0 && (
                         <Section title={translations.hobbies} icon="🎨">
                            <p className="text-xs">{hobbies.join(', ')}</p>
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
   