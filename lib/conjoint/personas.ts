// Synthetic respondent factory for Forge pricing study.
// Stratified to match the real Indian addressable market for credentialed candidates.

export type Persona = {
  id: number
  name: string
  age: number
  gender: 'M' | 'F'
  state: string
  city: string
  cityTier: 'T1' | 'T2' | 'T3'
  incomeBand: '₹0' | '₹4-8L' | '₹8-15L' | '₹15-30L' | '₹30L+'
  educationTier: 'IIM/IIT/ISB/XLRI' | 'Tier-1 non-IIT' | 'Tier-2 college' | 'MOOC / self-taught'
  currentRole: 'Student' | 'Junior IC' | 'Senior IC' | 'Manager' | 'Founder'
  careerGoal: 'MBA admit' | 'PM switch' | 'Salary jump' | 'Move abroad/remote' | 'Start own thing'
  riskProfile: 'price-sensitive' | 'feature-maximizer' | 'status-premium'
  bio: string
}

// ===== Name pools by region (representative, not exhaustive) =====
const NAMES: Record<string, { m: string[]; f: string[]; lastNames: string[] }> = {
  Maharashtra: {
    m: ['Rohan', 'Aditya', 'Vikram', 'Karan', 'Aniket', 'Saurabh', 'Pranav', 'Tejas'],
    f: ['Priya', 'Sneha', 'Ananya', 'Tanvi', 'Aarti', 'Shruti', 'Pooja', 'Mrunal'],
    lastNames: ['Patil', 'Joshi', 'Kulkarni', 'Deshmukh', 'Shinde', 'Pawar', 'Bhosale', 'Gokhale'],
  },
  Karnataka: {
    m: ['Karthik', 'Arjun', 'Rahul', 'Anand', 'Manoj', 'Bharath', 'Vignesh', 'Sandeep'],
    f: ['Sahana', 'Divya', 'Meghana', 'Kavya', 'Lavanya', 'Spoorthi', 'Pavithra', 'Anusha'],
    lastNames: ['Rao', 'Shetty', 'Gowda', 'Hegde', 'Reddy', 'Bhat', 'Murthy', 'Nayak'],
  },
  'Tamil Nadu': {
    m: ['Aravind', 'Krishnan', 'Vignesh', 'Suresh', 'Praveen', 'Karthik', 'Senthil', 'Naveen'],
    f: ['Sandhya', 'Lakshmi', 'Anitha', 'Priya', 'Bhavya', 'Janani', 'Kavitha', 'Shobana'],
    lastNames: ['Iyer', 'Subramanian', 'Krishnan', 'Raman', 'Nair', 'Pillai', 'Reddy', 'Murugan'],
  },
  'Delhi-NCR': {
    m: ['Dhruv', 'Aman', 'Rishabh', 'Ayush', 'Akshay', 'Rohit', 'Varun', 'Kartik'],
    f: ['Riya', 'Ishita', 'Diya', 'Mehak', 'Naina', 'Ananya', 'Shreya', 'Tanya'],
    lastNames: ['Aggarwal', 'Gupta', 'Sharma', 'Mehta', 'Khanna', 'Chopra', 'Malhotra', 'Verma'],
  },
  Telangana: {
    m: ['Praveen', 'Anvesh', 'Karthik', 'Anand', 'Rakesh', 'Sridhar', 'Vamshi', 'Pavan'],
    f: ['Sneha', 'Shreya', 'Madhuri', 'Nikitha', 'Sahithi', 'Akhila', 'Sruthi', 'Harshitha'],
    lastNames: ['Reddy', 'Rao', 'Goud', 'Chowdary', 'Yadav', 'Naidu', 'Kumar', 'Raju'],
  },
  'Uttar Pradesh': {
    m: ['Saurabh', 'Ankit', 'Rajat', 'Vivek', 'Abhishek', 'Akash', 'Nikhil', 'Mohit'],
    f: ['Pooja', 'Neha', 'Shalini', 'Komal', 'Sonal', 'Priyanka', 'Anjali', 'Smriti'],
    lastNames: ['Singh', 'Mishra', 'Tiwari', 'Dwivedi', 'Pandey', 'Yadav', 'Verma', 'Kumar'],
  },
  'West Bengal': {
    m: ['Souvik', 'Anirban', 'Subhankar', 'Arijit', 'Rohan', 'Sourav', 'Dipankar', 'Debarghya'],
    f: ['Riya', 'Trisha', 'Ananya', 'Diya', 'Indrani', 'Megha', 'Sayantani', 'Kasturi'],
    lastNames: ['Banerjee', 'Mukherjee', 'Chatterjee', 'Ghosh', 'Bose', 'Sen', 'Das', 'Dutta'],
  },
  Gujarat: {
    m: ['Krunal', 'Bhavin', 'Aditya', 'Devang', 'Harsh', 'Parth', 'Smit', 'Maulik'],
    f: ['Krishna', 'Hetal', 'Naina', 'Heer', 'Khushi', 'Riddhi', 'Vidhi', 'Mansi'],
    lastNames: ['Patel', 'Shah', 'Mehta', 'Desai', 'Modi', 'Trivedi', 'Bhatt', 'Jain'],
  },
}

