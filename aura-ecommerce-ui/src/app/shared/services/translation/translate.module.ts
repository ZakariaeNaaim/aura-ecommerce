import { NgModule } from "@angular/core";
import { TranslationService } from "./translate.service";
import { TranslatePipe } from "./translate.pipe";

@NgModule({
    imports:[

    ],
    providers:[
        TranslationService
    ],
    declarations:[
        TranslatePipe
    ],
    exports:[
        TranslatePipe
    ]
})
export class TranslationModule {}