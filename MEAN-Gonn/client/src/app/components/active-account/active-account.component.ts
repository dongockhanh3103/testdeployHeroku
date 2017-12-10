import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ActivationService } from '../../services/activation.service';
@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {

  token:undefined;
  message;
  constructor(private route:ActivatedRoute, private activation:ActivationService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => this.token = params.token);
    //console.log(this.token);
    if(this.token!==undefined){
      this.activation.authToken(this.token).subscribe(res=>{
        console.log(res.message);
       this.message=res.message;
      });
    }
  }

}
