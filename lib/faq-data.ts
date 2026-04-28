export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "bjj" | "muay-thai" | "kids" | "membership";
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "first-day",
    category: "general",
    question: "What can I expect on my first day?",
    answer: "On your first day, be sure to arrive a few minutes early. When you enter, you'll remove your shoes and place them in a cubby. Then, you'll go to the front desk to register and fill out a waiver. If you need to change your clothes, you can do so in the locker room. Once you're ready for class, you'll step into a blue tub of foot cleanser, then onto a towel to dry your feet before stepping on the mat. From there, just follow your coach's instructions!",
  },
  {
    id: "beginners-welcome",
    category: "general",
    question: "Are beginners welcome?",
    answer: "Absolutely! All experienced fighters were once beginners. Our students range from absolute beginners to active fighters. Mission is open to athletes from all walks of life and everyone is welcome.",
  },
  {
    id: "drop-in",
    category: "membership",
    question: "Do you offer drop-in options?",
    answer: "Yes, you're more than welcome to drop in for a class. Our drop-in fee is $35.",
  },
  {
    id: "what-to-wear",
    category: "general",
    question: "What should I wear to train?",
    answer: "For BJJ, kickboxing and MMA classes, wear comfortable exercise clothing (dry-fit shirt, shorts, leggings, etc). For BJJ gi classes, wear a gi, preferably white. Ensure that your clothes are clean and your nails are trimmed.",
  },
  {
    id: "gear-needed",
    category: "general",
    question: "What type of gear do I need?",
    answer: "For BJJ, a mouthguard is recommended but not mandatory. For kickboxing, you'll need shin guards, hand wraps and 16oz boxing gloves. For MMA, you'll need grappling gloves and a mouth guard. Avoid brands like Sanabul and RDX — these tend to bleed color onto your skin and mat, which is unhealthy. Gear can be purchased at the gym if needed. Ask at the front desk!",
  },
  {
    id: "facilities",
    category: "general",
    question: "What facilities does the gym have?",
    answer: "Mission has fully equipped locker rooms for men and women with toilets and showers. We also have a recovery room available for those with unlimited memberships. This room has ice machines, gravity chairs, compression boots and more — everything you need to recover from your workout.",
  },
  {
    id: "disability",
    category: "general",
    question: "What if I have a disability or other physical limitation?",
    answer: "Mission is fully committed to maintaining an inclusive environment. Just be sure to alert the coach so that adjustments can be made as needed. Mission also offers semi-private programming for adults with cognitive and intellectual disabilities. For more information, contact us at said@missionmmachicago.com.",
  },
  {
    id: "free-trial",
    category: "membership",
    question: "Do you offer a free trial class?",
    answer: "Yes. Mission MMA offers a free first class to new students. You can book your free trial online or by calling 312-265-1856. No experience, membership, or gear is required to attend your first class.",
  },
  {
    id: "membership-cost",
    category: "membership",
    question: "How much does a membership cost?",
    answer: "Membership pricing varies by program and commitment level. Contact us at 312-265-1856 or info@missionmmachicago.com for current rates. We offer flexible month-to-month and longer-term options to fit your schedule and budget.",
  },
  {
    id: "parking",
    category: "general",
    question: "Is there parking near the gym?",
    answer: "Yes. Mission MMA is located at 1620 W Carroll Ave, Chicago, IL 60612, in the West Loop / Fulton Market area. Street parking is available on Carroll Ave and nearby side streets. The gym is also accessible via CTA bus.",
  },
  {
    id: "bjj-gi-no-gi",
    category: "bjj",
    question: "What is the difference between gi and no-gi BJJ?",
    answer: "Gi BJJ is practiced in a traditional uniform (the gi) and involves grabbing the jacket and pants as part of the grappling strategy. No-gi BJJ is practiced in shorts and a rash guard with no uniform grips — it tends to be faster-paced and is closer to wrestling or MMA grappling. Mission MMA offers both formats.",
  },
  {
    id: "bjj-belt-progression",
    category: "bjj",
    question: "How long does it take to get a black belt in BJJ?",
    answer: "Brazilian Jiu-Jitsu belt progression typically takes 8–12 years to reach black belt, making it one of the most rigorous martial arts ranking systems. The belts progress from white → blue → purple → brown → black. Advancement depends on consistent training, technical development, and time on the mat.",
  },
  {
    id: "bjj-safe",
    category: "bjj",
    question: "Is BJJ safe for beginners?",
    answer: "Yes. BJJ is one of the safer martial arts for beginners because it emphasizes technique and leverage over strength, and submissions are applied slowly with partners trained to tap before injury occurs. At Mission MMA, all beginner classes are coached with safety as the priority.",
  },
  {
    id: "muay-thai-beginner",
    category: "muay-thai",
    question: "Can I start Muay Thai with no prior experience?",
    answer: "Absolutely. Muay Thai classes at Mission MMA are structured to welcome complete beginners. Fundamentals like stance, footwork, and basic strikes are taught before any sparring is introduced. You will not spar until you and your coach both feel you are ready.",
  },
  {
    id: "muay-thai-fitness",
    category: "muay-thai",
    question: "Is Muay Thai a good workout even if I don't want to fight?",
    answer: "Yes — Muay Thai is one of the most effective full-body workouts available. A single class burns 500–800 calories and develops cardiovascular endurance, coordination, core strength, and mental toughness. Many Mission MMA students train purely for fitness with no interest in competition.",
  },
  {
    id: "kids-age",
    category: "kids",
    question: "What age can kids start martial arts classes?",
    answer: "Mission MMA's Kids BJJ & Kickboxing program is designed for children. Contact us at 312-265-1856 for current age group details and class times. Kids classes focus on discipline, confidence, coordination, and self-defense in a structured, fun environment.",
  },
  {
    id: "womens-classes",
    category: "general",
    question: "Do you offer women-only martial arts classes?",
    answer: "Yes. Mission MMA offers a dedicated Women's Brazilian Jiu-Jitsu program in a supportive, women-only training environment. It is beginner-friendly and focuses on self-defense, fitness, and community. No experience is required to join.",
  },
  {
    id: "how-often-train",
    category: "general",
    question: "How often should I train as a beginner?",
    answer: "For beginners, training 2–3 times per week is ideal. This allows your body to adapt while giving you time to recover and absorb technique. Mission MMA's 30+ weekly classes make it easy to build a consistent schedule around your life.",
  },
];

export const HOME_FAQ_IDS = [
  "first-day",
  "beginners-welcome",
  "free-trial",
  "bjj-safe",
  "muay-thai-fitness",
  "womens-classes",
];
