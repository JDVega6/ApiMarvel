import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {

  title='Characters';
  
  constructor(private characterSvc: CharacterService, private router: ActivatedRoute){}

  characters?:Observable<any>;

  ngOnInit(){
    this.loadCharactersList();
  }

  private query : string = '';
  keyOption : string = 'Sort By';

  characterList:any=[];

  //Comic Modal
  comic:any;
  btnImgAdd='';
  btncolAdd: boolean = false;
  favourites: any=[];
  titlebutton ='';
  closeResult = '';

  private loadCharactersList(){
    this.router.params.subscribe(params => {
      this.query = params['query'];
      this.getAllCharacters();
    });
  }

  public config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  onPageChange(number: number) {
    this.config.currentPage = number;
  }
 
  getAllCharacters(){
    this.characters =  this.characterSvc.searchCharacters(this.query);
  }
  

  public orderAs_A_Z(){
    this.characters =  this.characterSvc.searchCharacters(this.query, 'name');
    this.config.currentPage = 1;
  }

  public orderAs_Z_A(){
    this.characters =  this.characterSvc.searchCharacters(this.query, '-name');
    this.config.currentPage = 1;
  }

  public orderAsAsc(){
    this.characters =  this.characterSvc.searchCharacters(this.query, 'modified');
    this.config.currentPage = 1;
  }

  public orderAsDesc(){
    this.characters =  this.characterSvc.searchCharacters(this.query, '-modified');
    this.config.currentPage = 1;
  }

  DescriptionCharacter(text:String){
    return text.length > 143 ? text.slice(0,140)+ "..." : text && 
      text != undefined  ? text : "Description Not Found" ;
  }

  comicArrays(character:any): any[]{
    let listComics: any[] = [];
    let comics = character.comics?.items;
    if(comics.length != 0)
    {
      let i = 0;
      for(var comic of comics){
        if (i < 4) {
          listComics.push(comic);
        }
        else{
          break;
        }
        i++;
      }
    }
    else
    {
      listComics.push("");
    }
    return listComics;
  }

  nameComic(text:String){
    return text != undefined  ? text : "Comics No found "; 
  }

}
