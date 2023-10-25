import { randomUUID } from 'node:crypto';
import { VideoData } from '../types/video';

export class DatabaseMemory {
  #videos: Map<string, VideoData> = new Map();

  list(search?: string) {
    return Array.from(this.#videos.entries())
      .map((video) => {
        const id = video[0];
        const data = video[1];

        return {
          id,
          ...data,
        };
      })
      .filter((video) => {
        if (search) {
          return (
            video.title.toLowerCase().includes(search.toLowerCase()) ||
            video.description.toLowerCase().includes(search.toLowerCase())
          );
        }

        return true;
      });
  }

  create(video: VideoData) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  update(id: string, video: VideoData) {
    this.#videos.set(id, video);
  }

  delete(id: string) {
    this.#videos.delete(id);
  }
}
