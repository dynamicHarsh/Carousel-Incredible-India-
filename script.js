const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];

arrowIcons = document.querySelectorAll(".wrapper i");

const showHideIcons=()=>{
    let scrollWidth= carousel.scrollWidth-carousel.clientWidth;
    arrowIcons[0].style.display
    =carousel.scrollLeft==0?"none":"block";
    arrowIcons[1].style.display
    =carousel.scrollLeft==scrollWidth?"none":"block";
}


let isDragStart = false, isDragging=false,prevPageX, prevScrollLeft,PositionDiff;


arrowIcons.forEach(icon => {
    let firstImgWidth = firstImg.clientWidth + 14;
    icon.addEventListener("click", () => {
        carousel.scrollLeft += ((icon.id == "left") ? (-firstImgWidth) : firstImgWidth);
        setTimeout(()=>showHideIcons(),60);
    });
});

const autoSlide=()=>{
    if(carousel.scrollLeft==(carousel.scrollWidth-carousel.clientWidth)) return;

    PositionDiff=Math.abs(PositionDiff);
    let firstImgWidth=firstImg.clientWidth+14;
    let valDifference=firstImgWidth-PositionDiff;
    if(carousel.scrollLeft>prevScrollLeft){
        return carousel.scrollLeft+=PositionDiff>firstImgWidth/3?valDifference:-PositionDiff;
    }
    carousel.scrollLeft-=PositionDiff>firstImgWidth/3?valDifference:-PositionDiff;
}


const dragStart = (e) => {
    // Updating global variables values on mouse down event

    isDragStart = true;
    prevPageX = e.pageX|| e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging=true;
    carousel.classList.add("dragging");
    PositionDiff = (e.pageX|| e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - PositionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    // isDragging=false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);


carousel.addEventListener("mouseup", dragStop);


carousel.addEventListener("mouseleave",dragStop);
carousel.addEventListener("touchleave",dragStop);


