"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Project as AppProject } from '@/lib/types';

interface ProjectContextType {
  currentProject: AppProject | null;
  isLoading: boolean;
  // setProject: (projectId: string) => Promise<void>; // Function to fetch and set the current project
  // Add other project-related state and functions
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [currentProject, setCurrentProject] = useState<AppProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Implement logic to fetch and set the current project based on route or user selection
  // const setProject = async (projectId: string) => {
  //   setIsLoading(true);
  //   try {
  //     const projectData = await fetchProjectById(projectId); // Replace with actual service call
  //     setCurrentProject(projectData);
  //   } catch (error) {
  //     console.error('Error fetching project:', error);
  //     setCurrentProject(null); // Clear project on error
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const value = {
    currentProject,
    isLoading,
    // setProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}; 