import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import {catchError,map,startWith} from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.services';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
  this.products$=
    this.productsService.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})
  }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
    );
  
  }

  onGetSelectedProducts(){
    this.products$=
      this.productsService.getSelectedProducts().pipe(
        map(data=>{
          console.log(data);
          return({dataState:DataStateEnum.LOADED,data:data})
    }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
      );
    
    }

    onGetAvailableProducts(){
      this.products$=
        this.productsService.getAvailableProducts().pipe(
          map(data=>{
            console.log(data);
            return({dataState:DataStateEnum.LOADED,data:data})
      }),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err=>of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
        );
      
      }

      onSearch(dataForm:any){
        this.products$=
        this.productsService.searchProducts(dataForm.keyword).pipe(
          map(data=>{
            console.log(data);
            return({dataState:DataStateEnum.LOADED,data:data})
      }),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err=>of({dataState:DataStateEnum.LOADED,errorMessage:err.message}))
        );
      }

      onSelect(p:Product){
        this.productsService.select(p)
          .subscribe(data=>{
            p.selected=data.selected;
          })

      }

      onDelete(p:Product){
        let v=confirm("Are you sure?");
        if(v==true)
        this.productsService.delete(p)
          .subscribe(data=>{
            this.onGetAllProducts();
          })
      }

      onNewProduct(){
        
      }

}
