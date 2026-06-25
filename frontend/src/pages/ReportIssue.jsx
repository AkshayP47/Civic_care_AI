import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeIssue, createIssue } from '../api';

function ReportIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !formData.description) {
      setError('Please fill in both title and description');
      return;
    }

    setAnalyzing(true);
    try {
      const result = await analyzeIssue(formData.title, formData.description);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze issue. Please try again.');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!analysis) {
      setError('Please analyze the issue first');
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', analysis.category);
      submitData.append('priority', analysis.priority);
      submitData.append('reason', analysis.reason);
      submitData.append('suggested_action', analysis.suggested_action);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      await createIssue(submitData);
      navigate('/reports');
    } catch (err) {
      setError('Failed to submit issue. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'bg-green-100 text-green-800 border-green-300',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      High: 'bg-orange-100 text-orange-800 border-orange-300',
      Critical: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Report an Issue
            </h1>
            <p className="text-gray-600">
              Help make your community more sustainable
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleAnalyze}>
              {/* Title */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                  Issue Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Garbage Near School"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                  Issue Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Be specific about the location, severity, and impact of the issue
                </p>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.image && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {formData.image.name}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {/* Analyze Button */}
              <button
                type="submit"
                disabled={analyzing || !formData.title || !formData.description}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {analyzing ? 'Analyzing with AI...' : 'Analyze Issue'}
              </button>
            </form>

            {/* Analysis Results */}
            {analysis && (
              <div className="mt-8 border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  AI Analysis Results
                </h2>

                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Category
                    </label>
                    <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-medium">
                      {analysis.category}
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Priority Level
                    </label>
                    <div className={`px-4 py-2 border rounded-lg font-medium ${getPriorityColor(analysis.priority)}`}>
                      {analysis.priority}
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Reasoning
                    </label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                      {analysis.reason}
                    </div>
                  </div>

                  {/* Suggested Action */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Suggested Action
                    </label>
                    <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-gray-700">
                      {analysis.suggested_action}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                  {loading ? 'Submitting...' : 'Submit Issue Report'}
                </button>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
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

export default ReportIssue;

// Made with Bob
