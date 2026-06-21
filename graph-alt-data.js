/* =============================================================================
   graph-alt-data.js — "Option B" expertise map.
   Node size (s) encodes how central / recurrent the keyword is across
   Alessandro's roles and publications. `top:true` adds an emphasis halo.
   Soft skills are shown separately as expandable pills below the map.
   ========================================================================== */

const GRAPH_ALT = {
  clusters: {
    core:        "#eaf2ff",  // most recurrent identity themes
    powertrain:  "#38bdf8",  // vehicle technologies
    data:        "#2dd4bf",  // data & instrumentation
    tools:       "#5b8def",  // tools & methods
    policy:      "#a78bfa",  // regulation & policy
  },
  nodes: [],
  edges: [],
};

GRAPH_ALT.nodes = [
  /* ---- core / most recurrent (largest, with halo) ---- */
  { id: "CO₂ Emissions",          c: "core", s: 3.0, top: true },
  { id: "Real-World Monitoring",      c: "core", s: 2.9, top: true },
  { id: "Data Analysis",              c: "core", s: 3.0, top: true },
  { id: "Transport Decarbonisation",  c: "core", s: 2.5, top: true },
  { id: "Fuel &amp; Energy Consumption",  c: "core", s: 2.4 },
  { id: "Energy Efficiency",          c: "core", s: 2.2 },

  /* ---- powertrains ---- */
  { id: "PHEV",                       c: "powertrain", s: 2.0 },
  { id: "BEV",                        c: "powertrain", s: 1.8 },
  { id: "Hydrogen / FCEV",            c: "powertrain", s: 1.6 },
  { id: "Hybrid Electric",            c: "powertrain", s: 1.5 },
  { id: "ICE",                        c: "powertrain", s: 1.1 },

  /* ---- data & instrumentation ---- */
  { id: "Data Pipelines",             c: "data", s: 2.0 },
  { id: "OBFCM",                      c: "data", s: 1.9 },
  { id: "Data Visualization",         c: "data", s: 1.9 },
  { id: "Telematics",                 c: "data", s: 1.5 },
  { id: "OBD / CAN",                  c: "data", s: 1.3 },
  { id: "GNSS",                       c: "data", s: 1.2 },
  { id: "Experimental Testing",       c: "data", s: 1.6 },
  { id: "Web Scraping",               c: "data", s: 1.1 },

  /* ---- tools & methods ---- */
  { id: "Modelling &amp; Simulation",     c: "tools", s: 2.3, top: true },
  { id: "Python",                     c: "tools", s: 1.9 },
  { id: "VECTO",                      c: "tools", s: 1.4 },
  { id: "CO2MPAS",                    c: "tools", s: 1.4 },
  { id: "VDP Tool",                   c: "tools", s: 1.4 },
  { id: "LEGENT",                     c: "tools", s: 1.2 },
  { id: "Matlab / Simulink",          c: "tools", s: 1.3 },
  { id: "CFD",                        c: "tools", s: 1.0 },

  /* ---- regulation & policy ---- */
  { id: "Policy Support",             c: "policy", s: 2.1, top: true },
  { id: "EU Regulations",             c: "policy", s: 2.0 },
  { id: "In-Service Verification",    c: "policy", s: 1.4 },
  { id: "UN R154",                    c: "policy", s: 1.1 },
  { id: "Utility Factors",            c: "policy", s: 1.1 },
  { id: "Life Cycle Assessment",      c: "policy", s: 1.1 },
  { id: "WLTP",                       c: "policy", s: 1.1 },

  /* ---- research topics (smaller) ---- */
  { id: "VIPV",                       c: "powertrain", s: 1.2 },
  { id: "Regenerative Braking",       c: "powertrain", s: 1.1 },
  { id: "Mobile A/C",                 c: "powertrain", s: 1.0 },
  { id: "Automated Driving",          c: "data", s: 1.3 },
  { id: "Heavy-Duty Vehicles",        c: "tools", s: 1.3 },
];

