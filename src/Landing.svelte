<script>
    import { onMount } from "svelte"
  
    let landing, title

    function initAnimate() {
        return function() {
        if (playing) return
        playing = true
        title.style.opacity = 0
        for (let i = 0; i < nCopies; i++) {
          const copy = document.createElement("p")
          copy.textContent = "seven spaces"
          let top = Math.random() * window.innerHeight + "px"
          let left = Math.random() * window.innerWidth + "px"
          copy.style.position = 'absolute'
          copy.style.top = top
          copy.style.left = left
          copy.style.color = "#fff"
          setTimeout(() => {
            landing.appendChild(copy)
            copies.push(copy)
            setTimeout(() => hideEle(copy), t)
          }, t * i)
        }
        const hideEle = node => (node.style.visibility = "hidden")
        const showEle = node => (node.style.visibility = "visible")
        const clearCopies = () => {
          playing = false
          copies.forEach(copy => copy.remove())
          copies.length = 0
          title.style.opacity = 1
        }
        setTimeout(() => copies.forEach(showEle), nCopies * t + reveal)
        setTimeout(() => clearCopies(), nCopies * t + reveal + reveal)
      }
    }

    let animate
    let copies = []
    let playing = false
    // animation variables
    const nCopies = 40
    const t = 40 // time per copy
    const reveal = 500 // t
    onMount(() => {
      animate = initAnimate()
    })
  </script>
  
  <style>
    .landing {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: transparent;
      z-index: 1;
      overflow: hidden;
      color: white;
      user-select: none;
      font-size: 1.25rem;
      font-weight: normal;
      opacity: 0.9;
    }
  
    .title {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  </style>
  
  <div class="landing" bind:this={landing} on:mousemove={animate}>
    <span class={'title'} bind:this={title}>seven spaces</span>
  </div>
  