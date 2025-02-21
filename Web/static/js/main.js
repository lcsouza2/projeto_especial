class TimeMark {
    constructor (id) {
        this.referedTimeMark = document.getElementById(id)
        this.state = "retracted"
    }

    moveTimeLineRigth() {
        document.getElementById("timeline").style.transform = "translateX(40vw)"
    }

    moveTimeLineLeft() {
        document.getElementById("timeline").style.transform = "translateX(-40vw)"
    }

    moveTimeLineUp() {
        document.getElementById("timeline").style.transform = "translateY(40vh)"
    }

    moveTimeLineDown() {
        document.getElementById("timeline").style.transform = "translateY(-40vh)"
    }

    resetTimeLInePosition() {
        document.getElementById("timeline").style.transform = "translateX(0vw)"
    }

    expandLeft() {
        this.referedTimeMark.querySelector(".timemark-content").style.visibility = "visible"

        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "0vw", height: "0vh", },
            { minWidth: "75vw", height: "40vh", transform: "translate(-85vw, 0vh)", display: "block" }
        ], {duration: 500, fill: "forwards", easing: "ease" })

    }

    expandRight() {
        this.referedTimeMark.querySelector(".timemark-content").style.visibility = "visible"

        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "0vw", height: "0vh", },
            { minWidth: "75vw", height: "40vh", transform: "translate(15vw, 0vh)", display: "block" }
        ], {duration: 500, fill: "forwards", easing: "ease" })

    }

    expandDown() {
        this.referedTimeMark.querySelector(".timemark-content").style.visibility = "visible"

        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "0vw", height: "0vh", },
            { minWidth: "75vw", height: "40vh", transform: "translate(0vw, -5vh)", display: "block" }
        ], {duration: 500, fill: "forwards", easing: "ease" })

    }

    expandUp() {
        this.referedTimeMark.querySelector(".timemark-content").style.visibility = "visible"

        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "0vw", height: "0vh", },
            { minWidth: "75vw", height: "40vh", transform: "translate(0vw, 5vh)", display: "block" }
        ], {duration: 500, fill: "forwards", easing: "ease" })

    }


    retract() {
        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "", height: "" },
            { width: "0px", height: "0px" },
        ], {duration: 500, fill: "forwards", easing: "ease" })

        setTimeout(() => {
            this.referedTimeMark.querySelector(".timemark-content").style.visibility = "hidden"
        }, 500)
    }
}

function retractAllTimemarkContent() {
    document.querySelectorAll(".timemark-content").forEach(i => {
        i.animate([
            { width: "", height: "" },
            { width: "0vw", height: "0vh" , transform: "translate(0vw, 0vh)" },
        ], {duration: 500, fill: "forwards", easing: "ease" })
        timemarksArray.find(item => item.referedTimeMark == i).state = "retracted"
    }) 

}

function getPlatform() {
    if (window.innerWidth < 768) {
        return "Mobile"
    } else {
        return "Desktop"
    } 
}


if (getPlatform() == "Mobile") {

    document.getElementsByClassName(
        "init_simple"
    )[1].textContent = "Da uma olhadinha aí embaixo, tem uma linha do tempo com umas coisinhas bacanudas 👍👍"

    let i = 0

    let timemarks = document.querySelectorAll(".timemark")
    timemarksArray = []

    timemarks.forEach(element => {

        let item = new TimeMark(element.id)
        timemarksArray.push(item)

        item.referedTimeMark.addEventListener("click", () => {

            if (item.state == "retracted") {

                if (timemarksArray.some(el => el.state == "expanded")) {
                    retractAllTimemarkContent()
                }

                if ( timemarksArray.indexOf(item) % 2 == 0 ) {
                    item.moveTimeLineLeft()
                    setTimeout(item.expandRight(), 500 )
                    i++
                    item.state = "expanded"
                } else {
                    item.moveTimeLineRigth()
                    item.expandLeft()
                    i++
                    item.state = "expanded"
                }

            } else {
                item.retract()
                item.resetTimeLInePosition()
                item.state = "retracted"
            }

        })
    })


} else {
    document.addEventListener("wheel", (event) => {
        if (event.deltaY !== 0) {
          event.preventDefault(); // Impede o scroll vertical padrão
          window.scrollBy({
            left: event.deltaY, // Converte o movimento vertical em horizontal
            behavior: "smooth" // Deixa o scroll mais fluido
          });
        }
      }, { passive: false });

    document.getElementsByClassName(
        "init_simple"
    )[1].textContent = "Da uma olhadinha aí do lado, tem uma linha do tempo com umas coisinhas bacanudas 👍👍"
}

