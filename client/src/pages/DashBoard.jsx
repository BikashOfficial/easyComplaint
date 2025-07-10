import React, { useState, useContext } from 'react';
import {
  Plus,
  Star,
  Award,
  Shield,
  Clock,
  Users,
  Sparkles,
  ArrowRight,

} from 'lucide-react';
import Complain from '../components/Complain';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserDataContext } from '../contexts/UserContext';

// Mock Complain component for demo


const DashBoard = () => {
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const { user } = useContext(UserDataContext);

  const features = [
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Get your complaints processed in record time with our streamlined workflow",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security measures",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our dedicated team ensures every complaint gets the attention it deserves",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Join thousands of satisfied customers who trust our complaint resolution",
      color: "from-orange-500 to-red-500"
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header - DO NOT CHANGE */}
      <Header />

      {/* Modal for New Complaint - DO NOT CHANGE */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowComplaintModal(false)} />
          <div className="relative z-10 w-full max-w-3xl mx-auto">
            <button
              className="absolute top-10 lg:top-32 lg:right-14 w-10 h-10 right-2 bg-red-400 flex items-center justify-center rounded-full p-2 shadow hover:bg-red-600 z-20"
              onClick={() => setShowComplaintModal(false)}
            >
              <span className="text-2xl text-white font-bold">&times;</span>
            </button>
            <Complain />
            {/* dont modify this keepit as it is */}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex lg:py-6 lg:px-20 items-center lg:mb-10 px-4 py-2 bg-orange-100 rounded-full text-orange-700 lg:text-xl text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome back{user?.fullName ? `, ${user.fullName}` : ''}!
            </div>


            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => setShowComplaintModal(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg">Submit New Complaint</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Trusted by 10,000+ users</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm ml-1">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                  style={{ backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}></div>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}


          {/* Stats Section */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-12 text-white mb-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-orange-100">Uptime</div>
              </div>
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-orange-100">Happy Customers</div>
              </div>
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-orange-100">Complaints Resolved</div>
              </div>
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-orange-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect Footer */}
      <Footer />
    </div>
  );
};

export default DashBoard;