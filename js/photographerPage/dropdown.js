export default class Dropdown {
  constructor(medias, photographerPage) {
    this.medias = medias;
    this.photographerPage = photographerPage;
    this.listbox = document.querySelector('[role="listbox"]');
    this.bindDropdownEventListeners();
    this.bindDropdownKeyboardEventListeners();
    this.dropdownIsClosed = true;
  }

  bindDropdownEventListeners() {
    const buttonSort = document.querySelector('.btn-sort');
    const listOption = document.querySelector('.listOption');

    buttonSort.addEventListener('click', () => {
      if (listOption.style.display == 'none') {
        listOption.style.display = 'block';
        document.querySelector('.fa-chevron-up').style.display = 'none';
        document.querySelector('.fa-chevron-down').style.display = 'block';
      } else if (listOption.style.display === 'block') {
        listOption.style.display = 'none';
        document.querySelector('.fa-chevron-up').style.display = 'block';
        document.querySelector('.fa-chevron-down').style.display = 'none';
      }
    });

    listOption.addEventListener('click', (e) => {
      this.sortMedias(e.target.dataset.value);
      this.photographerPage.drawGallery();
      if (e.target.matches('li')) {
        document.getElementById('selected').innerText = e.target.textContent;
        document.getElementById('selected').style.paddingBottom = '23px';
      }
    });

    window.addEventListener('click', (e) => {
      if (e.target.matches('#listOption *')) {
        listOption.style.display = 'none';
      }
    });
  }

  bindDropdownKeyboardEventListeners() {
    const listOption = document.querySelector('.listOption');

    window.addEventListener('keydown', (e) => {
      if (e.target.matches('#listOption *')) {
        const { key } = e;
        if (key === 'Enter') {
          this.sortMedias(e.target.dataset.value);
          this.photographerPage.drawGallery();
          listOption.style.display = 'none';
        }
        if (e.target.matches('li')) {
          document.getElementById('selected').innerText = e.target.textContent;
          document.getElementById('selected').style.paddingBottom = '23px';
        }
      }
    });
  }

  sortMedias(sort) {
    switch (sort) {
      case 'popularity':
        this.medias.sort(function (a, b) {
          if (a.likes < b.likes) {
            return 1;
          } else if (b.likes < a.likes) {
            return -1;
          }
          return 0;
        });
        break;
      case 'date':
        this.medias.sort(function (a, b) {
          if (a.date < b.date) {
            return 1;
          } else if (b.date < a.date) {
            return -1;
          }
          return 0;
        });
        break;
      case 'title':
        this.medias.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          } else if (b.title < a.title) {
            return 1;
          }
          return 0;
        });
        break;
    }
  }
}
