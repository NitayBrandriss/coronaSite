<<<<<<< HEAD
let isDarkModeOn = false;
function last_update_time() {
    let currentTime = new Date();
    let day = currentTime.getDate();
    let month = currentTime.getMonth() + 1; // Months are zero-based
    let year = currentTime.getFullYear();
    let formattedDate = day + '/' + month + '/' + year;
    const last_update_time_span = document.getElementById('last-update-time');
    last_update_time_span.textContent = formattedDate;
}
function darkModeEvent() {
    const clicked_element = document.getElementById('dark-mode-btn');
    const target_element = document.getElementById('body');
    clicked_element.addEventListener('click', (event) => {
        // event.stopPropagation();
        target_element.classList.toggle('dark-theme');
        isDarkModeOn = !isDarkModeOn;
    });
}

class functions {

    static ShowAndHide(SectionName) {
        const x = document.getElementById(`${SectionName}`);
        x.classList.toggle('show');
    }

    static add_event_show_and_hide(container_Id, open_box_Id, isCascading = true) {
        let container = document.getElementById(container_Id);
        container.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!isCascading && event.target !== container) {//to prevent propagation from the first element
                return
            }
            container.classList.toggle('active');
            functions.ShowAndHide(open_box_Id);
        })
    }

    static toggle_class_onclick(clicked_elemnt_id, taget_element_id, class_name) {
        const clicked_element = document.getElementById(`${clicked_elemnt_id}`);
        const target_element = document.getElementById(`${taget_element_id}`);
        clicked_element.addEventListener('click', (event) => {
            // event.stopPropagation();
            target_element.classList.toggle(`${class_name}`);
        });
    }
    static toggle_class_onmouseleave(mouseleave_elemnt_id, taget_element_id, class_name) {
        const mouseleave_element = document.getElementById(`${mouseleave_elemnt_id}`);
        const target_element = document.getElementById(`${taget_element_id}`);
        mouseleave_element.addEventListener('mouseleave', (event) => {
            // event.stopPropagation();
            target_element.classList.remove(`${class_name}`);
        });
    }

}


setInterval(last_update_time, 360000000);
/// HEADER////////
functions.add_event_show_and_hide('_logo-container-menu-container', "menu-modal-container");
functions.add_event_show_and_hide('menu-modal-container', "menu-modal-container", false);
functions.add_event_show_and_hide('menu-close-btn', "menu-modal-container", false);
functions.add_event_show_and_hide('_menu-modal-corona', "_menu-corona_sub-ul");

// functions.toggle_class_onclick('dark-mode-btn', 'body', 'dark-theme');
darkModeEvent();

/// nav bar////////
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const headerBar = document.getElementById('headerBar');
        const headerBarHeight = headerBar.offsetHeight;
        const navBar = document.getElementById('navBar');
        const navBarHeight = navBar.offsetHeight;
        const offset = headerBarHeight + navBarHeight; // Adjust this value to match the height of your navigation bar
        const target = document.querySelector(this.getAttribute('href'));
        const targetOffset = target.offsetTop - offset;

        window.scrollTo({
            top: targetOffset,
            // behavior: 'smooth'
        });
    });
});

// const navLinks = document.querySelectorAll('.nav-li');
// const sections = document.querySelectorAll('section');

// // Function to update the active navigation link
// function updateActiveNavLink() {
//     sections.forEach(section => {
//         const bounding = section.getBoundingClientRect();
//         const navLink = document.querySelector(`.nav-li[href="#${section.id}"]`);

//         if (
//             bounding.top <= window.innerHeight / 2 &&
//             bounding.bottom >= window.innerHeight / 2
//         ) {
//             navLinks.forEach(link => link.classList.remove('selected'));
//             navLink.classList.add('selected');
//         }
//     });
// }

// // Listen for scroll events and update active section
// window.addEventListener('scroll', updateActiveNavLink);


