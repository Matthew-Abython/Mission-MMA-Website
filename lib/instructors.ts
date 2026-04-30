export interface Instructor {
  slug: string;
  name: string;
  title: string;
  /** Path relative to /public — used for the hub card thumbnail */
  photo: string;
  /** Optional hero background image for the individual page. Falls back to photo if omitted. */
  heroPhoto?: string;
  /** CSS object-position for the hero image, e.g. "right center". Defaults to "center". */
  heroPhotoPosition?: string;
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
    heroPhoto: "/Site_Said_smile.jpg",
    heroPhotoPosition: "right center",
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
  {
    slug: "milos-jeftic",
    name: "Milos Jeftic",
    title: "Muay Thai / Kickboxing Coach",
    photo: "/Molos_Jeftic.png",
    heroPhoto: "/Molos_Jeftic.png",
    heroPhotoPosition: "center",
    disciplines: ["Muay Thai", "Kickboxing"],
    shortBio: [
      "Milos Jeftic (\"MJ\") is a Muay Thai and Kickboxing coach at Mission MMA & Fitness in Chicago with over 18 years of experience in martial arts training and competition. Born in Macedonia and raised in Serbia, MJ brings a deep striking foundation shaped by traditional karate and European kickboxing systems.",
      "A black belt in karate and active amateur kickboxer, MJ blends technical precision with high-paced, modern Muay Thai striking. He continues to develop his craft under Mission MMA Head Coach Said Hatim while actively competing, giving his students a direct connection to real-time fight experience and evolving striking systems.",
    ],
    fullBio: [
      "Milos Jeftic (\"MJ\") is a Muay Thai and Kickboxing coach at Mission MMA & Fitness in Chicago with over 18 years of experience in martial arts training and competition. Born in Macedonia and raised in Serbia, MJ brings a deep striking foundation shaped by traditional karate and European kickboxing systems.",
      "A black belt in karate and active amateur kickboxer, MJ blends technical precision with high-paced, modern Muay Thai striking. He continues to develop his craft under Mission MMA Head Coach Said Hatim while actively competing, giving his students a direct connection to real-time fight experience and evolving striking systems.",
      "Since relocating to Chicago in 2015, MJ has become known for his energetic, engaging coaching style and his ability to make striking approachable for all levels. His classes focus on fundamentals, timing, conditioning, and confidence-building through repetition and controlled intensity.",
      "At Mission MMA in Chicago's West Loop, MJ plays a key role in developing striking athletes who want to improve fitness, learn self-defense, or compete. His coaching environment pushes students to work hard while still maintaining a positive, supportive energy that keeps people consistently improving.",
      "Training under Coach MJ helps students sharpen their stand-up game, improve cardio, and develop the confidence needed to perform under pressure in both training and competition.",
    ],
  },
  {
    slug: "gerardo-cepeda",
    name: "Gerardo Cepeda",
    title: "Brazilian Jiu-Jitsu Instructor",
    photo: "/Gerardo_Cepeda.png",
    heroPhoto: "/Gerardo_Cepeda.png",
    heroPhotoPosition: "center",
    disciplines: ["Brazilian Jiu-Jitsu"],
    shortBio: [
      "Coach Gerardo Cepeda is a Brazilian Jiu-Jitsu Black Belt instructor at Mission MMA & Fitness in Chicago, specializing in technical Jiu-Jitsu development, positional control, and structured progression for students of all experience levels.",
      "As a first-degree black belt, Gerardo has spent years refining his understanding of leverage-based grappling and modern Brazilian Jiu-Jitsu systems. His coaching emphasizes precision, patience, and technical efficiency, helping students build a strong foundation that translates to both sport and self-defense scenarios.",
    ],
    fullBio: [
      "Coach Gerardo Cepeda is a Brazilian Jiu-Jitsu Black Belt instructor at Mission MMA & Fitness in Chicago, specializing in technical Jiu-Jitsu development, positional control, and structured progression for students of all experience levels.",
      "As a first-degree black belt, Gerardo has spent years refining his understanding of leverage-based grappling and modern Brazilian Jiu-Jitsu systems. His coaching emphasizes precision, patience, and technical efficiency, helping students build a strong foundation that translates to both sport and self-defense scenarios.",
      "Gerardo is known for his detail-focused instruction style, where complex positions are broken down into clear, repeatable steps. His classes prioritize fundamentals such as guard retention, escapes, pressure passing, and submissions, making them highly effective for long-term skill development.",
      "At Mission MMA in Chicago, Gerardo plays a key role in developing students who want to build real confidence on the mats—whether they are beginners learning survival skills or advanced practitioners refining competition strategy.",
      "His calm, structured teaching environment allows students to progress at a steady pace while developing a deeper understanding of Brazilian Jiu-Jitsu as both a martial art and a lifelong discipline.",
    ],
  },
  {
    slug: "sydney-yockey",
    name: "Sydney Yockey",
    title: "Strength & Conditioning Coach",
    photo: "/Sydney_Yockey.png",
    heroPhoto: "/Sydney_Yockey.png",
    heroPhotoPosition: "center top",
    disciplines: ["Strength & Conditioning", "Brazilian Jiu-Jitsu"],
    shortBio: [
      "Sydney Yockey is a Strength & Conditioning Coach at Mission MMA & Fitness in Chicago specializing in athletic performance, functional strength training, and movement-based conditioning for combat sports athletes.",
      "A NASM Certified Personal Trainer (NASM-CPT), Sydney has worked closely with coaches and athletes across multiple disciplines, developing programs that improve strength, endurance, mobility, and injury resistance. Her approach is rooted in making performance training accessible, scalable, and sustainable.",
    ],
    fullBio: [
      "Sydney Yockey is a Strength & Conditioning Coach at Mission MMA & Fitness in Chicago specializing in athletic performance, functional strength training, and movement-based conditioning for combat sports athletes.",
      "A NASM Certified Personal Trainer (NASM-CPT), Sydney has worked closely with coaches and athletes across multiple disciplines, developing programs that improve strength, endurance, mobility, and injury resistance. Her approach is rooted in making performance training accessible, scalable, and sustainable.",
      "As a longtime member of Mission MMA, Sydney has trained in martial arts for over four years and has also spent time teaching women's fundamental Brazilian Jiu-Jitsu. This background gives her a unique understanding of how strength training directly impacts performance on the mats and in striking arts.",
      "Now leading the Strength & Conditioning program at Mission MMA in Chicago's West Loop, Sydney designs training systems that support MMA, BJJ, and striking athletes at every level—from complete beginners to competitive fighters.",
      "Her coaching emphasizes functional movement patterns, core stability, conditioning endurance, and injury prevention, helping students build a strong athletic base that enhances every aspect of their martial arts training.",
    ],
  },
  {
    slug: "juan-zaragoza",
    name: "Juan Zaragoza",
    title: "Strength & Conditioning / Youth MMA Coach",
    photo: "/Juan_Zaragoza.png",
    heroPhoto: "/Juan_Zaragoza.png",
    heroPhotoPosition: "center",
    disciplines: ["Strength & Conditioning", "Kids BJJ", "Kids Kickboxing"],
    shortBio: [
      "Juan Zaragoza is a Strength & Conditioning Instructor and youth martial arts coach at Mission MMA & Fitness in Chicago with over eight years of training experience across Brazilian Jiu-Jitsu, kickboxing, and MMA fundamentals.",
      "Having trained at Mission MMA since 2017, Juan has developed a strong understanding of the gym's training philosophy and culture. He currently coaches kids' kickboxing and Brazilian Jiu-Jitsu classes, helping younger students develop discipline, coordination, confidence, and foundational martial arts skills.",
    ],
    fullBio: [
      "Juan Zaragoza is a Strength & Conditioning Instructor and youth martial arts coach at Mission MMA & Fitness in Chicago with over eight years of training experience across Brazilian Jiu-Jitsu, kickboxing, and MMA fundamentals.",
      "Having trained at Mission MMA since 2017, Juan has developed a strong understanding of the gym's training philosophy and culture. He currently coaches kids' kickboxing and Brazilian Jiu-Jitsu classes, helping younger students develop discipline, coordination, confidence, and foundational martial arts skills.",
      "Juan is actively pursuing his personal training certification while continuing to grow under the mentorship of experienced coaches, including Coach Milos Jeftic. His development path reflects a strong focus on long-term athletic coaching and structured performance training.",
      "Known for his ability to connect with students of all ages, Juan brings a high-energy but disciplined approach to coaching. His strength and conditioning work focuses on movement quality, athletic development, and building physical confidence that supports success in martial arts and everyday life.",
      "At Mission MMA in Chicago, Juan plays an important role in developing the next generation of martial artists by combining structured training with an encouraging, mentorship-driven coaching style.",
    ],
  },
  {
    slug: "romero-stancle",
    name: "Romero Stancle",
    title: "MMA Coach",
    photo: "/Romero_Stancle.png",
    heroPhoto: "/Romero_Stancle.png",
    heroPhotoPosition: "center",
    disciplines: ["MMA"],
    shortBio: [
      "Romero Stancle is an MMA Coach at Mission MMA & Fitness in Chicago specializing in mixed martial arts integration, fight system development, and complete combat training for students transitioning from individual disciplines into full MMA.",
      "Romero focuses on blending striking, wrestling, and Brazilian Jiu-Jitsu into a cohesive MMA system. His coaching emphasizes fight IQ, transitions, cage control, and decision-making under pressure, helping students understand how all ranges of combat connect inside the cage.",
    ],
    fullBio: [
      "Romero Stancle is an MMA Coach at Mission MMA & Fitness in Chicago specializing in mixed martial arts integration, fight system development, and complete combat training for students transitioning from individual disciplines into full MMA.",
      "Romero focuses on blending striking, wrestling, and Brazilian Jiu-Jitsu into a cohesive MMA system. His coaching emphasizes fight IQ, transitions, cage control, and decision-making under pressure, helping students understand how all ranges of combat connect inside the cage.",
      "At Mission MMA in Chicago's West Loop, Romero plays a key role in developing well-rounded fighters by bridging the gap between individual martial arts classes and full MMA application. His training sessions are structured to simulate real fight scenarios, improving adaptability, composure, and strategic thinking.",
      "Romero is known for his ability to simplify complex MMA sequences into clear, repeatable systems. His coaching style is direct, high-intensity, and focused on measurable improvement, making him especially effective for students preparing for amateur competition or advancing their overall martial arts skill set.",
      "He also places strong emphasis on conditioning and mental toughness, ensuring that students are physically prepared and confident in high-pressure environments.",
      "Training under Coach Romero Stancle helps students at Mission MMA develop into complete mixed martial artists with strong fundamentals across all ranges of combat, preparing them for both competition and real-world self-defense scenarios.",
    ],
  },
];
