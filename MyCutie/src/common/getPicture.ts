import { HttpClient } from "@angular/common/http";

export class getPicture{
    constructor(public http: HttpClient){}

    public getPicture(api:string):string{
        var picture;
        this.http.get(api).subscribe((f) => {
            picture = f['img'];
        });
        return picture;
    }
}