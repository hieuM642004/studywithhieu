import { Component, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { TopicsService } from '../../services/topics.service';
import { Topics } from '../../types/types';
import { AuthService } from '../../services/auth.service';
import { ArticlesService } from '../../services/articles.service';
import { EpisodeService } from '../../services/episode.service';
import { forkJoin } from 'rxjs';
import { ToastComponent } from '../../components/toast/toast.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  public Editor = ClassicEditor;
  public editorData = '<h1>Title</h1><p>Content</p>';
  topics: Topics[] = [];
  selectedTopicId: string | undefined;
  image: File | undefined;
  imagePreview: string | undefined;
  episode = '';
  sets: any[] = [{ firstName: '', content: '', audioFile: null }];
  previousArticleId: string | undefined;
  loading = false;
  successMessage: string | null = null;
  errorMessage: boolean = false;
  errorChanged: boolean = false;

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly topicsService: TopicsService,
    private authService: AuthService,
    private episodeService: EpisodeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchTopics();
    this.route.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      if (articleId) {
        this.previousArticleId = articleId;
        this.loadArticleData(articleId);
      }
    });
  }

  loadArticleData(articleId: string) {
    this.articlesService.getArticlesById(articleId).subscribe((article) => {
      this.editorData = `<h1>${article.data.title}</h1><p>${article.data.content}</p>`;
      this.selectedTopicId = article.data.idTopic;
      this.imagePreview = article.data.images;
      const episodeIds = article.data.episodes;
      this.episodeService.getEpisodesById(episodeIds).subscribe((response) => {
        if (response.statusCode === 201) {
          const episodeData = response.data;
          if (episodeData && typeof episodeData === 'object' && !Array.isArray(episodeData)) {
            this.sets = [episodeData].map((episode: any) => ({
              _id: episode._id,
              firstName: episode.title,
              content: episode.description,
              audioFile: episode.audioUrl,
            }));
          }
        }
      });
    });
  }

  extractContentAndTitle(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const paragraphs = Array.from(doc.getElementsByTagName('p')).map(
      (p) => p.innerHTML
    );
    const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((h) => h.innerHTML);

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
    this.errorMessage = !this.errorMessage; // Reset errorMessage flag
    const isEditing = !!this.previousArticleId; // Kiểm tra nếu đang chỉnh sửa
  
    if (
      !this.selectedTopicId ||
      !this.editorData.trim() ||
      (!isEditing && !this.image) || // Chỉ yêu cầu hình ảnh nếu là tạo mới
      !this.sets.every((set) => set.firstName.trim() && set.content.trim() && set.audioFile)
    ) {
      this.toastComponent.showToast('All inputs must be filled', 'error');
      this.errorMessage = true;
      this.errorChanged = !this.errorChanged; // Update errorChanged flag
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
  
    if (isEditing) {
      this.updateData(formData);
    } else {
      this.createData(formData);
    }
  }
  
  createData(formData: FormData) {
    this.articlesService.addArticle(formData).then(
      (articleResponse: any) => {
        this.errorMessage = false;
        this.previousArticleId = articleResponse.data._id;
        const episodeRequests = this.sets.map((set) => {
          const episodeFormData = this.extractEpisodeData(set);
          return this.episodeService.addEpisode(episodeFormData);
        });
  
        forkJoin(episodeRequests).subscribe(
          (episodeResponses) => {
            this.loading = false;
            this.toastComponent.showToast('Article added successfully', 'success');
            console.log('Episodes data saved successfully', episodeResponses);
          },
          (error) => {
            this.loading = false;
            console.error('Error saving episodes data', error);
          }
        );
      },
      (error: any) => {
        this.errorMessage = true;
        this.errorChanged = !this.errorChanged; // Update errorChanged flag
        this.loading = false;
        console.error('Error saving article data', error);
      }
    );
  }
  
  updateData(formData: FormData) {
    const episodeRequests = this.sets.map((set) => {
      const episodeFormData = this.extractEpisodeData(set);
      return this.episodeService.editEpisode(set._id, episodeFormData);
    });
  
    forkJoin(episodeRequests).subscribe(
      (episodeResponses) => {
        const episodeIds = episodeResponses.map((res: any) => res.data._id);
        formData.append('episodes', JSON.stringify(episodeIds));
  
        this.articlesService.editArticle(this.previousArticleId!, formData).subscribe(
          (articleResponse) => {
            this.errorMessage = false;
            this.loading = false;
            this.toastComponent.showToast('Article updated successfully', 'success');
            console.log('Episodes data updated successfully', episodeResponses);
          },
          (error) => {
            this.errorMessage = true;
            this.errorChanged = !this.errorChanged; // Update errorChanged flag
            this.loading = false;
            console.error('Error updating article data', error);
          }
        );
      },
      (error) => {
        this.loading = false;
        console.error('Error updating episodes data', error);
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
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.image);
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
    this.sets[index].audioFile = file;
  }
}
