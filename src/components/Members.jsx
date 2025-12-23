import React, { useState } from 'react';
import DecryptText from './DecryptText';
import { useFadeIn } from '../hooks/useFadeIn';
import { Linkedin, Instagram } from 'lucide-react';
import { membersData } from '../data/membersData'; 

const Members = () => {
  const [members] = useState(membersData);

  const domainDescriptions = {
    "TECH": "Engineering the digital backbone via next-gen protocols in Cloud, AI, and Machine Learning.",
    "R&D": "Operating at the bleeding edge to convert theoretical data into tangible, industry-grade solutions.",
    "DESIGN": "Architecting the visual interface where military precision meets artistic chaos.",
    "Public Relations": "Managing signal transmission to bridge the gap between student talent and industry giants.",
    "MEDIA": "The system’s visual cortex, capturing and rendering our legacy through high-fidelity storytelling."
  };

  const teachers = members.filter(m => m.tier === 'FACULTY');
  const coreTeam = members.filter(m => m.tier === 'CORE');
  const domainNames = [...new Set(members.filter(m => m.domain).map(m => m.domain))];
  
  const squads = domainNames.map(domain => {
    const domainMembers = members.filter(m => m.domain === domain);
    const description = domainDescriptions[domain] || `Classified operations for the ${domain} division.`;

    let displayTitle = domain;
    if (domain === 'TECH') displayTitle = 'Technical';
    if (domain === 'R&D') displayTitle = 'R & D';
    if (domain === 'DESIGN') displayTitle = 'Design';
    if (domain === 'MEDIA') displayTitle = 'Media';
    if (domain === 'Public Relations') displayTitle = 'Public Relations';

    return {
      id: domain,
      title: displayTitle, 
      leads: domainMembers.filter(m => m.tier === 'LEAD'),
      members: domainMembers
        .filter(m => m.tier === 'MEMBER')
        .sort((a, b) => a.name.localeCompare(b.name)), 
      desc: description 
    };
  });

  return (
    <section id="members" className="min-h-screen py-24 px-4 md:px-8 relative z-10 bg-black/50">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 text-center space-y-4">
          <p className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">
            <DecryptText text="System Personnel" />
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">
               <DecryptText text="COMMAND HIERARCHY" />
             </span>
          </h2>
        </div>

        {/* FACULTY SECTION */}
        {teachers.length > 0 && (
          <div className="mb-32">
             <div className="flex items-center gap-4 mb-10 justify-center">
              <div className="h-[1px] w-12 bg-blue-500"></div>
              <h3 className="text-2xl font-bold text-white tracking-widest uppercase text-center">
                <DecryptText text="Faculty Coordinators" />
              </h3>
              <div className="h-[1px] w-12 bg-blue-500"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="w-full md:w-[450px] group relative">
                  <div className="relative h-[250px] bg-white/5 border border-white/10 rounded-2xl flex items-center p-8 gap-8 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500/30 group-hover:border-blue-400 transition-colors shrink-0">
                         <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div>
                         <h4 className="text-2xl font-bold text-white mt-3">{teacher.name}</h4>
                         <p className="text-blue-400 text-sm uppercase tracking-wider mt-2 font-mono">{teacher.role}</p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CORE TEAM */}
        {coreTeam.length > 0 && (
          <div className="mb-40">
            <h3 className="text-2xl font-bold text-white mb-10 text-center tracking-widest uppercase opacity-80">
              <DecryptText text="Core Command" />
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {coreTeam.map((member) => (
                <div key={member.id} className="w-full md:w-[250px] lg:w-[300px]">
                   <MemberCard member={member} tier="core" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SQUADS */}
        <div className="space-y-32"> 
          {squads.map((squad) => (
            <div key={squad.id}>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-10 w-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                <h3 className="text-3xl font-bold text-white tracking-widest uppercase">
                  <DecryptText text={`${squad.title} Division`} />
                </h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/50 to-transparent"></div>
              </div>

              <div className="flex flex-col xl:flex-row gap-8 justify-center items-start">
                {/* LEADS */}
                <div className="flex flex-wrap gap-8 justify-center xl:justify-end w-full xl:w-auto">
                  {squad.leads.map((lead) => (
                    <div key={lead.id} className="w-full md:w-[280px]"> 
                      <MemberCard member={lead} tier="lead" />
                    </div>
                  ))}
                </div>

                {/* MEMBERS GRID */}
                <div className="w-full xl:w-[500px] flex flex-col gap-4">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group min-h-[140px]">
                    <h4 className="text-blue-400 font-mono text-xs tracking-widest mb-2 uppercase">Mission Brief</h4>
                    <p className="text-gray-300 leading-relaxed text-sm">{squad.desc}</p>
                  </div>

                  {squad.members.length > 0 && (
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden h-[380px]"> 
                      <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Active Roster</span>
                        <span className="text-[10px] text-gray-500 font-mono">{squad.members.length} AGENTS</span>
                      </div>
                       
                      <div className="flex overflow-x-auto custom-scrollbar gap-6 pb-4 items-center h-full">
                        {squad.members.map((member) => (
                          <div key={member.id} className="min-w-[200px] h-[260px] bg-black/90 rounded-xl border border-white/5 relative overflow-hidden group shrink-0 transition-all duration-300 cursor-pointer hover:border-green-500/40">
                            
                            {/* === NEW: "LOCK-ON" CORNERS (Slide in on hover) === */}
                            {/* Top Left */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-green-400 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20"></div>
                            {/* Top Right */}
                            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-green-400 transition-all duration-300 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20"></div>
                            {/* Bottom Left */}
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-green-400 transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20"></div>
                            {/* Bottom Right */}
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-green-400 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20"></div>

                            {/* === NEW: HOLOGRAPHIC SCAN LINE === */}
                            <div className="absolute w-full h-[2px] bg-green-400/80 shadow-[0_0_15px_rgba(74,222,128,0.8)] z-30 top-0 opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-linear group-hover:top-[100%]"></div>

                            {/* IMAGE */}
                            <div className="absolute inset-0 overflow-hidden bg-black">
                                <img 
                                src={member.image} 
                                alt="avatar" 
                                className="w-full h-full object-cover grayscale opacity-70 
                                            group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110
                                            transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
                                />
                            </div>
                            
                            {/* GRADIENT OVERLAY (Subtle grid) */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none"></div>

                            {/* BOTTOM INFO */}
                            <div className="absolute bottom-0 left-0 w-full p-4 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                               <div className="text-sm text-white font-bold truncate group-hover:text-green-300 transition-colors tracking-wide">{member.name}</div>
                               
                               {/* AGENT -> ACTIVE TRANSITION */}
                               <div className="relative h-4 mt-1 overflow-hidden w-full">
                                    <div className="absolute top-0 left-0 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 text-[10px] text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                                        <span>// ID_PENDING</span>
                                    </div>
                                    <div className="absolute top-0 left-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-[10px] text-green-400 font-mono uppercase tracking-wider font-bold flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                        <span>ACCESS GRANTED</span>
                                    </div>
                               </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Core Member Card (Kept consistent with previous style)
const MemberCard = ({ member, tier }) => {
    const [ref, isVisible] = useFadeIn();
    const heightClass = tier === 'core' ? 'h-[400px]' : 'h-[350px] xl:h-[536px]'; 
    const glowColor = tier === 'core' ? 'from-purple-500 to-blue-500' : 'from-cyan-500 to-blue-400';
  
    return (
      <div 
        ref={ref}
        className={`group relative cursor-pointer ${heightClass} w-full transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md`}></div>
        <div className="relative h-full w-full bg-black rounded-xl border border-white/10 overflow-hidden flex flex-col justify-end p-6 transition-all duration-300 group-hover:scale-[0.98]">
          <div className="absolute inset-0 z-0">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
          
          <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-xl font-bold text-white leading-tight mb-1">{member.name}</h3>
            <p className="text-gray-400 text-xs tracking-widest uppercase font-mono truncate">{member.role}</p>
            
            <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Linkedin size={18} />
                  </a>
              )}
              {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                      <Instagram size={18} />
                  </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Members;