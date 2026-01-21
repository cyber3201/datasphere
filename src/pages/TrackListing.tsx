import React from 'react';
import { useParams } from 'react-router-dom';
import TrackLayout from '../components/TrackLayout';
import { TRACKS } from '../services/content';

const TrackListing: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  
  if (!trackId) return <div>Erreur</div>;

  const track = TRACKS[trackId];

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Parcours introuvable</h1>
          <p className="text-gray-600 mt-2">Le parcours "{trackId}" n'existe pas ou est en construction.</p>
        </div>
      </div>
    );
  }

  return <TrackLayout track={track} />;
};

export default TrackListing;