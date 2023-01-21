// This is all category functions

const allCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url)
        const data = await res.json()
        displayAllCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

// This is display all category functions

const displayAllCategory = categories => {
    const categoriesMenu = document.getElementById('category-menu');
    categories.forEach(category => {
        categoriesMenuLi = document.createElement('li');
        categoriesMenuLi.classList.add('liItem');
        categoriesMenu.appendChild(categoriesMenuLi);
        categoriesMenuLi.innerText = category.category_name;
        categoriesMenuLi.addEventListener("click", (e) => {
            categoryIdAndName(
                `${category.category_id}`,
                `${category.category_name}`,
                toggleSpinner(true),
            );
        });
    });
}
allCategory();

// This is category Id and Name functions

const categoryIdAndName = async (categoryId, categoryName) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
        const res = await fetch(url)
        const data = await res.json()
        dispalyCategoryIdName(data.data, categoryName);
    }
    catch (error) {
        console.log(error);
    }
}


// This is dispaly category Id Name functions

const dispalyCategoryIdName = (categoryId, categoryName) => {
    const itemCategoryList = document.getElementById('item-category-list');
    if (categoryId.length > 0) {
        itemCategoryList.innerText = `${categoryId.length} items found for category ${categoryName}`;
    } else {
        itemCategoryList.innerText = `Sorry, this item cannot be found in the category ${categoryName}`;
    }

    const cardArea = document.getElementById('card-area');
    cardArea.innerHTML = '';
    categoryId.forEach(category => {
        // console.log(categoryId);
        cardNewDiv = document.createElement('div');
        cardNewDiv.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${category.image_url}" class="card-img-top" alt="img">
                <div class="card-body">
                    <h3 class="card-title fw-bold text-dark text-capitalize">${category.title}</h3>
                    <p class="card-text" style="text-align: justify">${category.details.slice(0, 120)}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center p-3">
                    <div> 
                        <img src="${category.author.img}" width="50px" height="50px"></img>
                        <div class="d-inline-block ms-2" style="position: relative;top: 15px">
                            <p class="mb-0">${category.author.name ? category.author.name : 'No author name'}</p>
                            <span>${category.author.published_date ? category.author.published_date.slice(0, 10) : 'No author date'}</span>
                        </div>
                    </div>
                    <div>
                       <i class="fa-sharp fa-solid fa-eye me-3"></i>${category.total_view ? category.total_view : 'No view'}
                    </div>
                 </div>
                <div class="d-flex justify-content-center">
                    <button class="mt-3 w-100 btn btn-primary px-3 py-3 text-uppercase fw-bold"  onclick="newDetail('${category._id}')" data-bs-toggle="modal" data-bs-target="#New-Detail">News detail</button>
                </div>
            </div>
        </div>     
        `;
        cardArea.appendChild(cardNewDiv);
        toggleSpinner(false);
    });
};

categoryIdAndName('03', 'International News'); // This is functions call


document.getElementById('news-nav').addEventListener('click', () => {
    categoryIdAndName('08', 'All News');
})


// This is toggle spinner functions

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// This is new detail functions

const newDetail = async newId => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${newId}`;
        const res = await fetch(url)
        const data = await res.json()
        displayNewDetail(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

// This is display new detail functions

const displayNewDetail = detailNew => {
    const newsDetail = document.getElementById('New');
    detailNew.forEach(details => {
        // console.log(details);
        const newsDetailDiv = document.getElementById('news-detail');
        newsDetailDiv.innerHTML = `
        <img src="${details.thumbnail_url}"></img>
        <p class="mt-5" style="text-align: justify">${details.details}</p>  
        <div class="d-flex justify-content-between align-items-center p-3">
            <div> 
                <img src="${details.author.img}" width="50px" height="50px"></img>
                <div class="d-inline-block ms-2" style="position: relative;top: 15px">
                    <p class="mb-0">${details.author.name ? details.author.name : 'No author name'}</p>
                    <span>${details.author.published_date ? details.author.published_date.slice(0, 10) : 'No author date'}</span>
                </div>
            </div>
            <div>
               <i class="fa-sharp fa-solid fa-eye me-3"></i>${details.total_view ? details.total_view : 'No view'}
            </div>
         </div>              
        `;
    })
}