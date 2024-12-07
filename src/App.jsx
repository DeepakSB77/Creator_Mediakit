import React, { useState, useRef, useEffect } from 'react';
import { FaTwitch, FaYoutube, FaTiktok, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BiTrendingUp } from 'react-icons/bi';
import { BsCollection } from 'react-icons/bs';
import { ResponsiveContainer } from 'recharts';

// First, add a custom hook to handle responsive chart sizing
const useChartDimensions = (containerRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 250 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setDimensions({
          width: width - 32, // Subtract padding
          height: Math.min(250, window.innerHeight * 0.3)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [containerRef]);

  return dimensions;
};

// Define dummy data for each platform
const platformData = {
  all: {
    chartData: [
      { name: 'Jan', value: 1000 },
      { name: 'Feb', value: 2000 },
      { name: 'Mar', value: 3000 },
      { name: 'Apr', value: 4000 },
      { name: 'May', value: 5000 },
    ],
    audienceData: {
      gender: [
        { label: 'Male', percentage: 60 },
        { label: 'Female', percentage: 35 },
        { label: 'Other', percentage: 5 }
      ],
      age: [
        { label: '13-17', percentage: 10 },
        { label: '18-24', percentage: 40 },
        { label: '25-34', percentage: 30 },
        { label: '35-44', percentage: 15 },
        { label: '45+', percentage: 5 }
      ],
      interests: [
        { label: 'Gaming', percentage: 50 },
        { label: 'Technology', percentage: 20 },
        { label: 'Entertainment', percentage: 20 },
        { label: 'Sports', percentage: 10 }
      ],
      location: [
        { label: 'United States', percentage: 35 },
        { label: 'United Kingdom', percentage: 20 },
        { label: 'Canada', percentage: 15 },
        { label: 'Germany', percentage: 10 },
        { label: 'Australia', percentage: 10 },
        { label: 'Others', percentage: 10 }
      ]
    }
  },
  twitch: {
    chartData: [
      { name: 'Jan', value: 800 },
      { name: 'Feb', value: 1600 },
      { name: 'Mar', value: 2400 },
      { name: 'Apr', value: 3200 },
      { name: 'May', value: 4000 },
    ],
    audienceData: {
      gender: [
        { label: 'Male', percentage: 70 },
        { label: 'Female', percentage: 25 },
        { label: 'Other', percentage: 5 }
      ],
      age: [
        { label: '13-17', percentage: 20 },
        { label: '18-24', percentage: 50 },
        { label: '25-34', percentage: 20 },
        { label: '35-44', percentage: 5 },
        { label: '45+', percentage: 5 }
      ],
      interests: [
        { label: 'Gaming', percentage: 70 },
        { label: 'Technology', percentage: 15 },
        { label: 'Entertainment', percentage: 10 },
        { label: 'Sports', percentage: 5 }
      ],
      location: [
        { label: 'United States', percentage: 40 },
        { label: 'United Kingdom', percentage: 15 },
        { label: 'Canada', percentage: 20 },
        { label: 'Germany', percentage: 10 },
        { label: 'Australia', percentage: 8 },
        { label: 'Others', percentage: 7 }
      ]
    }
  },
  // Add more platforms as needed
};

// Function to get data for the selected platform
const getPlatformData = (platform) => {
  return platformData[platform] || platformData.all;
};

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const { chartData, audienceData } = getPlatformData(selectedPlatform);

  const videos = [
    { thumbnail: "/video-thumbnail-1.jpg", title: "7 Days Exploring An Underground City", views: "1.2M views", date: "Oct 12, 2024" },
    { thumbnail: "/video-thumbnail-2.jpg", title: "100 Identical Twins Fight For $250,000", views: "2.3M views", date: "Sep 20, 2024" },
    { thumbnail: "/video-thumbnail-3.jpg", title: "Men Vs Women Survive The Wilderness for $500,000", views: "3.6M views", date: "Sep 02, 2024" },
    { thumbnail: "/video-thumbnail-4.jpg", title: "7 Days Exploring An Underground City", views: "1.2M views", date: "Oct 12, 2024" },
    { thumbnail: "/video-thumbnail-5.jpg", title: "100 Identical Twins Fight For $250,000", views: "2.3M views", date: "Sep 20, 2024" },
  ];

  const highlights = [
    { title: "Nerd or Die", subtitle: "Product Launch", stats: "350K Impressions", conversions: "2,000 Conversions" },
    { title: "Mouse Accuracy", subtitle: "Website Promo", stats: "150K Impressions", conversions: "2,000 New Users" },
    { title: "Stream Hardware Co.", subtitle: "Product Review", stats: "30K Impressions", conversions: "150 Conversions" },
    { title: "Stream Hardware Co.", subtitle: "Product Review", stats: "30K Impressions", conversions: "150 Conversions" },
    
  ];

  const platforms = [
    { id: 'all', icon: BsCollection, label: 'All Platforms', color: 'indigo', activeColor: 'bg-indigo-500' },
    { id: 'twitch', icon: FaTwitch, label: 'Twitch', color: 'purple', activeColor: 'bg-purple-500' },
    { id: 'youtube', icon: FaYoutube, label: 'YouTube', color: 'red', activeColor: 'bg-red-500' },
    { id: 'tiktok', icon: FaTiktok, label: 'TikTok', color: 'black', activeColor: 'bg-black' },
    { id: 'instagram', icon: FaInstagram, label: 'Instagram', color: 'pink', activeColor: 'bg-pink-500' },
    { id: 'twitter', icon: FaTwitter, label: 'Twitter', color: 'blue', activeColor: 'bg-blue-500' },
    { id: 'facebook', icon: FaFacebook, label: 'Facebook', color: 'blue', activeColor: 'bg-blue-600' }
  ];

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);

  const dims1 = useChartDimensions(chartRef1);
  const dims2 = useChartDimensions(chartRef2);
  const dims3 = useChartDimensions(chartRef3);
  const dims4 = useChartDimensions(chartRef4);

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Media Kit Header Section - Adjust columns for md breakpoint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Content */}
        <div className="col-span-1 lg:col-span-6 bg-gray-100 rounded-2xl p-4 sm:p-6">
          <h2 className="text-purple-400 text-2xl sm:text-3xl lg:text-4xl mb-4">Your Name</h2>
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black">Media</h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black">Kit</h1>
          </div>
          <p className="text-gray-600 mt-4 sm:mt-6 text-base sm:text-lg">
            Write something about yourself here.
            Keep it short, simple and include a bit
            of your personality!
          </p>
        </div>

        {/* Right Content - Adjust height for md breakpoint */}
        <div className="col-span-1 lg:col-span-6 grid grid-cols-6 grid-rows-6 gap-2 sm:gap-4 h-[250px] sm:h-[300px] md:h-[350px] lg:h-auto">
          {/* Main Image - Takes up 4x4 grid space */}
          <div className="col-span-4 row-span-4 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
            <img 
              src="your-profile-pic.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          
          {/* Green Box - Takes up 2x4 grid space */}
          <div className="col-span-2 row-span-4 bg-green-400 rounded-2xl"></div>
          
          {/* Purple Box with Wave Emoji - Takes up 2x2 grid space */}
          <div className="col-span-2 row-span-2 bg-purple-400 rounded-2xl flex items-center justify-center text-4xl">
            👋
          </div>
          
          {/* Coral/Pink Box - Takes up 4x2 grid space */}
          <div className="col-span-4 row-span-2 bg-coral-400 rounded-2xl" style={{ backgroundColor: '#FFA69E' }}></div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Overview 👀</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Total Reach Card */}
          <div className="bg-purple-400 hover:bg-purple-500 text-white p-4 sm:p-6 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold">240K</h3>
              <p className="text-xs sm:text-sm mt-2">Total Reach Across All Media & Platforms</p>
            </div>
          </div>

          {/* Platform Stats - Adjust grid for md breakpoint */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 bg-gray-100 p-3 sm:p-4 rounded-xl">
            {/* Adjust individual platform cards */}
            {[
              { 
                icon: <FaTwitch className="text-purple-500" />, 
                count: "21,000", 
                name: "Followers", 
                username: "twitch.tv/yourname",
                hoverColor: "hover:border-purple-500"
              },
              { 
                icon: <FaYoutube className="text-red-500" />, 
                count: "21,000", 
                name: "Subscribers", 
                username: "youtube.com/yourname",
                hoverColor: "hover:border-red-500"
              },
              { 
                icon: <FaTiktok className="text-black" />, 
                count: "21,000", 
                name: "Followers", 
                username: "tiktok.com/yourname",
                hoverColor: "hover:border-black"
              },
              { 
                icon: <FaInstagram className="text-pink-500" />, 
                count: "21,000", 
                name: "Followers", 
                username: "instagram.com/yourname",
                hoverColor: "hover:border-pink-500"
              },
              { 
                icon: <FaTwitter className="text-blue-500" />, 
                count: "21,000", 
                name: "Followers", 
                username: "x.com/yourname",
                hoverColor: "hover:border-blue-500"
              },
              { 
                icon: <FaFacebook className="text-blue-600" />, 
                count: "21,000", 
                name: "Followers", 
                username: "facebook.com/yourname",
                hoverColor: "hover:border-blue-600"
              },
            ].map((social, index) => (
              <div 
                key={index} 
                className={`
                  bg-white p-3 sm:p-4 rounded-xl shadow-sm 
                  transition-all duration-300 
                  transform hover:-translate-y-1 hover:shadow-md 
                  cursor-pointer border-2 border-transparent 
                  ${social.hoverColor}
                  flex items-center gap-2 sm:gap-3
                `}
              >
                <div className="text-xl sm:text-2xl">{social.icon}</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">{social.count}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{social.name}</div>
                  <div className="text-[10px] sm:text-xs text-purple-500 mt-1 truncate max-w-[120px] sm:max-w-full">
                    {social.username}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Selection Bar */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-3">Select Platform</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformChange(platform.id)}
              className={`
                flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg
                text-sm
                whitespace-nowrap
                transition-all duration-200
                ${platform.id === selectedPlatform 
                  ? `${platform.activeColor} text-white shadow-lg scale-105` 
                  : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              <platform.icon className="text-lg" />
              <span className="font-medium">{platform.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold">Analytics</h2>
          <span className="text-2xl">📈</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { title: "Followers Growth", color: "#8884d8", data: chartData, ref: chartRef1, dims: dims1 },
            { title: "Following Growth", color: "#36B9CC", data: chartData, ref: chartRef2, dims: dims2 },
            { title: "Engagement Rate", color: "#F6C23E", data: chartData, ref: chartRef3, dims: dims3 },
            { title: "Average Likes", color: "#E74A3B", data: chartData, ref: chartRef4, dims: dims4 }
          ].map((chart, index) => (
            <div 
              key={index}
              ref={chart.ref}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{chart.title}</h3>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={chart.dims.height}>
                  <LineChart 
                    data={chart.data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#888"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={chart.color}
                      strokeWidth={2}
                      dot={{ stroke: chart.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Section */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Audience</h2>
          <span className="text-2xl">👥</span>
        </div>

        <div className="space-y-8">
          {/* Gender Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Gender</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {audienceData.gender.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Age</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {audienceData.age.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {audienceData.interests.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Location</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {/* Stacked bar */}
              <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden flex">
                {audienceData.location.map((item, index) => {
                  // Define complementary colors
                  const colors = [
                    '#FF6B6B', // Coral Red
                    '#4ECDC4', // Turquoise
                    '#45B7D1', // Sky Blue
                    '#96CEB4', // Sage Green
                    '#FFEEAD', // Soft Yellow
                    '#D4A5A5'  // Dusty Rose
                  ];

                  return (
                    <div
                      key={index}
                      className="h-full relative group"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: colors[index % colors.length]
                      }}
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        {item.label}: {item.percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Labels below the bar */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {audienceData.location.map((item, index) => {
                  const colors = [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#45B7D1',
                    '#96CEB4',
                    '#FFEEAD',
                    '#D4A5A5'
                  ];
                  
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: colors[index % colors.length] }}
                      />
                      <span className="text-sm text-gray-600">{item.label} ({item.percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Published Videos - Adjust grid for md breakpoint */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl p-3 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Latest Published Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="font-semibold text-sm">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{video.views}</p>
                <p className="text-xs text-gray-400">{video.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Highlights - Adjust grid for md breakpoint */}
      <div className="mt-6 sm:mt-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {highlights.slice(-4).map((highlight, index) => (
            <div 
              key={index} 
              className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-bold text-lg mb-2 text-center">{highlight.title}</h3>
              <p className="text-gray-500 mb-2 text-center">{highlight.subtitle}</p>
              <p className="text-green-500 font-semibold text-center">{highlight.stats}</p>
              <p className="text-green-500 text-center">{highlight.conversions}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-yellow-100 rounded-xl p-4 sm:p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Let's Talk</h2>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300">
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
