export type AgentRole =
  | "Outreach Agent"
  | "Team & Volunteer Manager Agent"
  | "Speaker & Jury Agent"
  | "Content & Agenda Agent"
  | "Live Event Moderator Agent"
  | "Sponsor Manager Agent"
  | "Community Growth Agent";

export interface Participant {
  name: string;
  points: number;
  badges: string[];
  referrals_count: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

export interface EngagementLog {
  timestamp: string;
  agent: AgentRole;
  action: string;
}

export interface CalendarEvent {
  title: string;
  date: string; // ISO
  description: string;
  assigned_agent: AgentRole;
}

export const demoParticipants: Participant[] = [
  { name: "Aiko Tanaka", points: 1280, badges: ["Early Bird", "Mentor"], referrals_count: 12 },
  { name: "Liam Patel", points: 990, badges: ["Top 10%"], referrals_count: 8 },
  { name: "Nora Jensen", points: 870, badges: ["Streak x7"], referrals_count: 4 },
  { name: "Diego Ruiz", points: 820, badges: ["Team Lead"], referrals_count: 6 },
];

export const demoLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Aiko Tanaka", points: 1280 },
  { rank: 2, name: "Liam Patel", points: 990 },
  { rank: 3, name: "Nora Jensen", points: 870 },
  { rank: 4, name: "Diego Ruiz", points: 820 },
];

export const demoLogs: EngagementLog[] = [
  { timestamp: new Date().toISOString(), agent: "Outreach Agent", action: "Queued 250 Discord DMs" },
  { timestamp: new Date().toISOString(), agent: "Content & Agenda Agent", action: "Drafted challenge brief for Web3 track" },
  { timestamp: new Date().toISOString(), agent: "Sponsor Manager Agent", action: "Compiled list of 20 potential sponsors" },
  { timestamp: new Date().toISOString(), agent: "Live Event Moderator Agent", action: "Scheduled AMA reminder in Slack" },
];

export const demoEvents: CalendarEvent[] = [
  { title: "Kickoff Keynote", date: new Date(Date.now() + 86400000).toISOString(), description: "Welcome + challenge reveal", assigned_agent: "Content & Agenda Agent" },
  { title: "Mentor Hours", date: new Date(Date.now() + 2*86400000).toISOString(), description: "Experts available for teams", assigned_agent: "Team & Volunteer Manager Agent" },
  { title: "Sponsor Demo Day", date: new Date(Date.now() + 3*86400000).toISOString(), description: "Partner showcases", assigned_agent: "Sponsor Manager Agent" },
];
