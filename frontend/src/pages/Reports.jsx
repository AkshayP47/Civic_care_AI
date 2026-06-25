import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIssues } from '../api';

function Reports() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (err) {
      setError('Failed to load reports. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-orange-100 text-orange-800',
      Critical: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Waste Management': '🗑️',
      'Water Management': '💧',
      'Public Infrastructure': '🏗️',
      'Sanitation': '🧹',
      'Pollution': '🏭',
      'Other': '📋',
    };
    return icons[category] || '📋';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Community Reports
            </h1>
            <p className="text-gray-600">
              View all reported sustainability issues
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{issues.length}</div>
              <div className="text-gray-600 text-sm">Total Reports</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-red-600">
                {issues.filter(i => i.priority === 'Critical').length}
              </div>
              <div className="text-gray-600 text-sm">Critical</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">
                {issues.filter(i => i.priority === 'High').length}
              </div>
              <div className="text-gray-600 text-sm">High Priority</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {issues.filter(i => i.priority === 'Medium').length}
              </div>
              <div className="text-gray-600 text-sm">Medium Priority</div>
            </div>
          </div>

          {/* Reports List */}
          {issues.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Reports Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to report a community issue!
              </p>
              <button
                onClick={() => navigate('/report')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
              >
                Report an Issue
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    {issue.image_path && (
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:8000${issue.image_path}`}
                          alt={issue.title}
                          className="w-full md:w-48 h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {issue.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Reported on {formatDate(issue.created_at)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {issue.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCategoryIcon(issue.category)}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {issue.category}
                          </span>
                        </div>
                      </div>

                      {/* AI Analysis */}
                      <div className="border-t pt-4 space-y-2">
                        <div>
                          <span className="text-sm font-semibold text-gray-700">AI Reasoning: </span>
                          <span className="text-sm text-gray-600">{issue.reason}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">Suggested Action: </span>
                          <span className="text-sm text-gray-600">{issue.suggested_action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

// Made with Bob
