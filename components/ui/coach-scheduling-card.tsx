"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: string;
  dayName: string;
  dayNumber: number;
  slots: TimeSlot[];
  hasAvailability: boolean;
}

interface Coach {
  name: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

interface CoachSchedulingProps {
  coach?: Coach;
  locations?: string[];
  weekSchedule?: DaySchedule[];
  onLocationChange?: (location: string) => void;
  onTimeSlotSelect?: (day: string, time: string) => void;
  onWeekChange?: (direction: "prev" | "next") => void;
  enableAnimations?: boolean;
  className?: string;
}

const defaultCoach: Coach = {
  name: "Mission MMA & Fitness",
  title: "Chicago's Premier BJJ & Muay Thai Gym",
  location: "Chicago, IL",
  rating: 5.0,
  reviewCount: 100,
  imageUrl: "https://images.pexels.com/photos/4384679/pexels-photo-4384679.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const missionLocations = ["Muay Thai", "Brazilian Jiu-Jitsu"];

function generateWeekSchedule(discipline: string): DaySchedule[] {
  const days: DaySchedule[] = [];
  const today = new Date();

  for (let i = 0; i < 28; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getDay();

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    const dayName = i === 0 ? "Today" : dayNames[dayOfWeek];

    let hasAvailability = false;
    let slots: TimeSlot[] = [];

    if (discipline === "Muay Thai" && dayOfWeek === 1) {
      hasAvailability = true;
      slots = [{ time: "5:30 PM", available: true }];
    } else if (discipline === "Brazilian Jiu-Jitsu" && dayOfWeek === 4) {
      hasAvailability = true;
      slots = [{ time: "7:30 PM", available: true }];
    }

    if (i < 14) {
      days.push({ date: dateStr, dayName, dayNumber: date.getDate(), slots, hasAvailability });
    }
  }

  return days;
}

export function CoachSchedulingCard({
  coach = defaultCoach,
  locations = missionLocations,
  onLocationChange,
  onTimeSlotSelect,
  onWeekChange,
  enableAnimations = true,
  className,
}: CoachSchedulingProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState(locations[0]);
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(() => generateWeekSchedule(locations[0]));
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [showConfirmationView, setShowConfirmationView] = useState(false);
  const [showFormView, setShowFormView] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ day: string; time: string; dayName: string } | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLocationDropdownOpen(false);
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const handleDisciplineChange = (discipline: string) => {
    setSelectedDiscipline(discipline);
    setWeekSchedule(generateWeekSchedule(discipline));
    setIsLocationDropdownOpen(false);
    onLocationChange?.(discipline);
  };

  const handleTimeSlotClick = (day: string, time: string) => {
    const dayInfo = weekSchedule.find((d) => d.date === day);
    setSelectedTimeSlot({ day, time, dayName: dayInfo?.dayName || day });
    setShowConfirmationView(true);
    onTimeSlotSelect?.(day, time);
  };

  const handleBackToMain = () => {
    setShowConfirmationView(false);
    setShowFormView(false);
    setSelectedTimeSlot(null);
  };

  const handleBackToConfirmation = () => setShowFormView(false);
  const handleConfirmBooking = () => setShowFormView(true);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email) return;
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_BOOKING_URL;
      if (!webhookUrl) throw new Error("No webhook URL configured");

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          selectedDate: selectedTimeSlot?.day,
          selectedClass: selectedDiscipline,
          selectedTime: selectedTimeSlot?.time,
          source: "booking-page",
        }),
      });

      const w = window as Window & { gtag?: (...args: unknown[]) => void };
      if (typeof window !== "undefined" && w.gtag) {
        w.gtag("event", "free_trial_booked", { class: selectedDiscipline });
      }

      setSubmitSuccess(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -25, scale: 0.95, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.6 } },
  };

  const timeSlotVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
  };

  return (
    <motion.div
      variants={shouldAnimate ? containerVariants : {}}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      className={cn("bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden max-w-2xl relative", className)}
    >
      <div className="relative h-auto">

        {/* ── MAIN VIEW ── */}
        <motion.div
          initial={false}
          animate={{ y: showConfirmationView ? "-20px" : "0px", opacity: showConfirmationView ? 0.3 : 1, scale: showConfirmationView ? 0.95 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          className="w-full"
        >
          <motion.div variants={shouldAnimate ? itemVariants : {}} className="p-6 pb-6">
            <div className="flex items-start justify-between gap-6">
              <motion.div whileHover={shouldAnimate ? { scale: 1.05 } : {}} className="flex-shrink-0">
                <img src={coach.imageUrl} alt={coach.name} className="w-16 h-16 rounded-lg object-cover" />
              </motion.div>
              <div className="flex-1 min-w-0 space-y-4">
                <h2 className="text-xl font-semibold text-foreground">{coach.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="font-medium">{coach.rating}</span>
                    <span className="underline">(100+ members)</span>
                  </div>
                  <span>•</span>
                  <span>{coach.title}</span>
                  <span>•</span>
                  <span>{coach.location}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Free Trial</p>
                <p className="text-2xl font-bold text-emerald-500">$0</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={shouldAnimate ? itemVariants : {}} className="px-6 pb-4 relative z-50" style={{ overflow: "visible" }}>
            <label className="block text-sm text-muted-foreground mb-2">Choose your free trial class</label>
            <div className="relative z-50" ref={dropdownRef}>
              <motion.button
                whileHover={shouldAnimate ? { scale: 1.01 } : {}}
                whileTap={shouldAnimate ? { scale: 0.99 } : {}}
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                aria-expanded={isLocationDropdownOpen}
                aria-haspopup="listbox"
                className="w-full flex items-center justify-between p-3 bg-muted rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <span className="text-foreground">{selectedDiscipline}</span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isLocationDropdownOpen && "rotate-180")} />
              </motion.button>
              <AnimatePresence>
                {isLocationDropdownOpen && (
                  <motion.div
                    initial={shouldAnimate ? { opacity: 0, y: -10, scale: 0.95 } : {}}
                    animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
                    exit={shouldAnimate ? { opacity: 0, y: -10, scale: 0.95 } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-lg shadow-xl z-[9999] overflow-hidden"
                    role="listbox"
                  >
                    {missionLocations.map((discipline, index) => (
                      <motion.button
                        key={discipline}
                        initial={shouldAnimate ? { opacity: 0, x: -10 } : {}}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
                        transition={shouldAnimate ? { delay: index * 0.05 } : {}}
                        onClick={() => handleDisciplineChange(discipline)}
                        role="option"
                        aria-selected={discipline === selectedDiscipline}
                        className="w-full text-left p-3 hover:bg-muted transition-colors text-foreground"
                      >
                        {discipline}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-3 text-sm text-red-500 font-medium">
              {selectedDiscipline === "Muay Thai"
                ? "Muay Thai free trials are held every Monday at 5:30 PM"
                : "BJJ free trials are held every Thursday at 7:30 PM"}
            </p>
          </motion.div>

          <motion.div variants={shouldAnimate ? itemVariants : {}} className="mx-6 border-t border-border/50" />

          <motion.div variants={shouldAnimate ? itemVariants : {}} className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <motion.button whileHover={shouldAnimate ? { scale: 1.05 } : {}} whileTap={shouldAnimate ? { scale: 0.95 } : {}} onClick={() => onWeekChange?.("prev")} aria-label="Previous week" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </motion.button>
              <h3 className="font-semibold text-foreground">Upcoming Availability</h3>
              <motion.button whileHover={shouldAnimate ? { scale: 1.05 } : {}} whileTap={shouldAnimate ? { scale: 0.95 } : {}} onClick={() => onWeekChange?.("next")} aria-label="Next week" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div variants={shouldAnimate ? itemVariants : {}} className="px-6 pb-6 space-y-4">
            {weekSchedule.map((day) => (
              <motion.div key={day.date} variants={shouldAnimate ? itemVariants : {}} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{day.dayName}, {day.date}</h4>
                  {!day.hasAvailability && <span className="text-sm text-muted-foreground">No Availability</span>}
                </div>
                {day.hasAvailability && (
                  <motion.div variants={shouldAnimate ? containerVariants : {}} className="flex flex-wrap gap-2">
                    {day.slots.map((slot) => (
                      <motion.button
                        key={`${day.date}-${slot.time}`}
                        variants={shouldAnimate ? timeSlotVariants : {}}
                        whileHover={shouldAnimate && slot.available ? { scale: 1.05, y: -2 } : {}}
                        whileTap={shouldAnimate && slot.available ? { scale: 0.98 } : {}}
                        onClick={() => slot.available && handleTimeSlotClick(day.date, slot.time)}
                        disabled={!slot.available}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-lg border transition-colors",
                          slot.available
                            ? "bg-background border-red-600/50 hover:border-red-600 hover:bg-red-600/10 text-foreground cursor-pointer"
                            : "bg-muted/50 border-border/30 text-muted-foreground cursor-not-allowed opacity-60"
                        )}
                      >
                        {slot.time}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={shouldAnimate ? itemVariants : {}} className="border-t border-border/50 p-6">
            <div className="flex gap-3">
              <motion.button whileHover={shouldAnimate ? { scale: 1.02 } : {}} whileTap={shouldAnimate ? { scale: 0.98 } : {}} className="flex-1 bg-muted text-muted-foreground py-2.5 rounded-lg hover:bg-muted/80 transition-colors">Cancel</motion.button>
              <motion.button whileHover={shouldAnimate ? { scale: 1.02 } : {}} whileTap={shouldAnimate ? { scale: 0.98 } : {}} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium">Next</motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── CONFIRMATION VIEW ── */}
        <motion.div
          initial={false}
          animate={{ y: showConfirmationView && !showFormView ? "0%" : "100%", opacity: showConfirmationView && !showFormView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          className="absolute top-0 left-0 w-full h-full bg-card"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleBackToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </motion.button>
              <h3 className="text-lg font-semibold text-foreground">Confirm Booking</h3>
              <div />
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <img src={coach.imageUrl} alt={coach.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-semibold text-foreground">{coach.name}</h4>
                <p className="text-sm text-muted-foreground">{coach.title}</p>
              </div>
            </div>
            {selectedTimeSlot && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Your Booking</p>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <p className="text-lg font-semibold text-foreground">{selectedTimeSlot.dayName}, {selectedTimeSlot.day}</p>
                    <p className="text-xl font-bold text-red-500">{selectedTimeSlot.time}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2"><span className="text-muted-foreground">Class:</span><span className="text-foreground font-medium">{selectedDiscipline}</span></div>
                  <div className="flex justify-between items-center py-2"><span className="text-muted-foreground">Duration:</span><span className="text-foreground font-medium">1 hour</span></div>
                  <div className="flex justify-between items-center py-2"><span className="text-muted-foreground">Cost:</span><span className="text-emerald-500 font-medium">Free</span></div>
                </div>
              </div>
            )}
            <motion.button
              whileHover={shouldAnimate ? { scale: 1.02, y: -1 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
              onClick={handleConfirmBooking}
              className="w-full relative overflow-hidden py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer group transition-colors"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                CONFIRM BOOKING
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── FORM VIEW ── */}
        <motion.div
          initial={false}
          animate={{ y: showFormView ? "0%" : "100%", opacity: showFormView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          className="absolute top-0 left-0 w-full h-full bg-card"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleBackToConfirmation} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </motion.button>
              <h3 className="text-lg font-semibold text-foreground">Your Details</h3>
              <div />
            </div>
            {submitSuccess ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-lg font-semibold text-foreground">You&apos;re booked!</p>
                <p className="text-sm text-muted-foreground">We&apos;ll text you within 24 hours to confirm your free class.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm text-muted-foreground">First Name</label>
                  <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-3 bg-muted rounded-lg border border-border/50 focus:border-red-600 focus:outline-none text-foreground" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm text-muted-foreground">Last Name</label>
                  <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-3 bg-muted rounded-lg border border-border/50 focus:border-red-600 focus:outline-none text-foreground" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-muted-foreground">Email Address</label>
                  <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-muted rounded-lg border border-border/50 focus:border-red-600 focus:outline-none text-foreground" placeholder="jane@example.com" />
                </div>
                {submitError && (
                  <p className="text-sm text-red-500">Something went wrong. Please call us at <a href="tel:3122651856" className="underline font-medium">312-265-1856</a> to book directly.</p>
                )}
                <motion.button
                  whileHover={shouldAnimate ? { scale: 1.02, y: -1 } : {}}
                  whileTap={shouldAnimate ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={isSubmitting || !firstName || !lastName || !email}
                  className="w-full py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Complete My Free Trial Booking"}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
