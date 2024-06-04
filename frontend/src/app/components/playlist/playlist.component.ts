import { Component, Input, OnInit } from '@angular/core';
import { EpisodeService } from '../../services/episode.service';
import { CommonModule } from '@angular/common';
import { Episodes } from '../../types/types';
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit{
  @Input() articleId: string | undefined;
  episodes: Episodes[] = [];
  currentPlaying: { title: string; description: string; } | undefined;
  currentAudioUrl: string | undefined;
  audio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  progress: number = 0;
  duration: number = 0;
  currentTime: number = 0;
  intervalId: any;
  currentEpisodeIndex: number = 0;
  constructor(private readonly episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.fetchPlaylist();
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchPlaylist() {
    if (this.articleId) {
      this.episodeService.getEpisodes().subscribe(
        (response) => {
          console.log(response);
          this.episodes = response.data.filter((episode: any) => episode.idPodcast === this.articleId);
        },
        (error) => {
          console.error('Error fetching playlist:', error);
        }
      );
    } else {
      console.error('No article ID provided');
    }
  }

  playEpisode(episode: any) {
    this.currentPlaying = { title: episode.title, description: episode.description };
    this.currentAudioUrl = episode.audioUrl;
    if (this.currentAudioUrl) {
      this.initAudioPlayer(this.currentAudioUrl);
    }
  }

  initAudioPlayer(url: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.audio = new Audio(url);
    this.audio.addEventListener('loadedmetadata', this.updateDuration.bind(this));
    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
    this.audio.play();
    this.isPlaying = true;
  }

  togglePlay() {
    if (this.audio) {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  seek(event: MouseEvent) {
    if (this.audio) {
      const progressBar = event.currentTarget as HTMLElement;
      const offsetX = event.offsetX;
      const totalWidth = progressBar.clientWidth;
      const seekTime = (offsetX / totalWidth) * this.audio.duration;
      this.audio.currentTime = seekTime;
    }
  }

  updateDuration() {
    if (this.audio) {
      this.duration = this.audio.duration;
    }
  }

  updateProgress() {
    if (this.audio) {
      this.currentTime = this.audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    }
  }

  prev() {
 if(this.currentEpisodeIndex>0){
  this.currentEpisodeIndex--
  this.playEpisode(this.episodes[this.currentEpisodeIndex])
 }
  }

  next() {
    if(this.currentEpisodeIndex<this.episodes.length -1){
      this.currentEpisodeIndex++;
      this.playEpisode(this.episodes[this.currentEpisodeIndex])
          }
  }

  rewind() {
    if (this.audio) {
      this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
    }
  }

  forward() {
    if (this.audio) {
      this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
    }
  }

  changePlaybackRate(event: Event) {
    const target = event.target as HTMLSelectElement;
    const rate = parseFloat(target.value);
    if (this.audio) {
      this.audio.playbackRate = rate;
    }
  }
  // formatTime(seconds: number): string {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const remainingSeconds = Math.floor(seconds % 60);
  //   return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  // }
  
}
