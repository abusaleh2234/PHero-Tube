
const categoryDataLode = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/videos/categories')
    const categoriData = await res.json()
    // console.log(categoriData)

    const categoriConstainer = document.getElementById('categori-constainer')
    categoriData.data.forEach((categori) => {
        // console.log(categori)
        
        const categoris = document.createElement('div')
        categoris.innerHTML = `<a id="categoriId" onclick="categoryHandler(${categori.category_id})" class="btn ">${categori.category}</a>`

        categoriConstainer.appendChild(categoris)
        
    });
}

let ctgid = 0;

const categoryHandler = async (categoryId) => {
    ctgid = categoryId
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const dataAll = await res.json()
    // console.log(dataAll)
    
    const notFoundData = document.getElementById('notFoundData')
    if(dataAll.data.length === 0){
        notFoundData.classList.remove('hidden')
    }else{
        notFoundData.classList.add('hidden')
    }

    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML ="";

    dataAll.data.forEach((videoData) => {
        // console.log(videoData)
        const postDate = videoData?.others.posted_date

        const hour = Math.floor((postDate / 60 )/60)
        const htom = hour*60
        const munit = Math.floor((postDate / 60 )-htom)

        const div = document.createElement('div')

        div.innerHTML = `
        <div class="card bg-base-100 ">
            <div class="relative">
                <figure ><img class="w-full h-54 md:h-52 lg:h-48 rounded-xl" src="${videoData?.thumbnail}" alt="Shoes" /></figure>

                ${postDate?`<p id="settime" class ="text-right px-2 py-1 	bg-slate-950 rounded-lg text-white absolute bottom-2	right-2	">${hour+" hour"} ${munit+"min ago"}</p>`:""}
            </div>
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
}

const sortHendel = async () => {
    // console.log(ctgid)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${ctgid}`)
    const data = await res.json()
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML ="";

    let  sortItem = data.data.sort((a,b) => {
        const aa = parseFloat(a.others.views)
        const bb = parseFloat(b.others.views)

        if(aa > bb){
            return -1;
        }
    })

    sortItem.forEach((videoData) => {
        const postDate = videoData?.others.posted_date

        const hour = Math.floor((postDate / 60 )/60)
        const htom = hour*60
        const munit = Math.floor((postDate / 60 )-htom)

        const div = document.createElement('div')

        div.innerHTML = `
        <div class="card bg-base-100 ">
            <div class="relative">
                <figure ><img class="w-full h-54 md:h-52 lg:h-48 rounded-xl" src="${videoData?.thumbnail}" alt="Shoes" /></figure>

                ${postDate?`<p id="settime" class ="text-right px-2 py-1 	bg-slate-950 rounded-lg text-white absolute bottom-2	right-2	">${hour+" hour"} ${munit+"min ago"}</p>`:""}
            </div>
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

}

const  blogHendel = () =>{
    window.open("./blog.html", "_blank");
}

categoryHandler(1000)

categoryDataLode()