export const siteConfig = {
  name: "Archex",
  tagline: "Good software starts with good engineering.",
  description:
    "We build digital products, bring AI into existing workflows, and improve software businesses already depend on.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "",
  phone: "",
  address: "",
  social: {
    linkedin: "",
    github: ""
  }
};

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Modernization", href: "/modernization" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/about" }
];
