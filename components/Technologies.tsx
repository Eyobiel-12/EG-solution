const technologies = [
  {
    name: "React",
    description: "Building interactive UIs with the popular JavaScript library",
    logo: "/images/react.svg", // Use actual logo if available, else placeholder
  },
  {
    name: "Next.js",
    description: "Creating fast, SEO-friendly applications with server-side rendering",
    logo: "/images/nextjs.svg",
  },
  {
    name: "Node.js",
    description: "Powering backend services with JavaScript runtime environment",
    logo: "/images/nodejs.svg",
  },
  {
    name: "TypeScript",
    description: "Adding type safety to enhance code quality and developer experience",
    logo: "/images/typescript.svg",
  },
  {
    name: "MongoDB",
    description: "Flexible document database for modern applications",
    logo: "/images/mongodb.svg",
  },
  {
    name: "PostgreSQL",
    description: "Robust relational database for data-intensive applications",
    logo: "/images/postgresql.svg",
  },
]

{technologies.map((tech) => (
  <div key={tech.name} className="tech-card">
    <img src={tech.logo} alt={`${tech.name} logo`} className="h-16 w-16 mx-auto mb-4" onError={(e) => { e.currentTarget.src = '/placeholder-logo.svg' }} />
    <h3 className="font-bold text-lg text-center">{tech.name}</h3>
    <p className="text-center">{tech.description}</p>
  </div>
))} 