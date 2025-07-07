const API_KEY = 'AIzaSyDvFunhAdDrVZyTsl6m0Vj5kpdlCb_qHL8';
let videos = [];
let currentIndex = 0;

// Search YouTube videos
async function searchVideos() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    videos = data.items.map(item => item.id.videoId).filter(Boolean);
    currentIndex = 0;
    if (videos.length > 0) {
      playVideo(videos[currentIndex]);
    } else {
      alert("No videos found for your search.");
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    alert('Failed to load videos. Try again.');
  }
}

// Play video in iframe
function playVideo(videoId) {
  const iframe = document.getElementById('videoPlayer');
  iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=1`;
}

// Play next video
function playNext() {
  if (videos.length === 0) return;
  currentIndex = (currentIndex + 1) % videos.length;
  playVideo(videos[currentIndex]);
}
