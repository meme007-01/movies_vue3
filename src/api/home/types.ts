export interface IndexParams {
  // phone: string;
  // code: string;
}
export interface IndexResult {

}

export interface PlayLineParams{
  videoId:number;
}

export interface VideoParams{
  pageIndex:number;
  pageSize:number;
  categoryPid:number;//一级分类id
  categoryChildId:number;//二级分类id
}
