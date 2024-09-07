'use client';

import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const ChatGPT: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/gemini/route', { question });
      setAnswer(response.data.answer);
    } catch (err) {
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat with GPT</h2>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={handleQuestionChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Ask</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {answer && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Answer:</h3>
          <div className="overflow-x-auto">
            <ReactMarkdown
              children={answer}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => <a {...props} className="text-blue-500 underline" />,
                code: ({ node, ...props }) => <code {...props} className="bg-gray-100 p-1 rounded" />,
                pre: ({ node, ...props }) => <pre {...props} className="bg-gray-100 p-2 rounded" />,
                table: ({ node, ...props }) => <table {...props} className="table-auto border-collapse w-full" />,
                th: ({ node, ...props }) => (
                  <th {...props} className="border px-4 py-2 bg-gray-100 font-bold text-center" />
                ),
                td: ({ node, ...props }) => (
                  <td
                    {...props}
                  />
                ),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;
