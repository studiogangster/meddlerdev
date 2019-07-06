export class SideMenuItem {

    title: String;
    subtitle: String;
    desc: String;
    url: String;
    icon: String;

    route: Array<Object>;

    isLeaf: boolean = false
    isRoot: boolean = false


    constructor( title, subtitle , desc, url , icon) {
        this.title = title || '';
        this.subtitle = subtitle || '';
        this.desc = desc || '';
        this.url = url || '';
        this.icon = icon || '';

    }

    IsLeaf(val: boolean): SideMenuItem{
        this.isLeaf = val
        return this
    }

    get ifLeaf(): boolean{

        return this.isLeaf
    }

   public get getRoute() : Array<Object>{
        return ( this.route )? this.route : ["/"]
    }

    public setRoute(route: Array<Object>) : SideMenuItem {
            this.route = route;
            return this;
    }
}
