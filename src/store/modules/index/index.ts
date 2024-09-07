import { defineStore } from 'pinia';
import type { IndexState, IndexResult } from '../index/types';
import { IndexApi } from '@/api';

const indexStore = defineStore('app', {
  state: () : IndexState => ({
    indexResult: new Map<number, IndexResult>,
  }),
  getters: {
    getIndexResult() : Map<number, IndexResult> {
      return this.indexResult;
    },
  },
  actions: {
    setIndexResult(index : number, info : IndexResult) {
      this.indexResult.set(index, info)
    },
    initIndexResult() {
      this.indexResult = new Map<number, IndexResult>()
      this.indexResult.set(0, {
        banners: [{
          title: "xx",
          image: "/src/static/images/banner/banner1.jpg"
        }, {
          title: "xx",
          image: "/src/static/images/banner/banner2.jpg"
        }, {
          title: "xx",
          image: "/src/static/images/banner/banner3.jpg"
        }]
      })
      this.indexResult.set(1, {
        banners: [{
          title: "xx",
          image: "/src/static/images/banner/banner2.jpg"
        }, {
          title: "xx",
          image: "/src/static/images/banner/banner3.jpg"
        }]
      })
    },
    getIndexResultByIndex(index : number) : Promise<any> {
      return new Promise((resolve, reject) => {
        let data=this.indexResult.get(index);
        if(data){
          resolve(data)
          return;
        }
        IndexApi.getIndexResult({}).then((res : any) => {
          console.error(res)
          if (res.ret == 200) {
            let list = res.data.list;
            for (let i = 0; i < list.length; i++) {
              let bannerList = list[i].bannerList;
              for (let j = 0; j < bannerList.length; j++) {
                let url=bannerList[j].showURL;
                bannerList[j]['image']=url;
              }
            }
             this.indexResult.set(index, list);
            resolve(this.indexResult.get(index))
          } else {
            reject([])
          }
        }).catch(err => {
          console.error(err)
          reject([])
        })
      });

      return this.indexResult.get(index) as IndexResult;
    }
  },
});

export default indexStore;
