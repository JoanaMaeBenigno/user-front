interface YouTubeEmbedProps {
  youtubeId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ youtubeId }) => {
  return (
    <div className="flex justify-center">
      <iframe
        className="w-full max-w-2xl aspect-video border rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;