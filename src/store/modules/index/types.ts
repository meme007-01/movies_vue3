export interface IndexResult {
  banners : any
}

export interface IndexState {
  indexResult : Map<number, IndexResult>;
  tabs : Array<TabModel>;
}

export interface TabResultState {
  code : number;
  message : string;
  data : Array<TabModel>
}

export interface TabModel {
  id : number;
  title : number;
  sort : number;
  subTabs : Array<TabModel>;
}
