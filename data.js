/* =============================================================================
   data.js — all site content lives here.
   Edit this file to update the website; no other file needs changing.
   ========================================================================== */

const DATA = {

  /* --- Profile / hero card ----------------------------------------------- */
  profile: {
    name: "Alessandro Tansini",
    title: "Researcher, Data Analyst &amp; Policy Support",
    subtitle: "Transport Decarbonisation",
    photo: "assets/photo.png",
    location: "Ispra, Italy",
    email: "tansini.ale@gmail.com",
    birth: "06/08/1990, Milan, Italy",

    links: [
      { label: "ORCID",          url: "https://orcid.org/0009-0001-2616-0147" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=Het772QAAAAJ&hl=en" },
      { label: "ResearchGate",   url: "https://www.researchgate.net/profile/Alessandro-Tansini" },
      { label: "Scopus",         url: "https://www.scopus.com/authid/detail.uri?authorId=57195491852" },
      { label: "LinkedIn",       url: "https://it.linkedin.com/in/alessandrotansini" },
    ],
  },

  /* --- Professional summary ---------------------------------------------- */
  summary:
    "Energy engineer with a PhD in Energetics and over ten years of experience in " +
    "scientific research on road-vehicle CO₂ emissions, innovative technologies and " +
    "sustainable transport. Deep knowledge of data collection and analysis — " +
    "experimental measurements, OBD/CAN, GNSS, telematics, web scraping and data reporting. " +
    "Currently a contract agent at the European Commission’s Joint Research Centre (JRC), " +
    "specialised in real-world monitoring, modelling and policy support for vehicle fuel " +
    "consumption and energy efficiency. Author of peer-reviewed publications in leading " +
    "energy and environmental journals and contributor to vehicle regulations.",

  /* --- Keyword graph (animated, decorative) ------------------------------
     Nodes are grouped into thematic clusters (used for colour).
     Edges connect related ideas in a meaningful way.                        */
  graph: {
    clusters: {
      core:        "#e8f3ff",  // identity
      powertrain:  "#38bdf8",  // vehicle technologies
      data:        "#2dd4bf",  // data & instrumentation
      tools:       "#5b8def",  // tools & methods
      policy:      "#a78bfa",  // regulation & policy
      topic:       "#7dd3fc",  // research topics
    },
    nodes: [
      { id: "Transport Decarbonisation", c: "core", s: 2.2 },
      { id: "CO₂ Emissions",         c: "core", s: 2.0 },
      { id: "Energy Efficiency",         c: "core", s: 1.9 },
      { id: "Real-World Monitoring",     c: "core", s: 1.9 },

      { id: "BEV",                       c: "powertrain", s: 1.4 },
      { id: "PHEV",                      c: "powertrain", s: 1.4 },
      { id: "Hydrogen / FCEV",           c: "powertrain", s: 1.4 },
      { id: "Hybrid Electric",           c: "powertrain", s: 1.3 },
      { id: "ICE",                       c: "powertrain", s: 1.0 },

      { id: "OBD / CAN",                 c: "data", s: 1.2 },
      { id: "OBFCM",                     c: "data", s: 1.4 },
      { id: "GNSS / Telematics",         c: "data", s: 1.3 },
      { id: "Web Scraping",              c: "data", s: 1.0 },
      { id: "Data Pipelines",            c: "data", s: 1.6 },
      { id: "Data Visualization",        c: "data", s: 1.2 },
      { id: "Experimental Testing",      c: "data", s: 1.4 },

      { id: "CO2MPAS",                   c: "tools", s: 1.3 },
      { id: "VECTO",                     c: "tools", s: 1.3 },
      { id: "VDP Tool",                  c: "tools", s: 1.3 },
      { id: "LEGENT",                    c: "tools", s: 1.2 },
      { id: "Python",                    c: "tools", s: 1.4 },
      { id: "Matlab / Simulink",         c: "tools", s: 1.2 },
      { id: "Simulation &amp; Modelling",    c: "tools", s: 1.5 },
      { id: "CFD",                       c: "tools", s: 1.0 },

      { id: "EU Regulations",            c: "policy", s: 1.7 },
      { id: "UN R154",                   c: "policy", s: 1.1 },
      { id: "In-Service Verification",   c: "policy", s: 1.3 },
      { id: "Utility Factors",           c: "policy", s: 1.1 },
      { id: "Life Cycle Assessment",     c: "policy", s: 1.1 },
      { id: "WLTP",                      c: "policy", s: 1.1 },

      { id: "VIPV",                      c: "topic", s: 1.2 },
      { id: "Regenerative Braking",      c: "topic", s: 1.1 },
      { id: "Mobile A/C",                c: "topic", s: 1.0 },
      { id: "Automated Driving",         c: "topic", s: 1.2 },
      { id: "Heavy-Duty Vehicles",       c: "topic", s: 1.2 },
    ],
    edges: [
      ["Transport Decarbonisation", "CO₂ Emissions"],
      ["Transport Decarbonisation", "Energy Efficiency"],
      ["Transport Decarbonisation", "Real-World Monitoring"],
      ["CO₂ Emissions", "EU Regulations"],
      ["CO₂ Emissions", "ICE"],
      ["CO₂ Emissions", "Heavy-Duty Vehicles"],
      ["CO₂ Emissions", "CO2MPAS"],
      ["Energy Efficiency", "BEV"],
      ["Energy Efficiency", "PHEV"],
      ["Energy Efficiency", "Hybrid Electric"],
      ["Energy Efficiency", "WLTP"],
      ["Energy Efficiency", "VIPV"],
      ["Energy Efficiency", "Mobile A/C"],
      ["Real-World Monitoring", "OBFCM"],
      ["Real-World Monitoring", "GNSS / Telematics"],
      ["Real-World Monitoring", "OBD / CAN"],
      ["Real-World Monitoring", "In-Service Verification"],
      ["Real-World Monitoring", "Automated Driving"],
      ["BEV", "VIPV"],
      ["BEV", "Regenerative Braking"],
      ["PHEV", "Utility Factors"],
      ["PHEV", "WLTP"],
      ["PHEV", "Hybrid Electric"],
      ["PHEV", "Regenerative Braking"],
      ["Hydrogen / FCEV", "Experimental Testing"],
      ["Hydrogen / FCEV", "Simulation &amp; Modelling"],
      ["Hybrid Electric", "VECTO"],
      ["Hybrid Electric", "CO2MPAS"],
      ["Hybrid Electric", "Simulation &amp; Modelling"],
      ["OBD / CAN", "Data Pipelines"],
      ["OBD / CAN", "OBFCM"],
      ["OBFCM", "In-Service Verification"],
      ["OBFCM", "Data Pipelines"],
      ["OBFCM", "UN R154"],
      ["GNSS / Telematics", "Data Pipelines"],
      ["Web Scraping", "Data Pipelines"],
      ["Data Pipelines", "Python"],
      ["Data Pipelines", "Data Visualization"],
      ["Data Pipelines", "VDP Tool"],
      ["Data Pipelines", "LEGENT"],
      ["Data Visualization", "Python"],
      ["Experimental Testing", "BEV"],
      ["Experimental Testing", "PHEV"],
      ["Experimental Testing", "Mobile A/C"],
      ["CO2MPAS", "EU Regulations"],
      ["CO2MPAS", "Simulation &amp; Modelling"],
      ["VECTO", "Heavy-Duty Vehicles"],
      ["VECTO", "EU Regulations"],
      ["VDP Tool", "In-Service Verification"],
      ["VDP Tool", "Python"],
      ["LEGENT", "OBFCM"],
      ["Python", "Matlab / Simulink"],
      ["Python", "Simulation &amp; Modelling"],
      ["Matlab / Simulink", "CFD"],
      ["Simulation &amp; Modelling", "CFD"],
      ["EU Regulations", "UN R154"],
      ["EU Regulations", "In-Service Verification"],
      ["EU Regulations", "Utility Factors"],
      ["EU Regulations", "WLTP"],
      ["EU Regulations", "Life Cycle Assessment"],
      ["Utility Factors", "PHEV"],
      ["Heavy-Duty Vehicles", "CO₂ Emissions"],
    ],
  },

  /* --- Professional experience ------------------------------------------- */
  experience: [
    {
      period: "Sep 2020 – Jun 2026",
      role: "Scientific Policy Officer",
      org: "European Commission’s Joint Research Centre (JRC), Ispra, Italy",
      note: "Sustainable, Smart and Safe Transport Unit — real-world monitoring of road-vehicle emissions &amp; modeller",
      points: [
        "Review, collection and analysis of literature on road-vehicle CO₂ emissions and energy consumption",
        "Design and execution of experimental campaigns for battery-electric and hydrogen fuel-cell vehicles",
        "Development and maintenance of CO₂ calculation tools extended to innovative powertrains (BEV, PHEV, H₂)",
        "Analysis of monitoring data under EU Reg. 2021/392; reporting on real-world fuel consumption (ref. 340201/2019/817718/SER/CLIMA.C.4)",
        "Scientific evaluation of amendments to EU Reg. 2017/1151 on PHEV Utility Factors, CO₂ and energy consumption",
        "Assessment of Vehicle-Integrated PhotoVoltaics (VIPV) environmental impact",
        "Amendment of UN R154 on the definition of energy into the vehicle for OBFCM of externally chargeable vehicles",
        "Supported European and UN-level discussions on modelling in-use PHEV consumption for Life Cycle Assessment",
      ],
    },
    {
      period: "Dec 2019 – Sep 2020",
      role: "External Expert",
      org: "European Commission’s Joint Research Centre (JRC), Ispra, Italy",
      note: "Ad-hoc expertise on hybrid-vehicle measurement, operation, and data collection &amp; analysis",
      points: [
        "Literature review on hybrid-electric-vehicle CO₂ emissions and energy consumption",
        "Dedicated experimental campaigns (vehicle testing in lab and on-road)",
        "CO₂ prediction tools at vehicle and fleet level; monitoring exercise under EU Reg. 2019/631",
      ],
    },
    {
      period: "Dec 2016 – Dec 2019",
      role: "Research Fellow",
      org: "European Commission’s Joint Research Centre (JRC), Ispra, Italy",
      note: "Development of flexible calculation tools for the road-vehicle CO₂ EU regulatory framework",
      points: [
        "Literature review on CO₂ emissions calculation and monitoring for road vehicles",
        "Design and execution of experimental vehicle-testing campaigns (lab and on-road)",
        "Tools for CO₂ emissions of specific vehicle configurations and innovative technologies",
        "Pre-pilot air-drag procedure testing for EU Reg. 2017/2400 (heavy-duty vehicles)",
        "Development of HDV fleet CO₂ emissions baseline for emission targets",
        "Update of EU Reg. 2017/1152 and 1153 to include hybrid-electric vehicles",
      ],
    },
    {
      period: "Jul 2016 – Dec 2016",
      role: "Junior Calibration &amp; Emissions Engineer",
      org: "Positech Srl (now ALTEN), at Maserati S.p.A., Milan, Italy",
      note: "Powertrain Department — automotive engineering consultancy",
      points: [
        "Development and refinement of control strategies for thermal management and CO₂ emissions on hybrid vehicles",
        "NEDC (ECE R.83 and R.101) compliance testing; vehicle instrumentation, laboratory and on-road tests",
        "Calibration and compliance checks; scientific analyses and reporting",
      ],
    },
    {
      period: "Nov 2015 – May 2016",
      role: "Emissions Engineer Trainee",
      org: "MV Agusta Motor S.p.A., Varese, Italy",
      note: "R&amp;D Department — automotive manufacturing (motorbikes)",
      points: [
        "CO₂ and pollutant measurements under WMTC for regulatory compliance",
        "Use and maintenance of emission test equipment (roller test bench, gas analysers, lab automation)",
        "Test-report creation; participation in CUNA Circuit Emission Laboratories correlation activities",
      ],
    },
  ],

  /* --- Education --------------------------------------------------------- */
  education: [
    {
      period: "Nov 2016 – Mar 2020",
      degree: "PhD in Energetics",
      org: "Politecnico di Torino (DENERG), Italy",
      note: "Thesis: Flexible calculation approaches to support the European CO₂ emissions regulatory scheme for road vehicles · EQF level 8",
    },
    {
      period: "Oct 2012 – Jul 2015",
      degree: "MSc in Power Production (Energy Engineering)",
      org: "Politecnico di Milano, Italy",
      note: "Combustion, internal-combustion engines, multi-physics fluid dynamics, CFD · 105/110 · EQF level 7",
    },
    {
      period: "Sep 2009 – Sep 2012",
      degree: "BSc in Energy Engineering",
      org: "Politecnico di Milano, Italy",
      note: "94/110 · EQF level 6",
    },
  ],

  /* --- Skills & tools ---------------------------------------------------- */
  skills: [
    {
      group: "Programming",
      items: ["Python", "Matlab", "Arduino", "C / C++ (basic)"],
    },
    {
      group: "Simulation &amp; Measurement",
      items: ["Matlab / Simulink / Stateflow", "ETAS (INCA, MDA, INTECRIO)", "ATI Vision",
              "AVL IndiCom", "Dewesoft", "Kvaser", "CSS Electronics", "Freematics", "OBD", "CAN"],
    },
    {
      group: "Data, Tools &amp; Skills",
      items: ["Data pipelines", "Data scraping", "Data visualization", "MongoDB", "Git",
              "Claude Code", "PyCharm / VS Code", "Jupyter", "CO2MPAS", "VECTO"],
    },
    {
      group: "Languages",
      items: ["Italian — C2 (native)", "English — C1 (TOEFL iBT 102/120)", "Spanish — B2"],
    },
  ],

  /* --- Soft skills (shown as expandable pills below the expertise map) ---- */
  softSkills: [
    {
      label: "Science Communication",
      desc: "Award-winning communicator: Best 3-Minute Research Video at Politecnico di Torino (2019). Presenter at public science festivals including Focus Live and European Researchers Night, and speaker at 'Science is everywhere' seminars for high school students.",
    },
    {
      label: "Presentation",
      desc: "Regular speaker at international conferences including SAE, TAP, THIESEL, and Transport Research Arena. Presents technical findings to audiences ranging from domain experts to EU policymakers and the general public.",
    },
    {
      label: "Stakeholder Engagement",
      desc: "Supports European and UN-level policy discussions on vehicle emissions regulation. Engages with industry representatives, national authorities and institutional stakeholders in the development of EU regulatory frameworks.",
    },
    {
      label: "Scientific Writing",
      desc: "Author and co-author of 35+ peer-reviewed publications in leading journals including Journal of Cleaner Production, Energy Conversion and Management and Science of the Total Environment. Contributor to JRC technical reports and EU regulatory documentation.",
    },
    {
      label: "Public Outreach",
      desc: "Presented 'Green Driving' at Focus Live festivals in Milan and Genoa (2019). Demonstrated on-board fuel-consumption monitoring through telematics at European Researchers Night in Milan (2023). Managed the VIPV thematic zone at EUCAD 2025.",
    },
    {
      label: "Teaching &amp; Mentoring",
      desc: "Delivered 'Science is everywhere' digital seminars for high school students (2022). Guides junior researchers and trainees at JRC on experimental campaigns, data analysis and scientific methods.",
    },
    {
      label: "Teamwork",
      desc: "Awarded JRC Excellence 2025 for 'Best Team Collaboration' supporting EUCAD 2025. Collaborative work across JRC units and with external partners on large-scale experimental campaigns and multi-author research.",
    },
  ],

  /* --- Conferences & events (active contributions) ----------------------- */
  events: [
    { year: 2026, name: "CO₂ Reduction for Transportation Systems Conference", location: "Turin, Italy" },
    { year: 2026, name: "Transport Research Arena (TRA)", location: "Budapest, Hungary" },
    { year: 2025, name: "Transport and Pollution Conference", location: "Rueil-Malmaison, France" },
    { year: 2025, name: "EUCAD — European Conference on Connected and Automated Driving", location: "JRC, Ispra, Italy", note: "Managed the VIPV thematic zone; presented fuel-consumption monitoring to executive visitors" },
    { year: 2024, name: "SAE CO₂ Reduction for Transportation Systems Conference", location: "Turin, Italy" },
    { year: 2024, name: "Seminar on Vehicle-Integrated PhotoVoltaics &amp; Road Show", location: "JRC, Ispra, Italy" },
    { year: 2023, name: "Transport and Air Pollution Conference", location: "Gothenburg, Sweden" },
    { year: 2023, name: "European Researchers Night", location: "Museo della Scienza e della Tecnica, Milan, Italy", note: "Presenting on-board fuel-consumption monitoring through telematics" },
    { year: 2022, name: "THIESEL Conference", location: "Valencia, Spain" },
    { year: 2022, name: "SAE CO₂ Reduction for Transportation Systems Conference", location: "Turin, Italy" },
    { year: 2022, name: "\"Science is everywhere\" — seminars for high school students", location: "Digital (3 events)" },
    { year: 2020, name: "SAE CO₂ Reduction for Transportation Systems Conference", location: "Turin, Italy" },
    { year: 2019, name: "Focus Live Festival", location: "Milan, Italy", note: "Presenting \"Green Driving\" in a thematic zone" },
    { year: 2019, name: "Focus Live Festival", location: "Genoa, Italy", note: "Presenting \"Green Driving\" in a thematic zone" },
    { year: 2019, name: "WCX World Congress Experience", location: "Detroit, USA" },
    { year: 2018, name: "SAENA Workshop", location: "Reggio Emilia, Italy", note: "Presenting PHEV regulation and implications" },
    { year: 2017, name: "PTNSS Congress", location: "Poznan, Poland" },
    { year: 2017, name: "SAE ICE Conference", location: "Capri, Italy" },
  ],

  /* --- Published resources ----------------------------------------------- */
  resources: [
    {
      name: "Vehicle Data Processing (VDP) tool",
      role: "Main developer, 2022–2026",
      url: "https://code.europa.eu/jrc-ldv/vdp",
      desc: "Flexible tool for processing experimental, naturalistic or simulated road-vehicle usage data — " +
            "data cleaning, GNSS/CAN processing, powertrain calculations (Mobile A/C, braking-energy regeneration, " +
            "friction-brake usage) and the Cycle Energy Demand (CED) tool supporting EU Reg. 2023/2866 on " +
            "In-Service Verification of CO₂ emissions.",
    },
    {
      name: "LEGENT data repository",
      role: "Main contributor, 2025–2026",
      url: "https://code.europa.eu/jrc-legent/legent-data",
      desc: "A living repository of transport-and-driving-related data: aggregated trips from an automated " +
            "OBD/OBFCM and telematics ingestion pipeline, driving data from instrumented vehicles, and " +
            "fuel-consumption / driving-intensity data from the European M1 fleet.",
    },
  ],

  /* --- Awards ------------------------------------------------------------ */
  awards: [
    {
      year: "2025",
      name: "JRC Award for Excellence — “Best Team Collaboration”",
      desc: "For supporting the 5th European Conference on Connected and Automated Driving (EUCAD 2025): " +
            "managing the Vehicle-Integrated PhotoVoltaics thematic zone and presenting fuel-consumption " +
            "monitoring through telematics to executive visitors.",
    },
    {
      year: "2019",
      name: "PhD Prize — Doctoral School, Politecnico di Torino",
      desc: "Best 3-Minute Research Video (32nd Doctoral Cycle) — recognised for distilling complex research " +
            "into an engaging, accessible format.",
    },
  ],

  /* --- Publications (reverse chronological) ------------------------------
     doi: a full URL (https://doi.org/... or https://data.europa.eu/...).
     Leave doi empty ("") for items without one.                            */
  publications: [
    { year: 2026, authors: "Albano G., Mattas K., Komnos D., Tansini A., Vass S., Donà R., Garus A., Fontaras G., Nahmias-Biran B., Ciuffo B.", title: "Unveiling the energy implications of automated driving: evidence from real-world data", venue: "Journal of Cleaner Production, Vol. 565", doi: "https://doi.org/10.1016/j.jclepro.2026.148294", tags: ["Automated Driving", "Real-World Monitoring", "Energy Efficiency", "Data Analysis"] },
    { year: 2026, authors: "Lopez-Juarez M., Tansini A., Di Pierro G., Novella R., Fontaras G.", title: "Influence of the driving pattern and hydrogen-mix scenario of next-generation FCV on performance and environmental impact in the 2025–2050 timeframe", venue: "Energy Conversion and Management: X, Vol. 30", doi: "https://doi.org/10.1016/j.ecmx.2026.101876", tags: ["Hydrogen / FCEV", "Energy Efficiency", "Modelling & Simulation", "CO₂ Emissions"] },
    { year: 2026, authors: "Pavlovic J., Komnos D., Suarez Corujo J., Ktistakis M., Passier G., Tansini A. et al.", title: "Risk assessment for the 2026 In-Service Verification (ISV) of CO₂ emissions of light-duty vehicles", venue: "Publications Office of the European Union", doi: "https://data.europa.eu/doi/10.2760/2376420", tags: ["In-Service Verification", "CO₂ Emissions", "EU Regulations"] },
    { year: 2025, authors: "Suarez Corujo J., Tansini A., Ktistakis M., Laverde Marin A., Komnos D., Pavlovic J., Fontaras G.", title: "Towards zero CO₂ emissions: insights from EU vehicle on-board data", venue: "Science of the Total Environment", doi: "https://doi.org/10.1016/j.scitotenv.2025.180454", tags: ["CO₂ Emissions", "Real-World Monitoring", "OBFCM", "Data Analysis", "Transport Decarbonisation"] },
    { year: 2025, authors: "Tansini A., Laverde Marin A., Suarez Corujo J., Aguirre N., Fontaras G.", title: "Learning from the real world: insights on light-vehicle efficiency and CO₂ emissions from long-term on-board fuel and energy consumption data collection", venue: "Energy Conversion and Management", doi: "https://doi.org/10.1016/j.enconman.2025.119816", tags: ["Real-World Monitoring", "Energy Efficiency", "CO₂ Emissions", "OBFCM", "Data Pipelines", "Fuel & Energy Consumption", "Data Analysis", "LEGENT", "Transport Decarbonisation"] },
    { year: 2025, authors: "Mourtzouchou A., Marin A.L., Laveneziana L., Tansini A. et al.", title: "Comparative analysis of public and expert perceptions of electrified vehicles in the European Union", venue: "Scientific Reports 15, 21695", doi: "https://doi.org/10.1038/s41598-025-06071-0", tags: ["BEV", "Data Analysis"] },
    { year: 2025, authors: "Komnos D., Tansini A., Trentadue G., Fontaras G., Grigoratos T., Giechaskiel B.", title: "Friction and regenerative braking shares under various laboratory and on-road driving conditions of a plug-in hybrid passenger car", venue: "Energies 18(15), 4104", doi: "https://doi.org/10.3390/en18154104", tags: ["Regenerative Braking", "PHEV", "Experimental Testing"] },
    { year: 2025, authors: "Marin A.L., Martínez-Plumed F., Makridis M.A., Tansini A., Pulvirenti L., Suarez Corujo J., Fontaras G.", title: "Follow the leader: a deep reinforcement learning framework for safe and efficient autonomous car-following", venue: "Journal of Intelligent Transportation Systems", doi: "https://doi.org/10.1080/15472450.2025.2576907", tags: ["Automated Driving", "Data Analysis"] },
    { year: 2025, authors: "Tansini A., Sartori Vieira F., Ellis H., Dunlop E., Fontaras G.", title: "Benchmarking the real-world energy benefits of vehicle-integrated photovoltaics", venue: "Transport and Pollution International Conference 2025, Paris — proceedings under publication", doi: "", tags: ["VIPV", "Energy Efficiency", "Real-World Monitoring", "BEV"] },
    { year: 2025, authors: "Bouter A., Suarez J., Laveneziana L., Komnos D., Tansini A. et al.", title: "A comprehensive analysis of energy use and GHG emissions in EU light-duty vehicles", venue: "Transport and Pollution International Conference 2025, Paris — proceedings under publication", doi: "", tags: ["CO₂ Emissions", "Energy Efficiency", "Data Analysis", "Fuel & Energy Consumption", "Transport Decarbonisation"] },
    { year: 2025, authors: "JRC", title: "Risk assessment for the 2025 In-Service Verification (ISV) of CO₂ emissions of light-duty vehicles (Commission Implementing Reg. (EU) 2023/2866)", venue: "Publications Office of the European Union", doi: "https://data.europa.eu/doi/10.2760/0897088", tags: ["In-Service Verification", "CO₂ Emissions", "EU Regulations"] },
    { year: 2025, authors: "Suarez J., Ktistakis M.A., Komnos D., Tansini A., Marin A.L., Makridis M., Ciuffo B., Fontaras G.", title: "The impact of drivers’ acceleration style on the vehicle energy performance: a real-world case study", venue: "Transportation Research Procedia, Vol. 82, pp. 3300–3319", doi: "https://doi.org/10.1016/j.trpro.2024.12.093", tags: ["Real-World Monitoring", "Energy Efficiency", "Data Analysis", "Fuel & Energy Consumption"] },
    { year: 2024, authors: "JRC", title: "Risk assessment for the 2024 In-Service Verification (ISV) of CO₂ emissions of light-duty vehicles (Commission Implementing Reg. (EU) 2023/2866)", venue: "Publications Office of the European Union", doi: "https://data.europa.eu/doi/10.2760/0897088", tags: ["In-Service Verification", "CO₂ Emissions", "EU Regulations"] },
    { year: 2024, authors: "Pavlovic J., Tansini A., Suarez Corujo J., Fontaras G.", title: "Influence of vehicle and battery ageing and driving modes on emissions and efficiency in plug-in hybrid vehicles", venue: "Energy Conversion and Management: X", doi: "https://data.europa.eu/doi/10.2760/574267", tags: ["PHEV", "Energy Efficiency", "CO₂ Emissions"] },
    { year: 2024, authors: "Di Pierro G., Bitsanis E., Tansini A., Bonato C., Martini G., Fontaras G.", title: "Fuel-cell electric vehicle characterisation under laboratory and in-use operation", venue: "Energy Reports", doi: "https://doi.org/10.1016/j.egyr.2023.12.013", tags: ["Hydrogen / FCEV", "Experimental Testing"] },
    { year: 2024, authors: "Gil-Sayas S., Di Pierro G., Tansini A., Serra S., Currò D., Broatch A., Fontaras G.", title: "Energy consumption of mobile air-conditioning systems in electrified vehicles under different ambient temperatures", venue: "International Journal of Engine Research", doi: "https://doi.org/10.1177/14680874231171303", tags: ["Mobile A/C", "Energy Efficiency", "BEV"] },
    { year: 2023, authors: "Tansini A., Fontaras G., Millo F.", title: "A multipurpose simulation approach for hybrid electric vehicles to support the European CO₂ emissions framework", venue: "Atmosphere, Vol. 14, Art. 587", doi: "https://doi.org/10.3390/atmos14030587", tags: ["Modelling & Simulation", "Hybrid Electric", "CO₂ Emissions", "EU Regulations"] },
    { year: 2023, authors: "Bitsanis E., Broekaert S., Tansini A., Savvidis D., Fontaras G.", title: "Experimental evaluation of VECTO hybrid electric truck simulations", venue: "SAE Technical Papers", doi: "https://doi.org/10.4271/2023-01-0485", tags: ["VECTO", "Heavy-Duty Vehicles", "Hybrid Electric", "Modelling & Simulation"] },
    { year: 2023, authors: "Tansini A., Suarez J., Aguirre N., Laverde A., Fontaras G.", title: "From physical testing to on-board fuel-consumption monitoring and telemetry: a pilot project for capturing the real-world fuel consumption of vehicles", venue: "25th TAP &amp; 3rd S&amp;E Conferences, Publications Office of the European Union", doi: "https://data.europa.eu/doi/10.2760/564701", tags: ["Real-World Monitoring", "OBFCM", "Telematics", "Experimental Testing", "Fuel & Energy Consumption", "Data Pipelines"] },
    { year: 2023, authors: "Suarez J., Laverde A., Tansini A., Ktistakis M.A., Komnos D., Fontaras G.", title: "Observations on the driving of plug-in hybrid cars in real-world conditions", venue: "CSUM 2022, Lecture Notes in Intelligent Transportation and Infrastructure, Springer", doi: "https://doi.org/10.1007/978-3-031-23721-8_12", tags: ["PHEV", "Real-World Monitoring"] },
    { year: 2022, authors: "Tansini A., Pavlovic J., Fontaras G.", title: "Quantifying the real-world CO₂ emissions and energy consumption of modern plug-in hybrid vehicles", venue: "Journal of Cleaner Production, Vol. 362", doi: "https://doi.org/10.1016/j.jclepro.2022.132191", tags: ["PHEV", "Real-World Monitoring", "CO₂ Emissions", "Energy Efficiency"] },
    { year: 2022, authors: "Thiel C., Gracia Amillo A., Tansini A., Tsakalidis A., Fontaras G., Dunlop E., Taylor N., Jäger-Waldau A., Araki K., Nishioka K., Ota Y., Yamaguchi M.", title: "Impact of climatic conditions on prospects for integrated photovoltaics in electric vehicles", venue: "Renewable and Sustainable Energy Reviews, Vol. 158", doi: "https://doi.org/10.1016/j.rser.2022.112109", tags: ["VIPV", "BEV", "Energy Efficiency"] },
    { year: 2022, authors: "Ktistakis M.A., Tansini A., Marin A.L., Suarez J., Komnos D., Fontaras G.", title: "Understanding the fuel consumption of plug-in hybrid electric vehicles: a real-world case study", venue: "THIESEL 2022 Conference", doi: "https://doi.org/10.4995/Thiesel.2022.632801", tags: ["PHEV", "Fuel & Energy Consumption", "Real-World Monitoring"] },
    { year: 2022, authors: "Tansini A., Di Pierro G., Fontaras G., Gil-Sayas S. et al.", title: "Battery electric vehicles energy consumption breakdown from on-road trips", venue: "SAE Int. J. Adv. &amp; Curr. Prac. in Mobility 5(3):977–987", doi: "https://doi.org/10.4271/2022-37-0009", tags: ["BEV", "Energy Efficiency", "Experimental Testing", "Real-World Monitoring"] },
    { year: 2022, authors: "Di Pierro G., Tansini A., Fontaras G., Bonato C.", title: "Experimental assessment of powertrain components and energy-flow analysis of a fuel-cell electric vehicle (FCEV)", venue: "CO₂ Reduction for Transportation Systems Conference, Turin", doi: "https://doi.org/10.4271/2022-37-0011", tags: ["Hydrogen / FCEV", "Experimental Testing"] },
    { year: 2021, authors: "Zacharof N., Fontaras G., Ciuffo B., Tansini A., Prado-Rujas I.", title: "An estimation of heavy-duty vehicle fleet CO₂ emissions based on sampled data", venue: "Transportation Research Part D, Vol. 94", doi: "https://doi.org/10.1016/j.trd.2021.102784", tags: ["Heavy-Duty Vehicles", "CO₂ Emissions", "Modelling & Simulation"] },
    { year: 2020, authors: "Tansini A., Fontaras G., Millo F.", title: "A theoretical and experimental analysis of the Coulomb-counting method and of the estimation of the electrified-vehicles electricity balance in the WLTP", venue: "SAE Technical Paper 2020-37-0020", doi: "https://doi.org/10.4271/2020-37-0020", tags: ["WLTP", "BEV", "Experimental Testing", "Modelling & Simulation"] },
    { year: 2019, authors: "Suarez-Bertoa R., Pavlovic J., Trentadue G., Otura-Garcia M., Tansini A., Ciuffo B., Astorga C.", title: "Effect of low ambient temperature on emissions and electric range of plug-in hybrid electric vehicles", venue: "ACS Omega", doi: "https://doi.org/10.1021/acsomega.8b02459", tags: ["PHEV", "CO₂ Emissions", "Experimental Testing"] },
    { year: 2019, authors: "Di Pierro G., Millo F., Tansini A., Fontaras G., Scassa M.", title: "An integrated experimental and numerical methodology for plug-in hybrid electric vehicle 0D modelling", venue: "SAE Technical Paper 2019-24-0072", doi: "https://doi.org/10.4271/2019-24-0072", tags: ["PHEV", "Modelling & Simulation", "Experimental Testing"] },
    { year: 2019, authors: "Zacharof N., Tansini A., Prado-Rujas I., Grigoratos T., Fontaras G.", title: "A generalized component-efficiency and input-data generation model for creating fleet-representative vehicle simulation cases in VECTO", venue: "SAE Technical Paper 2019-01-1280", doi: "https://doi.org/10.4271/2019-01-1280", tags: ["VECTO", "Heavy-Duty Vehicles", "Modelling & Simulation"] },
    { year: 2019, authors: "Doulgeris S., Tansini A. et al.", title: "Simulation-based assessment of the CO₂ emissions reduction potential from the implementation of mild-hybrid architectures on passenger cars to support the development of CO2MPAS", venue: "Technical report", doi: "", tags: ["CO2MPAS", "Hybrid Electric", "Modelling & Simulation", "CO₂ Emissions"] },
    { year: 2019, authors: "Tansini A., Fontaras G., Ciuffo B., Millo F., Prado-Rujas I., Zacharof N.", title: "Calculating heavy-duty truck energy and fuel consumption using correlation formulas derived from VECTO simulations", venue: "SAE Technical Paper 2019-01-1278", doi: "https://doi.org/10.4271/2019-01-1278", tags: ["VECTO", "Heavy-Duty Vehicles", "Modelling & Simulation", "Fuel & Energy Consumption"] },
    { year: 2018, authors: "Tansini A., Zacharof N.-G., Prado-Rujas I., Fontaras G.", title: "Analysis of VECTO data for heavy-duty vehicles (HDV) CO₂ emission targets", venue: "JRC Scientific and Technical Report, Publications Office of the European Union", doi: "https://doi.org/10.2760/551250", tags: ["VECTO", "Heavy-Duty Vehicles", "CO₂ Emissions"] },
    { year: 2017, authors: "Zacharof N., Fontaras G., Ciuffo B., Tansini A., Grigoratos T., Prado-Rujas I., Anagnostopoulos K.", title: "CO₂ emissions of the European heavy-duty truck fleet: a preliminary analysis using the VECTO simulator and global sensitivity analysis", venue: "22nd Transport and Air Pollution Conference, Zürich", doi: "", tags: ["VECTO", "Heavy-Duty Vehicles", "CO₂ Emissions", "Modelling & Simulation"] },
    { year: 2017, authors: "Pavlovic J., Tansini A., Fontaras G., Ciuffo B., Otura Garcia M., Trentadue G., Suarez-Bertoa R., Millo F.", title: "The impact of WLTP on the official fuel consumption and electric range of plug-in hybrid electric vehicles in Europe", venue: "SAE Int. J. of Passenger Cars; SAE Technical Paper 2017-24-0133", doi: "", tags: ["WLTP", "PHEV", "Fuel & Energy Consumption", "Utility Factors"] },
  ],
};
