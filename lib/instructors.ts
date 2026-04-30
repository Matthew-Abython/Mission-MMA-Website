export interface Instructor {
  slug: string;
  name: string;
  title: string;
  /** Path relative to /public, e.g. "/Said_Hatim.png" */
  photo: string;
  /** First 2 paragraphs — shown on hub card */
  shortBio: string[];
  /** All paragraphs — shown on individual page in full */
  fullBio: string[];
  disciplines: string[];
}

export const INSTRUCTORS: Instructor[] = [
  {
    slug: "said-hatim",
    name: "Said Hatim",
    title: "Head Coach & Owner",
    photo: "/Said_Hatim.png",
    disciplines: ["Brazilian Jiu-Jitsu", "Muay Thai", "MMA"],
    shortBio: [
      "With nearly four decades of martial arts experience, Said Hatim is one of the most accomplished and respected instructors in Chicago MMA, Brazilian Jiu-Jitsu, and Muay Thai training.",
      "A former professional kickboxer, undefeated MMA competitor, and professional submission grappler, Said has competed at the highest levels of combat sports, including international and world championship bouts. His real-world experience translates directly into his coaching, giving students a rare opportunity to learn from a fighter who has truly tested his skills.",
    ],
    fullBio: [
      "With nearly four decades of martial arts experience, Said Hatim is one of the most accomplished and respected instructors in Chicago MMA, Brazilian Jiu-Jitsu, and Muay Thai training.",
      "A former professional kickboxer, undefeated MMA competitor, and professional submission grappler, Said has competed at the highest levels of combat sports, including international and world championship bouts. His real-world experience translates directly into his coaching, giving students a rare opportunity to learn from a fighter who has truly tested his skills.",
      "Said is a former Illinois State Kickboxing Champion, a world title challenger, and a Brazilian Jiu-Jitsu second-degree black belt under the Brasa affiliation—one of the most respected lineages in the sport.",
      "At Mission MMA & Fitness in Chicago's West Loop, Said has built more than just a gym—he's created a results-driven training environment where beginners, hobbyists, and professional fighters all thrive. His coaching style emphasizes technical precision, discipline, and personalized progression, helping students build confidence, get in elite shape, and develop real self-defense skills.",
      "From kids stepping onto the mats for the first time to athletes preparing for competition, Said has a proven track record of developing students at every level—including world-class competitors.",
      "If you're looking for high-level MMA, Brazilian Jiu-Jitsu, or Muay Thai training in Chicago, you'll be learning from one of the best.",
    ],
  },
];
