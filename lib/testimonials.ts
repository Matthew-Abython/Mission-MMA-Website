export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  text: string;
  discipline: "bjj" | "muay-thai" | "kids" | "womens" | "events" | "general";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ian-s",
    name: "Ian S.",
    initials: "IS",
    text: "This is by far the best MMA/kickboxing gym I have ever been to. Yokkao Muay Thai equipment, a fantastic strength area, and Coach Said Hatim's world-class instruction. Couldn't recommend more.",
    discipline: "muay-thai",
  },
  {
    id: "anish-k",
    name: "Anish K.",
    initials: "AK",
    text: "Said Hatim is an amazing coach. Highly motivating, unparalleled technique. Top notch facility, awesome instructors, and the best equipment money can buy.",
    discipline: "muay-thai",
  },
  {
    id: "mission-member",
    name: "Mission Member",
    initials: "MM",
    text: "Great place to learn Muay Thai, BJJ, wrestling, and how to mix techniques. Coaches care, facility is clean and well run, and teammates feel like extended family.",
    discipline: "bjj",
  },
  {
    id: "corporate-guest",
    name: "Corporate Event Guest",
    initials: "CE",
    text: "The instructors here were AMAZING — professional, kind, and wonderful to work with. I would highly recommend other companies to bring their teams to Mission MMA.",
    discipline: "events",
  },
  {
    id: "self-defense",
    name: "Self-Defense Attendee",
    initials: "SD",
    text: "An AMAZING self defense class! Each of us left feeling empowered, stronger, and excited to come back. Perfect experience — thank you to the whole Mission team!",
    discipline: "womens",
  },
  {
    id: "bjj-parent",
    name: "Kids BJJ Parent",
    initials: "KP",
    text: "The top jiu-jitsu gym I've enrolled my son in — and we've been to 4 others. Overly impressed. Trainers are professional, respectful, and love what they do.",
    discipline: "kids",
  },
  {
    id: "open-mat",
    name: "Open Mat Drop-in",
    initials: "OM",
    text: "Incredible find while on a work trip. The club is immaculate, coaching is exceptional, and the community welcomes visitors. Wish I trained here full time.",
    discipline: "bjj",
  },
  {
    id: "said-student",
    name: "Said Hatim Student",
    initials: "SS",
    text: "Said combines creative workouts with world-class instruction and honest guidance. He genuinely cares about every student's progress. Couldn't recommend more highly.",
    discipline: "muay-thai",
  },
  {
    id: "chicago-fighter",
    name: "Chicago Martial Artist",
    initials: "CM",
    text: "This gym has it all — a clean, vibrant environment and truly elite coaches. I went to other gyms with decent coaches but Mission will keep you hooked. These people are family.",
    discipline: "general",
  },
  {
    id: "new-student",
    name: "New Student",
    initials: "NS",
    text: "I've always wanted to learn Muay Thai and Mission is the best recommendation I ever got. Said is knowledgeable, humble, and makes you excited about every single session.",
    discipline: "muay-thai",
  },
  {
    id: "ted-c",
    name: "Ted C.",
    initials: "TC",
    text: "My friend trains BJJ here so I dropped by when in town. The facility is immaculate, coaching is exceptional, and the community genuinely welcomes drop-ins.",
    discipline: "bjj",
  },
  {
    id: "womens-bjj",
    name: "Women's BJJ Student",
    initials: "WB",
    text: "Building skills one step at a time in the Women's BJJ class. I train with confidence and comfort here. The coaches make sure every woman gets the most out of every session.",
    discipline: "womens",
  },
];
