import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Users, Vote, CheckCircle, Play, 
  ChevronDown, Mail, ArrowRight, Sparkles,
  Building2, UserCheck, Scale, Eye
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Shield,
    title: "Verified Information",
    description: "All leader profiles are verified by the Election Commission ensuring authentic data."
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Join discussions, share feedback, and connect with fellow citizens."
  },
  {
    icon: Vote,
    title: "AI Fact-Check",
    description: "Instantly verify political claims with our AI-powered fact-checking bot."
  },
  {
    icon: CheckCircle,
    title: "Transparent Records",
    description: "Access complete information about leaders including education and work history."
  }
];

const faqs = [
  {
    question: "What is One Nation One Election?",
    answer: "One Nation One Election is a proposed electoral reform that aims to synchronize elections for the Lok Sabha and all State Legislative Assemblies to be held simultaneously, once in every five years."
  },
  {
    question: "How do I register as a voter?",
    answer: "You can register through this platform using your Voter ID. If you don't have a Voter ID, you can apply through the NVSP portal or your local electoral office."
  },
  {
    question: "How are leader profiles verified?",
    answer: "All elected leaders must submit their educational certificates, government IDs, party tickets, and criminal record declarations. The Election Commission reviews and verifies each submission."
  },
  {
    question: "Can I report misinformation?",
    answer: "Yes! Use our AI Fact-Check bot to verify claims instantly. You can also flag suspicious content for review by our moderation team."
  }
];

const stats = [
  { value: "900M+", label: "Eligible Voters" },
  { value: "543", label: "Lok Sabha Seats" },
  { value: "28", label: "States" },
  { value: "8", label: "Union Territories" }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 hero-gradient overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -50, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Empowering Democratic Participation
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Your Voice in
              <span className="gradient-text"> Democracy</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              A citizen-first platform for voter awareness, verified leader information, 
              and misinformation control. Building trust in One Nation One Election.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link to="/voter-auth">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px hsl(213 56% 24% / 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl btn-primary-gradient text-lg shadow-lg"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary/20 text-foreground font-medium hover:border-primary/40 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Video
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
                >
                  <h3 className="font-heading text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-12 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary/50 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Understanding <span className="gradient-text">One Nation One Election</span>
            </h2>
            <p className="text-muted-foreground">
              Learn about the proposed electoral reform and its potential impact on Indian democracy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-primary/10 glow-effect">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="One Nation One Election"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Platform <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground">
              Designed for transparency, trust, and informed democratic participation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px -10px hsl(213 56% 24% / 0.15)" }}
                className="p-6 rounded-2xl bg-card border border-border transition-all"
              >
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Who Can <span className="gradient-text">Use This Platform?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Citizens / Voters",
                description: "Access verified leader information, join communities, and use AI fact-check.",
                link: "/voter-auth",
                color: "secondary"
              },
              {
                icon: UserCheck,
                title: "Elected Leaders",
                description: "Manage your profile, upload verification documents, and engage with constituents.",
                link: "/leader-auth",
                color: "primary"
              },
              {
                icon: Building2,
                title: "Election Commission",
                description: "Review submissions, verify leaders, and maintain electoral integrity.",
                link: "/ec-dashboard",
                color: "accent"
              }
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl bg-card border border-border h-full transition-all group-hover:border-primary/30">
                  <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${
                    role.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                    role.color === 'accent' ? 'bg-accent/20 text-accent' :
                    'gradient-bg text-primary-foreground'
                  }`}>
                    <role.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3">{role.title}</h3>
                  <p className="text-muted-foreground mb-6">{role.description}</p>
                  <Link to={role.link}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Join the Movement for Transparent Democracy
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Be part of India's largest voter awareness initiative. Register today and make your voice count.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/voter-auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-semibold"
                >
                  Register as Voter
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/leader-auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:border-primary-foreground/50 transition-colors"
                >
                  Leader Registration
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Representative Members */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Contact Our <span className="gradient-text">Representatives</span>
            </h2>
            <p className="text-muted-foreground">
              Get in touch with our verified team members for any queries or support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Dr. Priya Sharma", role: "Voter Education Head", email: "priya@voteraware.gov.in" },
              { name: "Rajesh Kumar", role: "Technical Support", email: "rajesh@voteraware.gov.in" },
              { name: "Anita Desai", role: "Community Manager", email: "anita@voteraware.gov.in" }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  {member.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-border rounded-xl overflow-hidden bg-card"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-foreground">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-muted-foreground">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
