import { useState, useEffect } from 'react';
import { Headphones, Music } from 'lucide-react';
import AudioTable from './components/AudioTable';
import { generateSampleData, generateTestData } from './utils/audioUtils';
import { AudioSample } from './types/audio';

function App() {
  const [samples, setSamples] = useState<AudioSample[]>([]);
  const [testSamples, setTestSamples] = useState<AudioSample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setSamples(generateSampleData());
      setTestSamples(generateTestData());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading Audio Evaluation Table...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            EDM Timbre Transfer Validation
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Compare audio samples with reference, conversion results, and ground truth recordings.
            Further details and codecan be found in the <a href="https://github.com/buffett0323/query_ss.git" className="text-black hover:underline">Buffett's GitHub repository</a>
          </p>
        </div>

        {/* Main Table Container */}
        <div className="space-y-16">
          {/* Original Results Table */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Validation Results
            </h2>
            <AudioTable samples={samples} />
          </div>

          {/* Testing Results Table */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Testing Results
            </h2>
            <AudioTable samples={testSamples} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Headphones className="w-5 h-5" />
            <span className="text-lg font-medium">
            EDM Timbre Transfer Validation • Use headphones for the best experience
            </span>
          </div>
          <div className="mt-4 text-white/60">
            <p className="text-sm">
              Built by Buffett Liu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;