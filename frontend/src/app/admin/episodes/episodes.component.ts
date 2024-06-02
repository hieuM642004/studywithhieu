import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit{
  episodes: any[] = [];

  constructor(private episodesService: EpisodeService) {}

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes() {
    this.episodesService.getEpisodes().subscribe(
      (data: any) => {
        this.episodes = data.data;
      },
      (error: any) => {
        console.error('Error fetching episodes:', error);
      }
    );
  }
  truncateDescription(description: string): string {
    return description.length > 50 ? description.slice(0, 50) + '...' : description;
  }
}
