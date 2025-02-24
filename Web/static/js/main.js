const audio = document.querySelector("audio")
document.querySelectorAll("video").forEach(video => {

  video.muted = false

  video.addEventListener("play", () => {
    audio.volume = 0.2
  })

  video.addEventListener("pause", () => {
    audio.volume = 1
  })

  video.addEventListener("ended", () => {
    audio.volume = 1
  })


})


class TimeMark {
  constructor(id) {
    this.referedTimeMark = document.getElementById(id);
    this.state = "retracted";
  }

  moveTimeLineRigth() {
    document.getElementById("timeline").style.transform = "translateX(40vw)";
  }

  moveTimeLineLeft() {
    document.getElementById("timeline").style.transform = "translateX(-40vw)";
  }

  moveTimeLineUp() {
    document.getElementById("timeline").style.transform = "translateY(40vh)";
  }

  moveTimeLineDown() {
    document.getElementById("timeline").style.transform = "translateY(-40vh)";
  }

  resetTimeLInePosition() {
    document.getElementById("timeline").style.transform = "translateX(0vw)";
  }

  expandLeft() {
    let element = this.referedTimeMark.querySelector(".timemark-content");

    element.style.width = "70vw";
    element.style.display = "block";
    element.style.height = "auto"; // Deixa o navegador calcular a altura

    let fullHeight = element.scrollHeight + "px"; // Captura a altura real
    element.style.height = "0px"; // Reinicia para animação

    element.style.transformOrigin = "top left"

    element.style.visibility = "visible";

    element.animate(
      [
        { width: "0vw", height: "0vh" },
        {
          minWidth: "70vw",
          height: fullHeight,
          scale: "1", 
          transform: "translate(-85vw, -46.5%)",
          display: "block",
        },
      ],
      { duration: 500, fill: "forwards", easing: "ease" }
    );
  }

  expandRight() {
    let element = this.referedTimeMark.querySelector(".timemark-content");

    element.style.height = "auto"; // Deixa o navegador calcular a altura
    element.style.display = "block";

    element.style.width = "70vw";

    element.style.transformOrigin = "top left"

    let fullHeight = element.scrollHeight + "px"; // Captura a altura real

    element.style.height = "0px"; // Reinicia para animação

    element.style.visibility = "visible";

    element.animate(
      [
        { width: "0vw", height: "0vh" },
        {
          minWidth: "70vw",
          height: fullHeight,
          scale: "1",
          transform: "translate(15vw, -46.5%)",
          display: "block",
        },
      ],
      { duration: 500, fill: "forwards", easing: "ease" }
    );
  }

  expandDown() {
    let element = this.referedTimeMark.querySelector(".timemark-content");

    element.style.width = "auto"

    let fullWidth = element.scrollWidth + "px"

    element.style.display = "flex"
    element.style.width = "0px"
    element.style.transformOrigin = "top left"

    element.style.visibility = "visible";

    element.animate(
      [
        { width: "0vw", height: "0vh" },
        {
          width: fullWidth,
          scale: "1",
          transform: "translate(-50%, -70vh)",
        },
      ],
      { duration: 500, fill: "forwards", easing: "ease" }
    );
  }

  expandUp() {

    let element = this.referedTimeMark.querySelector(".timemark-content")

    console.log(element.scrollWidth)

    element.style.width = "auto"

    element.style.transformOrigin = "top left"

    let fullWidth = element.scrollWidth + "px"

    element.style.display = "flex"

    element.style.visibility = "visible";


    this.referedTimeMark.querySelector(".timemark-content").animate(
      [
        { width: "", height: "" },
        {
            width: fullWidth,
            scale: "1",
            transform: "translate(-50%, 10vh)",
        },
      ],
      { duration: 500, fill: "forwards", easing: "ease" }
    );

    console.log(element.scrollWidth)

  }

