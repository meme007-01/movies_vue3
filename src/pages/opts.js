const clickBanner=(item)=>{
  console.error(item)
}

const clickMovie=(item)=>{
  console.error(item)
  uni.navigateTo({
    url:"/pages/video_detail/index?info="+encodeURIComponent(JSON.stringify(item))
  })
}


const clickMovieType=(item)=>{
  console.error(item)
}


export {clickBanner,clickMovie,clickMovieType}
