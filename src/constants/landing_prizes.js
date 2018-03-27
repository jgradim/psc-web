import env from "config/environment";

const prizeSwitch      = `${env.assetHost}/images/prize-switch.png`;
const prizeMonitor     = `${env.assetHost}/images/prize-monitor.png`;
const prizeHeadphones  = `${env.assetHost}/images/prize-headphones.png`;

const aiPrize1st = `${env.assetHost}/images/ai-prize-1st.png`;
const aiPrize2nd = `${env.assetHost}/images/ai-prize-2nd.png`;
const aiPrize3rd = `${env.assetHost}/images/ai-prize-3rd.png`;

export const HACKATHON_PRIZES = [
  { title: "Fun", subtitle: "Nintendo Switch", description: "Play your favorite games anywhere and have some fun.", image: prizeSwitch },
  { title: "Useful", subtitle: "Dell Monitor U2515H", description: "Great for coding and design, with accurate colors and QHD resolution.", image: prizeMonitor },
  { title: "Creative", subtitle: "Bose QuietComfort 35", description: "Turn the world off and let your creative juices flow.", image: prizeHeadphones },
];

export const AI_COMP_PRIZES = [
  { title: "1st Place", subtitle: "Asus Tinker Board 2GB\n2.5\" 1Tb HDD Seagate Backup Plus Slim\nUE BOOM 2", image: aiPrize1st },
  { title: "2nd Place", subtitle: "Asus Tinker Board 2GB\n2.5\" 1Tb HDD Seagate Backup Plus Slim", image: aiPrize2nd },
  { title: "3rd Place", subtitle: "Asus Tinker Board 2GB", image: aiPrize3rd },
];
