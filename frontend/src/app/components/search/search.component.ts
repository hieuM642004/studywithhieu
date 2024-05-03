import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';;
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchKeyword: string = '';
  transcripts: any[] = [];
  safeUrls: SafeResourceUrl[] = [];
  currentSlideIndex: number = 0;
  dictionaryResult: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.searchVideos();
  }
  
  searchVideos() {
    const apiUrl = `https://api.tracau.vn/WBBcwnwQpV89/trans/${this.searchKeyword}`;
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.transcripts = data.transcripts;
        this.safeUrls = this.transcripts.map((transcript) =>
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube-nocookie.com/embed/${
              transcript.fields.youtube_id
            }?start=${Math.round(
              parseFloat(transcript.fields.start)
            )}&amp;feature=oembed&amp;rel=0&cc_load_policy=1&cc_lang_pref=en`
          )
        );
       
        this.searchDictionary(this.searchKeyword);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  searchDictionary(keyword: string) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log(data);
        this.dictionaryResult = data;
      },
      (error) => {
        console.error('Error fetching dictionary data:', error);
      }
    );
  }
  playAudio(audioSrc: string) {
    const audio = new Audio(audioSrc);
    audio.play();
  }
  

  nextSlide() {
    if (this.currentSlideIndex < this.safeUrls.length - 1) {
      this.currentSlideIndex++;
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }
  
  
}
