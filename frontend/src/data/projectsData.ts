
export interface Project {
  id: string
  image: string
  title: string
  category: string
  stats: string
  description: string
  fullDescription: string
}

export const projectsData: Project[] = [
  {
    id: "urban-infrastructure",
    image: "/assets/as_built_project.jpg", // ← Changed to string path
    title: "As-built Survey of the ARK (Winners Chapel) Ogun State.",
    category: "As-built Survey",
    stats: "Millions of data points",
    description: "3D laser scanning as-built survey of the ARK (Winners Chapel).",
    fullDescription: "Our team completed a comprehensive 3D laser scanning survey of the ARK (Winners Chapel), Ogun State, to verify construction alignment with the approved design plans. Millions of data points were captured to generate accurate digital representations of the structure, supporting compliance assessment, documentation, and informed decision-making",
  },
  {
    id: "industrial-facility",
    image: "/assets/route_surveys_projects.jpg",
    title: "Route Survey for Road Construction, Taraba State.",
    category: "Route Survey",
    stats: "High-density spatial data",
    description: "Detailed route survey for road construction using advanced surveying technologies.",
    fullDescription: "Our team completed a comprehensive route survey along the Taraba corridor to support planned road construction works. The survey captured high-density spatial data along the proposed alignment, providing accurate information on terrain, existing features, and right-of-way conditions to support design, planning, and construction decision-making.",
  },
  {
    id: "historical-building",
    image: "/assets/topographic_survey_abiaproject.jpg",
    title: "Topographic Survey of the Proposed Abia State Airport",
    category: "Topographic Survey",
    stats: "High-density LiDAR data",
    description: "High-resolution topographic survey using DGI M350 and L2 LiDAR.",
    fullDescription: "Our team completed a comprehensive topographic survey of the proposed Abia State Airport using the DGI M350 UAV and L2 LiDAR technology. Millions of data points were captured to generate accurate terrain models, supporting airport design, earthworks planning, and informed construction decision-making.",
  },
  {
    id: "wind-farm",
    image: "/assets/bathymetric_survey_project.jpg",
    title: "Bathymetric Survey at Ozumba Nmbadiwe, Victoria Island - Prof Tower",
    category: "Bathymetric Survey",
    stats: "High-density underwater data",
    description: "High-resolution bathymetric survey using advanced sonar systems",
    fullDescription: "Our team completed a comprehensive bathymetric survey at Victoria Island in 2023 for the Prof Tower project. Using advanced sonar technology, thousands of underwater data points were captured to accurately model the seabed and estimate the volume of sandfilling required for construction.",
  },
  {
    id: "bridge-inspection",
    image: "/assets/topographic_survey_viproject.jpg",
    title: "Topographic Survey at Federal Palace - Victoria Island",
    category: "Topographic Survey",
    stats: "High-density terrain data",
    description: "High-resolution topographic survey using GNSS, Total Station, and drone.",
    fullDescription: "Our team completed a comprehensive topographic survey at Federal Palace, Victoria Island, utilizing GNSS, Total Station, and drone technology to capture detailed terrain and surface features across the site. High-density spatial data was collected to generate accurate topographic models, supporting site planning, design development, and informed construction decision-making.",
  },
  {
    id: "mining-volumetrics",
    image: "/assets/asbuilt_topographic_survey_project.jpg",
    title: "As-built Survey and Topographic Detailing for GMT projects across Apapa, Victoria Island, and Satelite town axis.",
    category: "As-Built Survey",
    stats: "Detailed topographic documentation",
    description: "Integrated as-built documentation using topographic survey and detailed spatial mapping.",
    fullDescription: "Our team completed comprehensive as-built surveys for GMT across multiple sites, including Apapa and Satelite town axis. The scope involved detailed topographic surveying and spatial detailing to accurately document existing site conditions and constructed elements, supporting project documentation, planning, and future development decisions.",
  },
]