const CITIES: Record<string, { state: string; tier: 'T1' | 'T2' | 'T3' }[]> = {
  Maharashtra: [
    { state: 'Maharashtra', city: 'Mumbai', tier: 'T1' } as any,
    { state: 'Maharashtra', city: 'Pune', tier: 'T1' } as any,
    { state: 'Maharashtra', city: 'Nagpur', tier: 'T2' } as any,
    { state: 'Maharashtra', city: 'Nashik', tier: 'T3' } as any,
  ],
  Karnataka: [
    { state: 'Karnataka', city: 'Bangalore', tier: 'T1' } as any,
    { state: 'Karnataka', city: 'Mysore', tier: 'T3' } as any,
    { state: 'Karnataka', city: 'Mangalore', tier: 'T3' } as any,
  ],
  'Tamil Nadu': [
    { state: 'Tamil Nadu', city: 'Chennai', tier: 'T1' } as any,
    { state: 'Tamil Nadu', city: 'Coimbatore', tier: 'T2' } as any,
    { state: 'Tamil Nadu', city: 'Madurai', tier: 'T3' } as any,
    { state: 'Tamil Nadu', city: 'Trichy', tier: 'T3' } as any,
  ],
  'Delhi-NCR': [
    { state: 'Delhi-NCR', city: 'Delhi', tier: 'T1' } as any,
    { state: 'Delhi-NCR', city: 'Gurgaon', tier: 'T1' } as any,
    { state: 'Delhi-NCR', city: 'Noida', tier: 'T1' } as any,
  ],
  Telangana: [
    { state: 'Telangana', city: 'Hyderabad', tier: 'T1' } as any,
    { state: 'Telangana', city: 'Warangal', tier: 'T3' } as any,
  ],
  'Uttar Pradesh': [
    { state: 'Uttar Pradesh', city: 'Lucknow', tier: 'T2' } as any,
    { state: 'Uttar Pradesh', city: 'Kanpur', tier: 'T3' } as any,
    { state: 'Uttar Pradesh', city: 'Allahabad', tier: 'T3' } as any,
    { state: 'Uttar Pradesh', city: 'Varanasi', tier: 'T3' } as any,
  ],
  'West Bengal': [
    { state: 'West Bengal', city: 'Kolkata', tier: 'T1' } as any,
    { state: 'West Bengal', city: 'Durgapur', tier: 'T3' } as any,
  ],
  Gujarat: [
    { state: 'Gujarat', city: 'Ahmedabad', tier: 'T2' } as any,
    { state: 'Gujarat', city: 'Surat', tier: 'T2' } as any,
    { state: 'Gujarat', city: 'Vadodara', tier: 'T3' } as any,
  ],
}

