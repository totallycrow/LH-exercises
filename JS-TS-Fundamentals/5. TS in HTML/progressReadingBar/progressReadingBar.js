"use strict";
class ProgressBarController {
    constructor() { }
    getTargetElements = (target) => {
        return document.querySelectorAll(target);
    };
    addProgressBar = (root) => {
        console.log("bar");
        const bar = document.createElement("div");
        bar.classList.add("reading-progress-fill");
        root.prepend(bar);
    };
    handleScroll = (item) => {
        let width = ((document.body.scrollTop || document.documentElement.scrollTop) /
            (document.documentElement.scrollHeight -
                document.documentElement.clientHeight)) *
            100;
        const bar2 = item.firstChild;
        const bar = document.querySelector(".reading-progress-fill");
        if (bar2)
            bar2.style.setProperty("width", width + "%");
    };
    start = () => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const item = entry.target;
                console.log(item);
                if (entries[0].intersectionRatio <= 0)
                    return;
                console.log("test");
                this.addProgressBar(item);
                document.addEventListener("scroll", () => this.handleScroll(item));
                intersectionObserver.unobserve(entry.target);
            });
        });
        // start observing
        const divList = document.querySelectorAll(".with-progress-reading-bar");
        console.log(divList);
        divList.forEach((div) => {
            intersectionObserver.observe(div);
        });
    };
}
const runner = new ProgressBarController();
runner.start();
// const run = () => {
//   console.log("init");
//   const readArea = document.querySelector(".with-progress-reading-bar");
//   const readBar: HTMLElement = document.querySelector(".progressBar");
//   console.log(readArea);
//   console.log(readBar);
//   const intersectionObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const item: HTMLElement = entry.target;
//       if (entries[0].intersectionRatio <= 0) return;
//       console.log(entry.intersectionRatio);
//       console.log("test");
//       console.log(document.documentElement.scrollTop);
//       console.log(item.offsetTop);
//       //   item.style = "background-color: red";
//       const bar = document.createElement("div");
//       bar.classList.add("reading-progress-fill");
//       item.prepend(bar);
//       document.addEventListener("scroll", function (e) {
//         // // GET SPECIFIC ELEMENT HEIGHT
//         // const itemHeight = item.offsetHeight;
//         // console.log(itemHeight);
//         // // GET FULL DOCUMENT HEIGHT
//         // const documentHeight =
//         //   document.documentElement.scrollTop || document.body.scrollTop;
//         // console.log(documentHeight);
//         // CALCULATE DIFFERENCE ON SCROLL
//         // test
//         let width =
//           ((document.body.scrollTop || document.documentElement.scrollTop) /
//             (document.documentElement.scrollHeight -
//               document.documentElement.clientHeight)) *
//           100;
//         bar.style.setProperty("width", width + "%");
//       });
//       intersectionObserver.unobserve(entry.target);
//     });
//     //   if (entries[0].intersectionRatio <= 0) return;
//     //   console.log(entries);
//     //   entries[0].target.style = "background-color: red";
//     //   console.log(entries[0].target);
//     //   return entries;
//   }, {});
//   // start observing
//   const divList = document.querySelectorAll(".with-progress-reading-bar");
//   divList.forEach((div) => {
//     intersectionObserver.observe(div);
//   });
//   //   intersectionObserver.observe(
//   //     document.querySelectorAll(".with-progress-reading-bar")
// };
// // run();
// const runner = new ProgressBarController();
// runner.start();