/// first section///////
class First_section {
    static get_card_numbers(card_body_id, data_arr) {
        const card_body = document.getElementById(`${card_body_id}`);
        const lines = card_body.querySelectorAll('.js-line');
        const lines_arr = Array.from(lines);
        lines_arr.forEach((line, index) => {
            const line_num = line.querySelector('.js-info-numbers');
            line_num.innerHTML = `${data_arr[index].toLocaleString()}`;
        });
    }
    static yestrday_arr = [8, 1000, 3141590];
    static active_cases_arr = [858, 167];
    static severe_cases_arr = [21, 13, 0, 8, 92, 35];
    static vaccinated_arr = [5277289, 4559592, 3798456, 2094778, 853877];
    static total_deaths_arr = [12527];
    static positives_yesterday_arr = [4.15, 1571, 1630];
    static summery_confirmed_cases_arr = [3, -7];
    static summery_severe_cases_arr = [13, -50]
    static summery_deaths_arr = [3, -43.6]
    static summery_tests_arr = [6666, -3.6, 7.8]


}
First_section.get_card_numbers(`new-cases-yesterday-body`, First_section.yestrday_arr);
First_section.get_card_numbers(`active-cases-body`, First_section.active_cases_arr);
First_section.get_card_numbers(`severe_cases-body`, First_section.severe_cases_arr);
First_section.get_card_numbers(`vaccinated-body`, First_section.vaccinated_arr);
First_section.get_card_numbers(`total-deaths-body`, First_section.total_deaths_arr);
First_section.get_card_numbers(`positives-yesterday-body`, First_section.positives_yesterday_arr);
First_section.get_card_numbers(`summery-confirmed-cases`, First_section.summery_confirmed_cases_arr);
First_section.get_card_numbers(`summery-severe-cases`, First_section.summery_severe_cases_arr);
First_section.get_card_numbers(`summery-deaths`, First_section.summery_deaths_arr);
First_section.get_card_numbers(`summery-tests`, First_section.summery_tests_arr);

functions.add_event_show_and_hide('key-data-section-links', 'key-data-suject-links-container-mobile', false);
functions.add_event_show_and_hide('key-data-suject-links-container-mobile', 'key-data-suject-links-container-mobile', true);
functions.add_event_show_and_hide('key-data-suject-links-container-mobile', 'key-data-suject-links-container-warper', true);
functions.add_event_show_and_hide('key-data-section-links', 'key-data-suject-links-container-warper', false);
functions.add_event_show_and_hide('key-data-suject-links-container-warper', 'key-data-suject-links-container-warper', true);
functions.toggle_class_onmouseleave('key-data-section-links', 'key-data-suject-links-container-warper', 'show');
functions.toggle_class_onmouseleave('key-data-section-links', 'key-data-suject-links-container-mobile', 'show');

function add_three_dots_event_listiners() {
    const three_dots_element = document.querySelectorAll('.three-dots-warper');
    const three_dots_arr = Array.from(three_dots_element);
    three_dots_arr.forEach((el) => {
        el.lastChild;
        el.addEventListener('click', (event) => {
            event.stopPropagation();
            el.lastElementChild.classList.toggle('show');
        }
        )
        el.addEventListener('mouseleave', (event) => {
            el.lastElementChild.classList.remove('show');
        });
    })
};
=======
let isDarkModeOn = false;
function last_update_time() {
    let currentTime = new Date();
    let day = currentTime.getDate();
    let month = currentTime.getMonth() + 1; // Months are zero-based
    let year = currentTime.getFullYear();
    let formattedDate = day + '/' + month + '/' + year;
    const last_update_time_span = document.getElementById('last-update-time');
    last_update_time_span.textContent = formattedDate;
}
function darkModeEvent() {
    const clicked_element = document.getElementById('dark-mode-btn');
    const target_element = document.getElementById('body');
    clicked_element.addEventListener('click', (event) => {
        // event.stopPropagation();
        target_element.classList.toggle('dark-theme');
        isDarkModeOn = !isDarkModeOn;
    });
}

class functions {

    static ShowAndHide(SectionName) {
        const x = document.getElementById(`${SectionName}`);
        x.classList.toggle('show');
    }

    static add_event_show_and_hide(container_Id, open_box_Id, isCascading = true) {
        let container = document.getElementById(container_Id);
        container.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!isCascading && event.target !== container) {//to prevent propagation from the first element
                return
            }
            container.classList.toggle('active');
            functions.ShowAndHide(open_box_Id);
        })
    }

    static toggle_class_onclick(clicked_elemnt_id, taget_element_id, class_name) {
        const clicked_element = document.getElementById(`${clicked_elemnt_id}`);
        const target_element = document.getElementById(`${taget_element_id}`);
        clicked_element.addEventListener('click', (event) => {
            // event.stopPropagation();
            target_element.classList.toggle(`${class_name}`);
        });
    }
    static toggle_class_onmouseleave(mouseleave_elemnt_id, taget_element_id, class_name) {
        const mouseleave_element = document.getElementById(`${mouseleave_elemnt_id}`);
        const target_element = document.getElementById(`${taget_element_id}`);
        mouseleave_element.addEventListener('mouseleave', (event) => {
            // event.stopPropagation();
            target_element.classList.remove(`${class_name}`);
        });
    }

}


setInterval(last_update_time, 360000000);
/// HEADER////////
functions.add_event_show_and_hide('_logo-container-menu-container', "menu-modal-container");
functions.add_event_show_and_hide('menu-modal-container', "menu-modal-container", false);
functions.add_event_show_and_hide('menu-close-btn', "menu-modal-container", false);
functions.add_event_show_and_hide('_menu-modal-corona', "_menu-corona_sub-ul");

