// src/data/services.ts

// 1. Next.js specific type import
import { StaticImageData } from "next/image";

// 2. Internal Image Imports
import laserScanImg from "@/assets/IMG_7826.jpg";
import landSurveyImg from "@/assets/landSurvey_services.jpg";
import aerialDroneImg from "@/assets/drone_aerial.jpg";
import remoteSensingImg from "@/assets/remote_sensing.jpeg";
import topographicSurveyImg from "@/assets/topographic_surveys.jpg";
import hydrographicSurveyImg from "@/assets/hydrographic_Survey_Services.jpeg";
import asBuiltSurveyImg from "@/assets/as_built_surveys.jpeg";
import routeSurveyImg from "@/assets/route_surveys.jpeg";
import settingOutImg from "@/assets/setting_Out_services.jpeg";
import threeDlaserScanImg from "@/assets/3dlaserscanning.jpeg";
import pipeSurveyImg from "@/assets/pipeline_Survey_Services.jpg";
import gispatialSurveyImg from "@/assets/gis&spatial_Survey_services.png";
import landSurveyBanner from "@/assets/land_survey.jpg";
import remoteSensingBanner from "@/assets/remote_sensing.svg";
import laserScanningBanner from "@/assets/3d_laser_scanning.svg";
import pipeSurveyBanner from "@/assets/pipeline_surveys.svg";
import routeSurveyBanner from "@/assets/route_surveys.jpg";
import settingOutBanner from "@/assets/setting_out_surveys.jpg";
import asBuiltBanner from "@/assets/as_built_surveys.jpg";
import topographicSurveyBanner from "@/assets/topographic_survey.svg";
import hydrographicSurveyBanner from "@/assets/hydrographic_survey.jpg";
import gisSpatialBanner from "@/assets/gis&spatial_surveys.svg";
import aerialSurveyBanner from "@/assets/drone&aerial_surveys.jpeg";
import professional_TrainingImg from "@/assets/professional_Training_Services.jpeg";

