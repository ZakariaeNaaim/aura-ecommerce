import { Pipe, PipeTransform } from "@angular/core";
import { TranslationService } from "./translate.service";


@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform{
    constructor(private transltionService:TranslationService){

    }
    transform(value: string, args?: string[]):string{
        if(!value) {
            return '';
        }
        return this.transltionService.translate(value,args);
    }
}