// functions.toggle_class_onclick('dark-mode-btn', 'body', 'dark-theme');
darkModeEvent();

/// nav bar////////
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const headerBar = document.getElementById('headerBar');
        const headerBarHeight = headerBar.offsetHeight;
        const navBar = document.getElementById('navBar');
        const navBarHeight = navBar.offsetHeight;
        const offset = headerBarHeight + navBarHeight; // Adjust this value to match the height of your navigation bar
        const target = document.querySelector(this.getAttribute('href'));
        const targetOffset = target.offsetTop - offset;

        window.scrollTo({
            top: targetOffset,
            // behavior: 'smooth'
        });
    });
});

// const navLinks = document.querySelectorAll('.nav-li');
// const sections = document.querySelectorAll('section');

// // Function to update the active navigation link
// function updateActiveNavLink() {
//     sections.forEach(section => {
//         const bounding = section.getBoundingClientRect();
//         const navLink = document.querySelector(`.nav-li[href="#${section.id}"]`);

//         if (
//             bounding.top <= window.innerHeight / 2 &&
//             bounding.bottom >= window.innerHeight / 2
//         ) {
//             navLinks.forEach(link => link.classList.remove('selected'));
//             navLink.classList.add('selected');
//         }
//     });
// }

// // Listen for scroll events and update active section
// window.addEventListener('scroll', updateActiveNavLink);


/// first section///////
class First_section {
    static get_card_numbers(card_body_id, data_arr) {
        const card_body = document.getElementById(`${card_body_id}`);
        const lines = card_body.querySelectorAll('.js-line');
        const lines_arr = Array.from(lines);
        lines_arr.forEach((line, index) => {
            const line_num = line.querySelector('.js-info-numbers');
            line_num.innerHTML = `${data_arr[index].toLocaleString()}`;
        });
    }
    static yestrday_arr = [8, 1000, 3141590];
    static active_cases_arr = [858, 167];
    static severe_cases_arr = [21, 13, 0, 8, 92, 35];
    static vaccinated_arr = [5277289, 4559592, 3798456, 2094778, 853877];
    static total_deaths_arr = [12527];
    static positives_yesterday_arr = [4.15, 1571, 1630];
    static summery_confirmed_cases_arr = [3, -7];
    static summery_severe_cases_arr = [13, -50]
    static summery_deaths_arr = [3, -43.6]
    static summery_tests_arr = [6666, -3.6, 7.8]


}
First_section.get_card_numbers(`new-cases-yesterday-body`, First_section.yestrday_arr);
First_section.get_card_numbers(`active-cases-body`, First_section.active_cases_arr);
First_section.get_card_numbers(`severe_cases-body`, First_section.severe_cases_arr);
First_section.get_card_numbers(`vaccinated-body`, First_section.vaccinated_arr);
First_section.get_card_numbers(`total-deaths-body`, First_section.total_deaths_arr);
First_section.get_card_numbers(`positives-yesterday-body`, First_section.positives_yesterday_arr);
First_section.get_card_numbers(`summery-confirmed-cases`, First_section.summery_confirmed_cases_arr);
First_section.get_card_numbers(`summery-severe-cases`, First_section.summery_severe_cases_arr);
First_section.get_card_numbers(`summery-deaths`, First_section.summery_deaths_arr);
First_section.get_card_numbers(`summery-tests`, First_section.summery_tests_arr);

functions.add_event_show_and_hide('key-data-section-links', 'key-data-suject-links-container-mobile', false);
functions.add_event_show_and_hide('key-data-suject-links-container-mobile', 'key-data-suject-links-container-mobile', true);
functions.add_event_show_and_hide('key-data-suject-links-container-mobile', 'key-data-suject-links-container-warper', true);
functions.add_event_show_and_hide('key-data-section-links', 'key-data-suject-links-container-warper', false);
functions.add_event_show_and_hide('key-data-suject-links-container-warper', 'key-data-suject-links-container-warper', true);
functions.toggle_class_onmouseleave('key-data-section-links', 'key-data-suject-links-container-warper', 'show');
functions.toggle_class_onmouseleave('key-data-section-links', 'key-data-suject-links-container-mobile', 'show');

function add_three_dots_event_listiners() {
    const three_dots_element = document.querySelectorAll('.three-dots-warper');
    const three_dots_arr = Array.from(three_dots_element);
    three_dots_arr.forEach((el) => {
        el.lastChild;
        el.addEventListener('click', (event) => {
            event.stopPropagation();
            el.lastElementChild.classList.toggle('show');
        }
        )
        el.addEventListener('mouseleave', (event) => {
            el.lastElementChild.classList.remove('show');
        });
    })
};
>>>>>>> origin/main
add_three_dots_event_listiners();