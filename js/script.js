const categoryDataLode = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/videos/categories')
    const categoriData = await res.json()
    // console.log(categoriData)


    categoriData.data.forEach((categori) => {
        // console.log(categori)
        const categoriConstainer = document.getElementById('categori-constainer')

        const categoris = document.createElement('div')
        categoris.innerHTML = `<a onclick="categoryHandler(${categori.category_id})" class="btn ">${categori.category}</a>`

        categoriConstainer.appendChild(categoris)

    });
}

const categoryHandler = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const dataAll = await res.json()
    // console.log(dataAll.data.length)
    const notFoundData = document.getElementById('notFoundData')
    if(dataAll.data.length === 0){
        // console.log("erreoe")
        notFoundData.classList.remove('hidden')
    }else{
        notFoundData.classList.add('hidden')
    }
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML ="";


    dataAll.data.forEach((videoData) => {
        console.log(videoData)
        const postDate = videoData?.others.posted_date
        // console.log((postDate / 60 )/60)
        // const viewAll = videoData.others.views
        // const int = parseFloat(viewAll)
        // console.log(int)
        const hour = Math.floor((postDate / 60 )/60)
        const htom = hour*60
        const munit = Math.floor((postDate / 60 )-htom)
        

        const div = document.createElement('div')

        // if(postDate){
        //     // <div>${postDate?hour:""}hrs${postDate?munit:""}min ago</div>
        //     div.innerHTML=`<div>${postDate?hour:""}hrs${postDate?munit:""}min ago</div>`
        // }

        
        div.innerHTML = `
        <div class="card bg-base-100 ">
            <figure class=""><img class="w-full h-54 md:h-52 lg:h-48 rounded-xl" src="${videoData?.thumbnail}" alt="Shoes" /></figure>
            <div>${postDate?hour:""}hrs${postDate?munit:''}min ago</div>
            <div class="flex pt-4 gap-3">
                <div class="">
                    <img class="w-12 h-12 rounded-full" src="${videoData?.authors[0]?.profile_picture}" alt="">
                </div>
                <div class="space-y-[5px]">
                    <h2 class="text-base font-bold">${videoData?.title}</h2>
                    <div class="flex gap-4">
                        <h5 class="text-base">${videoData?.authors[0]?.profile_name}</h5>
                        <img src="${videoData?.authors[0]?.verified === true ? "./image/fi_10629607.png" : ""}" alt="">
                    </div>
                    <p>${videoData?.others?.views}</p>
                </div>
            </div>
        </div>
        `;
        videoContainer.appendChild(div)
    })
    // ${videoData.authors[0].verified ? "ds":"this is wrong"}

}

const sortHendel = () => {

}



categoryHandler(1000)

categoryDataLode()