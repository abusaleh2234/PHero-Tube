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
    console.log(dataAll)
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML ="";


    dataAll.data.forEach((videoData) => {
        console.log(videoData)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img class="w-10/12" src="${videoData?.thumbnail}" alt="Shoes" /></figure>
            <div class="card-body flex">
                <div class="">
                    <img src="" alt="">
                </div>
                <div class="">
                    <h2 class="card-title">Shoes!</h2>
                    <div class="">
                        <h5>a dog chews shoes whose </h5>
                        <img src="" alt="">
                    </div>
                    <p>a dog chews shoes whose </p>
                </div>
            </div>
        </div>
        `;
        videoContainer.appendChild(div)
    })



}
// categoryHandler()

categoryDataLode()