let model = {
    currentCat: null,
    adminVisible: false,
    cats: [
        {
            name: 'Tomi',
            id: 'tomi',
            src: 'assets/tomi.jpg',
            count: 0
        },{
            name: 'Lulu',
            id: 'lulu',
            src: 'assets/lulu.jpg',
            count: 0
        },{
            name: 'Acnu',
            id: 'acnu',
            src: 'assets/acnu.jpg',
            count: 0
        },{
            name: 'Ctin',
            id: 'ctin',
            src: 'assets/ctin.jpg',
            count: 0
        },{
            name: 'Bipo',
            id: 'bipo',
            src: 'assets/bipo.png',
            count: 0
        }
    ]
};

let controller = {
    init: function() {
        model.currentCat = model.cats[0];
        catView.init();
        listView.init();
        adminView.init();
    },

    incrementCounter: function() {
        model.currentCat.count++;
        catView.render();
        adminView.render();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getAllCats: function() {
        return model.cats;
    },

    setCurrentCat: function(index) {
        model.currentCat = model.cats[index];
        catView.render();
        adminView.render();
    },

    getFormVisibility: function() {
        return model.adminVisible;
    },

    setFormVisibility: function(visibility) {
        model.adminVisible = visibility;
        adminView.render();
    },

    updateCat: function(name, url, counter) {
        console.log(name);
        model.currentCat.name = name;
        model.currentCat.src = url;
        model.currentCat.count = counter;
        listView.render();
        catView.render();
    }

};

let catView = {
    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catCountElem = document.getElementById('cat-count');
        this.catImgElem = document.getElementById('cat-img');

        this.catImgElem.addEventListener('click', () => {
            controller.incrementCounter();
        }, false);

        this.render();
    },

    render: function() {
        let currentCat = controller.getCurrentCat();
        this.catNameElem.textContent = currentCat.name;
        this.catImgElem.src = currentCat.src;
        this.catCountElem.textContent = `${currentCat.name} has been clicked ${currentCat.count} times`;
    }
};

let listView = {
    init: function() {
        this.listElem = document.getElementById('cat-list');
        this.render();
    },

    render: function() {
        let allCats = controller.getAllCats();
        this.listElem.innerHTML = '';
        allCats.forEach((cat, index) => {
            let li = document.createElement('li');
            li.textContent = cat.name;
            li.addEventListener('click', () => {
                controller.setCurrentCat(index);
            }, false);

            this.listElem.appendChild(li);
        });
    }
};

let adminView = {
    init: function() {
        this.adminBtn = document.getElementById('admin-btn');
        this.adminBtn.addEventListener('click', () => {
            controller.setFormVisibility(true);
        }, false);
        this.catForm = document.getElementById('cat-edit');

        this.nameInput = document.getElementById('cat-name-input');
        this.urlInput = document.getElementById('cat-url-input');
        this.clicksInput = document.getElementById('cat-clicks-input');

        this.cancelBtn = document.getElementById('cancel-btn');
        this.cancelBtn.addEventListener('click', () => {
            controller.setFormVisibility(false);
        }, false);
        this.saveBtn = document.getElementById('save-btn');
        this.saveBtn.addEventListener('click', () => {
            controller.updateCat(this.nameInput.value, this.urlInput.value, this.clicksInput.value);
            controller.setFormVisibility(false);
        }, false);
        this.render();
    },

    render: function() {
        let visibility = controller.getFormVisibility();
        if(visibility === true) {
            this.catForm.style.display = 'block';
        } else {
            this.catForm.style.display = 'none';
        }

        let currentCat = controller.getCurrentCat();
        this.nameInput.value = currentCat.name;
        this.urlInput.value = currentCat.src;
        this.clicksInput.value = currentCat.count;
    }
};

controller.init();
