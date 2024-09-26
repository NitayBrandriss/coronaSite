// import"./kashkaval"
// import { obj } from "./kashkaval";
// console.log(obj);

export function ShowAndHide(SectionName) {
    const x = document.getElementById(`${SectionName}`);
    x.classList.toggle('show');
}
export function add_event_show_and_hide(clicked_elemnt_id, target_element_id, elemnt_toggle_active_id = clicked_elemnt_id, isCascading = true) {
    let element = document.getElementById(clicked_elemnt_id);
    element.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!isCascading && event.target !== element) {//to prevent propagation from the first element
            return
        }
        ShowAndHide(target_element_id);

        if (elemnt_toggle_active_id != clicked_elemnt_id) {
            const elemnt_toggle_active = document.getElementById(`${elemnt_toggle_active_id}`);
            elemnt_toggle_active.classList.toggle('active');
            return;
        }
        element.classList.toggle('active');
    })
}

{[[t1,t2,t3],[q1,q2,q3]...]}