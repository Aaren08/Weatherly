import { useState, useEffect } from "react";

export default function WeatherVideo({ description }) {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (!description) return; // Prevent empty video selection on first render
    const formattedDescription = description?.trim().toLowerCase();
    const videoMap = {
      "scattered clouds": "scattered-clouds.mp4",
      "clear sky": "clear-sky.mp4",
      "few clouds": "broken-clouds.mp4",
      "broken clouds": "broken-clouds.mp4",
      "overcast clouds": "overcast-clouds.mp4",
      "light rain": "light-rain.mp4",
      "moderate rain": "light-rain.mp4",
      "heavy rain": "heavy-rain.mp4",
      "heavy intensity rain": "heavy-rain.mp4",
      "light snow": "light-snow.mp4",
      "heavy snow": "heavy-snow.mp4",
      thunderstorm: "thunderstorm.mp4",
      snow: "light-snow.mp4",
      mist: "mist.mp4",
      haze: "mist.mp4",
      smoke: "mist.mp4",
      fog: "mist.mp4",
      smog: "smog.mp4",
      sunny: "sunny.mp4",
      drizzle: "drizzle.mp4",
    };

    const videoFile = videoMap[formattedDescription]
      ? `/videos/${videoMap[formattedDescription]}`
      : "/videos/default.mp4";

    setVideoSrc(""); // Reset state to force re-render
    setTimeout(() => setVideoSrc(videoFile), 50); // Delay to ensure re-render

    if (videoMap[formattedDescription]) {
      setVideoSrc(`/Videos/${videoMap[formattedDescription]}`);
    } else {
      setVideoSrc(""); // No fallback video
    }
  }, [description]);

  return videoSrc ? (
    <video key={videoSrc} autoPlay loop muted className="background-video">
      <source src={videoSrc} type="video/mp4" />
    </video>
  ) : null;
}