  retract() {
    this.referedTimeMark.querySelector(".timemark-content").animate(
      [
        { width: "", height: "" },
        { scale: "0" },
      ],
      { duration: 500, fill: "forwards", easing: "ease" }
    );

    let video = this.referedTimeMark.querySelector("video");
    if (video) {
      
      video.muted = true;
      audio.muted = false
    }

    setTimeout(() => {
      this.referedTimeMark.querySelector(".timemark-content").style.visibility =
        "hidden";
      this.referedTimeMark.style.backgroundColor = "#e27396";
    }, 500);
  }
}

const timemarks = document.querySelectorAll(".timemark");
let timemarksArray = [];

function retractAllTimemarkContent(refered) {
  timemarksArray.forEach((item) => {
    if (refered !== item.referedTimeMark) {
      item.retract();
      item.state = "retracted";
    }
  });
}

function getPlatform() {
  if (window.innerWidth < 768) {
    return "Mobile";
  } else {
    return "Desktop";
  }
}

if (getPlatform() == "Mobile") {
  document.getElementsByClassName("init_simple")[1].textContent =
    "Da uma olhadinha aí embaixo, tem uma linha do tempo com umas coisinhas bacanudas 👍👍";

  let i = 0;

  timemarks.forEach((element) => {
    let item = new TimeMark(element.id);
    timemarksArray.push(item);

    item.referedTimeMark.addEventListener("click", () => {
      if (item.state == "retracted") {
        if (timemarksArray.some((el) => el.state == "expanded")) {
          retractAllTimemarkContent(item.referedTimeMark);

          setTimeout(() => {
            if (timemarksArray.indexOf(item) % 2 == 0) {
              item.moveTimeLineLeft();
              setTimeout(item.expandRight(), 500);
              i++;
              item.state = "expanded";
              item.referedTimeMark.style.backgroundColor = "#efcfe3";
            } else {
              item.moveTimeLineRigth();
              item.expandLeft();
              i++;
              item.state = "expanded";
              item.referedTimeMark.style.backgroundColor = "#efcfe3";
            }
          }, 500);
        } else {
          if (timemarksArray.indexOf(item) % 2 == 0) {
            item.moveTimeLineLeft();
            setTimeout(item.expandRight(), 500);
            i++;
            item.state = "expanded";
            item.referedTimeMark.style.backgroundColor = "#efcfe3";
          } else {
            item.moveTimeLineRigth();
            setTimeout(item.expandLeft(), 500);
            i++;
            item.state = "expanded";
            item.referedTimeMark.style.backgroundColor = "#efcfe3";
          }
        }
      } else {
        item.retract();
        setTimeout(() => item.resetTimeLInePosition(), 500);

        item.state = "retracted";
      }
    });
  });
} else {
  document.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault(); // Impede o scroll vertical padrão
        window.scrollBy({
          left: event.deltaY * 3, // Converte o movimento vertical em horizontal
          behavior: "smooth", // Deixa o scroll mais fluido
        });
      }
    },
    { passive: false }
  );

  document.getElementsByClassName("init_simple")[1].textContent =
    "Da uma olhadinha aí do lado, tem uma linha do tempo com umas coisinhas bacanudas 👍👍";

  let i = 0;

  timemarks.forEach((element) => {
    let item = new TimeMark(element.id);
    timemarksArray.push(item);

    item.referedTimeMark.addEventListener("click", () => {
      if (item.state == "retracted") {
        if (timemarksArray.some((el) => el.state == "expanded")) {
          retractAllTimemarkContent(item.referedTimeMark);
        }

        if (timemarksArray.indexOf(item) % 2 == 0) {
          item.moveTimeLineUp();
          setTimeout(item.expandDown(), 500);
          i++;
          item.referedTimeMark.style.backgroundColor = "#efcfe3";
          item.state = "expanded";
        } else {
          item.moveTimeLineDown();
          item.expandUp();
          i++;
          item.referedTimeMark.style.backgroundColor = "#efcfe3";

          item.state = "expanded";
        }
      } else {
        item.retract();
        item.resetTimeLInePosition();
        item.state = "retracted";
      }
    });
  });

}
document.querySelector(".send_to_end").addEventListener("click", () => window.location.replace("/final"))