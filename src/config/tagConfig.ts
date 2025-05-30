// src/config/tagConfig.ts
export interface TagConfig {
  label: string;
  colorClass: string;
}

export const TAGS: Record<string, TagConfig> = {
  InProgress1:  { 
	label: 'In Progress',
	colorClass: 'bg-[#02D09D] text-[#FFFFFF]' },
  Internship1:  { 
	label: 'Internship',  
	colorClass: 'bg-[#02D09D] text-[#FFFFFF]' },
  UIUX:   { 
	label: 'UI/UX',     
	colorClass: 'bg-[#000000] text-[#FFFFFF]' },
  WebDesign:  { 
	label: 'Web Design',      
	colorClass: 'bg-[#000000] text-[#FFFFFF]' },
  B2C:   { 
	label: 'B2C',    
	colorClass: 'bg-[#000000] text-[#FFFFFF]' },
  B2B:   { 
	label: 'B2B',    
	colorClass: 'bg-[#000000] text-[#FFFFFF]' },
  InProgress2:    { 
	label: 'In Progress',   
	colorClass: 'bg-[#00AAE5] text-[#FFFFFF]' },
  LaunchingSoon:    { 
	label: 'Launching Soon',    
	colorClass: 'bg-[#00AAE5] text-[#FFFFFF]' },
  Internship2:   { 
	label: 'Internship',   
	colorClass: 'bg-[#006DFF] text-[#FFFFFF]' },
  MobileApp:   { 
	label: 'Mobile App',    
	colorClass: 'bg-[#000000] text-[#FFFFFF]' }
  // …继续添加标签配置
};