// 3. Updated Interface to accept Next.js image objects
export interface ServiceItem {
  benefitsTitle?: string;
  id: string; 
  image: string | StaticImageData;
  heroBannerImg?: string | StaticImageData;
  sidebarImg?: string | StaticImageData;
  statsImg?: string | StaticImageData;
  title: string;
  description: string; 
  details: string;     
  methodology: string; 
  keyFeatures: string[]; 
  benefits?: string[];    
  featuresTitle?: string; 
  relatedServiceIds?: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "equipment-sales",
    image: laserScanImg,
    sidebarImg: laserScanImg,
    statsImg: laserScanImg,
    title: "Equipment Sales",
    description: "Supply of professional surveying, GNSS, drone, and mapping equipment backed by expert guidance, setup support, and after-sales service.",
    details: "We supply a wide range of professional surveying, GNSS, drone, and mapping equipment, supported by expert guidance and technical assistance. Our team provides product recommendations, setup and calibration support, user orientation, and responsive after-sales service. The goal is to deliver high-quality, reliable equipment that improves accuracy, efficiency, and performance across all geospatial and field operations.",
    methodology: `We provide professional cadastral surveying services focused on the definition, verification, and documentation of property boundaries. Our cadastral surveys support land ownership, title registration, statutory approvals, and property transactions.`,
    keyFeatures: [
      "Latest GNSS Receivers & Total Stations",
      "Survey-Grade Drones & Accessories",
      "Handheld GIS Data Collectors",
      "Comprehensive Training & Onboarding",
      "Calibration & Maintenance Support"
    ],
    benefitsTitle: "Why Choose Drones?",
    benefits: [
      "Access to industry-leading brands and technology.",
      "Reduced downtime with local technical support.",
      "Expert advice ensuring you buy exactly what you need.",
      "Long-term warranty and service guarantees."
    ],
    relatedServiceIds: ["land-survey", "remote-sensing", "topographic-survey"],
  },
  {
    id: "land-survey",
    image: landSurveyImg,
    heroBannerImg: landSurveyBanner,
    sidebarImg: landSurveyImg,
    statsImg: landSurveyImg,
    title: "Land Survey / Cadastral Survey",
    description: "Accurate boundary identification and documentation for land ownership, title processing, and dispute resolution, carried out by licensed surveyors.",
    details: "We provide accurate boundary identification and comprehensive land documentation carried out by licensed surveyors. Our service includes precise measurements, clear mapping outputs, and professional survey reports used for land ownership verification, title processing, planning, development, and dispute resolution.",
    methodology: `We provide professional cadastral surveying services focused on the definition, verification,
    and documentation of property boundaries. Our cadastral surveys support land ownership, title registration,
    statutory approvals, and property transactions.
    
    Our work ensures that land parcels are accurately surveyed, clearly defined, and properly documented
    in line with approved survey standards and regulatory requirements.

    We combine field expertise with modern survey equipment to produce dependable survey outputs suitable
    for submission to land authorities, legal use, and development planning.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Survey Methodology</strong>

    Cadastral surveys are conducted using GNSS receivers, total stations, and supporting geospatial tools to 
    establish boundary coordinates and control points. All survey data is carefully processed and checked to
    ensure consistency with existing records and approved survey frameworks.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Survey plans and drawings",
      "Certificate of deposit",
      "Location Map",
      "Legal Dispute Resolution Surveys",
      "Charting Report"
    ],
    relatedServiceIds: ["topographic-survey", "route-survey", "setting-out-survey"],
  },
  {
    id: "aerial-survey",
    image: aerialDroneImg,
    heroBannerImg: aerialSurveyBanner,
    sidebarImg: aerialDroneImg,
    statsImg: aerialDroneImg,
    title: "Drone / Aerial Survey",
    description: "Aerial data capture using survey-grade drones to deliver detailed site imagery and surface models for large, complex, or hard-to-access areas.",
    details: "We provide high-resolution aerial data capture using survey-grade drones, offering detailed site imagery, accurate terrain models, and precise measurements. Our drone survey service enhances project visibility and speeds up data collection for large, complex, or hard-to-access locations. We deliver processed geospatial outputs such as orthomosaic maps, 3D models, and elevation data.",
    methodology: `We provide aerial surveying services for large-area mapping, site assessment, and spatial data
    collection. Our aerial surveys support planning, engineering design, environmental studies, 
    and project monitoring by delivering detailed overhead data efficiently and reliably.
    
    Using unmanned aerial systems and modern photogrammetric workflows, we capture high-resolution
    imagery and geospatial data suitable for mapping, analysis, and digital modelling.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Survey Methodology</strong>
    Aerial surveys are conducted using professionally operated drones integrated with ground control
    and GNSS positioning. Collected data is processed using industry-standard photogrammetry software 
    to generate mapped outputs that align with existing coordinate systems and project requirements.

    Our aerial survey workflow allows for rapid coverage of extensive areas while maintaining 
    consistency with ground survey control.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Orthophoto maps",
      "Digital Surface Models (DSM)",
      "Digital Terrain Models (DTM)",
      "Contour maps",
      "3D models and point clouds",
      "CAD and GIS-compatible datasets",
      "Survey report suitable for planning and project use"
    ],
    benefitsTitle: "Applications For Aerial Surveys",
    benefits: [
      "Topographic and terrain mapping",
      "Site and corridor surveys",
      "Construction progress monitoring",
      "Land use and environmental assessments",
      "Mapping of inaccessible or sensitive areas",
    ],
    relatedServiceIds: ["remote-sensing", "gis-and-spatial-survey", "topographic-survey"],
  },
  {
    id: "remote-sensing",
    image: remoteSensingImg,
    heroBannerImg: remoteSensingBanner,
    sidebarImg: remoteSensingImg,
    statsImg: remoteSensingImg,
    title: "Remote Sensing and Mapping Services",
    description: "Production of reliable digital maps and GIS datasets to support planning, land administration, and infrastructure development.",
    details: "Production of accurate digital maps and comprehensive GIS datasets that support planning, land administration, and infrastructure development. This service delivers well-structured geospatial data, clear visual map outputs, and analytical layers that enhance decision-making for government agencies, private organizations, and project teams.",
    methodology: `We offer GIS(Geographic Information System) and location intelligence services. We
    believe that if a picture is worth 1000 words, a map is worth 10,000 pictures. We offer data 
    acqusition, updating, analysis and presentation services.

    Location Intelligence

    More than a simple matter of ‘where’, location serves as the one constant that connects disparate
    data elements such as demographics, competition, company assets and customers. With location 
    Intelligence, organizations can turn this abundance of data into customer insight and true business
    value. Location Intelligence can help you acquire, serve and grow relationships with customers and 
    potential customers. In nearly every facet of business, location-based insights have a direct impact
    on your relationships with customers and prospects.
      
    In recent times and with the advancements in technology, drones have become a must-have tool
    for Surveyors and GIS professionals. Drone mapping services are becoming far more cost effective
    due to the latest drone camera technology.

    We offer drone services for:

    Land and Water Survey

    Pipeline Monitoring

    Right of Way Analysis

    Inspection Services

    Jobsite progress tracking

    Aerial Image Acquisition(Aerial Photography)

    Image Interpretation

    Real Estate Marketing

    Construction projects
    
    We provide remote sensing and mapping services for large-area spatial analysis, environmental
    assessment, and planning support. Our services enable the extraction of meaningful information from satellite
    and aerial data to support land management, infrastructure planning, and resource assessment.
    
    Remote sensing allows us to monitor, analyze, and map surface conditions efficiently across extensive and 
    inaccessible areas.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our remote sensing and mapping services include:

    Satellite imagery acquisition and analysis

    Land use and land cover mapping

    Terrain and elevation analysis

    Environmental and vegetation mapping

    Change detection and spatial monitoring

    Base map and thematic map production

    We integrate satellite imagery, aerial data, and ground control information to produce mapped outputs aligned 
    with project coordinate systems. Data is processed using industry-standard remote sensing and GIS software to 
    generate consistent and reliable spatial datasets suitable for analysis and decision-making.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Thematic maps and spatial datasets",
      "Land use and land cover maps",
      "Raster and vector GIS files",
      "Processed satellite imagery",
      "Technical reports and map layouts suitable for planning and project use"
    ],
    relatedServiceIds: ["aerial-survey", "gis-and-spatial-survey", "topographic-survey"],
  },
  {
    id: "topographic-survey",
    image: topographicSurveyImg,
    heroBannerImg: topographicSurveyBanner,
    sidebarImg: topographicSurveyImg,
    statsImg: topographicSurveyImg,
    title: "Topographic Survey",
    description: "Detailed ground and terrain measurement capturing natural and man-made features for engineering design, construction, and site analysis.",
    details: "Comprehensive surveying of terrain and site features, capturing every natural and man-made element with precision. This service produces detailed contour maps, 3D surface models, and accurate feature data that guide engineering designs, construction planning, and site analysis. By transforming raw field measurements into actionable geospatial insights, it ensures projects are executed efficiently.",
    methodology: `Topographic Surveys are carried out to map out the natural and man-made features on a land and to determine the undulation. The topographic map made of contours, spot heights and DTM is usually produced at the end. It is required by engineers for planning purposes. For any engineering project topographic survey is a must.
    There are many uses for a topographic land survey.

    Engineers and architects can use the survey results for designing buildings and other improvements. In some
    cases, they are also used by the Government. Most of the construction projects typically begin with a 
    topographic survey as it provides the framework of the land before improvements are made. Sometimes, a 
    topographical survey is used for the formulation of an optimal plan for drainage ditches, grading and other 
    features. Thus, the results of the topographical surveys i.e.; the natural landscape serve as the basis for
    the formulation of optimal plans. The results render all the minute details like the elevation of slopes which
    may be useful figures particularly if you are intending to build on the land. In addition, to the provision of
    data for developments of undeveloped surveys; they also provide appropriate information for the area that is 
    been previously used.
    
    We provide topographic surveying services to capture detailed information about the natural and 
    built features of the land. Our surveys deliver accurate terrain and feature data that supports engineering 
    design, site planning, infrastructure development, and environmental management.

    Topographic surveys provide essential information for architects, engineers, planners, and developers to make 
    informed decisions and ensure project accuracy.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our topographic surveys include:

    Ground elevation and contour mapping

    Identification of natural features (trees, rivers, slopes)

    Identification of man-made features (buildings, roads, utilities, fences)

    Digital terrain and surface modelling

    Detailed site mapping for planning and engineering

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We conduct topographic surveys using GNSS receivers, total stations, drones, and laser scanning equipment. Field data
    is processed and delivered in CAD and GIS-compatible formats to provide reliable spatial information for project
    planning and design.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Topographic maps and survey plans",
      "Contour maps and elevation data",
      "Digital Terrain Models (DTM)",
      "CAD and GIS-ready files",
      "Technical survey reports suitable for design and planning"
    ],
    relatedServiceIds: ["land-survey", "as-built-survey", "setting-out-survey"],
  },
  {
    id: "hydrographic-survey",
    image: hydrographicSurveyImg,
    heroBannerImg: hydrographicSurveyBanner,
    sidebarImg: hydrographicSurveyImg,
    statsImg: hydrographicSurveyImg,
    title: "Hydrographic / Bathymetric Survey",
    description: "Underwater depth and seabed surveys for waterways, dredging projects, marine construction, and water resource assessments.",
    details: "Precision surveying of underwater environments, capturing depth, seabed features, and sub-surface conditions. This service delivers accurate data for waterways management, dredging operations, marine construction, and water resource assessments. By transforming complex underwater measurements into detailed maps and 3D models, it supports safe navigation and informed engineering decisions.",
    methodology: `Bathymetry is basically the measurement of water depth. Bathymetric surveys show depths and terrain
    configurations of the bottom of water bodies. It can be used for navigation safety, water volume computation,
    monitoring sediment changes, under water engineering construction, showing pre and post dredge conditions, 
    oil, gas and mineral exploration, ocean pollutant studies etc.

    It measures vertical distance from the ocean surface to sea floor features. The process of measuring the depth of water is called sounding.

    Bathymetric surveys are usually referenced to local tidal or a vertical datum.
    
    We provide hydrographic and bathymetric survey services to accurately map water bodies, including rivers,
    lakes, coastal areas, and reservoirs. These surveys deliver reliable underwater spatial data that supports marine 
    engineering, navigation, dredging, environmental monitoring, and infrastructure development.

    Our surveys ensure safe, efficient, and informed planning for any water-related project,
    providing a clear understanding of underwater terrain and features.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>
    
    Our hydrographic and bathymetric surveys include:

    Bathymetric mapping of rivers, lakes, reservoirs, and coastal areas

    Depth and contour measurement

    Underwater feature identification using side scan sonar

    Substrate and seabed profiling

    Hydrographic data collection for navigation and dredging

    Environmental and ecological waterbody assessments

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We conduct surveys using echo sounders, side scan sonars, unmanned surface vessels (USVs), drones,
    and supporting geospatial tools. Survey data is processed to produce accurate digital terrain models
    of the waterbody, charts, and GIS-compatible datasets suitable for engineering, planning, and regulatory purposes.

    Our methodology ensures high-resolution, reliable underwater data while maintaining safety and efficiency for all projects.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Bathymetric charts and survey plans",
      "Digital Depth Models (DTM/DEM of waterbeds)",
      "Side scan sonar imagery and seabed mapping",
      "CAD and GIS-compatible datasets",
      "Hydrographic survey reports suitable for project planning and regulatory submission"
    ],
    relatedServiceIds: ["topographic-survey", "aerial-survey", "remote-sensing"],
  },
  {
    id: "gis-and-spatial-survey",
    image: gispatialSurveyImg,
    heroBannerImg: gisSpatialBanner,
    sidebarImg: gispatialSurveyImg,
    statsImg: gispatialSurveyImg,
    title: "GIS & Spatial Data Analysis",
    description: "Production of GIS and spatial data analysis outputs to transform raw geospatial information into actionable insights for planning, management, and decision-making.",
    details: "This service delivers thematic maps, analytical layers, and GIS-ready datasets that support infrastructure development, environmental monitoring, and resource management. From integrating survey, aerial, and remote sensing data to spatial modeling and analysis, the outputs enhance project accuracy, improve documentation, and support informed decision-making.",
    methodology: `We provide Geographic Information System (GIS) and spatial data analysis services to transform raw geospatial
    data into actionable insights for planning, design, and decision-making. Our services support land management, infrastructure development,environmental monitoring, and resource analysis.
    
    GIS and spatial data analysis allow clients to visualize, interpret, and manage spatial relationships, helping optimize 
    projects and support regulatory compliance.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our GIS and spatial data analysis services include:

    Data capture, integration, and management from surveys and remote sensing

    Spatial analysis and modeling for planning and engineering

    Land use and land cover mapping

    Network and corridor analysis for pipelines, roads, and utilities

    Creation of thematic maps, dashboards, and interactive GIS solutions

    Environmental, hydrographic, and resource monitoring

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We process and analyze geospatial data from GNSS surveys, topographic surveys, aerial imagery, LiDAR, and remote sensing sources. Using industry-standard GIS software, we produce maps, digital models, and analytical outputs that help clients make informed decisions, optimize designs, and monitor assets efficiently.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "GIS-compatible datasets (raster and vector formats)",
      "Thematic and analytical maps",
      "Spatial reports and dashboards",
      "Digital terrain and feature models",
      "Decision-support tools for planning, design, and monitoring"
    ],
    relatedServiceIds: ["aerial-survey", "remote-sensing", "3d-laser-scanning"],
  },
  {
    id: "pipeline-survey",
    image: pipeSurveyImg,
    heroBannerImg: pipeSurveyBanner,
    sidebarImg: pipeSurveyImg,
    statsImg: pipeSurveyImg,
    title: "Pipeline Surveys",
    description: "Production of accurate survey data for planning, design, and monitoring of linear infrastructure such as oil, gas, water, and utility pipelines.",
    details: "This service delivers route alignment, terrain mapping, and spatial datasets that ensure safe and efficient pipeline development. From corridor surveying to detailed topographic measurements, the outputs provide reliable spatial information that optimizes design, reduces construction risks, and supports regulatory compliance for pipeline projects.",
    methodology: `Though we are based in Lagos, we serve our clients in the oil and gas industry with accurate
    surveying and mapping services all over Nigeria. By accurately and efficiently gathering the right data, we 
    provide our clients with the information they need from the idea to implementation stage of the pipeline route.
    We do full preparation survey, topographic survey, pipeline route detail survey, blue peg location survey, 
    ground control survey and drone survey.
    
    We provide pipeline survey services to support the planning, design, construction, and maintenance
    of pipeline infrastructure. Our surveys deliver accurate spatial and topographic data along proposed and existing
    pipeline routes, ensuring efficient alignment, regulatory compliance, and safe installation
    
    Pipeline surveys are essential for minimizing risks, optimizing routing, and ensuring project feasibility from 
    design to operation.

    We combine field expertise with modern survey equipment to produce dependable survey outputs suitable
    for submission to land authorities, legal use, and development planning.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our pipeline survey services include:

    Route alignment surveys for oil, gas, water, and utility pipelines

    Topographic and terrain mapping along pipeline corridors

    Identification of natural and man-made obstacles affecting pipeline design

    Location and verification of existing utilities and infrastructure

    Control and reference points for pipeline construction and monitoring

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We conduct pipeline surveys using GNSS receivers, total stations, drones, and LiDAR equipment. Survey data is 
    processed into accurate CAD and GIS-compatible datasets, contour maps, and digital terrain models to support 
    design, construction, and monitoring.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Pipeline route plans and alignment drawings",
      "Contour maps and terrain profiles",
      "Digital Terrain Models (DTM/DSM) along the pipeline corridor",
      "CAD and GIS-ready datasets",
      "Technical survey reports for planning, design, and regulatory submission"
    ],
    relatedServiceIds: ["topographic-survey", "route-survey", "aerial-survey"],
  },
  {
    id: "as-built-survey",
    image: asBuiltSurveyImg,
    heroBannerImg: asBuiltBanner,
    sidebarImg: asBuiltSurveyImg,
    statsImg: asBuiltSurveyImg,
    title: "As-Built Surveys",
    description: "Production of as-built survey data to document completed structures and infrastructure, verifying compliance with design specifications.",
    details: " This service delivers accurate survey plans, 3D models, and GIS-compatible datasets for project records, facility management, and future planning. From measuring deviations from design to producing detailed documentation, the outputs ensure reliable records that support construction verification, operational planning, and long-term",
    methodology: `As-built surveys are carried out to determine of structures were constructed according to plan. 
    They are usually required for regulatory or payment purposes.These surveys depict the location of all existing
    improvements on a site, including, but not limited to, buildings, parking areas, utilities, storm drainage systems,
    sewerage disposal systems, and any other features
        
    We provide as-built survey services to document completed structures, infrastructure, and 
    developments. These surveys verify that construction work has been executed according to design specifications,
    ensuring accuracy, compliance, and quality control.
    
    As-built surveys are essential for project records, regulatory approvals, facility management, and future
    renovations or expansions.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our as-built survey services include:

    Verification of building, road, and infrastructure alignment and dimensions

    Measurement of completed structures and utilities

    Documentation of deviations from design plans

    Preparation of as-built drawings and 3D models

    Integration with CAD, GIS, and BIM systems

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We conduct as-built surveys using GNSS receivers, total stations, drones, LiDAR scanners, and laser scanning
    equipment. Field measurements are processed into high-accuracy drawings, 3D models, and digital datasets for 
    documentation, planning, and analysis.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "As-built drawings and plans",
      "3D models and point clouds",
      "Technical reports highlighting deviations from design",
      "Digital terrain and surface models (DTM/DSM)"
    ],
    relatedServiceIds: ["3d-laser-scanning", "topographic-survey", "setting-out-survey"],
  },
  {
    id: "route-survey",
    image: routeSurveyImg,
    heroBannerImg: routeSurveyBanner,
    sidebarImg: routeSurveyImg,
    statsImg: routeSurveyImg,
    title: "Route Surveys",
    description: "Production of route survey data for roads, railways, pipelines, and utility corridors to capture alignment, terrain, and features along proposed or existing routes.",
    details: "This service delivers accurate corridor maps, contour data, and CAD/GIS-compatible datasets that support engineering design, route optimization, and project planning. From feasibility studies to detailed corridor modeling, the outputs provide reliable information that minimizes risks, improves alignment decisions, and supports efficient project execution.",
    methodology: `Route surveys are mostly carried out for construction of roads, drainages,highways, canals, 
    transmission lines, pipelines and other utilities. In general, route surveys consist of:

    Determining the ground configuration and the location of features within and along a proposed route.

    Establishing the left, right and center alignment

    Determining the volume of earthwork required.
    
    We provide route survey services to support the planning, design, and construction of linear 
    infrastructure such as roads, railways, pipelines, and utility corridors. Our surveys capture precise spatial
    data along proposed routes, helping engineers and planners optimize alignment, minimize environmental impact,
    and ensure project feasibility.
    
    Route surveys provide critical information for cost estimation, design, and construction planning, enabling 
    projects to progress efficiently and accurately.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our route survey services include:

    Alignment and corridor surveys for roads, railways, and pipelines

    Topographic and terrain mapping along proposed routes

    Identification of natural and man-made features affecting alignment

    Surveying of utilities, drainage, and environmental constraints

    Ground control and GNSS network establishment along the route

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We conduct route surveys using GNSS receivers, total stations, drones, and LiDAR-equipped equipment. Data is
    processed to produce accurate topographic and geospatial information, ensuring that route designs are feasible
    and well-integrated with existing terrain and infrastructure.
    
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Route alignment plans and drawings",
      "Contour maps and topographic profiles",
      "CAD and GIS-compatible datasets",
      "Technical reports with survey analysis",
      "Digital terrain models (DTM/DSM) along the corridor"
    ],
    relatedServiceIds: ["topographic-survey", "setting-out-survey", "land-survey"],
  },
  {
    id: "setting-out-survey",
    image: settingOutImg,
    heroBannerImg: settingOutBanner,
    sidebarImg: settingOutImg,
    statsImg: settingOutImg,
    title: "Setting-Out Surveys",
    description: "Production of setting-out survey data to accurately transfer design coordinates and plans from drawings to the field for construction projects.",
    details: "This service delivers precise site layouts, control points, and verification data that ensure alignment, levels, and dimensions are followed during execution. From building foundations to infrastructure works, the outputs reduce errors, rework, and delays while providing reliable spatial information to support project accuracy and compliance.",
    methodology: `We set out almost anything- buildings, piles, roads etc. We always use the appropriate instrument
    for maximum accuracy and efficiency.

    Normally, maps and plans are prepared to show existing features butsetting out involves fixing on the ground 
    details shown on maps and plans.
    
    We provide setting-out survey services to accurately transfer design plans and coordinates 
    from drawings to the field. Our services ensure that construction, infrastructure, and engineering projects
    are executed precisely according to approved designs.
    
    Setting-out surveys are critical for maintaining alignment, dimensions, and levels on-site, reducing errors
    and ensuring that projects are built as intended.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our setting-out survey services include:

    Construction layout and building alignment

    Road, bridge, and infrastructure setting-out

    Elevation and level control for site works

    Positioning of utilities, drainage, and structural elements

    Verification of design coordinates on-site

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We conduct setting-out surveys using GNSS receivers, total stations, robotic total stations, and laser levels. 
    Survey data is carefully transferred from design drawings to the field, with continuous verification to ensure
    accuracy throughout the construction process.  
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "Setting-out plans and drawings",
      "Field coordinate sheets and control points",
      "Verification and progress reports",
      "As-built updates where required",
      "CAD and GIS-compatible data for project integration"
    ],
    relatedServiceIds: ["topographic-survey", "as-built-survey", "topographic-survey"],
  },
  {
    id: "3d-laser-scanning",
    image: threeDlaserScanImg,
    heroBannerImg: laserScanningBanner,
    sidebarImg: threeDlaserScanImg,
    statsImg: threeDlaserScanImg,
    title: "3D Laser Scanning", 
    description: "Production of high-resolution 3D laser scanning data to capture precise digital representations of buildings, infrastructure, and terrain.",
    details: "This service delivers point clouds, 3D models, and CAD/BIM-ready datasets that support design, construction verification, and facility management. From complex structures to large-scale environments, the outputs provide accurate spatial information that enhances planning, documentation, and informed decision-making for engineering and construction projects.",
    methodology: `We provide 3D laser scanning services to capture high-resolution, precise digital 
    representations of physical environments. Our scans generate millions of accurate data points to produce
    detailed 3D models, enabling engineering design, construction planning, as-built documentation,
    and facility management.

    
    3D laser scanning allows for quick, accurate, and non-intrusive measurement of complex structures and 
    environments, reducing errors and improving project efficiency.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our 3D laser scanning services include:

    Detailed building and infrastructure scanning

    Industrial facility documentation

    Oil & Gas Facility Scanning

    Topographic and terrain scanning

    As-built documentation for renovation and construction verification

    Creation of 3D point clouds and digital models for CAD and BIM applications

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We utilize terrestrial laser scanners, GNSS/Total Station control, and drones equipped with laser 
    scanning technology. Data is processed to create high-density point clouds, 3D models, and CAD/GIS-ready
    deliverables for design, analysis, and decision-making.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "3D point clouds and mesh models",
      "CAD and BIM-ready drawings",
      "High-resolution 3D models of buildings, structures, and terrain",
      "Digital terrain and surface models (DTM/DSM)",
      "Technical reports with scanned feature documentation"
    ],
    relatedServiceIds: ["as-built-survey", "topographic-survey", "gis-and-spatial-survey"],
  },
  {
    id: "professional-training",
    image: professional_TrainingImg,
    heroBannerImg: laserScanningBanner,
    sidebarImg: threeDlaserScanImg,
    statsImg: threeDlaserScanImg,
    title: "Professional Surveying & Geospatial Training", 
    description: "We offer training in GNSS surveying, total station surveying, drone mapping, 3D laser scanning, bathymetric surveying, AutoCAD, GIS, engineering surveying, and advanced LIDAR drone surveying.",
    details: "Our programs equip participants with practical skills in field data collection, processing, and analysis, enabling accurate mapping, surveying, and geospatial solutions for engineering, construction, and infrastructure projects.",
    methodology: ` Our programs equip participants with practical skills in field data collection, 
    processing, and analysis, enabling accurate mapping, surveying, and geospatial solutions for engineering, construction, and infrastructure projects.

    
    3D laser scanning allows for quick, accurate, and non-intrusive measurement of complex structures and 
    environments, reducing errors and improving project efficiency.

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Service Scope</strong>

    Our 3D laser scanning services include:

    Detailed building and infrastructure scanning

    Industrial facility documentation

    Oil & Gas Facility Scanning

    Topographic and terrain scanning

    As-built documentation for renovation and construction verification

    Creation of 3D point clouds and digital models for CAD and BIM applications

    <strong class="text-primary text-4xl font-bold uppercase tracking-wider mb-2">Methodology</strong>

    We utilize terrestrial laser scanners, GNSS/Total Station control, and drones equipped with laser 
    scanning technology. Data is processed to create high-density point clouds, 3D models, and CAD/GIS-ready
    deliverables for design, analysis, and decision-making.
    `,
    featuresTitle: "Deliverables typically include:",
    keyFeatures: [
      "3D point clouds and mesh models",
      "CAD and BIM-ready drawings",
      "High-resolution 3D models of buildings, structures, and terrain",
      "Digital terrain and surface models (DTM/DSM)",
      "Technical reports with scanned feature documentation"
    ],
    relatedServiceIds: ["as-built-survey", "topographic-survey", "gis-and-spatial-survey"],
  },
];