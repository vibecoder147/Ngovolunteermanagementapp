import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Heart, Moon, Sun, ArrowRight, Users, Award, TrendingUp, Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();

  const recentWorks = [
    {
      id: 1,
      title: 'Education for All Initiative',
      description: 'Provided quality education materials and tutoring to over 500 underprivileged children across 12 villages.',
      image: 'https://images.unsplash.com/photo-1573288880964-292771cdff84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNoYXJpdHl8ZW58MXx8fHwxNzc0NDk3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 2026',
      category: 'Education'
    },
    {
      id: 2,
      title: 'Community Food Distribution',
      description: 'Distributed meals to 1,200 families affected by seasonal unemployment in rural areas.',
      image: 'https://images.unsplash.com/photo-1628717341663-0007b0ee2597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3NDUzMDIyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'February 2026',
      category: 'Relief'
    },
    {
      id: 3,
      title: 'Free Medical Health Camp',
      description: 'Organized comprehensive health checkups and free medicines for 800+ patients in underserved communities.',
      image: 'https://images.unsplash.com/photo-1741597727884-1ecd051cadb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwY2FtcHxlbnwxfHx8fDE3NzQ1MzAyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'January 2026',
      category: 'Healthcare'
    },
    {
      id: 4,
      title: 'Green Earth Tree Plantation',
      description: 'Planted 5,000 saplings with volunteers and local communities to combat climate change.',
      image: 'https://images.unsplash.com/photo-1703012349431-95c3304d098f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMHRyZWUlMjBwbGFudGluZ3xlbnwxfHx8fDE3NzQ1MzAyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'December 2025',
      category: 'Environment'
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'Jayshree Foundation Wins National NGO Excellence Award 2026',
      excerpt: 'Recognized for outstanding contribution to community development and volunteer mobilization across India.',
      image: 'https://images.unsplash.com/photo-1762345127396-ac4a970436c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGFjaGlldmVtZW50JTIwdHJvcGh5fGVufDF8fHx8MTc3NDUzMDIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 15, 2026',
      source: 'National Daily'
    },
    {
      id: 2,
      title: 'Volunteers Rally Together for Rural Healthcare',
      excerpt: 'Jayshree Foundation volunteers conducted medical camps reaching remote villages with essential healthcare services.',
      image: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3NDUzMDIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 10, 2026',
      source: 'Health Today'
    },
    {
      id: 3,
      title: 'Partnership with Global Charity Network Announced',
      excerpt: 'Strategic collaboration to expand educational programs and provide scholarships to 2,000 students.',
      image: 'https://images.unsplash.com/photo-1593113702251-272b1bc414a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwZG9uYXRpb24lMjBoZWxwaW5nfGVufDF8fHx8MTc3NDQ1NjEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'February 28, 2026',
      source: 'Education Weekly'
    }
  ];

  const achievements = [
    {
      id: 1,
      icon: Users,
      number: '25,000+',
      label: 'Lives Impacted',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 2,
      icon: Award,
      number: '15+',
      label: 'Awards Won',
      color: 'from-violet-600 to-purple-600'
    },
    {
      id: 3,
      icon: Heart,
      number: '500+',
      label: 'Active Volunteers',
      color: 'from-orange-500 to-rose-500'
    },
    {
      id: 4,
      icon: TrendingUp,
      number: '200+',
      label: 'Projects Completed',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">Jayshree Foundation</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">NGO</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                {theme === 'dark'
                  ? <Sun className="w-4 h-4 text-yellow-400" />
                  : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                Login
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                <Heart className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-700 dark:text-blue-400 font-medium">Making a Difference Together</span>
              </div>
              <h1 className="text-4xl lg:text-5xl text-slate-900 dark:text-white mb-6">
                Empowering Communities Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Compassion</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Join us in creating lasting change. Jayshree Foundation brings together passionate volunteers to serve communities, 
                provide education, healthcare, and hope to those who need it most.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761666507437-9fb5a6ef7b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBoZWxwaW5nfGVufDF8fHx8MTc3NDUzMDIxOXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Volunteers helping community"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl text-slate-900 dark:text-white">500+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Active Volunteers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Works */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 dark:text-white mb-4">Our Recent Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover the latest initiatives and projects making a real difference in communities across the country
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentWorks.map((work) => (
              <div
                key={work.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div className="relative overflow-hidden h-48">
                  <ImageWithFallback
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-900 dark:text-white">
                    {work.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {work.date}
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-2">{work.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 dark:text-white mb-4">Our Achievements</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Milestones that reflect our commitment to creating positive change
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-center hover:shadow-xl transition-all"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${achievement.color} shadow-lg mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl text-slate-900 dark:text-white mb-2">{achievement.number}</p>
                  <p className="text-slate-600 dark:text-slate-400">{achievement.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 dark:text-white mb-4">Latest News</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Stay updated with our latest activities and media coverage
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div className="relative overflow-hidden h-56">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{article.source}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{article.date}</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-3">{article.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-slate-900 dark:text-white mb-6">About Jayshree Foundation</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Founded in 2015, Jayshree Foundation is a non-profit organization dedicated to transforming lives through 
                community service, education, healthcare, and environmental initiatives. We believe in the power 
                of collective action and the difference passionate individuals can make.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Our mission is to create sustainable change by empowering communities, supporting underprivileged 
                families, and mobilizing volunteers who share our vision of a better tomorrow.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                With a dedicated team of volunteers and partners across India, we continue to expand our reach 
                and impact, touching thousands of lives every year.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
              <h3 className="text-xl text-slate-900 dark:text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Address</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      123 Hope Street, Community Center<br />
                      Mumbai, Maharashtra 400001, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Phone</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">+91 22 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Email</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">contact@jayshreefoundation.org</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-4">Follow Us</p>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <Twitter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <Instagram className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-400">© 2026 Jayshree Foundation. All rights reserved.</span>
            </div>
            <p className="text-xs text-slate-500">Making a Difference Together</p>
          </div>
        </div>
      </footer>
    </div>
  );
}