import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, search: any) {
    if(search == undefined){
      return products;
    }else{
      return products.filter(product => {
        //return product.nombre.toLowerCase().includes(search.toLowerCase()) || product.cantidad.toLowerCase().includes(search.toLowerCase);
        return JSON.stringify(product).toLowerCase().includes(search.toLowerCase());

      })
    }
  }

}
 