const INSTITUTES: Record<Persona['educationTier'], string[]> = {
  'IIM/IIT/ISB/XLRI': ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Kozhikode', 'ISB Hyderabad', 'XLRI Jamshedpur', 'IIT Bombay', 'IIT Delhi', 'IIT Madras'],
  'Tier-1 non-IIT': ['NIT Trichy', 'NIT Warangal', 'BITS Pilani', 'FMS Delhi', 'MDI Gurgaon', 'NITIE Mumbai', 'IIFT Delhi', 'SP Jain Mumbai'],
  'Tier-2 college': ['Pune University', 'Anna University', 'VIT Vellore', 'Manipal Institute', 'NIT Surat', 'SRM Chennai', 'Symbiosis Pune', 'Jadavpur University'],
  'MOOC / self-taught': ['Coursera certs', 'upGrad MBA Online', 'Scaler Academy', 'Masai School', 'AlmaBetter', 'GeeksforGeeks bootcamp'],
}

const COMPANIES_BY_ROLE: Record<Persona['currentRole'], string[]> = {
  Student: ['—'],
  'Junior IC': ['TCS', 'Infosys', 'Wipro', 'Capgemini', 'Cognizant', 'LTI', 'HCL Tech', 'Tech Mahindra', 'Persistent', 'Mindtree'],
  'Senior IC': ['Razorpay', 'Cred', 'Zerodha', 'Flipkart', 'Swiggy', 'Zomato', 'PhonePe', 'Meesho', 'Postman', 'Freshworks', 'Groww', 'Paytm'],
  Manager: ['Razorpay', 'Cred', 'Microsoft India', 'Amazon India', 'Google India', 'PhonePe', 'Flipkart', 'Swiggy', 'Meesho'],
  Founder: ['(own startup)'],
}

// ===== Weighted sampling helpers =====
function weighted<T>(items: T[], weights: number[], rand: () => number): T {
  const total = weights.reduce((a, b) => a + b, 0)
  let r = rand() * total
  for (let i = 0; i < items.length; i++) {
    r -= weights[i]
    if (r <= 0) return items[i]
  }
  return items[items.length - 1]
}

function makeRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

