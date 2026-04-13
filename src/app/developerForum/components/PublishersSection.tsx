import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Globe, Building, Clock, User, ExternalLink, Award } from 'lucide-react';

// Define the Publisher interface
interface Publisher {
  _id: string;
  name: string;
  slug: string;
  website: string;
  country: string;
  foundedYear: number | null;
  logo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PublishersFeed = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await fetch('https://epic-backend-fslq.vercel.app/api/publishers');
        if (!response.ok) {
          throw new Error('Failed to fetch publishers');
        }
        const data = await response.json();
        setPublishers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  if (loading) {
    return (
      <section className="px-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading publishers feed...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold">Publishers Feed</h3>
            <p className="text-gray-400 text-sm mt-2">{publishers.length} publishers • Latest updates</p>
          </div>
        </div>

        {/* Timeline/Feed Layout */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-gray-700 to-transparent"></div>
          
          <div className="space-y-6">
            {publishers.map((publisher, idx) => (
              <div key={publisher._id} className="relative group">
                {/* Timeline dot with pulse effect */}
                <div className="absolute left-8 top-8 -translate-x-1/2">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all"></div>
                  </div>
                </div>

                {/* Feed item */}
                <div className="ml-20 p-6 rounded-lg border border-btn-cmpt bg-btn-cmpt hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      {publisher.logo ? (
                        <div className="relative w-16 h-16">
                          <Image 
                            src={publisher.logo} 
                            alt={publisher.name}
                            className="object-contain rounded-lg bg-gray-800 p-2"
                            width={64}
                            height={64}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://via.placeholder.com/64?text=No+Logo';
                            }}
                            priority={idx < 3}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center">
                          <Building size={32} className="text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h4 className="font-bold text-xl">{publisher.name}</h4>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(publisher.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Metadata in a row */}
                      <div className="flex flex-wrap gap-4 mb-3 text-sm">
                        {publisher.country && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <MapPin size={14} className="text-gray-500" />
                            <span>{publisher.country}</span>
                          </div>
                        )}
                        
                        {publisher.foundedYear && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <Calendar size={14} className="text-gray-500" />
                            <span>Founded {publisher.foundedYear}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-gray-500">
                          <Award size={14} />
                          <span>ID: {publisher._id.slice(-6)}</span>
                        </div>
                      </div>

                      {/* Website link */}
                      {publisher.website && (
                        <a 
                          href={publisher.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        >
                          <Globe size={14} />
                          Visit Website
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {/* Activity indicator */}
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            Added to platform
                          </span>
                          <span>•</span>
                          <span>Last updated: {new Date(publisher.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublishersFeed;