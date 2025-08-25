import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Activity,
  Apple,
  BarChart3,
  ChefHat,
  Dumbbell,
  HeartPulse,
  Leaf,
  Mail,
  Salad,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper functions
const bmiCategory = (bmi) => {
  if (!isFinite(bmi)) return "";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obesity";
};

// Mifflin–St Jeor
const bmr = ({ sex, weightKg, heightCm, age }) => {
  const s = sex === "female" ? -161 : 5;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + s;
};

const tdeeFromActivity = (bmr, activity) => {
  const factors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very: 1.9,
  };
  return bmr * (factors[activity] ?? 1.2);
};

const sampleProgress = [
  { week: 1, weight: 86 },
  { week: 2, weight: 85.6 },
  { week: 3, weight: 85.1 },
  { week: 4, weight: 84.5 },
  { week: 5, weight: 84.1 },
  { week: 6, weight: 83.4 },
  { week: 7, weight: 83.0 },
  { week: 8, weight: 82.4 },
];

const programmes = [
  {
    icon: <Leaf className="h-6 w-6" />, title: "Beginner Reset", level: "Easy",
    desc: "Gentle 4‑week on‑ramp: clean eating, light movement, daily habits.",
    bullets: ["10–15 min mobility", "Plate method meals", "Weekend prep"],
  },
  {
    icon: <Dumbbell className="h-6 w-6" />, title: "Strength + Loss", level: "Intermediate",
    desc: "12‑week plan mixing resistance training with smart calories.",
    bullets: ["3×/week lifts", "Protein target", "NEAT goals"],
  },
  {
    icon: <Activity className="h-6 w-6" />, title: "Cardio Builder", level: "All levels",
    desc: "Interval walks/runs + simple fueling for steady fat loss.",
    bullets: ["Zone 2 base", "1 interval day", "Daily steps"],
  },
];

const meals = [
  {
    title: "Mediterranean Bowl",
    kcal: 520,
    protein: 28,
    tags: ["High‑fiber", "30‑min"],
    recipe: `
1 cup cooked quinoa\n
1 cup chopped cucumbers & tomatoes\n
1/2 cup chickpeas\n
Olives, parsley, lemon, 1 tbsp olive oil\n
Top with grilled chicken or tofu.`,
  },
  {
    title: "Veggie Omelet & Berries",
    kcal: 380,
    protein: 24,
    tags: ["Breakfast", "Low‑carb"],
    recipe: `3 eggs (or 1 egg + 3 whites), peppers, spinach, onions.\n
Side: 1 cup mixed berries.`,
  },
  {
    title: "Salmon Sheet‑Pan Dinner",
    kcal: 610,
    protein: 40,
    tags: ["Omega‑3", "1‑pan"],
    recipe: `Salmon fillet with lemon & herbs.\n
Roast with broccoli and sweet potato cubes 20–25 min @ 205°C.`,
  },
  {
    title: "Lentil & Kale Soup",
    kcal: 430,
    protein: 22,
    tags: ["Budget", "Batch‑cook"],
    recipe: `Brown lentils, onion, carrot, celery, garlic, tomatoes, kale.\n
Simmer 35–40 min; portion & freeze.`,
  },
];

