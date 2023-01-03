const btn = document.querySelector("button");
const juice = document.querySelectorAll(".juice");

// Animation State Triggers
const orangeTrigger = document.querySelector(".juice.orange");
const bananaTrigger = document.querySelector(".banana.juice");
const appleTrigger = document.querySelector(".apple.juice");
const mangoTrigger = document.querySelector(".mango.juice");

const canvas = document.querySelector("canvas");
const plh = document.querySelector("h4");

const r = new rive.Rive({
  src: "./assets/juices-multiple.riv",
  canvas: document.getElementById("juice-canvas"),
  stateMachines: "Juice-motion",
  autoplay: true,
  fit: rive.Fit.cover,

  onStateChange: (event) => {
    console.log(event);
    const state = event.data[0];
    if (state == "fill-complete") {
      alert("Your Order is recieved");
    }
  },

  onLoad: (_) => {
    const inputs = r.stateMachineInputs("Juice-motion");
    // Rive Triggers
    const triggerFill = inputs.find((i) => i.name === "FIll Juice");
    const triggerOrange = inputs.find((i) => i.name === "Orange");
    const triggerBanana = inputs.find((i) => i.name === "Banana");
    const triggerApple = inputs.find((i) => i.name === "Apple");
    const triggerMango = inputs.find((i) => i.name === "Mango");

    // List Item triggers for animation state change
    orangeTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      triggerOrange.fire();
    });
    bananaTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      triggerBanana.fire();
    });
    appleTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      triggerApple.fire();
    });
    mangoTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      triggerMango.fire();
    });

    // Run fill animation on button click
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.classList.add("disabled");
      btn.setAttribute("disabled", "disabled");
      btn.innerText = "Filling Up";

      setTimeout(() => {
        btn.classList.remove("disabled");
        btn.innerText = "Add to cart";

        btn.removeAttribute("disabled");
      }, 1600);
      triggerFill.fire();
    });
  },
});
juice.forEach((item) => {
  item.addEventListener("click", () => {
    btn.classList.remove("hidden");
    juice.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
    plh.classList.add("hidden");
    canvas.classList.remove("hidden");
  });
});
