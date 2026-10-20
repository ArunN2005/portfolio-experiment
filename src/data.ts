export const EMAIL = 'arunnanthakumar5@gmail.com'
export const GITHUB = 'https://github.com/ArunN2005'
export const LINKEDIN = 'https://www.linkedin.com/in/arunn05/'

export type Project = {
  id: string
  title: string
  subtitle: string
  category: string
  date: string
  description: string
  tags: string[]
  role: string
  challenge: string
  approach: string[]
  takeaway: string
  repository?: string
}

export const projects: Project[] = [
  {
    id: 'lazarus',
    title: 'Lazarus',
    subtitle: 'A second life for legacy code.',
    category: 'AI & Cloud',
    date: 'JAN — MAR 2026',
    description:
      'An AI-assisted migration pipeline that takes a legacy repository from analysis to deployment, with a self-healing loop along the way.',
    tags: ['AWS Bedrock', 'FastAPI', 'Next.js', 'Docker'],
    role: 'AI-assisted migration & cloud infrastructure',
    challenge:
      'Migrating a legacy codebase involves more than generating new code. The changes need a plan, a runtime, and a way to recover when deployment fails.',
    approach: [
      'Analyze a GitHub repository with Claude through AWS Bedrock.',
      'Separate the work into analyze, plan, build, deploy, and validate stages.',
      'Read runtime errors, patch failing code, and redeploy through a self-healing engine.',
      'Use containerized, serverless AWS infrastructure with Lambda, DynamoDB, and S3.',
    ],
    takeaway:
      'The interesting part is the feedback loop: execution and validation make generated code useful.',
    repository: 'https://github.com/ArunN2005/LAZARUS-V2',
  },
  {
    id: 'rezo',
    title: 'Rezo',
    subtitle: 'Small reports. Better cities.',
    category: 'Full-stack',
    date: 'AUG — NOV 2025',
    description:
      'A multilingual civic reporting app that turns a photo and a location into a visible, prioritized issue on a live city map.',
    tags: ['React Native', 'RF-DETR', 'FastAPI', 'Supabase'],
    role: 'Mobile, applied ML & location-based systems',
    challenge:
      'Local civic issues need to be easy to report and actionable for the people resolving them. A photo alone doesn’t explain where or how urgently to act.',
    approach: [
      'Build a multilingual mobile reporting and tracking flow with React Native.',
      'Fine-tune RF-DETR and host it on Roboflow to classify submitted issue photos.',
      'Combine model confidence and location proximity into a priority score.',
      'Surface reports on a live Google Maps dashboard backed by FastAPI and Supabase.',
    ],
    takeaway:
      'Useful AI connects a model prediction to a human workflow—in this case, the next issue to address.',
  },
  {
    id: 'joulet',
    title: 'Joulet',
    subtitle: 'Clean energy. Clear evidence.',
    category: 'Full-stack',
    date: 'FEB — MAR 2026',
    description:
      'A team-built verification system that checks solar energy readings before recording verified data and minting tokens on-chain.',
    tags: ['Python', 'Flask', 'React', 'Solidity'],
    role: 'Team contributor · backend & smart-contract integration',
    challenge:
      'An immutable record is only useful when the input is credible. Solar generation data needs basic physical checks before it reaches a smart contract.',
    approach: [
      'Validate output against capacity limits and daylight hours.',
      'Check sudden spikes in readings before accepting a measurement.',
      'Help build a Flask API and connect it to a Solidity smart contract.',
      'Record verified data and mint tokens on-chain.',
    ],
    takeaway:
      'Trust starts before the blockchain. The validation boundary is as important as the record itself.',
  },
]

export const experience = [
  {
    company: 'Latlon Technologies',
    role: 'AI Intern',
    date: 'MAY — JUN 2026',
    location: 'Coimbatore · On-site',
    detail:
      'Built an agentic workflow that grounds AI agents in a GitHub-linked codebase knowledge graph. The agents could implement features, write tests, schedule cron jobs, and perform research.',
    stack: 'Provisioned EC2, ECS Fargate, S3, DynamoDB, and Cognito using AWS CDK in TypeScript.',
  },
  {
    company: 'Hivetz Nutri',
    role: 'Full-Stack Developer Intern',
    date: 'JUL 2025 — JAN 2026',
    location: 'Sri Lanka · Remote',
    detail:
      'Built an inventory management system with RESTful APIs and optimized database schemas to track stock across locations.',
    stack:
      'Added role-based access control and real-time low-stock alerts for different user roles.',
  },
]

export const skillGroups = [
  {
    name: 'Build the interface',
    label: 'FRONTEND & MOBILE',
    skills: ['React', 'Next.js', 'React Native', 'JavaScript', 'HTML & CSS'],
  },
  {
    name: 'Connect the pieces',
    label: 'BACKEND & DATA',
    skills: ['Python', 'FastAPI', 'Flask', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Supabase'],
  },
  {
    name: 'Make it reliable',
    label: 'CLOUD & SYSTEMS',
    skills: ['AWS', 'AWS CDK', 'Docker', 'Linux', 'DynamoDB', 'Lambda'],
  },
  {
    name: 'Explore what’s next',
    label: 'AI & MACHINE LEARNING',
    skills: ['TensorFlow', 'Roboflow', 'Scikit-learn', 'AWS Bedrock'],
  },
]
