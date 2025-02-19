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

    resetTimeLInePosition() {
        document.getElementById("timeline").style.transform = "translateX(0vw)"

    }

    expandLeft() {

        this.referedTimeMark.querySelector(".timemark-content").style.visibility = "visible"

        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "0vw", height: "0vh" },
            { width: "75vw", height: "40vh", transform: "translateX(-80vw)" }
        ], {duration: 500, fill: "forwards", easing: "ease" })

    }

    retract() {

        this.referedTimeMark.querySelector(".timemark-content").animate([
            { width: "75vw", height: "40vh" },
            { width: "0vw", height: "0vh" , transform: "translate(0vw, 0vh)" },
        ], {duration: 500, fill: "forwards", easing: "ease" })

        setTimeout(() => {
            this.referedTimeMark.querySelector(".timemark-content").style.visibility = "hidden"
        }, 500)
    }
}


let thing = new TimeMark("timemark-1")

thing.referedTimeMark.addEventListener("click", () => {

    if (thing.state == "retracted") {
        thing.moveTimeLineRigth()
        setTimeout(() => thing.expandLeft(), 250)
        thing.state = "expanded"
    } else {
        thing.retract()
        thing.resetTimeLInePosition()
        thing.state = "retracted"
    }

})