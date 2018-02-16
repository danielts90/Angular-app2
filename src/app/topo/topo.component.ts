import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extension';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})

export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  public ofertas2: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        console.log('Requisição http para a Api');
        if(termo.trim() === ''){
          return Observable.of<Oferta[]>([]);  
        }
        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((err: any) => {
        console.log(err);
        return Observable.of<Oferta[]>([]);
      });

      this.ofertas.subscribe((ofertas: Oferta[]) => {
        console.log(ofertas);
        this.ofertas2 = ofertas;
      });
      
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyUp char', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

}