export default function HealthyWeightSite() {
  const [bmiForm, setBmiForm] = useState({ heightCm: "170", weightKg: "70" });
  const [calc, setCalc] = useState({ sex: "female", age: "30", heightCm: "170", weightKg: "70", activity: "light" });
  const [selectedMeal, setSelectedMeal] = useState(null);

  const bmiValue = useMemo(() => {
    const h = parseFloat(bmiForm.heightCm) / 100;
    const w = parseFloat(bmiForm.weightKg);
    if (!h || !w) return NaN;
    return w / (h * h);
  }, [bmiForm]);

  const caloriePlan = useMemo(() => {
    const w = parseFloat(calc.weightKg);
    const h = parseFloat(calc.heightCm);
    const a = parseFloat(calc.age);
    if (!w || !h || !a) return { bmr: 0, tdee: 0, deficit: 0 };
    const base = bmr({ sex: calc.sex, weightKg: w, heightCm: h, age: a });
    const tdee = tdeeFromActivity(base, calc.activity);
    return {
      bmr: Math.round(base),
      tdee: Math.round(tdee),
      deficit: Math.round(tdee - 500), // gentle ~0.5 kg/week target
    };
  }, [calc]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6" />
            <span className="font-bold text-lg">Healthy Weight</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#programmes" className="hover:underline">Programmes</a>
            <a href="#calculators" className="hover:underline">Calculators</a>
            <a href="#meals" className="hover:underline">Healthy Food</a>
            <a href="#progress" className="hover:underline">Progress</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <Button className="rounded-2xl">Get Started</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Sustainable weight loss made simple
            </motion.h1>
            <p className="mt-4 text-slate-600">
              Evidence‑informed programmes, fuss‑free healthy meals, and built‑in tools to track your journey.
              Always personalize with a clinician if you have medical conditions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="rounded-2xl" variant="secondary"><ShieldCheck className="h-4 w-4 mr-1" />No fads</Badge>
              <Badge className="rounded-2xl" variant="secondary"><Sparkles className="h-4 w-4 mr-1" />Habit‑first</Badge>
              <Badge className="rounded-2xl" variant="secondary"><Star className="h-4 w-4 mr-1" />Diet‑flexible</Badge>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Weekly Weight Trend</CardTitle>
                <CardDescription>Example of an 8‑week steady pace.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" tickLine={false} />
                      <YAxis tickLine={false} domain={["dataMin - 1", "dataMax + 1"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Programmes */}
      <section id="programmes" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Programmes</h2>
        </div>
        <p className="text-slate-600 mb-6">Choose a starting point. Adjust calories from the calculator, aim for 7–9k steps/day, sleep 7–9 h, and prioritize protein + fiber.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {programmes.map((p) => (
            <Card key={p.title} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{p.icon}{p.title}</CardTitle>
                <CardDescription>Level: {p.level}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-600">{p.desc}</p>
                <ul className="space-y-2 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><Leaf className="h-4 w-4 mt-0.5" />{b}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Calculators */}
      <section id="calculators" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <CalculatorIcon />
          <h2 className="text-2xl font-bold">Calculators</h2>
        </div>
        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="bmi">BMI</TabsTrigger>
            <TabsTrigger value="calories">Daily Calories</TabsTrigger>
          </TabsList>
          <TabsContent value="bmi">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Body Mass Index</CardTitle>
                <CardDescription>For adults. A screening tool—not a diagnosis.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" value={bmiForm.heightCm} onChange={(e) => setBmiForm({ ...bmiForm, heightCm: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" value={bmiForm.weightKg} onChange={(e) => setBmiForm({ ...bmiForm, weightKg: e.target.value })} />
                  </div>
                </div>
                <div className="rounded-xl border p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">Your BMI</div>
                    <div className="text-3xl font-bold">{isFinite(bmiValue) ? bmiValue.toFixed(1) : "—"}</div>
                  </div>
                  <Badge className="rounded-2xl" variant="secondary">{bmiCategory(bmiValue)}</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calories">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Daily Energy & Gentle Deficit</CardTitle>
                <CardDescription>Uses the Mifflin–St Jeor equation and your activity level.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Label>Sex</Label>
                    <select className="w-full border rounded-md h-10 px-3" value={calc.sex} onChange={(e) => setCalc({ ...calc, sex: e.target.value })}>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div>
                    <Label>Age</Label>
                    <Input value={calc.age} onChange={(e) => setCalc({ ...calc, age: e.target.value })} />
                  </div>
                  <div>
                    <Label>Height (cm)</Label>
                    <Input value={calc.heightCm} onChange={(e) => setCalc({ ...calc, heightCm: e.target.value })} />
                  </div>
                  <div>
                    <Label>Weight (kg)</Label>
                    <Input value={calc.weightKg} onChange={(e) => setCalc({ ...calc, weightKg: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Activity</Label>
                  <select className="w-full border rounded-md h-10 px-3 mt-1" value={calc.activity} onChange={(e) => setCalc({ ...calc, activity: e.target.value })}>
                    <option value="sedentary">Sedentary (little exercise)</option>
                    <option value="light">Light (1–3 days/week)</option>
                    <option value="moderate">Moderate (3–5 days/week)</option>
                    <option value="active">Active (6–7 days/week)</option>
                    <option value="very">Very active (physical job + training)</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Stat title="BMR" value={`${caloriePlan.bmr} kcal`} icon={<Activity className="h-4 w-4" />} />
                  <Stat title="Maintenance" value={`${caloriePlan.tdee} kcal`} icon={<ShieldCheck className="h-4 w-4" />} />
                  <Stat title="Suggested target" value={`${caloriePlan.deficit} kcal`} icon={<TrendingUp className="h-4 w-4" />} />
                </div>
                <p className="text-xs text-slate-500">A 300–500 kcal/day deficit is typically sustainable. Check with a healthcare professional before starting any programme—especially if you have health conditions, are pregnant, or take medications.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Healthy Food */}
      <section id="meals" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <ChefHat className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Healthy Food Ideas</h2>
        </div>
        <p className="text-slate-600 mb-6">Simple, satisfying meals that favor lean protein, plants, and minimally processed carbs.</p>
        <div className="grid md:grid-cols-4 gap-6">
          {meals.map((m) => (
            <Card key={m.title} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Salad className="h-5 w-5" />{m.title}</CardTitle>
                <CardDescription>{m.kcal} kcal • {m.protein} g protein</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {m.tags.map((t) => (<Badge key={t} variant="secondary" className="rounded-2xl">{t}</Badge>))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="secondary" onClick={() => setSelectedMeal(m)}>View Recipe</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2"><Apple className="h-5 w-5" /> {m.title}</DialogTitle>
                      <DialogDescription>{m.kcal} kcal • {m.protein} g protein</DialogDescription>
                    </DialogHeader>
                    <pre className="whitespace-pre-wrap text-sm leading-6">{m.recipe}</pre>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Progress */}
      <section id="progress" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Track Your Progress</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Weigh‑ins</CardTitle>
              <CardDescription>Trends matter more than single days.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tickLine={false} />
                    <YAxis tickLine={false} domain={["dataMin - 1", "dataMax + 1"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" strokeWidth={3} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tips for consistency</CardTitle>
              <CardDescription>Little habits add up.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>Plan protein with each meal (e.g., eggs, yogurt, tofu, fish, beans).</li>
                <li>Fill half the plate with veggies or salad; add fruit daily.</li>
                <li>Keep easy snacks ready (nuts, fruit, cottage cheese, hummus + veg).</li>
                <li>Walk after meals when you can.</li>
                <li>Prioritize sleep and stress management; both affect appetite.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5" />
          <h2 className="text-2xl font-bold">FAQ</h2>
        </div>
        <Accordion type="single" collapsible className="max-w-3xl">
          <AccordionItem value="q1">
            <AccordionTrigger>Do I need to cut out carbs?</AccordionTrigger>
            <AccordionContent>Not necessarily. Many people lose weight with balanced plates: plenty of veg & fruit, adequate protein, mostly minimally processed carbs, and healthy fats. Choose an approach you can stick with.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How fast should I aim to lose?</AccordionTrigger>
            <AccordionContent>A common, sustainable pace is about 0.25–1.0 kg per week. Faster loss can increase the chance of regaining. Personalize with your clinician.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Is exercise required?</AccordionTrigger>
            <AccordionContent>Nutrition drives most early change, but movement helps preserve muscle, supports health, and makes maintenance easier. Start with walks and a couple of short strength sessions per week.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Contact</h2>
        </div>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Ask a question</CardTitle>
            <CardDescription>We’re happy to help you tailor a plan.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
            </div>
            <div className="md:col-span-2">
              <Label>Message</Label>
              <Textarea rows={4} placeholder="Tell us your goals..." />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="rounded-2xl w-full md:w-auto">Send</Button>
          </CardFooter>
        </Card>
        <p className="text-xs text-slate-500 mt-4">Educational only. Not a substitute for professional medical advice, diagnosis, or treatment.</p>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Healthy Weight © {new Date().getFullYear()}</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#">Privacy</a>
            <a className="hover:underline" href="#">Terms</a>
            <a className="hover:underline" href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">{title}</div>
        {icon}
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function CalculatorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M7 2h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7zm2 3h6v4H9V7zm0 6h2v2H9v-2zm0 3h2v2H9v-2zm4-3h2v2h-2v-2zm0 3h2v2h-2v-2z"/></svg>
  );
}