GRAPH_ALT.edges = [
  // core hub
  ["Transport Decarbonisation", "CO₂ Emissions"],
  ["Transport Decarbonisation", "Energy Efficiency"],
  ["Transport Decarbonisation", "Real-World Monitoring"],
  ["CO₂ Emissions", "Fuel &amp; Energy Consumption"],
  ["CO₂ Emissions", "EU Regulations"],
  ["CO₂ Emissions", "Heavy-Duty Vehicles"],
  ["CO₂ Emissions", "Modelling &amp; Simulation"],
  ["Energy Efficiency", "Fuel &amp; Energy Consumption"],
  ["Fuel &amp; Energy Consumption", "Real-World Monitoring"],
  ["Fuel &amp; Energy Consumption", "PHEV"],
  ["Fuel &amp; Energy Consumption", "BEV"],

  // data analysis as a major hub
  ["Data Analysis", "Real-World Monitoring"],
  ["Data Analysis", "Data Pipelines"],
  ["Data Analysis", "Data Visualization"],
  ["Data Analysis", "Python"],
  ["Data Analysis", "Modelling &amp; Simulation"],
  ["Data Analysis", "OBFCM"],
  ["Data Analysis", "Experimental Testing"],

  // real-world monitoring
  ["Real-World Monitoring", "OBFCM"],
  ["Real-World Monitoring", "Telematics"],
  ["Real-World Monitoring", "OBD / CAN"],
  ["Real-World Monitoring", "In-Service Verification"],
  ["Real-World Monitoring", "Automated Driving"],

  // powertrains
  ["Energy Efficiency", "PHEV"],
  ["Energy Efficiency", "BEV"],
  ["Energy Efficiency", "Hybrid Electric"],
  ["Energy Efficiency", "WLTP"],
  ["Energy Efficiency", "VIPV"],
  ["Energy Efficiency", "Mobile A/C"],
  ["BEV", "VIPV"],
  ["BEV", "Regenerative Braking"],
  ["PHEV", "Utility Factors"],
  ["PHEV", "Hybrid Electric"],
  ["PHEV", "Regenerative Braking"],
  ["Hydrogen / FCEV", "Experimental Testing"],
  ["Hydrogen / FCEV", "Modelling &amp; Simulation"],
  ["Hybrid Electric", "VECTO"],
  ["Hybrid Electric", "CO2MPAS"],

  // data plumbing
  ["OBD / CAN", "Data Pipelines"],
  ["OBFCM", "Data Pipelines"],
  ["OBFCM", "In-Service Verification"],
  ["OBFCM", "UN R154"],
  ["Telematics", "Data Pipelines"],
  ["GNSS", "Data Pipelines"],
  ["Web Scraping", "Data Pipelines"],
  ["Data Pipelines", "Python"],
  ["Data Pipelines", "VDP Tool"],
  ["Data Pipelines", "LEGENT"],
  ["Experimental Testing", "PHEV"],
  ["Experimental Testing", "Mobile A/C"],

  // tools
  ["Modelling &amp; Simulation", "Python"],
  ["Modelling &amp; Simulation", "CFD"],
  ["Modelling &amp; Simulation", "CO2MPAS"],
  ["Python", "Matlab / Simulink"],
  ["Matlab / Simulink", "CFD"],
  ["VECTO", "Heavy-Duty Vehicles"],
  ["VECTO", "EU Regulations"],
  ["CO2MPAS", "EU Regulations"],
  ["VDP Tool", "In-Service Verification"],

  // policy
  ["EU Regulations", "UN R154"],
  ["EU Regulations", "In-Service Verification"],
  ["EU Regulations", "Utility Factors"],
  ["EU Regulations", "WLTP"],
  ["EU Regulations", "Life Cycle Assessment"],
  ["Policy Support", "EU Regulations"],
  ["Policy Support", "Real-World Monitoring"],
  ["Policy Support", "Life Cycle Assessment"],

];