// ===== Stratified persona factory =====
export function generatePersonas(n: number, seed = 42): Persona[] {
  const rand = makeRand(seed)
  const personas: Persona[] = []

  // State weights (rough split of MBA / IT / startup pool by state)
  const stateNames = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi-NCR', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Gujarat']
  const stateWeights = [18, 22, 12, 17, 11, 8, 6, 6]

  for (let i = 0; i < n; i++) {
    const state = weighted(stateNames, stateWeights, rand)
    const city = weighted(CITIES[state] as any, CITIES[state].map((c) => c.tier === 'T1' ? 3 : c.tier === 'T2' ? 2 : 1), rand) as any
    const cityTier = city.tier as 'T1' | 'T2' | 'T3'

    const gender = rand() < 0.6 ? 'M' : 'F'  // 60-40, reflects working-age tech population
    const nameBank = NAMES[state]
    const first = (gender === 'M' ? nameBank.m : nameBank.f)[Math.floor(rand() * (gender === 'M' ? nameBank.m.length : nameBank.f.length))]
    const last = nameBank.lastNames[Math.floor(rand() * nameBank.lastNames.length)]

    // Age stratified
    const ageBucket = weighted([0, 1, 2], [0.40, 0.35, 0.25], rand)
    const age = ageBucket === 0 ? 22 + Math.floor(rand() * 5) : ageBucket === 1 ? 27 + Math.floor(rand() * 6) : 33 + Math.floor(rand() * 8)

    // Role stratified by age
    const currentRole = age < 25
      ? weighted(['Student', 'Junior IC'] as Persona['currentRole'][], [0.7, 0.3], rand)
      : age < 30
        ? weighted(['Junior IC', 'Senior IC', 'Student'] as Persona['currentRole'][], [0.45, 0.45, 0.10], rand)
        : age < 36
          ? weighted(['Senior IC', 'Manager', 'Founder'] as Persona['currentRole'][], [0.55, 0.35, 0.10], rand)
          : weighted(['Senior IC', 'Manager', 'Founder'] as Persona['currentRole'][], [0.35, 0.50, 0.15], rand)

    // Income stratified by role
    const incomeBand: Persona['incomeBand'] = currentRole === 'Student'
      ? '₹0'
      : currentRole === 'Junior IC'
        ? weighted(['₹4-8L', '₹8-15L'] as Persona['incomeBand'][], [0.7, 0.3], rand)
        : currentRole === 'Senior IC'
          ? weighted(['₹8-15L', '₹15-30L', '₹30L+'] as Persona['incomeBand'][], [0.45, 0.45, 0.10], rand)
          : currentRole === 'Manager'
            ? weighted(['₹15-30L', '₹30L+'] as Persona['incomeBand'][], [0.55, 0.45], rand)
            : weighted(['₹4-8L', '₹8-15L', '₹15-30L', '₹30L+'] as Persona['incomeBand'][], [0.30, 0.30, 0.25, 0.15], rand)

    // Education
    const eduTier = weighted(
      ['IIM/IIT/ISB/XLRI', 'Tier-1 non-IIT', 'Tier-2 college', 'MOOC / self-taught'] as Persona['educationTier'][],
      [0.20, 0.35, 0.30, 0.15], rand,
    )
    const institute = INSTITUTES[eduTier][Math.floor(rand() * INSTITUTES[eduTier].length)]

    // Goal — biased by current role
    const careerGoal: Persona['careerGoal'] = currentRole === 'Student'
      ? weighted(['MBA admit', 'PM switch', 'Salary jump'] as Persona['careerGoal'][], [0.30, 0.40, 0.30], rand)
      : currentRole === 'Junior IC'
        ? weighted(['PM switch', 'Salary jump', 'MBA admit', 'Move abroad/remote'] as Persona['careerGoal'][], [0.35, 0.30, 0.20, 0.15], rand)
        : currentRole === 'Senior IC'
          ? weighted(['PM switch', 'Salary jump', 'Move abroad/remote', 'Start own thing'] as Persona['careerGoal'][], [0.30, 0.30, 0.25, 0.15], rand)
          : weighted(['Salary jump', 'Move abroad/remote', 'Start own thing'] as Persona['careerGoal'][], [0.40, 0.30, 0.30], rand)

    // Risk profile — most Indians price-sensitive
    const riskProfile = weighted(
      ['price-sensitive', 'feature-maximizer', 'status-premium'] as Persona['riskProfile'][],
      [0.55, 0.30, 0.15], rand,
    )

    const company = COMPANIES_BY_ROLE[currentRole][Math.floor(rand() * COMPANIES_BY_ROLE[currentRole].length)]

    const bio = buildBio({
      name: `${first} ${last}`,
      age, city: city.city, state, currentRole, company, institute, eduTier, careerGoal, incomeBand, riskProfile,
    })

    personas.push({
      id: i + 1, name: `${first} ${last}`, age, gender, state, city: city.city, cityTier,
      incomeBand, educationTier: eduTier, currentRole, careerGoal, riskProfile, bio,
    })
  }

  return personas
}

function buildBio(p: any) {
  const roleStr = p.currentRole === 'Student' ? `Final year MBA at ${p.institute}` :
                  p.currentRole === 'Founder' ? `Founder of own bootstrapped startup` :
                  `${p.currentRole} at ${p.company}, ${p.institute} grad`
  const incomeStr = p.incomeBand === '₹0' ? 'no income yet' : `currently earning ${p.incomeBand}/yr`
  const goalStr = p.careerGoal === 'MBA admit' ? 'cracking a top MBA next year' :
                  p.careerGoal === 'PM switch' ? 'switching to a Product Management role' :
                  p.careerGoal === 'Salary jump' ? 'a 2x salary jump in the next role' :
                  p.careerGoal === 'Move abroad/remote' ? 'landing a remote or abroad role' :
                  'starting their own venture'

  const riskStr = p.riskProfile === 'price-sensitive'
    ? `Treats every subscription suspiciously — won't pay unless they're sure they'll use it daily. Will compare against equivalent free options. Annual upfront feels like a trap.`
    : p.riskProfile === 'feature-maximizer'
      ? `Will pay more if the feature list is comprehensive. Hates feeling limited. Likes "Unlimited" and "Pro" branding. Reads every line of the pricing page.`
      : `Status-conscious — likes premium branding, top-of-leaderboard placement, signaling to peers/recruiters. Will pay extra for visibility.`

  return `${p.name}, ${p.age}, from ${p.city}, ${p.state}. ${roleStr}. ${incomeStr.charAt(0).toUpperCase() + incomeStr.slice(1)}. Goal: ${goalStr}. ${riskStr}`
}
