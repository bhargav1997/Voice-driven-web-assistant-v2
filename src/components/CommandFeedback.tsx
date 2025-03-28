import React from 'react';
import { Loader2 } from 'lucide-react';

interface CommandFeedbackProps {
  command: string;
  isProcessing: boolean;
}

const CommandFeedback: React.FC<CommandFeedbackProps> = ({ command, isProcessing }) => {
  if (!command && !isProcessing) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing command...</span>
          </>
        ) : (
          <>
            <span className="text-blue-400">"</span>
            {command}
            <span className="text-blue-400">"</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CommandFeedback;