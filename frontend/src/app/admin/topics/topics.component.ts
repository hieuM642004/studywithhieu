import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../../services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TsAdminComponent implements OnInit{
  topics :any[] = [];
constructor(private topicsService: TopicsService){

}
  ngOnInit(): void {
  this.getTopics()
  }
  getTopics(){
    this.topicsService.getTopics().subscribe((topic)=>{
      this.topics=topic.data
    })
  }
}
