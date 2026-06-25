import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            UrbanPulse AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-Powered Community Issue Reporting for Sustainable Cities
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Problem Statement */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Building Sustainable Communities Together
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Citizens often notice sustainability-related issues such as garbage accumulation, 
              water leakage, open drainage, broken street lights, potholes, and pollution hotspots. 
              However, people may not know which issues are most urgent.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>UrbanPulse AI</strong> empowers you to report local issues and uses 
              Artificial Intelligence to automatically analyze their impact and priority, 
              helping communities address the most critical problems first.
            </p>
          </section>

          {/* SDG 11 Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                  11
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  UN Sustainable Development Goal 11
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Sustainable Cities and Communities</strong>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Make cities and human settlements inclusive, safe, resilient and sustainable. 
                  UrbanPulse AI supports this goal by enabling citizens to identify and prioritize 
                  local sustainability issues, fostering community engagement and data-driven 
                  decision-making.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Report Issue</h4>
                <p className="text-gray-600 text-sm">
                  Describe the sustainability issue you've noticed in your community
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">AI Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Our AI analyzes the issue and determines its category and priority
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Get Insights</h4>
                <p className="text-gray-600 text-sm">
                  Receive AI-powered recommendations and suggested actions
                </p>
              </div>
            </div>
          </section>

          {/* Responsible AI Section */}
          <section className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Responsible AI
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              AI assists in prioritizing community issues but should not replace human decision-making. 
              Recommendations are generated to support sustainability and community well-being. 
              Final decisions should always involve human judgment and local context.
            </p>
          </section>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/report"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
            >
              Report an Issue
            </Link>
            <Link
              to="/reports"
              className="inline-block ml-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// Made with Bob
