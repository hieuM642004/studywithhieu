import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TopicsService } from '../../services/topics.service';
import { Topics } from '../../types/types';
import { AuthService } from '../../services/auth.service';
import { ArticlesService } from '../../services/articles.service';
import { EpisodeService } from '../../services/episode.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public editorData = '<h1>Title</h1><p>Content</p>';
  topics: Topics[] = [];
  selectedTopicId: string | undefined;
  image: File | undefined;
  episode = '';
  sets: any[] = [{ firstName: '', content: '', audioFile: null }];
  previousArticleId: string | undefined;
  loading = false;
  successMessage: string | null = null;
  errorMessage: boolean=false
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly topicsService: TopicsService,
    private authService: AuthService,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    this.fetchTopics();
  }

  extractContentAndTitle(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const paragraphs = Array.from(doc.getElementsByTagName('p')).map(
      (p) => p.innerHTML
    );
    const headers = Array.from(
      doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ).map((h) => h.innerHTML);

    return {
      title: headers.join(' '),
      content: paragraphs.join(' '),
      images: this.image,
      postedBy: this.authService.getAccessTokenPayload().id,
      idTopic: this.selectedTopicId,
    };
  }

  extractEpisodeData(set: any): FormData {
    const formData = new FormData();
    formData.append('title', set.firstName);
    formData.append('description', set.content);
    formData.append('audio', set.audioFile);
    formData.append('duration', '0');
    formData.append('idPodcast', this.previousArticleId || '');
    return formData;
  }

  saveData() {
    if (!this.selectedTopicId || !this.editorData.trim() || !this.image || !this.sets.every(set => set.firstName.trim() && set.content.trim() && set.audioFile)) {
      this.errorMessage=true
      return;
    }
    this.loading = true; 
    const data = this.extractContentAndTitle(this.editorData);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (this.image) {
      formData.append('images', this.image);
    }
    formData.append('postedBy', data.postedBy);
    formData.append('idTopic', data.idTopic!);

    this.articlesService.addArticle(formData).subscribe(
      (articleResponse) => {
        this.previousArticleId = articleResponse.data._id;

        const episodeRequests = this.sets.map((set) => {
          const episodeFormData = this.extractEpisodeData(set);
          return this.episodeService.addEpisode(episodeFormData);
        });

        forkJoin(episodeRequests).subscribe(
          (episodeResponses) => {
            this.loading = false; 
            this.successMessage = 'Data saved successfully';
            console.log('Episodes data saved successfully', episodeResponses);
          },
          (error) => {
            console.error('Error saving episodes data', error);
          }
        );
      },
      (error) => {
        console.error('Error saving article data', error);
      }
    );
  }

  fetchTopics() {
    this.topicsService.getTopics().subscribe((topics) => {
      this.topics = topics.data;
    });
  }

  onTopicSelected(event: Event) {
    const topicId = (event.target as HTMLInputElement).value;
    this.selectedTopicId = topicId;
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.image = files[0];
    }
  }

  addSet() {
    this.sets.push({ firstName: '', content: '', audioFile: null });
  }

  removeSet(index: number) {
    if (this.sets.length > 1) {
      this.sets.splice(index, 1);
    }
  }

  handleFileInputAudio(event: any, index: number) {
    const file = event.target.files[0];
    console.log(file);

    this.sets[index].audioFile = file;
  }
}
